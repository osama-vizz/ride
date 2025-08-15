
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Clock, MapPin, Calendar, ShieldCheck, Star, Users, Award } from "lucide-react";

export default function HeroSection() {
  const [, navigate] = useLocation();
  const [searchForm, setSearchForm] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-mesh-gradient"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Content */}
          <div className={`space-y-10 transition-all duration-1000 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
            <div className="space-y-8">
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 text-primary rounded-full text-sm font-semibold mb-6 border border-primary/20 backdrop-blur-sm animate-shimmer">
                <Clock className="w-4 h-4 mr-2 animate-bounce-gentle" />
                Available 24/7 • Premium Service
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] text-balance">
                <span className="block animate-fadeIn">Premium</span>
                <span className="block text-gradient animate-gradient font-black" style={{ animationDelay: '0.2s' }}>
                  RideShare
                </span>
                <span className="block text-gray-700" style={{ animationDelay: '0.4s' }}>Experience</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-lg leading-relaxed text-pretty font-medium animate-slideUp" style={{ animationDelay: '0.6s' }}>
                Discover luxury vehicles and seamless rides. Book premium cars with trusted drivers in your area.
              </p>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-6 animate-slideUp" style={{ animationDelay: '0.8s' }}>
                <div className="flex flex-col items-center p-6 glass-card rounded-2xl card-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mb-3 animate-float">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-2xl text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600 font-medium">Happy Customers</div>
                </div>
                
                <div className="flex flex-col items-center p-6 glass-card rounded-2xl card-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-3 animate-float" style={{ animationDelay: '0.5s' }}>
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-2xl text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600 font-medium">Average Rating</div>
                </div>
                
                <div className="flex flex-col items-center p-6 glass-card rounded-2xl card-hover">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center mb-3 animate-float" style={{ animationDelay: '1s' }}>
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div className="font-bold text-2xl text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600 font-medium">Premium Support</div>
                </div>
              </div>
            </div>

            {/* Enhanced Search Form */}
            <Card className={`w-full max-w-2xl shadow-2xl border-0 glass-card rounded-3xl card-hover animate-scaleIn`} style={{ animationDelay: '1s' }}>
              <CardContent className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 text-gradient">Find Your Perfect Ride</h2>
                  <p className="text-gray-600 font-medium">Search and book in seconds</p>
                </div>
                
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="location" className="text-sm font-bold text-gray-800 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-primary animate-bounce-gentle" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="Where to?"
                        value={searchForm.location}
                        onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                        className="h-14 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-2xl transition-all duration-300 hover:shadow-lg font-medium text-gray-900 bg-white/90 backdrop-blur-sm"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="pickupDate" className="text-sm font-bold text-gray-800 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary animate-bounce-gentle" style={{ animationDelay: '0.2s' }} />
                        Pickup Date
                      </Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        value={searchForm.pickupDate}
                        onChange={(e) => setSearchForm({ ...searchForm, pickupDate: e.target.value })}
                        className="h-14 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-2xl transition-all duration-300 hover:shadow-lg font-medium text-gray-900 bg-white/90 backdrop-blur-sm"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="returnDate" className="text-sm font-bold text-gray-800 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary animate-bounce-gentle" style={{ animationDelay: '0.4s' }} />
                        Return Date
                      </Label>
                      <Input
                        id="returnDate"
                        type="date"
                        value={searchForm.returnDate}
                        onChange={(e) => setSearchForm({ ...searchForm, returnDate: e.target.value })}
                        className="h-14 border-gray-200 focus:border-primary focus:ring-primary/20 rounded-2xl transition-all duration-300 hover:shadow-lg font-medium text-gray-900 bg-white/90 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-16 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold text-lg rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl border-0 animate-gradient"
                  >
                    <Search className="w-6 h-6 mr-3 animate-bounce-gentle" />
                    Search Available Rides
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Enhanced Image */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1580273936551-c7848b599981?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Luxury car interior view" 
                className="rounded-3xl shadow-2xl w-full h-auto card-hover"
              />
              
              {/* Floating overlay cards */}
              <div className="absolute -top-6 -left-6 glass-card rounded-2xl shadow-xl p-6 backdrop-blur-sm border border-white/30 hidden lg:block animate-float">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-accent/20 to-accent/10 rounded-full">
                    <ShieldCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Safety First</h3>
                    <p className="text-sm text-gray-600 font-medium">Verified drivers</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl shadow-xl p-6 backdrop-blur-sm border border-white/30 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">On Time</h3>
                    <p className="text-sm text-gray-600 font-medium">Always punctual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
