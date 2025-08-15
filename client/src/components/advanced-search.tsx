import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  SearchIcon, 
  FilterIcon, 
  MapPinIcon, 
  CalendarIcon, 
  UsersIcon,
  DollarSignIcon,
  CarIcon,
  StarIcon,
  RefreshCwIcon
} from "lucide-react";

interface AdvancedSearchProps {
  onSearch: (filters: any) => void;
  isLoading?: boolean;
}

export function AdvancedSearch({ onSearch, isLoading }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    category: '',
    priceRange: [0, 1000],
    seats: '',
    transmission: '',
    fuelType: '',
    rating: '',
    dateRange: {
      from: '',
      to: ''
    }
  });

  const handleSearch = () => {
    const searchFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => {
        if (Array.isArray(value)) return value[0] > 0 || value[1] < 1000;
        if (typeof value === 'object') return value.from || value.to;
        return value !== '';
      })
    );
    onSearch(searchFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      location: '',
      category: '',
      priceRange: [0, 1000],
      seats: '',
      transmission: '',
      fuelType: '',
      rating: '',
      dateRange: {
        from: '',
        to: ''
      }
    };
    setFilters(resetFilters);
    onSearch({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'priceRange') {
        if (value[0] > 0 || value[1] < 1000) count++;
      } else if (key === 'dateRange') {
        if (value.from || value.to) count++;
      } else if (value !== '') {
        count++;
      }
    });
    return count;
  };

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl border-0" data-testid="advanced-search">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <SearchIcon className="w-5 h-5 text-blue-600" />
            Advanced Search
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {getActiveFilterCount()} active
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-700"
            data-testid="button-toggle-filters"
          >
            <FilterIcon className="w-4 h-4 mr-2" />
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="Enter city or area"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              data-testid="input-search-location"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CarIcon className="w-4 h-4" />
              Category
            </Label>
            <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
              <SelectTrigger data-testid="select-category">
                <SelectValue placeholder="Any category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4" />
              Seats
            </Label>
            <Select value={filters.seats} onValueChange={(value) => setFilters({...filters, seats: value})}>
              <SelectTrigger data-testid="select-seats">
                <SelectValue placeholder="Any seats" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 seats</SelectItem>
                <SelectItem value="4">4 seats</SelectItem>
                <SelectItem value="5">5 seats</SelectItem>
                <SelectItem value="7">7 seats</SelectItem>
                <SelectItem value="8">8+ seats</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleSearch}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              data-testid="button-search"
            >
              {isLoading ? (
                <RefreshCwIcon className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <SearchIcon className="w-4 h-4 mr-2" />
              )}
              Search
            </Button>
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="px-3"
              data-testid="button-reset-filters"
            >
              <RefreshCwIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Price Range */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <DollarSignIcon className="w-4 h-4" />
                  Price Range (per day)
                </Label>
                <div className="px-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({...filters, priceRange: value})}
                    max={1000}
                    min={0}
                    step={10}
                    className="mb-2"
                    data-testid="slider-price-range"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Transmission */}
              <div className="space-y-2">
                <Label>Transmission</Label>
                <Select value={filters.transmission} onValueChange={(value) => setFilters({...filters, transmission: value})}>
                  <SelectTrigger data-testid="select-transmission">
                    <SelectValue placeholder="Any transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="cvt">CVT</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fuel Type */}
              <div className="space-y-2">
                <Label>Fuel Type</Label>
                <Select value={filters.fuelType} onValueChange={(value) => setFilters({...filters, fuelType: value})}>
                  <SelectTrigger data-testid="select-fuel-type">
                    <SelectValue placeholder="Any fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Minimum Rating */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4" />
                  Minimum Rating
                </Label>
                <Select value={filters.rating} onValueChange={(value) => setFilters({...filters, rating: value})}>
                  <SelectTrigger data-testid="select-rating">
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4.5">4.5+ stars</SelectItem>
                    <SelectItem value="4.0">4.0+ stars</SelectItem>
                    <SelectItem value="3.5">3.5+ stars</SelectItem>
                    <SelectItem value="3.0">3.0+ stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  From Date
                </Label>
                <Input
                  type="date"
                  value={filters.dateRange.from}
                  onChange={(e) => setFilters({
                    ...filters, 
                    dateRange: {...filters.dateRange, from: e.target.value}
                  })}
                  data-testid="input-date-from"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  To Date
                </Label>
                <Input
                  type="date"
                  value={filters.dateRange.to}
                  onChange={(e) => setFilters({
                    ...filters, 
                    dateRange: {...filters.dateRange, to: e.target.value}
                  })}
                  data-testid="input-date-to"
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}