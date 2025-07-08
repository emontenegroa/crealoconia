import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const ServicesSection = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  
  const services = [
    {
      emoji: "🚀",
      title: "Crealoconia",
      subtitle: "Metodología de Activación Digital",
      description: "Plataforma revolucionaria que convierte 10 preguntas estratégicas en un sitio web profesional completo. Combina inteligencia artificial avanzada con mi experiencia de 20+ años para eliminar toda complejidad técnica.",
      features: [
        "Metodología única probada en 500+ proyectos",
        "Super prompt personalizado de IA",
        "Sitio web generado profesionalmente",
        "Sin conocimiento técnico requerido",
        "Mentoría personal incluida"
      ],
      cta: "Probar Crealoconia",
      gradient: "apple-text-gradient"
    },
    {
      emoji: "💼",
      title: "Consultoría Empresarial",
      subtitle: "Transformación Digital Estratégica",
      description: "Basado en 20+ años liderando equipos multidisciplinarios y implementando soluciones en empresas como IDM Technology y Empresas Eltit. Estrategias personalizadas para PyME y corporaciones.",
      features: [
        "Diagnóstico integral de procesos digitales",
        "Estrategia de transformación escalable",
        "Implementación con metodologías probadas",
        "Liderazgo de equipos multidisciplinarios",
        "ROI medible y seguimiento continuo"
      ],
      cta: "Solicitar Consultoría",
      gradient: "apple-text-gradient-green"
    },
    {
      emoji: "🤖",
      title: "IA para Negocios",
      subtitle: "Inteligencia Artificial Estratégica",
      description: "Implementación práctica de IA en procesos de negocio. Con formación especializada en IA aplicada a negocios (2025) y experiencia comprobada en automatización inteligente y análisis de datos.",
      features: [
        "Automatización inteligente de procesos",
        "Análisis predictivo y Business Intelligence",
        "Chatbots y asistentes virtuales empresariales",
        "Integración con sistemas existentes",
        "Capacitación y adopción organizacional"
      ],
      cta: "Explorar IA",
      gradient: "apple-text-gradient"
    }
  ];

  return (
    <section className="py-32 apple-gradient-bg relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300 rounded-full blur-3xl opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-black text-foreground mb-6">
              <span className="apple-text-gradient">
                Tres servicios.
              </span>
              <br />
              <span className="apple-text-gradient-green">
                Una visión.
              </span>
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Cada servicio está diseñado para diferentes momentos de tu viaje digital, pero todos comparten el mismo objetivo: transformar tu presencia online.
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 200}>
              <Card 
                className={`apple-card group cursor-pointer transition-all duration-500 ${
                  hoveredService === index ? 'scale-105 -translate-y-4' : ''
                }`}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Floating Icon */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-16 apple-card rounded-full flex items-center justify-center text-3xl animate-float">
                    {service.emoji}
                  </div>
                </div>
                
                <CardContent className="pt-16 p-8 relative">
                  {/* Service Header */}
                  <div className="text-center mb-8">
                    <h3 className={`font-heading text-2xl md:text-3xl font-black mb-2 ${service.gradient}`}>
                      {service.title}
                    </h3>
                    <p className="font-accent text-lg font-semibold text-muted-foreground">
                      {service.subtitle}
                    </p>
                  </div>
                  
                  {/* Description */}
                  <p className="font-body text-muted-foreground leading-relaxed mb-8 text-center">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="font-body text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    className={`w-full font-semibold py-4 rounded-xl transition-all duration-500 ${
                      hoveredService === index 
                        ? 'apple-button scale-105' 
                        : 'apple-card border text-foreground'
                    }`}
                  >
                    {service.cta}
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollAnimation delay={600}>
          <div className="text-center apple-card p-12 backdrop-blur-sm">
            <div className="relative">
              <h3 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-6">
                <span className="apple-text-gradient">
                  ¿No estás seguro cuál necesitas?
                </span>
              </h3>
              <p className="font-body text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Conversemos para identificar la mejor solución para tu situación específica
              </p>
              <Button className="apple-button-secondary font-semibold px-12 py-6 rounded-xl">
                🚀 Agendar Conversación Gratuita
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ServicesSection;