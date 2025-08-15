import { Shield, Clock, Smartphone } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
            Why Choose RideShare Pro?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experience the difference with our premium ride booking platform designed for your convenience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center" data-testid="feature-secure">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Secure & Safe</h3>
            <p className="text-slate-600">
              All vehicles are regularly inspected and insured. Your safety is our top priority.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 text-center" data-testid="feature-support">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">24/7 Support</h3>
            <p className="text-slate-600">
              Round-the-clock customer support to assist you whenever you need help.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 text-center" data-testid="feature-booking">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Easy Booking</h3>
            <p className="text-slate-600">
              Simple and intuitive booking process that takes just a few clicks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
