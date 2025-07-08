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
      cta: "Probar Crealoconia"
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
      cta: "Solicitar Consultoría"
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
      cta: "Explorar IA"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-10 w-80 h-80 bg-primary rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
              Tres servicios. Una visión.
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
                className={`group relative bg-background/80 backdrop-blur-sm border border-primary/10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-4 hover:scale-105 ${
                  hoveredService === index ? 'ring-2 ring-accent/30 border-accent/30' : ''
                }`}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Floating effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardContent className="p-8 relative z-10">
                  {/* Emoji icon */}
                  <div className="text-6xl mb-6 text-center">
                    {service.emoji}
                  </div>
                  
                  <div className="text-center mb-6">
                    <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                      {service.title}
                    </h3>
                    <p className="font-accent text-lg font-medium text-accent">
                      {service.subtitle}
                    </p>
                  </div>
                  
                  <p className="font-body text-muted-foreground leading-relaxed mb-6 text-center">
                    {service.description}
                  </p>
                  
                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="font-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full font-accent font-semibold transition-all duration-300 rounded-xl ${
                      hoveredService === index ? 'bg-accent hover:bg-accent/90 scale-105' : ''
                    }`}
                    variant={hoveredService === index ? "default" : "outline"}
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
          <div className="text-center bg-secondary/20 rounded-3xl p-8 backdrop-blur-sm border border-primary/10">
            <h3 className="font-heading text-2xl font-bold text-primary mb-4">
              ¿No estás seguro cuál necesitas?
            </h3>
            <p className="font-body text-muted-foreground mb-6 max-w-2xl mx-auto">
              Conversemos para identificar la mejor solución para tu situación específica
            </p>
            <Button size="lg" className="font-accent font-semibold px-8 py-4 rounded-xl">
              Agendar Conversación Gratuita
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ServicesSection;