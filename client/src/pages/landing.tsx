import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Navigation from "@/components/navigation";
import FeaturedRides from "@/components/featured-rides";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Search, Star, Users, Shield, Clock } from "lucide-react";

export default function Landing() {
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
      <div className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out parallax"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop')",
            transform: 'scale(1.1)'
          }}
        >
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-transparent animate-gradient"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-orange-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-green-500/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>

        {/* Content */}
        <div className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="animate-fadeIn">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Your Perfect
              <span className="block bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent animate-gradient">Ride Awaits</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Book premium vehicles for any occasion. From luxury sedans to spacious SUVs, find the perfect ride for your journey with style and comfort.
            </p>
          </div>

          {/* Search Form */}
          <Card className={`max-w-5xl mx-auto p-8 glass-card border-white/20 shadow-2xl transition-all duration-700 ease-out animate-scaleIn`} style={{ animationDelay: '0.4s' }}>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-3 group">
                <label className="text-sm font-semibold text-slate-700 flex items-center transition-colors group-focus-within:text-blue-600">
                  <MapPin className="w-5 h-5 mr-2 transition-colors group-focus-within:text-blue-600" />
                  Location
                </label>
                <Input
                  placeholder="City or Airport"
                  value={searchForm.location}
                  onChange={(e) => setSearchForm({...searchForm, location: e.target.value})}
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                  data-testid="input-search-location"
                />
              </div>
              
              <div className="space-y-3 group">
                <label className="text-sm font-semibold text-slate-700 flex items-center transition-colors group-focus-within:text-blue-600">
                  <Calendar className="w-5 h-5 mr-2 transition-colors group-focus-within:text-blue-600" />
                  Pick-up Date
                </label>
                <Input
                  type="date"
                  value={searchForm.pickupDate}
                  onChange={(e) => setSearchForm({...searchForm, pickupDate: e.target.value})}
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                  data-testid="input-search-pickup"
                />
              </div>
              
              <div className="space-y-3 group">
                <label className="text-sm font-semibold text-slate-700 flex items-center transition-colors group-focus-within:text-blue-600">
                  <Calendar className="w-5 h-5 mr-2 transition-colors group-focus-within:text-blue-600" />
                  Return Date
                </label>
                <Input
                  type="date"
                  value={searchForm.returnDate}
                  onChange={(e) => setSearchForm({...searchForm, returnDate: e.target.value})}
                  className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300"
                  data-testid="input-search-return"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-pulse-glow"
                  size="lg"
                  data-testid="button-search-rides"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search Rides
                </Button>
              </div>
            </div>
          </Card>

          <div className={`mt-16 flex flex-col sm:flex-row justify-center gap-6 transition-all duration-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.6s' }}>
            <Button 
              onClick={() => navigate("/rides")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              size="lg"
              data-testid="button-browse-rides"
            >
              Browse All Rides
            </Button>
            <Button 
              onClick={handleGetStarted}
              variant="outline" 
              className="border-2 border-white/80 text-white hover:bg-white hover:text-slate-800 px-10 py-4 text-lg backdrop-blur-sm shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              size="lg"
              data-testid="button-get-started"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-slideUp">Why Choose RideShare Pro?</h2>
            <p className="text-xl text-slate-300 animate-slideUp" style={{ animationDelay: '0.2s' }}>Trusted by thousands of customers worldwide</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="animate-scaleIn card-hover-lift p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text mb-2">100+</div>
              <div className="text-slate-300 font-medium">Premium Vehicles</div>
            </div>
            <div className="animate-scaleIn card-hover-lift p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text mb-2">50+</div>
              <div className="text-slate-300 font-medium">Locations</div>
            </div>
            <div className="animate-scaleIn card-hover-lift p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text mb-2">99%</div>
              <div className="text-slate-300 font-medium">Customer Satisfaction</div>
            </div>
            <div className="animate-scaleIn card-hover-lift p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text mb-2">24/7</div>
              <div className="text-slate-300 font-medium">Support</div>
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
