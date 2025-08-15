import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedRides from "@/components/featured-rides";
import FeaturesSection from "@/components/features-section";
import ServicesSection from "@/components/services-section";
import Footer from "@/components/footer";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <FeaturedRides />
      <ServicesSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}