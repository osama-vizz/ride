import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUpIcon, 
  UsersIcon, 
  MapPinIcon, 
  StarIcon,
  CarIcon,
  ClockIcon,
  ShieldCheckIcon,
  CreditCardIcon
} from "lucide-react";

const stats = [
  {
    id: 1,
    icon: CarIcon,
    value: "500+",
    label: "Premium Vehicles",
    description: "From luxury sedans to spacious SUVs",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    id: 2,
    icon: UsersIcon,
    value: "50K+",
    label: "Happy Customers",
    description: "Trusted by riders nationwide",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-900/20"
  },
  {
    id: 3,
    icon: MapPinIcon,
    value: "25+",
    label: "Cities Covered",
    description: "Available in major metropolitan areas",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20"
  },
  {
    id: 4,
    icon: StarIcon,
    value: "4.9",
    label: "Average Rating",
    description: "Consistently excellent service",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
  },
  {
    id: 5,
    icon: ClockIcon,
    value: "24/7",
    label: "Service Hours",
    description: "Available whenever you need us",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20"
  },
  {
    id: 6,
    icon: ShieldCheckIcon,
    value: "100%",
    label: "Insured Rides",
    description: "Full coverage on every journey",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50 dark:bg-teal-900/20"
  },
  {
    id: 7,
    icon: CreditCardIcon,
    value: "15sec",
    label: "Average Booking",
    description: "Quick and seamless reservations",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
  },
  {
    id: 8,
    icon: TrendingUpIcon,
    value: "98%",
    label: "On-Time Rate",
    description: "Punctual and reliable service",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-900/20"
  }
];

export function EnhancedStatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10" data-testid="enhanced-stats">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            Our Impact
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Numbers That Tell Our Story
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            These metrics reflect our commitment to providing exceptional ride-sharing experiences and building trust with our community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            
            return (
              <Card 
                key={stat.id}
                className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${stat.bgColor} border-0 shadow-lg overflow-hidden`}
                data-testid={`stat-${stat.id}`}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                      {stat.value}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {stat.label}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>

                  <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 rounded-2xl px-8 py-6 shadow-xl border border-gray-200 dark:border-gray-700 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Live Status:</span>
              <span className="text-green-600 dark:text-green-400 ml-2 font-semibold">All Systems Operational</span>
            </div>
            <div className="border-l border-gray-300 dark:border-gray-600 pl-4">
              <span className="text-lg font-bold text-gray-900 dark:text-white">Response Time:</span>
              <span className="text-blue-600 dark:text-blue-400 ml-2 font-semibold">&lt; 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}