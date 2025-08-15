import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Clock, MapPin, Calendar } from "lucide-react";

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
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Content */}
          <div className="space-y-10 animate-fadeIn">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <Clock className="w-4 h-4 mr-2" />
                Available 24/7
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] text-balance">
                Premium
                <span className="text-primary block bg-gradient-primary bg-clip-text text-transparent">RideShare</span>
                Experience
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-lg leading-relaxed text-pretty">
                Discover luxury vehicles and seamless rides. Book premium cars with trusted drivers in your area.
              </p>
            </div>

            {/* Search Form */}
            <Card variant="elevated" className="w-full max-w-2xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-slideUp">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">Find Your Perfect Ride</h2>
                  <p className="text-gray-600">Search and book in seconds</p>
                </div>
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <Label htmlFor="location" className="text-sm font-semibold text-gray-800 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="Where to?"
                        value={searchForm.location}
                        onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                        className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="pickupDate" className="text-sm font-semibold text-gray-800 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        Pickup Date
                      </Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        value={searchForm.pickupDate}
                        onChange={(e) => setSearchForm({ ...searchForm, pickupDate: e.target.value })}
                        className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="returnDate" className="text-sm font-semibold text-gray-800 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        Return Date
                      </Label>
                      <Input
                        id="returnDate"
                        type="date"
                        value={searchForm.returnDate}
                        onChange={(e) => setSearchForm({ ...searchForm, returnDate: e.target.value })}
                        className="h-12 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-200"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-primary hover:shadow-xl text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Available Rides
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 gap-6 animate-slideUp">
              <div className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="w-3 h-3 bg-gradient-accent rounded-full"></div>
                <div>
                  <div className="font-semibold text-gray-900">50,000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <div className="font-semibold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative animate-slideInRight">
            <img 
              src="https://images.unsplash.com/photo-1580273936551-c7848b599981?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Luxury car interior view" 
              className="rounded-xl shadow-2xl w-full h-auto"
            />

            {/* Floating card for key feature */}
            <div className="absolute -bottom-8 -right-8 bg-white/80 rounded-xl shadow-xl p-6 backdrop-blur-sm border border-white/30 hidden lg:block">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-primary/10 rounded-full">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Safety First</h3>
                  <p className="text-sm text-gray-600">Your security is our priority.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}