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
import { eq, and, gte, lte, like, desc, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT) mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Ride operations
  getAllRides(filters?: RideSearchFilters): Promise<Ride[]>;
  getRideById(id: string): Promise<Ride | undefined>;
  createRide(ride: InsertRide): Promise<Ride>;
  updateRide(id: string, ride: Partial<InsertRide>): Promise<Ride>;
  deleteRide(id: string): Promise<void>;

  // Booking operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingById(id: string): Promise<BookingWithDetails | undefined>;
  getUserBookings(userId: string): Promise<BookingWithDetails[]>;
  getAllBookings(): Promise<BookingWithDetails[]>;
  updateBookingStatus(id: string, status: string, paymentIntentId?: string): Promise<Booking>;

  // Analytics
  getAnalytics(): Promise<{
    totalBookings: number;
    totalRevenue: string;
    activeRides: number;
    totalUsers: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT) mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
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

  // Ride operations
  async getAllRides(filters?: RideSearchFilters): Promise<Ride[]> {
    const conditions = [eq(rides.available, true)];

    if (filters?.carType && filters.carType !== 'All Types') {
      conditions.push(eq(rides.category, filters.carType));
    }

    if (filters?.transmission && filters.transmission !== 'Any') {
      conditions.push(eq(rides.transmission, filters.transmission));
    }

    if (filters?.fuelType && filters.fuelType !== 'Any') {
      conditions.push(eq(rides.fuelType, filters.fuelType));
    }

    if (filters?.location) {
      conditions.push(like(rides.location, `%${filters.location}%`));
    }

    return await db
      .select()
      .from(rides)
      .where(and(...conditions))
      .orderBy(desc(rides.rating));
  }

  async getRideById(id: string): Promise<Ride | undefined> {
    const [ride] = await db.select().from(rides).where(eq(rides.id, id));
    return ride;
  }

  async createRide(ride: InsertRide): Promise<Ride> {
    const [newRide] = await db.insert(rides).values(ride).returning();
    return newRide;
  }

  async updateRide(id: string, ride: Partial<InsertRide>): Promise<Ride> {
    const [updatedRide] = await db
      .update(rides)
      .set({ ...ride, updatedAt: new Date() })
      .where(eq(rides.id, id))
      .returning();
    return updatedRide;
  }

  async deleteRide(id: string): Promise<void> {
    await db.delete(rides).where(eq(rides.id, id));
  }

  // Booking operations
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }

  async getBookingById(id: string): Promise<BookingWithDetails | undefined> {
    const result = await db
      .select()
      .from(bookings)
      .leftJoin(rides, eq(bookings.rideId, rides.id))
      .leftJoin(users, eq(bookings.userId, users.id))
      .where(eq(bookings.id, id));

    if (result.length === 0) return undefined;

    const { bookings: booking, rides: ride, users: user } = result[0];
    return { ...booking, ride: ride!, user: user! };
  }

  async getUserBookings(userId: string): Promise<BookingWithDetails[]> {
    const result = await db
      .select()
      .from(bookings)
      .leftJoin(rides, eq(bookings.rideId, rides.id))
      .leftJoin(users, eq(bookings.userId, users.id))
      .where(eq(bookings.userId, userId))
      .orderBy(desc(bookings.createdAt));

    return result.map(({ bookings: booking, rides: ride, users: user }) => ({
      ...booking,
      ride: ride!,
      user: user!,
    }));
  }

  async getAllBookings(): Promise<BookingWithDetails[]> {
    const result = await db
      .select()
      .from(bookings)
      .leftJoin(rides, eq(bookings.rideId, rides.id))
      .leftJoin(users, eq(bookings.userId, users.id))
      .orderBy(desc(bookings.createdAt));

    return result.map(({ bookings: booking, rides: ride, users: user }) => ({
      ...booking,
      ride: ride!,
      user: user!,
    }));
  }

  async updateBookingStatus(id: string, status: string, paymentIntentId?: string): Promise<Booking> {
    const updateData: any = { status, updatedAt: new Date() };
    if (paymentIntentId) {
      updateData.paymentIntentId = paymentIntentId;
    }

    const [updatedBooking] = await db
      .update(bookings)
      .set(updateData)
      .where(eq(bookings.id, id))
      .returning();
    return updatedBooking;
  }

  // Analytics
  async getAnalytics() {
    const [bookingCount] = await db
      .select({ count: sql`count(*)` })
      .from(bookings);

    const [revenue] = await db
      .select({ total: sql`sum(total_amount)` })
      .from(bookings)
      .where(eq(bookings.status, 'confirmed'));

    const [rideCount] = await db
      .select({ count: sql`count(*)` })
      .from(rides)
      .where(eq(rides.available, true));

    const [userCount] = await db
      .select({ count: sql`count(*)` })
      .from(users);

    return {
      totalBookings: Number(bookingCount.count) || 0,
      totalRevenue: revenue.total?.toString() || '0',
      activeRides: Number(rideCount.count) || 0,
      totalUsers: Number(userCount.count) || 0,
    };
  }
}

export const storage = new DatabaseStorage();
