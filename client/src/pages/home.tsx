import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedRides from "@/components/featured-rides";
import FeaturesSection from "@/components/features-section";
import { AnimatedFeatures } from "@/components/animated-features";
import ServicesSection from "@/components/services-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section";
import { EnhancedStatsSection } from "@/components/enhanced-stats-section";
import { InteractiveMapSection } from "@/components/interactive-map-section";
import Footer from "@/components/footer";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <FeaturedRides />
      <AnimatedFeatures />
      <EnhancedStatsSection />
      <ServicesSection />
      <InteractiveMapSection />
      <PricingSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}