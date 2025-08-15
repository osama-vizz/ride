import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import SearchFilters from "./search-filters";
import RideCard from "./ride-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import type { Ride } from "@shared/schema";

export default function FeaturedRides() {
  const [, navigate] = useLocation();

  const { data: rides, isLoading } = useQuery<Ride[]>({
    queryKey: ["/api/rides"],
  });

  // Show first 3 rides as featured
  const featuredRides = rides?.slice(0, 3) || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Featured Rides</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover our most popular vehicles, carefully selected for comfort, reliability, and style.
          </p>
        </div>

        {/* Search Filters */}
        <SearchFilters />

        {/* Featured Rides Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6">
                <Skeleton className="w-full h-48 mb-4" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="text-right space-y-1">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredRides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {featuredRides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl text-slate-300 mb-4">🚗</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No rides available</h3>
            <p className="text-slate-600">Check back later for available vehicles.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/rides")}
            data-testid="button-view-all-rides"
          >
            View All Rides
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
