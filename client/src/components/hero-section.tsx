import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to rides with search query
      window.location.href = `/rides?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      data-testid="hero-section"
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-white leading-tight">
            Your Perfect
            <br />
            <span 
              className="bg-gradient-to-r from-coral-400 via-coral-300 to-coral-500 bg-clip-text text-transparent font-bold"
              style={{ 
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E8E, #FFA8A8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Ride Awaits
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto font-medium">
            Book premium vehicles for any occasion. From luxury sedans to spacious SUVs, find the perfect ride for your journey with style and comfort.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 max-w-3xl mx-auto">
            <Link href="/rides">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-xl transform hover:scale-105 transition-all duration-200 min-w-[200px]"
                data-testid="button-browse-rides"
              >
                Browse All Rides
              </Button>
            </Link>
            
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="flex items-center bg-white/95 backdrop-blur-md rounded-full border border-white/20 px-6 py-4 shadow-2xl">
                <SearchIcon className="h-5 w-5 text-gray-500 mr-3" />
                <Input
                  placeholder="Search destination, car type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 bg-transparent text-gray-700 placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 font-medium flex-1"
                  data-testid="input-hero-search"
                />
              </div>
            </form>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-300">Premium Cars</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300">Cities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-2">4.8</div>
              <div className="text-gray-300">Rating</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-white/35 rounded-full animate-pulse delay-800"></div>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none"></div>
    </section>
  );
}