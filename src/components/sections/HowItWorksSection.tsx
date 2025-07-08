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
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <ScrollAnimation>
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              🎯 Metodología
            </div>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Eficientemente útil{' '}
              <br className="hidden md:block" />
              cada día.
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Mi metodología está integrada en cada paso para ayudarte a comunicar 
              mejor tus ideas, crear contenido más personal, y desarrollar estrategias 
              más poderosas.
            </p>
          </div>
        </ScrollAnimation>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Column */}
          <div className="space-y-16">
            <ScrollAnimation delay={200}>
              <div className="space-y-6">
                {/* Chat Mockup */}
                <div className="bg-accent/5 rounded-3xl p-8 max-w-md">
                  <div className="bg-primary text-primary-foreground rounded-2xl p-4 mb-4 max-w-xs">
                    <p className="text-sm">¿Cuál es tu mayor desafío para comunicar lo que haces?</p>
                  </div>
                  <div className="bg-card border rounded-2xl p-4 ml-8">
                    <p className="text-sm text-muted-foreground">No sé cómo explicar mi servicio de manera clara y atractiva...</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                    Escuchamos y ordenamos tus ideas
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A través de preguntas estratégicas, extraemos la esencia de lo que 
                    haces y convertimos tu conocimiento en mensajes claros.
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={600}>
              <div className="space-y-6">
                {/* MacBook Mockup */}
                <div className="bg-muted/20 rounded-3xl p-8">
                  <div className="bg-card rounded-2xl shadow-lg border overflow-hidden">
                    {/* MacBook Screen */}
                    <div className="bg-foreground/5 p-4">
                      <div className="flex gap-2 mb-4">
                        <div className="w-3 h-3 bg-destructive rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-full"></div>
                        <div className="h-3 bg-muted rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                    Creamos tu sitio web real
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Desarrollamos tu presencia digital con tecnología moderna, 
                    no plantillas genéricas. Cada sitio es único.
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Column */}
          <div className="space-y-16 lg:mt-20">
            <ScrollAnimation delay={400}>
              <div className="space-y-6">
                {/* AI Processing Mockup */}
                <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-3xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-accent-foreground rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-sm font-medium text-accent">IA procesando...</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-accent/30 rounded w-full"></div>
                      <div className="h-3 bg-accent/30 rounded w-4/5"></div>
                      <div className="h-3 bg-accent/30 rounded w-3/5"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                    Convertimos tus respuestas en base digital
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Usamos IA para estructurar tu conocimiento en contenido web 
                    profesional y estratégico que conecta con tu audiencia.
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={800}>
              <div className="space-y-6">
                {/* Mentorship Interface */}
                <div className="bg-primary/5 rounded-3xl p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">Mentoría 1:1</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 text-sm max-w-xs">
                        Revisemos este texto juntos
                      </div>
                      <div className="bg-card border rounded-lg p-3 text-sm ml-6">
                        Perfecto, me ayuda mucho
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                    Te mentoreamos y afinamos cada detalle
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Acompañamiento personalizado hasta que tengas exactamente 
                    lo que necesitas para tu negocio digital.
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;