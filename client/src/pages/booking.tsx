import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Users, Cog, Fuel, Star } from "lucide-react";
import type { Ride, InsertBooking } from "@shared/schema";

export default function Booking() {
  const { rideId } = useParams();
  const [, navigate] = useLocation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    driverAge: "",
    phoneNumber: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: ride, isLoading: rideLoading } = useQuery<Ride>({
    queryKey: ["/api/rides", rideId],
    enabled: !!rideId,
  });

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", bookingData);
      return response.json();
    },
    onSuccess: (booking) => {
      toast({
        title: "Booking Created",
        description: "Proceeding to payment...",
      });
      navigate(`/checkout/${booking.id}`);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking",
        variant: "destructive",
      });
    },
  });

  const calculateDays = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    const pickup = new Date(formData.pickupDate);
    const returnDate = new Date(formData.returnDate);
    const diffTime = returnDate.getTime() - pickup.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const calculateTotal = () => {
    if (!ride) return 0;
    const days = calculateDays();
    const dailyRate = parseFloat(ride.pricePerDay);
    const insurance = 15; // per day
    return (dailyRate + insurance) * days;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ride) return;

    const bookingData: InsertBooking = {
      rideId: ride.id,
      userId: "", // Will be set by the server
      pickupDate: new Date(formData.pickupDate),
      returnDate: new Date(formData.returnDate),
      pickupLocation: formData.pickupLocation,
      driverAge: formData.driverAge,
      phoneNumber: formData.phoneNumber,
      totalAmount: calculateTotal().toString(),
    };

    bookingMutation.mutate(bookingData);
  };

  if (authLoading || rideLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded mb-4"></div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-64 bg-slate-200 rounded"></div>
                  <div className="h-6 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-10 bg-slate-200 rounded"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                  <div className="h-10 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Ride Not Found</h1>
            <Button onClick={() => navigate("/rides")}>Browse Rides</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Complete Your Booking</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vehicle Details */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <img
                    src={ride.imageUrl}
                    alt={`${ride.model} for booking`}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{ride.model}</h3>
                  <p className="text-slate-600 mb-4">{ride.category}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-6">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {ride.seats} seats
                    </div>
                    <div className="flex items-center">
                      <Cog className="w-4 h-4 mr-2" />
                      {ride.transmission}
                    </div>
                    <div className="flex items-center">
                      <Fuel className="w-4 h-4 mr-2" />
                      {ride.fuelType}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                      {ride.rating} ({ride.reviewCount})
                    </div>
                  </div>

                  <div className="flex items-center text-slate-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    {ride.location}
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${ride.pricePerDay}</div>
                    <div className="text-sm text-slate-600">per day</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickupDate">Pickup Date</Label>
                        <Input
                          id="pickupDate"
                          type="date"
                          required
                          value={formData.pickupDate}
                          onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                          data-testid="input-pickup-date"
                        />
                      </div>
                      <div>
                        <Label htmlFor="returnDate">Return Date</Label>
                        <Input
                          id="returnDate"
                          type="date"
                          required
                          value={formData.returnDate}
                          onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                          data-testid="input-return-date"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pickupLocation">Pickup Location</Label>
                      <Input
                        id="pickupLocation"
                        type="text"
                        placeholder="Enter pickup address"
                        required
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        data-testid="input-pickup-location"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="driverAge">Driver Age</Label>
                        <Select 
                          required
                          value={formData.driverAge}
                          onValueChange={(value) => setFormData({ ...formData, driverAge: value })}
                        >
                          <SelectTrigger data-testid="select-driver-age">
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="21-25">21-25 years</SelectItem>
                            <SelectItem value="26-35">26-35 years</SelectItem>
                            <SelectItem value="36-65">36-65 years</SelectItem>
                            <SelectItem value="65+">65+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          required
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          data-testid="input-phone-number"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Booking Summary */}
                    <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                      <h3 className="font-semibold text-slate-800" data-testid="text-booking-summary">Booking Summary</h3>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Vehicle:</span>
                        <span data-testid="text-vehicle-model">{ride.model}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Daily Rate:</span>
                        <span data-testid="text-daily-rate">${ride.pricePerDay}/day</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Duration:</span>
                        <span data-testid="text-duration">{calculateDays()} days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Insurance:</span>
                        <span>$15/day</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span data-testid="text-total-amount">${calculateTotal()}</span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate("/rides")}
                        data-testid="button-cancel"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={bookingMutation.isPending}
                        data-testid="button-proceed-payment"
                      >
                        {bookingMutation.isPending ? "Processing..." : "Proceed to Payment"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
