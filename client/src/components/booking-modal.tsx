import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import type { Ride } from "@shared/schema";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  ride: Ride | null;
  onSubmit: (formData: any) => void;
}

export default function BookingModal({ isOpen, onClose, ride, onSubmit }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    driverAge: "",
    phoneNumber: "",
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
    onSubmit({ ...formData, rideId: ride?.id, totalAmount: calculateTotal() });
  };

  if (!ride) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Complete Your Booking</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 ${step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'} rounded-full flex items-center justify-center text-sm font-medium`}>
                  1
                </div>
                <span className={`ml-2 text-sm font-medium ${step >= 1 ? 'text-primary' : 'text-slate-600'}`}>
                  Details
                </span>
              </div>
              <div className="flex-1 h-1 bg-slate-200 mx-4">
                <div className={`h-1 bg-primary transition-all duration-300 ${step >= 2 ? 'w-2/3' : step >= 1 ? 'w-1/3' : 'w-0'}`}></div>
              </div>
              <div className="flex items-center">
                <div className={`w-8 h-8 ${step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'} rounded-full flex items-center justify-center text-sm font-medium`}>
                  2
                </div>
                <span className={`ml-2 text-sm ${step >= 2 ? 'text-primary font-medium' : 'text-slate-600'}`}>
                  Payment
                </span>
              </div>
              <div className="flex-1 h-1 bg-slate-200 mx-4"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 ${step >= 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'} rounded-full flex items-center justify-center text-sm font-medium`}>
                  3
                </div>
                <span className={`ml-2 text-sm ${step >= 3 ? 'text-primary font-medium' : 'text-slate-600'}`}>
                  Confirm
                </span>
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
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="driverAge">Driver Age</Label>
                <Select 
                  required
                  value={formData.driverAge}
                  onValueChange={(value) => setFormData({ ...formData, driverAge: value })}
                >
                  <SelectTrigger>
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
                />
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
              <Button type="submit" className="flex-1">
                Proceed to Payment
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
