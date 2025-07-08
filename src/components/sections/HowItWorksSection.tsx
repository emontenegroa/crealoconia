import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from '@/components/ScrollAnimation';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const steps = [
    {
      title: "Escuchamos y ordenamos tus ideas",
      description: "A través de preguntas estratégicas, extraemos la esencia de lo que haces y cómo lo haces.",
      icon: "🎯",
      number: "01",
      color: "apple-text-gradient"
    },
    {
      title: "Convertimos tus respuestas en una base digital", 
      description: "Usamos IA para estructurar tu conocimiento en contenido web profesional y estratégico.",
      icon: "🧠",
      number: "02",
      color: "apple-text-gradient-green"
    },
    {
      title: "Creamos tu sitio web real (o MVP, landing, POC)",
      description: "Desarrollamos tu presencia digital con tecnología real, no plantillas genéricas.",
      icon: "⚡",
      number: "03",
      color: "apple-text-gradient"
    },
    {
      title: "Te mentoreamos y afinamos juntos cada detalle",
      description: "Acompañamiento personalizado hasta que tengas exactamente lo que necesitas.",
      icon: "🚀",
      number: "04",
      color: "apple-text-gradient-green"
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-100 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-black text-foreground mb-6">
              <span className="apple-text-gradient">
                Cómo trabajamos
              </span>
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Una metodología probada que transforma tu conocimiento en resultados digitales
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <ScrollAnimation key={index} delay={index * 150}>
              <Card 
                className={`apple-card group cursor-pointer transition-all duration-500 ${
                  activeStep === index ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <CardContent className="p-8 relative">
                  {/* Number and Icon */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                      <div className={`text-6xl font-black ${step.color}`}>
                        {step.number}
                      </div>
                    </div>
                    <div className="text-4xl group-hover:animate-apple-bounce">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mt-6 w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ${
                        activeStep === index ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;