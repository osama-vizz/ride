
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Cog, Fuel, Star, MapPin, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import BookingModal from "@/components/booking-modal";
import type { Ride } from "@shared/schema";

interface RideCardProps {
  ride: Ride;
}

export default function RideCard({ ride }: RideCardProps) {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      window.location.href = "/api/login";
      return;
    }
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (bookingId: string) => {
    // Navigate to the checkout page with the booking ID
    navigate(`/checkout/${bookingId}`);
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`w-4 h-4 ${i <= numRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}
        />
      );
    }
    return stars;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      luxury: "bg-purple-600",
      economy: "bg-green-600",
      suv: "bg-blue-600",
      sedan: "bg-slate-600",
      sports: "bg-red-600",
      electric: "bg-emerald-600",
    };
    return colors[category.toLowerCase() as keyof typeof colors] || "bg-slate-600";
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8 }}
        className="group"
      >
        <Card 
          variant="elevated" 
          className="overflow-hidden bg-white border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-slate-300/60 rounded-2xl"
          data-testid={`card-ride-${ride.id}`}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={ride.imageUrl} 
                alt={`${ride.model} for ride booking`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <Badge className={`${getCategoryColor(ride.category)} text-white border-0 px-3 py-1 text-sm font-semibold shadow-lg`}>
                {ride.category}
              </Badge>
            </div>

            {/* Premium indicator */}
            <div className="absolute top-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <Shield className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          </div>

          <CardContent className="p-8">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display group-hover:text-primary transition-colors duration-300">
                  {ride.model}
                </h3>
                <p className="text-slate-600 font-semibold">
                  {ride.category}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black text-primary font-display">
                  ${ride.pricePerDay}
                </div>
                <div className="text-slate-500 font-semibold">per day</div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl transition-colors hover:bg-slate-100" data-testid={`text-seats-${ride.id}`}>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Seats</div>
                  <div className="text-sm font-semibold text-slate-900">{ride.seats}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl transition-colors hover:bg-slate-100" data-testid={`text-transmission-${ride.id}`}>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Cog className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Trans</div>
                  <div className="text-sm font-semibold text-slate-900">{ride.transmission}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl transition-colors hover:bg-slate-100" data-testid={`text-fuel-${ride.id}`}>
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Fuel className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Fuel</div>
                  <div className="text-sm font-semibold text-slate-900">{ride.fuelType}</div>
                </div>
              </div>
            </div>

            {/* Rating and Location */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {renderStars(ride.rating || "0")}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-900" data-testid={`text-rating-${ride.id}`}>
                    {ride.rating}
                  </span>
                  <span className="text-sm text-slate-500">
                    ({ride.reviewCount || 0} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-emerald-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">Available now</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-slate-600 mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{ride.location}</span>
            </div>

            {/* Action Button */}
            <Button 
              onClick={handleBookNow}
              className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              data-testid={`button-book-${ride.id}`}
            >
              <span>Book Now</span>
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </div>
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        ride={ride}
        onSubmit={handleBookingSubmit}
      />
    </>
  );
}
