import React from 'react';
import NavigationHeader from '@/components/sections/NavigationHeader';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection';
import ProcessMethodologySection from '@/components/sections/ProcessMethodologySection';
import ServicesSection from '@/components/sections/ServicesSection';
import EnhancedTestimonialsSection from '@/components/sections/EnhancedTestimonialsSection';
import EnhancedFAQSection from '@/components/sections/EnhancedFAQSection';
import OptimizedContactSection from '@/components/sections/OptimizedContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NavigationHeader />
      <HeroSection />
      <AboutSection />
      <ProblemSolutionSection />
      <ProcessMethodologySection />
      <ServicesSection />
      <EnhancedTestimonialsSection />
      <EnhancedFAQSection />
      <OptimizedContactSection />
    </div>
  );
};

export default Index;