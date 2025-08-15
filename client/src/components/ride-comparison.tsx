import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Users, Cog, Fuel, Star, DollarSign, Calendar } from "lucide-react";
import type { Ride } from "@shared/schema";

interface RideComparisonProps {
  rides: Ride[];
  onRemoveFromComparison: (rideId: string) => void;
  onBookRide: (ride: Ride) => void;
}

export function RideComparison({ rides, onRemoveFromComparison, onBookRide }: RideComparisonProps) {
  if (rides.length === 0) return null;

  const comparisonFeatures = [
    { key: 'pricePerDay', label: 'Price per Day', icon: DollarSign, format: (value: string) => `$${value}` },
    { key: 'seats', label: 'Seats', icon: Users, format: (value: string) => value },
    { key: 'transmission', label: 'Transmission', icon: Cog, format: (value: string) => value },
    { key: 'fuelType', label: 'Fuel Type', icon: Fuel, format: (value: string) => value },
    { key: 'rating', label: 'Rating', icon: Star, format: (value: string) => `${value}/5` },
  ];

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl border-0" data-testid="ride-comparison">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Compare Rides</span>
            <Badge variant="secondary">{rides.length} selected</Badge>
          </div>
          <span className="text-sm text-gray-500">Select up to 4 vehicles</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-w-max">
            {rides.map((ride) => (
              <div key={ride.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 relative min-w-[280px]">
                {/* Remove button */}
                <button
                  onClick={() => onRemoveFromComparison(ride.id)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  data-testid={`button-remove-comparison-${ride.id}`}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Vehicle image */}
                <div className="mb-4">
                  <img 
                    src={ride.imageUrl} 
                    alt={ride.model}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>

                {/* Vehicle name */}
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                  {ride.model}
                </h3>
                
                <Badge className="mb-4" variant="outline">
                  {ride.category}
                </Badge>

                {/* Comparison features */}
                <div className="space-y-3 mb-6">
                  {comparisonFeatures.map((feature) => {
                    const Icon = feature.icon;
                    const value = ride[feature.key as keyof Ride] as string;
                    return (
                      <div key={feature.key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{feature.label}</span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {feature.format(value || '0')}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Book button */}
                <Button 
                  onClick={() => onBookRide(ride)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  data-testid={`button-book-comparison-${ride.id}`}
                >
                  Book This Ride
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison summary */}
        {rides.length > 1 && (
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Quick Comparison</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Price Range:</span>
                <div className="font-semibold text-gray-900 dark:text-white">
                  ${Math.min(...rides.map(r => parseFloat(r.pricePerDay)))} - ${Math.max(...rides.map(r => parseFloat(r.pricePerDay)))}
                </div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Avg Rating:</span>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {(rides.reduce((sum, r) => sum + parseFloat(r.rating || '0'), 0) / rides.length).toFixed(1)}/5
                </div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Seat Range:</span>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {Math.min(...rides.map(r => parseInt(r.seats)))} - {Math.max(...rides.map(r => parseInt(r.seats)))} seats
                </div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Best Value:</span>
                <div className="font-semibold text-blue-600">
                  {rides.reduce((best, current) => 
                    parseFloat(current.pricePerDay) < parseFloat(best.pricePerDay) ? current : best
                  ).model}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}