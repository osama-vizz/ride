import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedRides from "@/components/featured-rides";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome back, {user?.firstName || 'User'}!
            </h1>
            <p className="text-slate-600">Ready to book your next ride?</p>
          </div>
        </div>
      </div>
      <FeaturedRides />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
