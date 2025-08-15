import { useState } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import FeaturedRides from "@/components/featured-rides";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Search } from "lucide-react";

export default function Landing() {
  const [, navigate] = useLocation();
  const [searchForm, setSearchForm] = useState({
    location: "",
    pickupDate: "",
    returnDate: "",
  });

  const handleSearch = () => {
    navigate("/rides");
  };

  const handleGetStarted = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop')",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Your Perfect
            <span className="block text-orange-400">Ride Awaits</span>
          </h1>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Book premium vehicles for any occasion. From luxury sedans to spacious SUVs, find the perfect ride for your journey.
          </p>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto p-6 bg-white/95 backdrop-blur-sm">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </label>
                <Input
                  placeholder="City or Airport"
                  value={searchForm.location}
                  onChange={(e) => setSearchForm({...searchForm, location: e.target.value})}
                  data-testid="input-search-location"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Pick-up Date
                </label>
                <Input
                  type="date"
                  value={searchForm.pickupDate}
                  onChange={(e) => setSearchForm({...searchForm, pickupDate: e.target.value})}
                  data-testid="input-search-pickup"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Return Date
                </label>
                <Input
                  type="date"
                  value={searchForm.returnDate}
                  onChange={(e) => setSearchForm({...searchForm, returnDate: e.target.value})}
                  data-testid="input-search-return"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  data-testid="button-search-rides"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Rides
                </Button>
              </div>
            </div>
          </Card>

          <div className="mt-12 flex justify-center gap-8">
            <Button 
              onClick={() => navigate("/rides")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              data-testid="button-browse-rides"
            >
              Browse All Rides
            </Button>
            <Button 
              onClick={handleGetStarted}
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-slate-800 px-8 py-3"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">100+</div>
              <div className="text-slate-300">Premium Vehicles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">50+</div>
              <div className="text-slate-300">Locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">99%</div>
              <div className="text-slate-300">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">24/7</div>
              <div className="text-slate-300">Support</div>
            </div>
          </div>
        </div>
      </div>

      <FeaturedRides />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
