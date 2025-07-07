import React from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import LeadMagnetSection from '@/components/sections/LeadMagnetSection';
import AboutEstebanSection from '@/components/sections/AboutEstebanSection';
import ContactSection from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ThemeToggle />
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <ServicesSection />
      <TestimonialsSection />
      <LeadMagnetSection />
      <AboutEstebanSection />
      <ContactSection />
    </div>
  );
};

export default Index;