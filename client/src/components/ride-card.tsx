import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Cog, Fuel, Star } from "lucide-react";
import type { Ride } from "@shared/schema";

interface RideCardProps {
  ride: Ride;
}

export default function RideCard({ ride }: RideCardProps) {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const handleBookNow = () => {
    if (!isAuthenticated) {
      window.location.href = "/api/login";
      return;
    }
    navigate(`/booking/${ride.id}`);
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`w-4 h-4 ${i <= numRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow" data-testid={`card-ride-${ride.id}`}>
      <img 
        src={ride.imageUrl} 
        alt={`${ride.model} for ride booking`} 
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-800" data-testid={`text-model-${ride.id}`}>
              {ride.model}
            </h3>
            <p className="text-slate-600" data-testid={`text-category-${ride.id}`}>
              {ride.category}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary" data-testid={`text-price-${ride.id}`}>
              ${ride.pricePerDay}
            </div>
            <div className="text-sm text-slate-600">per day</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
          <div className="flex items-center" data-testid={`text-seats-${ride.id}`}>
            <Users className="w-4 h-4 mr-1" />
            <span>{ride.seats} seats</span>
          </div>
          <div className="flex items-center" data-testid={`text-transmission-${ride.id}`}>
            <Cog className="w-4 h-4 mr-1" />
            <span>{ride.transmission}</span>
          </div>
          <div className="flex items-center" data-testid={`text-fuel-${ride.id}`}>
            <Fuel className="w-4 h-4 mr-1" />
            <span>{ride.fuelType}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex mr-2">
              {renderStars(ride.rating || "0")}
            </div>
            <span className="text-sm text-slate-600" data-testid={`text-rating-${ride.id}`}>
              {ride.rating} ({ride.reviewCount || 0})
            </span>
          </div>
          <Button 
            onClick={handleBookNow}
            data-testid={`button-book-${ride.id}`}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
