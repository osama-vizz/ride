
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Globe,
  Headphones,
  Shield,
  Zap,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Available 24/7 for urgent support",
      color: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "support@ridesharepro.com",
      description: "We respond within 2 hours",
      color: "from-green-500/10 to-green-600/5",
      iconColor: "text-green-600",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Business Ave, NY 10001",
      description: "Monday - Friday, 9AM - 6PM",
      color: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Support Hours",
      details: "24/7 Premium Support",
      description: "Round-the-clock assistance",
      color: "from-amber-500/10 to-amber-600/5",
      iconColor: "text-amber-600",
    },
  ];

  const supportTypes = [
    {
      icon: Headphones,
      title: "Customer Support",
      description: "Get help with bookings, payments, or general inquiries",
      response: "< 2 hours",
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Report safety concerns or security issues",
      response: "Immediate",
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Interested in becoming a driver or business partner?",
      response: "< 24 hours",
    },
    {
      icon: Zap,
      title: "Technical Support",
      description: "App issues, bugs, or technical difficulties",
      response: "< 4 hours",
    },
  ];

  const offices = [
    {
      city: "New York",
      address: "123 Business Ave, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@ridesharepro.com",
    },
    {
      city: "San Francisco",
      address: "456 Tech Street, SF 94105",
      phone: "+1 (555) 234-5678",
      email: "sf@ridesharepro.com",
    },
    {
      city: "Los Angeles",
      address: "789 Sunset Blvd, LA 90028",
      phone: "+1 (555) 345-6789",
      email: "la@ridesharepro.com",
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
              <MessageSquare className="w-4 h-4" />
              Get In Touch
            </motion.div>
            
            <motion.h1 
              className="font-display text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-slate-900 mb-8"
              variants={itemVariants}
            >
              We're Here
              <span className="block bg-gradient-to-r from-primary via-blue-600 to-accent bg-clip-text text-transparent">
                To Help
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-body mb-12"
              variants={itemVariants}
            >
              Have questions? Need support? Want to partner with us? We'd love to hear from you.
            </motion.p>
            
            <motion.div className="flex items-center justify-center gap-6 text-slate-600" variants={itemVariants}>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="font-semibold">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="font-semibold">Quick Response</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="font-semibold">Expert Team</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-3xl overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl mb-6`}>
                      <info.icon className={`w-8 h-8 ${info.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{info.title}</h3>
                    <p className="text-lg font-semibold text-slate-800 mb-2">{info.details}</p>
                    <p className="text-slate-600">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-2xl bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-10">
                  <div className="mb-8">
                    <h2 className="text-4xl font-black text-slate-900 mb-4 font-display">Send Us a Message</h2>
                    <p className="text-slate-600 text-lg">Fill out the form below and we'll get back to you as soon as possible.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-14 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl bg-white/90 text-lg font-medium"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-14 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl bg-white/90 text-lg font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={handleChange}
                          className="h-14 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl bg-white/90 text-lg font-medium"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="h-14 border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl bg-white/90 text-lg font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us more about your inquiry..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="border-slate-200 focus:border-primary focus:ring-primary/20 rounded-xl bg-white/90 text-lg font-medium resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-bold text-lg rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Support Types */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-6 font-display">How Can We Help?</h2>
                <p className="text-slate-600 text-lg mb-8">Choose the type of support you need for faster assistance.</p>
              </div>
              
              <div className="space-y-4">
                {supportTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white rounded-2xl overflow-hidden cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl group-hover:from-primary/20 group-hover:to-primary/10 transition-colors">
                            <type.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-slate-900 text-lg font-display">{type.title}</h3>
                              <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
                                {type.response}
                              </span>
                            </div>
                            <p className="text-slate-600">{type.description}</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {/* FAQ Link */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl overflow-hidden">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">Frequently Asked Questions</h3>
                  <p className="text-slate-600 mb-4">Find quick answers to common questions.</p>
                  <Button variant="outline" className="bg-white hover:bg-slate-50">
                    View FAQ
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
              <Globe className="w-4 h-4" />
              Our Locations
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 font-display leading-tight">
              Visit Our
              <span className="block text-accent">Offices</span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We have offices in major cities to better serve our customers and partners.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white rounded-3xl overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 font-display">{office.city}</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <p className="text-slate-600">{office.address}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                        <p className="text-slate-600">{office.phone}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                        <p className="text-slate-600">{office.email}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-6 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Get Directions
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
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
