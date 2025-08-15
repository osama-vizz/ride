import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  CreditCardIcon, 
  PhoneIcon, 
  CarIcon, 
  StarIcon,
  MapPinIcon,
  HeadphonesIcon,
  CheckCircleIcon
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: ShieldCheckIcon,
    title: "Verified Drivers",
    description: "All our drivers are background-checked and certified professionals with years of experience.",
    color: "bg-green-500",
    delay: 0
  },
  {
    id: 2,
    icon: ClockIcon,
    title: "24/7 Availability",
    description: "Round-the-clock service to meet your transportation needs, anytime, anywhere.",
    color: "bg-blue-500",
    delay: 200
  },
  {
    id: 3,
    icon: CreditCardIcon,
    title: "Secure Payments",
    description: "Multiple payment options with bank-level security and instant transaction processing.",
    color: "bg-purple-500",
    delay: 400
  },
  {
    id: 4,
    icon: CarIcon,
    title: "Premium Fleet",
    description: "Luxury and economy vehicles maintained to the highest standards of cleanliness and safety.",
    color: "bg-orange-500",
    delay: 600
  },
  {
    id: 5,
    icon: MapPinIcon,
    title: "GPS Tracking",
    description: "Real-time location tracking for safety and accurate arrival time estimates.",
    color: "bg-red-500",
    delay: 800
  },
  {
    id: 6,
    icon: HeadphonesIcon,
    title: "Customer Support",
    description: "Dedicated customer service team available 24/7 to assist with any questions or concerns.",
    color: "bg-indigo-500",
    delay: 1000
  }
];

export function AnimatedFeatures() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const featureId = parseInt(entry.target.getAttribute('data-feature-id') || '0');
            setVisibleFeatures(prev => [...prev, featureId]);
          }
        });
      },
      { threshold: 0.2 }
    );

    features.forEach((feature) => {
      const element = document.querySelector(`[data-feature-id="${feature.id}"]`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800" data-testid="animated-features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Why Choose Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Premium Service Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the difference with our comprehensive range of services designed to make your journey comfortable, safe, and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            const isVisible = visibleFeatures.includes(feature.id);
            
            return (
              <Card 
                key={feature.id}
                data-feature-id={feature.id}
                className={`group hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg overflow-hidden ${
                  isVisible 
                    ? 'animate-in slide-in-from-bottom-4 fade-in duration-700' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  animationDelay: isVisible ? `${feature.delay}ms` : '0ms',
                  animationFillMode: 'both'
                }}
                data-testid={`feature-${feature.id}`}
              >
                <CardContent className="p-8">
                  <div className="relative mb-6">
                    <div className={`inline-flex p-4 rounded-2xl ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {feature.description}
                  </p>

                  <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <StarIcon className="w-4 h-4 mr-2 fill-current" />
                    Premium Feature
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full px-8 py-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center mr-6">
              <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">100%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">Satisfaction Rate</span>
            </div>
            <div className="border-l border-gray-300 dark:border-gray-600 pl-6">
              <span className="text-lg font-bold text-gray-900 dark:text-white">50,000+</span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">Happy Customers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}