import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { X, Calendar, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Ride, InsertBooking } from "@shared/schema";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  ride: Ride | null;
  onSubmit: (bookingId: string) => void;
}

export default function BookingModal({ isOpen, onClose, ride, onSubmit }: BookingModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    driverAge: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await apiRequest("POST", "/api/bookings", bookingData);
      return response.json();
    },
    onSuccess: (booking) => {
      toast({
        title: "Booking Created Successfully! 🎉",
        description: "Redirecting to payment...",
      });
      onSubmit(booking.id);
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!formData.returnDate) newErrors.returnDate = "Return date is required";
    if (!formData.pickupLocation) newErrors.pickupLocation = "Pickup location is required";
    if (!formData.driverAge) newErrors.driverAge = "Driver age is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    
    if (formData.pickupDate && formData.returnDate) {
      const pickup = new Date(formData.pickupDate);
      const returnDate = new Date(formData.returnDate);
      if (returnDate <= pickup) {
        newErrors.returnDate = "Return date must be after pickup date";
      }
      if (pickup < new Date()) {
        newErrors.pickupDate = "Pickup date cannot be in the past";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!ride) return;
    
    const bookingData = {
      rideId: ride.id,
      pickupDate: new Date(formData.pickupDate),
      returnDate: new Date(formData.returnDate),
      pickupLocation: formData.pickupLocation,
      driverAge: formData.driverAge,
      phoneNumber: formData.phoneNumber,
      totalAmount: calculateTotal().toString(),
    };
    
    bookingMutation.mutate(bookingData);
  };

  if (!ride) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto bg-white border border-slate-200 shadow-lg">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Complete Your Booking</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 bg-white">
          {/* Ride Details */}
          <div className="mb-6 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-4">
              <img src={ride.imageUrl} alt={ride.model} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold text-lg">{ride.model}</h3>
                <p className="text-slate-600">{ride.category} • ${ride.pricePerDay}/day</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pickupDate">Pickup Date</Label>
                <Input
                  id="pickupDate"
                  type="date"
                  required
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  className={errors.pickupDate ? "border-red-500" : ""}
                  data-testid="input-pickup-date"
                />
                {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
              </div>
              <div>
                <Label htmlFor="returnDate">Return Date</Label>
                <Input
                  id="returnDate"
                  type="date"
                  required
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                  className={errors.returnDate ? "border-red-500" : ""}
                  data-testid="input-return-date"
                />
                {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
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
                className={errors.pickupLocation ? "border-red-500" : ""}
                data-testid="input-pickup-location"
              />
              {errors.pickupLocation && <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="driverAge">Driver Age</Label>
                <Select 
                  required
                  value={formData.driverAge}
                  onValueChange={(value) => setFormData({ ...formData, driverAge: value })}
                >
                  <SelectTrigger className={errors.driverAge ? "border-red-500" : ""} data-testid="select-driver-age">
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="21-25">21-25 years</SelectItem>
                    <SelectItem value="26-35">26-35 years</SelectItem>
                    <SelectItem value="36-65">36-65 years</SelectItem>
                    <SelectItem value="65+">65+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.driverAge && <p className="text-red-500 text-sm mt-1">{errors.driverAge}</p>}
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
                  className={errors.phoneNumber ? "border-red-500" : ""}
                  data-testid="input-phone-number"
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-slate-50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-slate-800">Booking Summary</h3>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Vehicle:</span>
                <span>{ride.model}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Daily Rate:</span>
                <span>${ride.pricePerDay}/day</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Duration:</span>
                <span>{calculateDays()} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Insurance:</span>
                <span>$15/day</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={bookingMutation.isPending}
                data-testid="button-proceed-payment"
              >
                {bookingMutation.isPending ? "Creating Booking..." : "Proceed to Payment"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
