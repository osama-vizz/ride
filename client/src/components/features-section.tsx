
import { Shield, Clock, Smartphone, Star, Users, Award, CheckCircle, Zap, Heart, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Safety & Security",
      description: "All drivers are thoroughly vetted with background checks, vehicle inspections, and real-time tracking for your peace of mind.",
      color: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock premium service with instant booking and dedicated customer support whenever you need us.",
      color: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-600",
    },
    {
      icon: Smartphone,
      title: "Seamless Booking",
      description: "Intuitive mobile-first design with one-tap booking, real-time updates, and effortless payment processing.",
      color: "from-emerald-500/10 to-emerald-600/5",
      iconColor: "text-emerald-600",
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Luxury vehicles maintained to the highest standards with professional drivers committed to exceptional service.",
      color: "from-amber-500/10 to-amber-600/5",
      iconColor: "text-amber-600",
    },
    {
      icon: Users,
      title: "Community Trust",
      description: "Join thousands of satisfied customers who rely on our platform for safe, comfortable, and reliable transportation.",
      color: "from-rose-500/10 to-rose-600/5",
      iconColor: "text-rose-600",
    },
    {
      icon: Globe,
      title: "Wide Coverage",
      description: "Extensive network covering major cities and suburbs with competitive pricing and transparent fare structure.",
      color: "from-indigo-500/10 to-indigo-600/5",
      iconColor: "text-indigo-600",
    },
  ];

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
    hidden: { opacity: 0, y: 30 },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-semibold mb-6 border border-primary/10">
            <Zap className="w-4 h-4" />
            Why Choose RideShare Pro
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 font-display leading-tight">
            Built for Your
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Peace of Mind
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-body">
            Experience the perfect blend of luxury, safety, and convenience with our premium rideshare platform designed around your needs.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="h-full p-8 bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-slate-300/60 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed font-body text-lg">
                  {feature.description}
                </p>

                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.02] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-8 p-8 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-3xl border border-slate-200/60">
            <div className="flex -space-x-2">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent/80 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="text-left">
              <div className="text-2xl font-bold text-slate-900 font-display">Join 50,000+ Happy Riders</div>
              <div className="text-slate-600 font-semibold">Experience premium transportation today</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
