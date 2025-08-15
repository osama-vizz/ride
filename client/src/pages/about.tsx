
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Clock,
  Users,
  Award,
  Target,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  Quote,
  Trophy,
  Globe,
  Zap,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const stats = [
    { number: "50,000+", label: "Happy Customers", icon: Users },
    { number: "500+", label: "Premium Vehicles", icon: Shield },
    { number: "100+", label: "Cities Covered", icon: Globe },
    { number: "4.9/5", label: "Average Rating", icon: Star },
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Every driver is thoroughly vetted, insured, and trained to provide the safest ride experience.",
      color: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600",
    },
    {
      icon: Heart,
      title: "Customer Centric",
      description: "Your satisfaction is our top priority. We go above and beyond to exceed your expectations.",
      color: "from-red-500/10 to-red-600/5",
      iconColor: "text-red-600",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in vehicle quality, service delivery, and customer support.",
      color: "from-amber-500/10 to-amber-600/5",
      iconColor: "text-amber-600",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge technology meets traditional hospitality to create seamless ride experiences.",
      color: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-600",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Chief Executive Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e1?w=300&h=300&fit=crop&crop=faces",
      description: "Leading the vision with 15+ years in transportation tech.",
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces",
      description: "Building scalable platforms that connect millions of riders.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=faces",
      description: "Ensuring seamless operations across all our markets.",
    },
  ];

  const testimonials = [
    {
      quote: "RideShare Pro has completely transformed how I travel. The reliability and quality of service is unmatched.",
      author: "Jessica Williams",
      role: "Business Executive",
      rating: 5,
    },
    {
      quote: "As someone who travels frequently, I can confidently say this is the best rideshare service available.",
      author: "David Park",
      role: "Consultant",
      rating: 5,
    },
    {
      quote: "The attention to detail and premium experience makes every ride feel special. Highly recommended!",
      author: "Maria Garcia",
      role: "Marketing Director",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-8 border border-primary/20"
              variants={itemVariants}
            >
              <Trophy className="w-4 h-4" />
              About RideShare Pro
            </motion.div>
            
            <motion.h1 
              className="font-display text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-slate-900 mb-8"
              variants={itemVariants}
            >
              Redefining
              <span className="block bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
                Transportation
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-body mb-12"
              variants={itemVariants}
            >
              We're on a mission to make premium transportation accessible, reliable, and delightful for everyone, everywhere.
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row gap-6 justify-center" variants={itemVariants}>
              <Button 
                size="lg" 
                className="h-16 px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
              >
                Join Our Team
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-8 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-105"
              >
                Our Story
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-5xl lg:text-6xl font-black text-slate-900 mb-2 font-display">{stat.number}</div>
                <div className="text-lg font-semibold text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
                <Target className="w-4 h-4" />
                Our Story
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 font-display leading-tight">
                Built on Trust,
                <span className="block text-accent">Driven by Excellence</span>
              </h2>
              
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Founded in 2020, RideShare Pro emerged from a simple yet powerful vision: to create a rideshare experience that doesn't just meet expectations, but consistently exceeds them.
                </p>
                <p>
                  What started as a small team of passionate innovators has grown into a trusted platform serving thousands of customers across major cities, all while maintaining our commitment to safety, quality, and exceptional service.
                </p>
                <p>
                  Today, we're proud to be the premium choice for discerning travelers who value reliability, comfort, and peace of mind in their transportation experience.
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-8">
                <CheckCircle className="w-6 h-6 text-accent" />
                <span className="font-semibold text-slate-700">Verified by 50,000+ satisfied customers</span>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=90" 
                  alt="Team collaboration" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -z-10 top-8 right-8 w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              Our Values
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 font-display leading-tight">
              What Drives Us
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Every Day
              </span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-3xl overflow-hidden">
                  <CardContent className="p-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl mb-6`}>
                      <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              Our Leadership
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 font-display leading-tight">
              Meet the Team
              <span className="block text-accent">Behind the Vision</span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-32 h-32 rounded-2xl mx-auto object-cover shadow-lg"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display">{member.name}</h3>
                    <p className="text-primary font-semibold mb-4">{member.role}</p>
                    <p className="text-slate-600 leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              <Quote className="w-4 h-4" />
              Testimonials
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 font-display leading-tight">
              What Our Customers
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Are Saying
              </span>
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-primary/20 mb-4" />
                    <p className="text-slate-700 text-lg leading-relaxed mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-bold text-slate-900 font-display">{testimonial.author}</p>
                      <p className="text-slate-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
