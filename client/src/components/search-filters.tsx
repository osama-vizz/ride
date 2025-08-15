import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X, DollarSign, Fuel } from "lucide-react";
import type { RideSearchFilters } from "@shared/schema";
import { Label } from "@/components/ui/label";
import { useLocation } from 'wouter';

interface SearchFiltersProps {
  filters?: RideSearchFilters;
  onFiltersChange?: (filters: RideSearchFilters) => void;
}

export default function SearchFilters({ filters = {}, onFiltersChange }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<RideSearchFilters>(filters);
  const [isExpanded, setIsExpanded] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof RideSearchFilters, value: string | undefined) => {
    // Ensure value is undefined if it's "all" or "any" to match backend expectations
    const processedValue = (value === "all" || value === "any") ? undefined : value;
    const newFilters = { ...localFilters, [key]: processedValue };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange?.(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: RideSearchFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(value => value !== undefined && value !== null);

  // Function to handle navigation to About page
  const goToAbout = () => {
    setLocation('/about');
  };

  // Function to handle navigation to Contact page
  const goToContact = () => {
    setLocation('/contact');
  };

  return (
    <div className="w-full">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter Vehicles
            {hasActiveFilters && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </Button>
      </div>

      {/* Filter Card */}
      <Card className={`bg-white shadow-lg border-0 ${isExpanded || 'hidden lg:block'}`}>
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-xl mr-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Filter Vehicles</h3>
                <p className="text-slate-600 text-sm">Find your perfect ride with advanced filters</p>
              </div>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {/* Car Type */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">
                Vehicle Type
              </label>
              <Select 
                value={localFilters.carType || "all"} 
                onValueChange={(value) => handleFilterChange('carType', value)}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-xl font-medium">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                  <SelectItem value="all" className="font-medium">All Types</SelectItem>
                  <SelectItem value="Economy" className="font-medium">Economy</SelectItem>
                  <SelectItem value="Compact" className="font-medium">Compact</SelectItem>
                  <SelectItem value="SUV" className="font-medium">SUV</SelectItem>
                  <SelectItem value="Luxury" className="font-medium">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">
                Price Range
              </label>
              <Select 
                value={localFilters.priceRange || "all"} 
                onValueChange={(value) => handleFilterChange('priceRange', value)}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-xl font-medium">
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                  <SelectItem value="all" className="font-medium">Any Price</SelectItem>
                  <SelectItem value="25-50" className="font-medium">$25-50/day</SelectItem>
                  <SelectItem value="50-100" className="font-medium">$50-100/day</SelectItem>
                  <SelectItem value="100+" className="font-medium">$100+/day</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transmission */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">
                Transmission
              </label>
              <Select 
                value={localFilters.transmission || "all"} 
                onValueChange={(value) => handleFilterChange('transmission', value)}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-xl font-medium">
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                  <SelectItem value="all" className="font-medium">Any Type</SelectItem>
                  <SelectItem value="Automatic" className="font-medium">Automatic</SelectItem>
                  <SelectItem value="Manual" className="font-medium">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Fuel Type */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-800 uppercase tracking-wider">
                Fuel Type
              </label>
              <Select 
                value={localFilters.fuelType || "all"} 
                onValueChange={(value) => handleFilterChange('fuelType', value)}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-500 h-12 rounded-xl font-medium">
                  <SelectValue placeholder="Any Fuel" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                  <SelectItem value="all" className="font-medium">Any Fuel</SelectItem>
                  <SelectItem value="Gasoline" className="font-medium">Gasoline</SelectItem>
                  <SelectItem value="Hybrid" className="font-medium">Hybrid</SelectItem>
                  <SelectItem value="Electric" className="font-medium">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Apply Button */}
            <div className="flex items-end">
              <Button 
                onClick={handleApplyFilters}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200"
                data-testid="button-apply-filters"
              >
                <Search className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-slate-600">Active filters:</span>
                {Object.entries(localFilters).map(([key, value]) => 
                  value !== undefined && value !== "all" ? (
                    <span 
                      key={key}
                      className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {value}
                      <button
                        onClick={() => handleFilterChange(key as keyof RideSearchFilters, "all")}
                        className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ) : null
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons for About and Contact */}
      <div className="mt-8 flex flex-col sm:flex-col gap-4 justify-center">
        <Button
          variant="outline"
          onClick={goToAbout}
          className="border-primary text-primary hover:bg-primary hover:text-white h-12 rounded-xl font-bold text-lg px-8"
        >
          About Us
        </Button>
        <Button
          onClick={goToContact}
          className="bg-primary hover:bg-primary-dark text-white h-12 rounded-xl font-bold text-lg px-8 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}