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
      techSymbol: "◇",
      gradient: "premium-gradient"
    },
    {
      title: "Convertimos tus respuestas en una base digital", 
      description: "Usamos IA para estructurar tu conocimiento en contenido web profesional y estratégico.",
      icon: "🧠",
      techSymbol: "◈",
      gradient: "accent-gradient"
    },
    {
      title: "Creamos tu sitio web real (o MVP, landing, POC)",
      description: "Desarrollamos tu presencia digital con tecnología real, no plantillas genéricas.",
      icon: "⚡",
      techSymbol: "◆",
      gradient: "premium-gradient"
    },
    {
      title: "Te mentoreamos y afinamos juntos cada detalle",
      description: "Acompañamiento personalizado hasta que tengas exactamente lo que necesitas.",
      icon: "🚀",
      techSymbol: "◉",
      gradient: "accent-gradient"
    }
  ];

  return (
    <section className="py-32 neural-network relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 animate-aurora opacity-20" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-64 h-64 premium-gradient rounded-full blur-3xl animate-particle-float" />
        <div className="absolute bottom-20 right-20 w-48 h-48 accent-gradient rounded-full blur-3xl animate-particle-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 morphism-glass rounded-full animate-tech-pulse" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6">
              <span className="premium-gradient bg-clip-text text-transparent animate-text-shimmer">
                Cómo trabajamos
              </span>
            </h2>
            <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Una metodología revolucionaria que transforma tu conocimiento en resultados digitales espectaculares
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <ScrollAnimation key={index} delay={index * 150}>
              <Card 
                className={`group relative morphism-glass hover:glow-shadow transition-all duration-700 cursor-pointer transform hover:scale-105 hover:-translate-y-4 ${
                  activeStep === index ? 'elegant-shadow animate-magnetic-hover' : ''
                }`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Holographic Overlay */}
                <div className={`absolute inset-0 ${step.gradient} rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <CardContent className="p-10 relative z-10">
                  {/* Tech Symbol & Icon */}
                  <div className="flex items-center gap-8 mb-8">
                    <div className="relative">
                      <div className={`text-8xl font-black ${step.gradient} bg-clip-text text-transparent`}>
                        {step.techSymbol}
                      </div>
                      <div className="absolute inset-0 text-8xl font-black animate-neon-glow opacity-30">
                        {step.techSymbol}
                      </div>
                    </div>
                    <div className="text-5xl animate-tech-pulse transform group-hover:scale-125 transition-transform duration-500">
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 group-hover:premium-gradient group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                    {step.title}
                  </h3>
                  
                  <p className="font-body text-muted-foreground text-lg leading-relaxed transition-all duration-500 group-hover:text-foreground">
                    {step.description}
                  </p>
                  
                  {/* Interactive Progress Bar */}
                  <div className="mt-8 w-full bg-muted/20 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${step.gradient} transition-all duration-1000 ${
                        activeStep === index ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                  
                  {/* Data Stream Effect */}
                  <div className="absolute top-4 right-4 w-16 h-0.5 premium-gradient opacity-0 group-hover:opacity-100 animate-data-stream" />
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
        
        {/* Connection Lines */}
        <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <svg className="w-full h-full opacity-20" viewBox="0 0 800 600">
            <line x1="200" y1="150" x2="600" y2="150" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="0;10" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="200" y1="450" x2="600" y2="450" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;