import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from '@/components/ScrollAnimation';
import { CheckCircle, ArrowRight, Lightbulb, Code, Rocket, Users } from 'lucide-react';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const steps = [
    {
      icon: Lightbulb,
      title: "Escuchamos y ordenamos tus ideas",
      description: "A través de preguntas estratégicas, extraemos la esencia de lo que haces y cómo lo haces.",
      details: "Metodología probada en 500+ proyectos para identificar tu propuesta de valor única y transformarla en estructura digital clara."
    },
    {
      icon: Code,
      title: "Convertimos tus respuestas en una base digital",
      description: "Usamos IA para estructurar tu conocimiento en contenido web profesional y estratégico.",
      details: "Super prompt personalizado que genera contenido optimizado, arquitectura de información y copywriting que convierte."
    },
    {
      icon: Rocket,
      title: "Creamos tu sitio web real (o MVP, landing, POC)",
      description: "Desarrollamos tu presencia digital con tecnología real, no plantillas genéricas.",
      details: "Desarrollo con las mejores prácticas: responsive, SEO optimizado, carga rápida y diseño que refleja tu marca."
    },
    {
      icon: Users,
      title: "Te mentoreamos y afinamos juntos cada detalle",
      description: "Acompañamiento personalizado hasta que tengas exactamente lo que necesitas.",
      details: "Sesiones de mentoría estratégica, ajustes en tiempo real y capacitación para que puedas gestionar tu presencia digital."
    }
  ];

  return (
    <section className="section-works py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          {steps.map((_, i) => (
            <g key={i}>
              <path
                d={`M ${200 + i * 250} 200 Q ${300 + i * 250} 300 ${400 + i * 250} 400`}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-white animate-neural-lines"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            </g>
          ))}
        </svg>

        {/* Floating Elements */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-particle-float"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${7 + Math.random() * 5}s`
            }}
          >
            <div className="w-3 h-3 bg-white/20 rounded-full animate-glow-pulse" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 animate-text-glow">
              Cómo Funciona
            </h2>
            <p className="font-body text-xl text-white/90 max-w-3xl mx-auto">
              Un proceso simple y estratégico para transformar tus ideas en presencia digital
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            return (
              <ScrollAnimation key={index} delay={index * 200}>
                <Card 
                  className={`glass-morphism border-white/20 hover-spectacular group cursor-pointer transition-all duration-700 ${isActive ? 'scale-105 border-white/40' : ''}`}
                  onClick={() => setActiveStep(isActive ? null : index)}
                >
                  <CardContent className="p-8 text-center">
                    {/* Step Number & Icon */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-heading font-semibold text-white text-lg mb-4 group-hover:animate-text-glow">
                      {step.title}
                    </h3>
                    
                    <p className="text-white/80 leading-relaxed font-body text-sm mb-4">
                      {step.description}
                    </p>

                    {isActive && (
                      <div className="animate-slide-up-bounce">
                        <div className="border-t border-white/20 pt-4 mt-4">
                          <p className="text-white/70 text-xs leading-relaxed">
                            {step.details}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="mt-4">
                      <ArrowRight className={`w-5 h-5 text-white/60 mx-auto transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} />
                    </div>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* Process Flow */}
        <ScrollAnimation delay={800}>
          <Card className="glass-morphism border-white/20 hover-glow">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="font-heading text-2xl font-bold text-white mb-4">
                  Proceso Completo en 4 Pasos
                </h3>
                <p className="text-white/90 font-body">
                  Desde la idea hasta la presencia digital estratégica
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {['Estrategia', 'Desarrollo', 'Lanzamiento', 'Mentoría'].map((phase, i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-2 hover-magnetic">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white font-accent font-semibold text-sm">{phase}</span>
                    </div>
                    {i < 3 && (
                      <ArrowRight className="w-6 h-6 text-white/40 mx-4 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default HowItWorksSection;