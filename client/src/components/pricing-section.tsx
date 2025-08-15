import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, StarIcon, CrownIcon, ShieldCheckIcon } from "lucide-react";
import { Link } from "wouter";

const pricingTiers = [
  {
    id: 'economy',
    name: 'Economy',
    price: 39,
    popular: false,
    description: 'Perfect for daily commutes and short trips',
    features: [
      'Compact and sedan vehicles',
      'Standard insurance coverage',
      'Basic customer support',
      '24/7 booking availability',
      'Mobile app access'
    ],
    vehicles: ['Honda Civic', 'Toyota Camry', 'Nissan Altima'],
    color: 'blue'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 89,
    popular: true,
    description: 'Enhanced comfort and style for special occasions',
    features: [
      'Luxury sedans and SUVs',
      'Comprehensive insurance',
      'Priority customer support',
      'Professional chauffeur service',
      'Complimentary refreshments',
      'GPS navigation included'
    ],
    vehicles: ['BMW X5', 'Mercedes C-Class', 'Audi Q7'],
    color: 'purple'
  },
  {
    id: 'executive',
    name: 'Executive',
    price: 159,
    popular: false,
    description: 'Ultimate luxury experience for VIP clients',
    features: [
      'High-end luxury vehicles',
      'Premium insurance coverage',
      'Dedicated concierge service',
      'Executive chauffeur',
      'Red carpet treatment',
      'Business amenities',
      'Airport lounge access'
    ],
    vehicles: ['Tesla Model S', 'Range Rover', 'Porsche Panamera'],
    color: 'yellow'
  }
];

export function PricingSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900" data-testid="pricing-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your needs. All prices include insurance, maintenance, and 24/7 support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 ${
                tier.popular ? 'ring-2 ring-purple-500 scale-105' : 'hover:shadow-xl'
              }`}
              data-testid={`pricing-tier-${tier.id}`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-sm font-semibold">
                    <StarIcon className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="mb-4">
                  {tier.id === 'economy' && <ShieldCheckIcon className="w-12 h-12 mx-auto text-blue-600" />}
                  {tier.id === 'premium' && <StarIcon className="w-12 h-12 mx-auto text-purple-600" />}
                  {tier.id === 'executive' && <CrownIcon className="w-12 h-12 mx-auto text-yellow-600" />}
                </div>
                
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {tier.name}
                </CardTitle>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {tier.description}
                </p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    ${tier.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    /day
                  </span>
                </div>

                <Link href="/rides">
                  <Button 
                    className={`w-full py-3 text-lg font-semibold ${
                      tier.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                        : 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                    }`}
                    data-testid={`button-select-${tier.id}`}
                  >
                    Choose {tier.name}
                  </Button>
                </Link>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Featured Vehicles:
                  </h4>
                  <div className="space-y-2">
                    {tier.vehicles.map((vehicle, index) => (
                      <div key={index} className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2">
                        {vehicle}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Need a custom solution for your business?
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="px-8 py-3">
              Contact Sales Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}