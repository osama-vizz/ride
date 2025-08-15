
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Clock, MapPin, Calendar, ShieldCheck, Star, Users, Award, ArrowRight, CheckCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 1.11, 0.81, 0.99],
      },
    },
  };

  return (
    <section className="relative bg-slate-50 py-32 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-slate-200"></div>
      </div>
      
      {/* Floating decoration */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left column - Content */}
          <div className="space-y-12">
            <motion.div className="space-y-10" variants={itemVariants}>
              {/* Trust badge */}
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full shadow-sm"
                variants={itemVariants}
              >
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div className="w-6 h-6 bg-accent rounded-full border-2 border-white flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-700">Trusted by 50,000+ riders</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-bold text-slate-800 ml-1">4.9</span>
                </div>
              </motion.div>
              
              {/* Main heading */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-balance">
                  <span className="block text-slate-900">Premium</span>
                  <span className="block text-primary">
                    Rideshare
                  </span>
                  <span className="block text-slate-700 text-5xl md:text-6xl lg:text-7xl">Experience</span>
                </h1>
                
                <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-2xl leading-relaxed font-body font-medium text-pretty">
                  Discover luxury vehicles and seamless rides. Book premium cars with verified drivers across your city.
                </p>
              </motion.div>

              {/* Feature highlights */}
              <motion.div className="flex flex-wrap gap-6" variants={itemVariants}>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Instant booking</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="font-semibold">Verified drivers</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="font-semibold">24/7 support</span>
                </div>
              </motion.div>

              {/* Enhanced Stats */}
              <motion.div className="grid grid-cols-3 gap-8 pt-4" variants={itemVariants}>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-black text-slate-900 font-display">50K+</div>
                  <div className="text-sm font-semibold text-slate-600 mt-1 uppercase tracking-wide">Happy Customers</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-black text-slate-900 font-display">4.9★</div>
                  <div className="text-sm font-semibold text-slate-600 mt-1 uppercase tracking-wide">Average Rating</div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-black text-slate-900 font-display">24/7</div>
                  <div className="text-sm font-semibold text-slate-600 mt-1 uppercase tracking-wide">Support</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Search Form */}
            <motion.div variants={itemVariants}>
              <Card className="w-full max-w-3xl shadow-2xl border-0 bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-3 font-display">Find Your Perfect Ride</h2>
                    <p className="text-slate-600 font-semibold text-lg">Search and book premium vehicles in seconds</p>
                  </div>
                  
                  <form onSubmit={handleSearch} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <Label htmlFor="location" className="text-sm font-bold text-slate-800 flex items-center uppercase tracking-wide">
                          <MapPin className="w-4 h-4 mr-2 text-primary" />
                          Location
                        </Label>
                        <Input
                          id="location"
                          placeholder="Enter pickup location"
                          value={searchForm.location}
                          onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                          className="h-16 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-2xl transition-all duration-300 hover:shadow-md text-lg font-medium text-slate-900 bg-white/90"
                        />
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="pickupDate" className="text-sm font-bold text-slate-800 flex items-center uppercase tracking-wide">
                          <Calendar className="w-4 h-4 mr-2 text-primary" />
                          Pickup Date
                        </Label>
                        <Input
                          id="pickupDate"
                          type="date"
                          value={searchForm.pickupDate}
                          onChange={(e) => setSearchForm({ ...searchForm, pickupDate: e.target.value })}
                          className="h-16 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-2xl transition-all duration-300 hover:shadow-md text-lg font-medium text-slate-900 bg-white/90"
                        />
                      </div>

                      <div className="space-y-4">
                        <Label htmlFor="returnDate" className="text-sm font-bold text-slate-800 flex items-center uppercase tracking-wide">
                          <Calendar className="w-4 h-4 mr-2 text-primary" />
                          Return Date
                        </Label>
                        <Input
                          id="returnDate"
                          type="date"
                          value={searchForm.returnDate}
                          onChange={(e) => setSearchForm({ ...searchForm, returnDate: e.target.value })}
                          className="h-16 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-2xl transition-all duration-300 hover:shadow-md text-lg font-medium text-slate-900 bg-white/90"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-18 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold text-xl rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl border-0"
                    >
                      <Search className="w-6 h-6 mr-3" />
                      Search Premium Rides
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right column - Enhanced Image */}
          <motion.div className="relative" variants={itemVariants}>
            <div className="relative">
              {/* Main image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=90" 
                  alt="Luxury car interior with premium leather seats" 
                  className="w-full h-[600px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating overlay cards */}
              <motion.div 
                className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50 hidden lg:block max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl">
                    <ShieldCheck className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">Safety First</h3>
                    <p className="text-sm text-slate-600 font-semibold">Verified & insured drivers</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50 hidden lg:block max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
                    <Clock className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">Always On Time</h3>
                    <p className="text-sm text-slate-600 font-semibold">Punctual & reliable service</p>
                  </div>
                </div>
              </motion.div>

              {/* Background decoration */}
              <div className="absolute -z-10 top-8 right-8 w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
