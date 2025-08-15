import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon, CarIcon, UsersIcon, StarIcon, ClockIcon } from "lucide-react";

const cities = [
  {
    id: 1,
    name: "New York City",
    coordinates: { x: 85, y: 25 },
    vehicles: 145,
    activeRides: 23,
    avgRating: 4.9,
    avgWait: "3 min",
    popular: true
  },
  {
    id: 2,
    name: "Los Angeles",
    coordinates: { x: 15, y: 45 },
    vehicles: 98,
    activeRides: 18,
    avgRating: 4.8,
    avgWait: "4 min",
    popular: true
  },
  {
    id: 3,
    name: "Chicago",
    coordinates: { x: 65, y: 30 },
    vehicles: 76,
    activeRides: 12,
    avgRating: 4.9,
    avgWait: "2 min",
    popular: false
  },
  {
    id: 4,
    name: "Houston",
    coordinates: { x: 55, y: 65 },
    vehicles: 54,
    activeRides: 8,
    avgRating: 4.7,
    avgWait: "5 min",
    popular: false
  },
  {
    id: 5,
    name: "Miami",
    coordinates: { x: 85, y: 80 },
    vehicles: 67,
    activeRides: 15,
    avgRating: 4.8,
    avgWait: "3 min",
    popular: true
  },
  {
    id: 6,
    name: "Seattle",
    coordinates: { x: 8, y: 15 },
    vehicles: 42,
    activeRides: 9,
    avgRating: 4.9,
    avgWait: "4 min",
    popular: false
  }
];

export function InteractiveMapSection() {
  const [selectedCity, setSelectedCity] = useState<typeof cities[0] | null>(null);
  const [hoveredCity, setHoveredCity] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10" data-testid="interactive-map">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            Service Coverage
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Where We Operate
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our growing network of cities with real-time availability and service statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center text-2xl">United States Coverage Map</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl overflow-hidden">
                  {/* Simplified US Map Background */}
                  <div className="absolute inset-0 opacity-30">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path 
                        d="M20,20 L80,20 L85,25 L85,70 L80,75 L20,75 L15,70 L15,25 Z" 
                        fill="currentColor" 
                        className="text-gray-400 dark:text-gray-600"
                      />
                    </svg>
                  </div>

                  {/* City Markers */}
                  {cities.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => setSelectedCity(city)}
                      onMouseEnter={() => setHoveredCity(city.id)}
                      onMouseLeave={() => setHoveredCity(null)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        hoveredCity === city.id ? 'scale-150 z-20' : 'scale-100 z-10'
                      } ${
                        selectedCity?.id === city.id ? 'scale-125 z-30' : ''
                      }`}
                      style={{ 
                        left: `${city.coordinates.x}%`, 
                        top: `${city.coordinates.y}%` 
                      }}
                      data-testid={`city-marker-${city.id}`}
                    >
                      <div className={`relative ${city.popular ? 'animate-pulse' : ''}`}>
                        <div className={`w-4 h-4 rounded-full ${
                          city.popular 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        } shadow-lg`} />
                        {city.popular && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                        )}
                      </div>
                    </button>
                  ))}

                  {/* Hover Tooltip */}
                  {hoveredCity && (
                    <div 
                      className="absolute z-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 border border-gray-200 dark:border-gray-700 pointer-events-none transform -translate-x-1/2 -translate-y-full"
                      style={{ 
                        left: `${cities.find(c => c.id === hoveredCity)?.coordinates.x}%`, 
                        top: `${(cities.find(c => c.id === hoveredCity)?.coordinates.y || 0) - 5}%` 
                      }}
                    >
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {cities.find(c => c.id === hoveredCity)?.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Click for details
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* City Details Panel */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
                  City Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCity ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {selectedCity.name}
                        {selectedCity.popular && (
                          <Badge className="ml-2 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                            Popular
                          </Badge>
                        )}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <CarIcon className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Vehicles</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{selectedCity.vehicles}</div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <UsersIcon className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Rides</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{selectedCity.activeRides}</div>
                      </div>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <StarIcon className="w-4 h-4 text-yellow-600 mr-2" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rating</span>
                        </div>
                        <div className="text-2xl font-bold text-yellow-600">{selectedCity.avgRating}</div>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          <ClockIcon className="w-4 h-4 text-purple-600 mr-2" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Avg Wait</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">{selectedCity.avgWait}</div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Book Ride in {selectedCity.name}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Click on a city marker to view details
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Service Summary */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Service Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Cities:</span>
                    <span className="font-bold">{cities.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Vehicles:</span>
                    <span className="font-bold">{cities.reduce((sum, city) => sum + city.vehicles, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Rides:</span>
                    <span className="font-bold">{cities.reduce((sum, city) => sum + city.activeRides, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Rating:</span>
                    <span className="font-bold">
                      {(cities.reduce((sum, city) => sum + city.avgRating, 0) / cities.length).toFixed(1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}