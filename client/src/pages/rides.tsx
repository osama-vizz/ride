import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/navigation";
import { AdvancedSearch } from "@/components/advanced-search";
import { RideComparison } from "@/components/ride-comparison";
import RideCard from "@/components/ride-card";
import Footer from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Filter, Grid3X3, List, Sparkles, TrendingUp, Car } from "lucide-react";
import type { Ride, RideSearchFilters } from "@shared/schema";

export default function Rides() {
  const [filters, setFilters] = useState<RideSearchFilters>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price' | 'rating' | 'newest'>('rating');
  const [isVisible, setIsVisible] = useState(false);
  const [comparisonRides, setComparisonRides] = useState<Ride[]>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { data: rides, isLoading, error } = useQuery<Ride[]>({
    queryKey: ["/api/rides", filters],
  });

  const sortedRides = rides?.sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay);
      case 'rating':
        return parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
      case 'newest':
        return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
      default:
        return 0;
    }
  }) || [];

  const handleFiltersChange = (newFilters: RideSearchFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (searchFilters: any) => {
    setFilters(searchFilters);
  };

  const handleAddToComparison = (ride: Ride) => {
    if (comparisonRides.find(r => r.id === ride.id)) return;
    if (comparisonRides.length >= 4) {
      alert('You can compare maximum 4 vehicles at a time');
      return;
    }
    setComparisonRides([...comparisonRides, ride]);
  };

  const handleRemoveFromComparison = (rideId: string) => {
    setComparisonRides(comparisonRides.filter(r => r.id !== rideId));
  };

  const handleBookRide = (ride: Ride) => {
    // Navigate to booking page
    window.location.href = `/booking?rideId=${ride.id}`;
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => 
      value !== '' && value !== null && value !== undefined
    ).length;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Navigation />
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-500/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-500/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                Browse Available Rides
              </h1>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Find the perfect vehicle for your journey from our extensive fleet of premium rides.
            </p>
            {rides && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center justify-center gap-6 mt-8"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg">
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{rides.length} Premium Rides</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Starting from $59</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <AdvancedSearch onSearch={handleSearch} isLoading={isLoading} />
          </motion.div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter & Sort Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          >
            <div className="flex items-center gap-4">
              <Card className="p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Filter className="w-5 h-5" />
                  <span className="text-sm font-medium">Filters Active:</span>
                  <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                    {getActiveFilterCount()}
                  </Badge>
                </div>
              </Card>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2 h-10 w-10"
                  data-testid="button-grid-view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2 h-10 w-10"
                  data-testid="button-list-view"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as 'price' | 'rating' | 'newest')}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                data-testid="select-sort-by"
              >
                <option value="rating">Highest Rated</option>
                <option value="price">Price: Low to High</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </motion.div>

          {/* Comparison Section */}
          {comparisonRides.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <RideComparison 
                rides={comparisonRides}
                onRemoveFromComparison={handleRemoveFromComparison}
                onBookRide={handleBookRide}
              />
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    <Skeleton className="w-full aspect-[4/3] bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600" />
                    <div className="p-6 space-y-4">
                      <div className="space-y-3">
                        <Skeleton className="h-8 w-3/4 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg" />
                        <Skeleton className="h-5 w-1/2 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg" />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3].map((j) => (
                          <Skeleton key={j} className="h-16 rounded-xl bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600" />
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-6 w-24 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg" />
                        <Skeleton className="h-5 w-20 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 rounded-lg" />
                      </div>
                      <Skeleton className="h-14 w-full rounded-xl bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Car className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">Oops! Something went wrong</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">We couldn't load the available rides. Please try again.</p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Retry
                </Button>
              </motion.div>
            ) : sortedRides && sortedRides.length > 0 ? (
              <motion.div 
                key="rides"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1 max-w-4xl mx-auto'
                }`}
              >
                {sortedRides.map((ride, index) => (
                  <motion.div
                    key={ride.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    className="transform transition-all duration-300"
                  >
                    <RideCard 
                      ride={ride} 
                      onAddToComparison={() => handleAddToComparison(ride)}
                      isInComparison={comparisonRides.some(r => r.id === ride.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Car className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">No rides found</h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                  Try adjusting your search filters to discover amazing rides.
                </p>
                <Button 
                  onClick={() => setFilters({})}
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats Section */}
      {sortedRides && sortedRides.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-slate-800 py-16 border-t border-slate-200 dark:border-slate-700"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {sortedRides.length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Available Rides</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  ${Math.min(...sortedRides.map(r => parseFloat(r.pricePerDay)))}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Starting From</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {(sortedRides.reduce((acc, r) => acc + parseFloat(r.rating || '0'), 0) / sortedRides.length).toFixed(1)}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Avg Rating</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {[...new Set(sortedRides.map(r => r.location))].length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Cities</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
