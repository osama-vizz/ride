import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function HeroSection() {
  const [, navigate] = useLocation();
  const [searchForm, setSearchForm] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchForm.location) params.set('location', searchForm.location);
    if (searchForm.pickupDate) params.set('pickupDate', searchForm.pickupDate);
    if (searchForm.returnDate) params.set('returnDate', searchForm.returnDate);
    
    navigate(`/rides?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight">
              Book Your Perfect{" "}
              <span className="text-primary">Ride</span> Today
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Premium vehicles, competitive rates, and seamless booking experience. 
              Find the perfect ride for any occasion.
            </p>
            
            {/* Quick Search Form */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Search</h3>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="pickup-location">Pickup Location</Label>
                      <Input
                        id="pickup-location"
                        type="text"
                        placeholder="Enter city or address"
                        value={searchForm.location}
                        onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                        data-testid="input-search-location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pickup-date">Pickup Date</Label>
                      <Input
                        id="pickup-date"
                        type="date"
                        value={searchForm.pickupDate}
                        onChange={(e) => setSearchForm({ ...searchForm, pickupDate: e.target.value })}
                        data-testid="input-search-pickup-date"
                      />
                    </div>
                    <div>
                      <Label htmlFor="return-date">Return Date</Label>
                      <Input
                        id="return-date"
                        type="date"
                        value={searchForm.returnDate}
                        onChange={(e) => setSearchForm({ ...searchForm, returnDate: e.target.value })}
                        data-testid="input-search-return-date"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button type="submit" className="w-full font-medium" data-testid="button-search">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="relative">
            {/* Hero image of modern car lineup */}
            <img 
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Modern car lineup showcasing premium vehicles" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />
            
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 hidden lg:block">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-stats-customers">50K+</div>
                  <div className="text-sm text-slate-600">Happy Customers</div>
                </div>
                <div className="h-8 w-px bg-slate-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-stats-rating">4.9</div>
                  <div className="text-sm text-slate-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
