import React from 'react';
import NavigationHeader from '@/components/sections/NavigationHeader';
import HeroSection from '@/components/sections/HeroSection';
import ValuePropositionSection from '@/components/sections/ValuePropositionSection';
import ProcessSimplifiedSection from '@/components/sections/ProcessSimplifiedSection';
import EnhancedTestimonialsSection from '@/components/sections/EnhancedTestimonialsSection';
import EnhancedFAQSection from '@/components/sections/EnhancedFAQSection';
import OptimizedContactSection from '@/components/sections/OptimizedContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NavigationHeader />
      <HeroSection />
      <ValuePropositionSection />
      <ProcessSimplifiedSection />
      <EnhancedTestimonialsSection />
      <EnhancedFAQSection />
      <OptimizedContactSection />
    </div>
  );
};

export default Index;