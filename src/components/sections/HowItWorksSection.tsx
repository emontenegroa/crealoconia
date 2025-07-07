import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from '@/components/ScrollAnimation';
const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const steps = [{
    title: "Escuchamos y ordenamos tus ideas",
    description: "A través de preguntas estratégicas, extraemos la esencia de lo que haces y cómo lo haces."
  }, {
    title: "Convertimos tus respuestas en una base digital",
    description: "Usamos IA para estructurar tu conocimiento en contenido web profesional y estratégico."
  }, {
    title: "Creamos tu sitio web real (o MVP, landing, POC)",
    description: "Desarrollamos tu presencia digital con tecnología real, no plantillas genéricas."
  }, {
    title: "Te mentoreamos y afinamos juntos cada detalle",
    description: "Acompañamiento personalizado hasta que tengas exactamente lo que necesitas."
  }];
  return (
    <section className="py-32 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-6">
              Cómo Funciona
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
              Un proceso simple y estratégico para transformar tus ideas en presencia digital
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <ScrollAnimation key={index} delay={index * 200}>
              <Card 
                className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-700 group hover:scale-105 hover:shadow-2xl cursor-pointer"
                onClick={() => setActiveStep(activeStep === index ? null : index)}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                  </div>
                  
                  <h3 className="font-accent font-semibold text-primary text-lg mb-4 group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
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