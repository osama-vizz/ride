import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedRides from "@/components/featured-rides";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <HeroSection />
      <FeaturedRides />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
