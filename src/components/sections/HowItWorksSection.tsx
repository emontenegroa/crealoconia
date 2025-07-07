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
      techNumber: "01"
    },
    {
      title: "Convertimos tus respuestas en una base digital", 
      description: "Usamos IA para estructurar tu conocimiento en contenido web profesional y estratégico.",
      icon: "🧠",
      techNumber: "02"
    },
    {
      title: "Creamos tu sitio web real (o MVP, landing, POC)",
      description: "Desarrollamos tu presencia digital con tecnología real, no plantillas genéricas.",
      icon: "⚡",
      techNumber: "03"
    },
    {
      title: "Te mentoreamos y afinamos juntos cada detalle",
      description: "Acompañamiento personalizado hasta que tengas exactamente lo que necesitas.",
      icon: "🚀",
      techNumber: "04"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      
      {/* Floating Tech Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 cyber-border rounded-lg animate-float" />
        <div className="absolute bottom-20 right-20 w-32 h-32 quantum-shadow rounded-lg animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-6 animate-text-shimmer">
              Cómo trabajamos
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
              Una metodología probada que transforma tu conocimiento en resultados digitales
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <ScrollAnimation key={index} delay={index * 150}>
              <Card 
                className={`group relative cyber-border quantum-shadow transition-all duration-700 cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${
                  activeStep === index ? 'animate-tech-pulse' : ''
                }`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Hologram Overlay */}
                <div className="absolute inset-0 hologram-effect rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="p-8 relative z-10">
                  {/* Tech Number */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                      <div className="text-6xl font-black bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent">
                        {step.techNumber}
                      </div>
                      <div className="absolute inset-0 text-6xl font-black animate-neon-glow opacity-50">
                        {step.techNumber}
                      </div>
                    </div>
                    <div className="text-4xl animate-tech-pulse">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-accent text-xl md:text-2xl font-bold text-primary mb-4 group-hover:animate-text-shimmer transition-all duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="font-body text-muted-foreground leading-relaxed transition-all duration-300 group-hover:text-foreground">
                    {step.description}
                  </p>
                  
                  {/* Progress Indicator */}
                  <div className="mt-6 w-full bg-muted/30 h-1 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-accent to-primary transition-all duration-1000 ${
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