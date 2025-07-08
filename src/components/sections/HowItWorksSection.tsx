import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from '@/components/ScrollAnimation';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const steps = [
    {
      title: "Escuchamos y ordenamos tus ideas",
      description: "A través de preguntas estratégicas, extraemos la esencia de lo que haces y cómo lo haces."
    },
    {
      title: "Convertimos tus respuestas en una base digital", 
      description: "Usamos IA para estructurar tu conocimiento en contenido web profesional y estratégico."
    },
    {
      title: "Creamos tu sitio web real (o MVP, landing, POC)",
      description: "Desarrollamos tu presencia digital con tecnología real, no plantillas genéricas."
    },
    {
      title: "Te mentoreamos y afinamos juntos cada detalle",
      description: "Acompañamiento personalizado hasta que tengas exactamente lo que necesitas."
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-background to-accent/5 relative overflow-hidden">
      {/* Timeline Background */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/0 via-accent/50 to-accent/0 transform -translate-x-1/2" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-full text-accent font-medium mb-6">
              🚀 Proceso Optimizado
            </div>
            
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-6">
              Cómo trabajamos
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
              Una metodología probada que transforma tu conocimiento en resultados digitales
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="space-y-16">
          {steps.map((step, index) => (
            <ScrollAnimation key={index} delay={index * 200}>
              <div className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                {/* Step Number */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent to-primary text-white rounded-full flex items-center justify-center font-accent font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
                
                {/* Content Card */}
                <Card 
                  className={`flex-1 glass-effect border-accent/30 hover:border-accent/50 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                    activeStep === index ? 'ring-2 ring-accent/50' : ''
                  }`}
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <CardContent className="p-8">
                    <h3 className="font-accent text-xl md:text-2xl font-semibold text-primary mb-4">
                      {step.title}
                    </h3>
                    <p className={`font-body text-muted-foreground leading-relaxed transition-all duration-300 ${
                      activeStep === index ? 'text-foreground' : ''
                    }`}>
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;