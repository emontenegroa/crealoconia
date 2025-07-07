import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorksSection = () => {
  const steps = [
    "Escuchamos y ordenamos tus ideas",
    "Convertimos tus respuestas en una base digital", 
    "Creamos tu sitio web real (o MVP, landing, POC)",
    "Te mentoreamos y afinamos juntos cada detalle"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            Cómo trabajamos
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-all duration-300 border-accent/20 hover:border-accent/40">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-accent text-accent-foreground rounded-full font-accent font-bold text-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                <p className="font-body text-foreground font-medium leading-relaxed">
                  {step}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;