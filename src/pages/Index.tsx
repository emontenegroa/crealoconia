import React from 'react';
import NavigationHeader from '@/components/sections/NavigationHeader';
import HeroSection from '@/components/sections/HeroSection';
import ProblemAgitationSection from '@/components/sections/ProblemAgitationSection';
import SolutionPillarsSection from '@/components/sections/SolutionPillarsSection';
import BeforeAfterSection from '@/components/sections/BeforeAfterSection';
import EnhancedTestimonialsSection from '@/components/sections/EnhancedTestimonialsSection';
import EnhancedFAQSection from '@/components/sections/EnhancedFAQSection';
import OptimizedContactSection from '@/components/sections/OptimizedContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <NavigationHeader />
      <HeroSection />
      <ProblemAgitationSection />
      <SolutionPillarsSection />
      <BeforeAfterSection />
      <EnhancedTestimonialsSection />
      <EnhancedFAQSection />
      <OptimizedContactSection />
    </div>
  );
};

export default Index;