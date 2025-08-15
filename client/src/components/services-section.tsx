
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Car,
  Shield,
  Clock,
  Star,
  MapPin,
  CreditCard,
  Smartphone,
  Users,
  Zap,
  Globe,
  Award,
  CheckCircle,
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Car,
      title: "Premium Fleet",
      description: "Access to luxury sedans, SUVs, and electric vehicles maintained to the highest standards.",
      features: ["Mercedes-Benz", "BMW", "Tesla", "Audi"],
      color: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "All drivers undergo comprehensive background checks and vehicle inspections for your security.",
      features: ["Background Checks", "Insurance Coverage", "Real-time Tracking", "Emergency Support"],
      color: "from-green-500/10 to-green-600/5",
      iconColor: "text-green-600",
    },
    {
      icon: Clock,
      title: "On-Demand Service",
      description: "Book instantly or schedule rides in advance. Available 24/7 across all major cities.",
      features: ["Instant Booking", "Advance Scheduling", "24/7 Service", "City Coverage"],
      color: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-600",
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Enjoy complimentary amenities, professional service, and a consistently exceptional ride experience.",
      features: ["WiFi Access", "Phone Chargers", "Refreshments", "Professional Drivers"],
      color: "from-amber-500/10 to-amber-600/5",
      iconColor: "text-amber-600",
    },
    {
      icon: CreditCard,
      title: "Flexible Payments",
      description: "Multiple payment options with transparent pricing and no hidden fees or surge pricing.",
      features: ["Credit Cards", "Digital Wallets", "Corporate Billing", "Fixed Rates"],
      color: "from-rose-500/10 to-rose-600/5",
      iconColor: "text-rose-600",
    },
    {
      icon: Smartphone,
      title: "Smart Technology",
      description: "Intuitive mobile app with real-time tracking, driver communication, and ride history.",
      features: ["iOS & Android", "Real-time GPS", "Driver Chat", "Trip History"],
      color: "from-indigo-500/10 to-indigo-600/5",
      iconColor: "text-indigo-600",
    },
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6 border border-primary/10">
            <Zap className="w-4 h-4" />
            Our Services
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 font-display leading-tight">
            Everything You Need
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              In One Platform
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-body">
            From luxury vehicles to professional drivers, we provide comprehensive transportation solutions that exceed expectations.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-3xl overflow-hidden group">
                <CardContent className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg mb-6">{service.description}</p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-slate-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary/5 via-blue-50/50 to-accent/5 border-0 rounded-3xl overflow-hidden max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl">
                  <Award className="w-12 h-12 text-primary" />
                </div>
              </div>
              
              <h3 className="text-4xl font-black text-slate-900 mb-4 font-display">
                Ready to Experience Premium Transportation?
              </h3>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust RideShare Pro for their transportation needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="h-16 px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Car className="w-5 h-5 mr-2" />
                  Book Your First Ride
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-16 px-8 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-105"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Become a Driver
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-8 mt-8 text-slate-600">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="font-semibold">100+ Cities</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-semibold">50K+ Customers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9 Rating</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
