import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon, QuoteIcon } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b6c0?w=100&h=100&fit=crop&q=80",
    location: "San Francisco",
    rating: 5,
    content: "Amazing experience! The Tesla Model S was immaculate and the booking process was seamless. Will definitely use RideShare Pro again.",
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
    location: "Los Angeles",
    rating: 5,
    content: "Perfect for my business trip. The BMW X5 was luxury at its finest. Great customer service and competitive pricing.",
    verified: true
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
    location: "New York",
    rating: 5,
    content: "I've tried many ride services, but RideShare Pro stands out. Clean vehicles, professional drivers, and reasonable rates.",
    verified: true
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
    location: "Chicago",
    rating: 5,
    content: "Booked a Porsche 911 for my anniversary. The experience exceeded expectations. Easy booking and fantastic car selection.",
    verified: true
  },
  {
    id: 5,
    name: "Jessica Taylor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80",
    location: "Miami",
    rating: 5,
    content: "Outstanding service! The Range Rover was perfect for our family vacation. Highly recommend for premium vehicle rentals.",
    verified: true
  },
  {
    id: 6,
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
    location: "Seattle",
    rating: 5,
    content: "Professional, reliable, and luxurious. The Mercedes C-Class was spotless and the entire process was hassle-free.",
    verified: true
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" data-testid="testimonials-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust RideShare Pro for their premium transportation needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-0 shadow-lg"
              data-testid={`testimonial-${testimonial.id}`}
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <QuoteIcon className="h-8 w-8 text-blue-600 opacity-60" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <Avatar className="w-14 h-14 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-blue-600 text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {testimonial.name}
                      {testimonial.verified && (
                        <span className="ml-2 text-blue-600">✓</span>
                      )}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-8 py-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mr-6">
              <StarIcon className="h-6 w-6 text-yellow-400 fill-current mr-2" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">4.9</span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">average rating</span>
            </div>
            <div className="border-l border-gray-300 dark:border-gray-600 pl-6">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">10,000+</span>
              <span className="text-gray-600 dark:text-gray-400 ml-2">happy customers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}