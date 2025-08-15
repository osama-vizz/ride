import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { RideSearchFilters } from "@shared/schema";

interface SearchFiltersProps {
  filters?: RideSearchFilters;
  onFiltersChange?: (filters: RideSearchFilters) => void;
}

export default function SearchFilters({ filters = {}, onFiltersChange }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<RideSearchFilters>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof RideSearchFilters, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange?.(localFilters);
  };

  return (
    <Card className="bg-slate-50">
      <CardContent className="p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Car Type</label>
            <Select 
              value={localFilters.carType || "All Types"} 
              onValueChange={(value) => handleFilterChange('carType', value)}
            >
              <SelectTrigger data-testid="select-car-type">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                <SelectItem value="Economy">Economy</SelectItem>
                <SelectItem value="Compact">Compact</SelectItem>
                <SelectItem value="SUV">SUV</SelectItem>
                <SelectItem value="Luxury">Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Price Range</label>
            <Select 
              value={localFilters.priceRange || "Any Price"} 
              onValueChange={(value) => handleFilterChange('priceRange', value)}
            >
              <SelectTrigger data-testid="select-price-range">
                <SelectValue placeholder="Any Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any Price">Any Price</SelectItem>
                <SelectItem value="25-50">$25-50/day</SelectItem>
                <SelectItem value="50-100">$50-100/day</SelectItem>
                <SelectItem value="100+">$100+/day</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Transmission</label>
            <Select 
              value={localFilters.transmission || "Any"} 
              onValueChange={(value) => handleFilterChange('transmission', value)}
            >
              <SelectTrigger data-testid="select-transmission">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Fuel Type</label>
            <Select 
              value={localFilters.fuelType || "Any"} 
              onValueChange={(value) => handleFilterChange('fuelType', value)}
            >
              <SelectTrigger data-testid="select-fuel-type">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Gasoline">Gasoline</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={handleApplyFilters}
              data-testid="button-apply-filters"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
