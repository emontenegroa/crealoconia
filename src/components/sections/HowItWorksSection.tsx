import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from '@/components/ScrollAnimation';
const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Cómo Trabajamos</h2>
        <p className="text-muted-foreground text-center">Proceso simple y efectivo</p>
      </div>
    </section>
  );
};
export default HowItWorksSection;