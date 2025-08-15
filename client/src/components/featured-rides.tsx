import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
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
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6 border border-primary/10">
            Featured Collection
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-display">Premium Vehicles</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most popular vehicles, carefully selected for comfort, reliability, and exceptional style.
          </p>
        </div>

        {/* Featured Rides Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200/60">
                <Skeleton className="w-full h-48 mb-6 rounded-xl" />
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="text-right space-y-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-24 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : featuredRides.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="text-3xl text-slate-400">🚗</div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 font-display">No vehicles available</h3>
            <p className="text-slate-600 text-lg">Check back later for our premium vehicle collection.</p>
          </div>
        )}

        <div className="text-center mt-16">
          <Button
            size="lg"
            onClick={() => navigate("/rides")}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            data-testid="button-view-all-rides"
          >
            Explore All Vehicles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
