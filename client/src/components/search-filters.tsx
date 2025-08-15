
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, MapPin, Calendar, DollarSign, Users, Fuel, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchFiltersProps {
  onSearch: (filters: any) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [filters, setFilters] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
    vehicleType: "",
    priceRange: [0, 500],
    transmission: "",
    fuelType: "",
    seats: ""
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update active filters
    const active = Object.entries(newFilters)
      .filter(([k, v]) => {
        if (k === 'priceRange') return v[0] !== 0 || v[1] !== 500;
        return v !== "" && v !== null && v !== undefined;
      })
      .map(([k]) => k);
    setActiveFilters(active);
  };

  const clearFilter = (key: string) => {
    if (key === 'priceRange') {
      handleFilterChange(key, [0, 500]);
    } else {
      handleFilterChange(key, "");
    }
  };

  const clearAllFilters = () => {
    const resetFilters = {
      location: "",
      pickupDate: "",
      returnDate: "",
      vehicleType: "",
      priceRange: [0, 500],
      transmission: "",
      fuelType: "",
      seats: ""
    };
    setFilters(resetFilters);
    setActiveFilters([]);
    onSearch(resetFilters);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const getFilterLabel = (key: string, value: any) => {
    switch (key) {
      case 'priceRange':
        return `$${value[0]} - $${value[1]}`;
      case 'vehicleType':
        return value;
      case 'transmission':
        return value;
      case 'fuelType':
        return value;
      case 'seats':
        return `${value} seats`;
      case 'location':
        return value;
      case 'pickupDate':
        return `Pickup: ${new Date(value).toLocaleDateString()}`;
      case 'returnDate':
        return `Return: ${new Date(value).toLocaleDateString()}`;
      default:
        return value;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Search Card */}
      <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">Find Your Perfect Ride</h2>
          </div>

          {/* Primary Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2 text-slate-700 font-semibold">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="Enter city or airport"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="h-12 border-slate-300 focus:border-primary focus:ring-primary/20 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupDate" className="flex items-center gap-2 text-slate-700 font-semibold">
                <Calendar className="w-4 h-4" />
                Pickup Date
              </Label>
              <Input
                id="pickupDate"
                type="date"
                value={filters.pickupDate}
                onChange={(e) => handleFilterChange("pickupDate", e.target.value)}
                className="h-12 border-slate-300 focus:border-primary focus:ring-primary/20 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="returnDate" className="flex items-center gap-2 text-slate-700 font-semibold">
                <Calendar className="w-4 h-4" />
                Return Date
              </Label>
              <Input
                id="returnDate"
                type="date"
                value={filters.returnDate}
                onChange={(e) => handleFilterChange("returnDate", e.target.value)}
                className="h-12 border-slate-300 focus:border-primary focus:ring-primary/20 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-slate-700 font-semibold">
                Vehicle Type
              </Label>
              <Select value={filters.vehicleType} onValueChange={(value) => handleFilterChange("vehicleType", value)}>
                <SelectTrigger className="h-12 border-slate-300 focus:border-primary focus:ring-primary/20 rounded-xl">
                  <SelectValue placeholder="Any Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 h-10 border-slate-300 hover:border-primary hover:bg-primary/5 rounded-xl"
            >
              <Filter className="w-4 h-4" />
              Advanced Filters
              <motion.div
                animate={{ rotate: showAdvanced ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-4 h-4" />
              </motion.div>
            </Button>

            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                onClick={clearAllFilters}
                className="text-slate-600 hover:text-slate-800"
              >
                Clear All ({activeFilters.length})
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pt-4 border-t border-slate-200">
                  <div className="space-y-3">
                    <Label className="flex items-center gap-2 text-slate-700 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      Price Range (per day)
                    </Label>
                    <div className="px-3">
                      <Slider
                        value={filters.priceRange}
                        onValueChange={(value) => handleFilterChange("priceRange", value)}
                        max={500}
                        min={0}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-slate-600 mt-2">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Settings className="w-4 h-4" />
                      Transmission
                    </Label>
                    <Select value={filters.transmission} onValueChange={(value) => handleFilterChange("transmission", value)}>
                      <SelectTrigger className="h-12 border-slate-300 focus:border-primary focus:ring-primary/20 rounded-xl">
                        <SelectValue placeholder="Any Transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Fuel className="w-4 h-4" />
                      Fuel Type
                    </Label>
                    <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
                      <SelectTrigger className="h-12 border-slate-300 focus:border-primary focus:ring-primary/20 rounded-xl">
                        <SelectValue placeholder="Any Fuel Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="petrol">Petrol</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Users className="w-4 h-4" />
                      Seats
                    </Label>
                    <Select value={filters.seats} onValueChange={(value) => handleFilterChange("seats", value)}>
                      <SelectTrigger className="h-12 border-slate-300 focus:border-primary focus:ring-primary/20 rounded-xl">
                        <SelectValue placeholder="Any Seats" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Seats</SelectItem>
                        <SelectItem value="4">4 Seats</SelectItem>
                        <SelectItem value="5">5 Seats</SelectItem>
                        <SelectItem value="7">7 Seats</SelectItem>
                        <SelectItem value="8">8+ Seats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.map((key) => (
                <Badge
                  key={key}
                  variant="secondary"
                  className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border-primary/20 rounded-full"
                >
                  {getFilterLabel(key, filters[key as keyof typeof filters])}
                  <button
                    onClick={() => clearFilter(key)}
                    className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Vehicles
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
