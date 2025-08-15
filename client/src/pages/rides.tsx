import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import SearchFilters from "@/components/search-filters";
import RideCard from "@/components/ride-card";
import Footer from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";
import type { Ride, RideSearchFilters } from "@shared/schema";

export default function Rides() {
  const [filters, setFilters] = useState<RideSearchFilters>({});

  const { data: rides, isLoading } = useQuery<Ride[]>({
    queryKey: ["/api/rides", filters],
  });

  const handleFiltersChange = (newFilters: RideSearchFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Browse Available Rides
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Find the perfect vehicle for your journey from our extensive fleet.
            </p>
          </div>

          <SearchFilters filters={filters} onFiltersChange={handleFiltersChange} />
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                  <Skeleton className="w-full h-48 mb-4" />
                  <Skeleton className="h-6 mb-2" />
                  <Skeleton className="h-4 mb-4 w-2/3" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : rides && rides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rides.map((ride) => (
                <RideCard key={ride.id} ride={ride} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl text-slate-300 mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No rides found</h3>
              <p className="text-slate-600">Try adjusting your search filters to find available rides.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
