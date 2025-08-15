import {
  users,
  rides,
  bookings,
  type User,
  type UpsertUser,
  type Ride,
  type InsertRide,
  type Booking,
  type InsertBooking,
  type BookingWithDetails,
  type RideSearchFilters,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, like, or, desc, sql, asc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserStripeInfo(userId: string, stripeCustomerId: string): Promise<User>;
  
  // Ride operations
  getAllRides(filters?: RideSearchFilters): Promise<Ride[]>;
  getRideById(id: string): Promise<Ride | undefined>;
  createRide(ride: InsertRide): Promise<Ride>;
  updateRide(id: string, ride: Partial<InsertRide>): Promise<Ride>;
  deleteRide(id: string): Promise<void>;
  searchRides(query: string): Promise<Ride[]>;
  
  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingById(id: string): Promise<Booking | undefined>;
  getBookingWithDetails(id: string): Promise<BookingWithDetails | undefined>;
  getUserBookings(userId: string): Promise<BookingWithDetails[]>;
  getAllBookings(): Promise<BookingWithDetails[]>;
  updateBookingStatus(id: string, status: string, paymentIntentId?: string): Promise<Booking>;
  cancelBooking(id: string, userId: string): Promise<Booking>;
  
  // Analytics operations
  getBookingStats(): Promise<{
    totalBookings: number;
    totalRevenue: number;
    activeRides: number;
    totalUsers: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserStripeInfo(userId: string, stripeCustomerId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        stripeCustomerId,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Ride operations
  async getAllRides(filters: RideSearchFilters = {}): Promise<Ride[]> {
    let whereConditions = [eq(rides.available, true)];

    if (filters.carType) {
      whereConditions.push(eq(rides.category, filters.carType));
    }
    if (filters.transmission) {
      whereConditions.push(eq(rides.transmission, filters.transmission));
    }
    if (filters.fuelType) {
      whereConditions.push(eq(rides.fuelType, filters.fuelType));
    }
    if (filters.location) {
      whereConditions.push(like(rides.location, `%${filters.location}%`));
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (min && max) {
        whereConditions.push(
          and(
            gte(rides.pricePerDay, min.toString()),
            lte(rides.pricePerDay, max.toString())
          )
        );
      }
    }

    const result = await db
      .select()
      .from(rides)
      .where(and(...whereConditions))
      .orderBy(asc(rides.pricePerDay));
    
    return result;
  }

  async getRideById(id: string): Promise<Ride | undefined> {
    const [ride] = await db.select().from(rides).where(eq(rides.id, id));
    return ride;
  }

  async createRide(rideData: InsertRide): Promise<Ride> {
    const [ride] = await db.insert(rides).values(rideData).returning();
    return ride;
  }

  async updateRide(id: string, rideData: Partial<InsertRide>): Promise<Ride> {
    const [ride] = await db
      .update(rides)
      .set({ ...rideData, updatedAt: new Date() })
      .where(eq(rides.id, id))
      .returning();
    return ride;
  }

  async deleteRide(id: string): Promise<void> {
    await db.delete(rides).where(eq(rides.id, id));
  }

  async searchRides(query: string): Promise<Ride[]> {
    const result = await db
      .select()
      .from(rides)
      .where(
        and(
          eq(rides.available, true),
          or(
            like(rides.model, `%${query}%`),
            like(rides.category, `%${query}%`),
            like(rides.location, `%${query}%`)
          )
        )
      )
      .orderBy(asc(rides.pricePerDay));
    
    return result;
  }

  // Booking operations
  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    const [booking] = await db.insert(bookings).values(bookingData).returning();
    return booking;
  }

  async getBookingById(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async getBookingWithDetails(id: string): Promise<BookingWithDetails | undefined> {
    const result = await db
      .select({
        booking: bookings,
        ride: rides,
        user: users,
      })
      .from(bookings)
      .innerJoin(rides, eq(bookings.rideId, rides.id))
      .innerJoin(users, eq(bookings.userId, users.id))
      .where(eq(bookings.id, id))
      .limit(1);

    if (result.length === 0) return undefined;

    const { booking, ride, user } = result[0];
    return { ...booking, ride, user };
  }

  async getUserBookings(userId: string): Promise<BookingWithDetails[]> {
    const result = await db
      .select({
        booking: bookings,
        ride: rides,
        user: users,
      })
      .from(bookings)
      .innerJoin(rides, eq(bookings.rideId, rides.id))
      .innerJoin(users, eq(bookings.userId, users.id))
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));

    return result.map(({ booking, ride, user }) => ({
      ...booking,
      ride,
      user,
    }));
  }

  async getAllBookings(): Promise<BookingWithDetails[]> {
    const result = await db
      .select({
        booking: bookings,
        ride: rides,
        user: users,
      })
      .from(bookings)
      .innerJoin(rides, eq(bookings.rideId, rides.id))
      .innerJoin(users, eq(bookings.userId, users.id))
      .orderBy(desc(bookings.createdAt));

    return result.map(({ booking, ride, user }) => ({
      ...booking,
      ride,
      user,
    }));
  }

  async updateBookingStatus(id: string, status: string, paymentIntentId?: string): Promise<Booking> {
    const updateData: any = { status, updatedAt: new Date() };
    if (paymentIntentId) {
      updateData.paymentIntentId = paymentIntentId;
    }

    const [booking] = await db
      .update(bookings)
      .set(updateData)
      .where(eq(bookings.id, id))
      .returning();
    return booking;
  }

  async cancelBooking(id: string, userId: string): Promise<Booking> {
    const [booking] = await db
      .update(bookings)
      .set({ 
        status: 'cancelled', 
        updatedAt: new Date() 
      })
      .where(
        and(
          eq(bookings.id, id),
          eq(bookings.userId, userId)
        )
      )
      .returning();
    return booking;
  }

  // Analytics operations
  async getBookingStats(): Promise<{
    totalBookings: number;
    totalRevenue: number;
    activeRides: number;
    totalUsers: number;
  }> {
    const [bookingCount] = await db
      .select({ count: sql`count(*)::int` })
      .from(bookings);
    
    const [revenue] = await db
      .select({ 
        total: sql`coalesce(sum(${bookings.totalAmount}), 0)::numeric` 
      })
      .from(bookings)
      .where(eq(bookings.status, 'completed'));
    
    const [activeRidesCount] = await db
      .select({ count: sql`count(*)::int` })
      .from(rides)
      .where(eq(rides.available, true));
    
    const [userCount] = await db
      .select({ count: sql`count(*)::int` })
      .from(users);

    return {
      totalBookings: bookingCount.count || 0,
      totalRevenue: Number(revenue.total || 0),
      activeRides: activeRidesCount.count || 0,
      totalUsers: userCount.count || 0,
    };
  }
}

export const storage = new DatabaseStorage();