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
      gradient: "premium-gradient",
      accent: "accent-gradient"
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
      gradient: "accent-gradient",
      accent: "premium-gradient"
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
      gradient: "premium-gradient",
      accent: "accent-gradient"
    }
  ];

  return (
    <section className="py-32 neural-network relative overflow-hidden">
      {/* Dynamic Aurora Background */}
      <div className="absolute inset-0 animate-aurora opacity-25" />
      
      {/* Floating Tech Elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-3 h-3 ${i % 2 === 0 ? 'premium-gradient' : 'accent-gradient'} rounded-full animate-particle-float blur-sm`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Geometric Shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-10 w-96 h-96 premium-gradient rounded-full blur-3xl animate-particle-float" />
        <div className="absolute bottom-40 right-10 w-80 h-80 accent-gradient rounded-full blur-3xl animate-particle-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] morphism-glass rounded-full animate-tech-pulse" />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6">
              <span className="premium-gradient bg-clip-text text-transparent animate-text-shimmer">
                Tres servicios.
              </span>
              <br />
              <span className="accent-gradient bg-clip-text text-transparent animate-text-shimmer">
                Una visión.
              </span>
            </h2>
            <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Cada servicio está diseñado para diferentes momentos de tu viaje digital, pero todos comparten el mismo objetivo: transformar tu presencia online de manera espectacular.
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 200}>
              <Card 
                className={`group relative morphism-glass rounded-3xl transition-all duration-700 cursor-pointer transform hover:-translate-y-8 hover:scale-105 ${
                  hoveredService === index ? 'glow-shadow animate-magnetic-hover' : 'elegant-shadow'
                }`}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Dynamic Background Overlay */}
                <div className={`absolute inset-0 ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-700`} />
                <div className="absolute inset-0 neural-network rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Floating Icon */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <div className={`w-16 h-16 ${service.gradient} rounded-full flex items-center justify-center text-3xl morphism-glass animate-particle-float`}>
                    {service.emoji}
                  </div>
                </div>
                
                <CardContent className="pt-16 p-8 relative z-10">
                  {/* Service Header */}
                  <div className="text-center mb-8">
                    <h3 className="font-heading text-2xl md:text-3xl font-black text-foreground mb-2 group-hover:premium-gradient group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {service.title}
                    </h3>
                    <p className="font-accent text-lg font-semibold text-accent group-hover:text-primary transition-colors duration-500">
                      {service.subtitle}
                    </p>
                  </div>
                  
                  {/* Description */}
                  <p className="font-body text-muted-foreground leading-relaxed mb-8 text-center transition-all duration-500 group-hover:text-foreground">
                    {service.description}
                  </p>
                  
                  {/* Features Grid */}
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start text-sm">
                        <div className={`w-2 h-2 ${service.accent} rounded-full mt-2 mr-3 flex-shrink-0 animate-tech-pulse`} />
                        <span className="font-body text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    className={`w-full font-accent font-bold py-4 rounded-xl border-0 transition-all duration-500 transform group-hover:scale-105 ${
                      hoveredService === index 
                        ? `${service.gradient} text-background glow-shadow animate-magnetic-hover` 
                        : 'morphism-glass text-foreground elegant-shadow'
                    }`}
                  >
                    {service.cta}
                  </Button>
                  
                  {/* Data Stream Effects */}
                  <div className="absolute top-4 right-4 w-20 h-0.5 premium-gradient opacity-0 group-hover:opacity-100 animate-data-stream" />
                  <div className="absolute bottom-4 left-4 w-16 h-0.5 accent-gradient opacity-0 group-hover:opacity-100 animate-data-stream" style={{ animationDelay: '0.5s' }} />
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <ScrollAnimation delay={600}>
          <div className="text-center morphism-glass rounded-3xl p-12 backdrop-blur-sm elegant-shadow neural-network">
            <div className="relative">
              <h3 className="font-heading text-3xl md:text-4xl font-black text-foreground mb-6">
                <span className="premium-gradient bg-clip-text text-transparent">
                  ¿No estás seguro cuál necesitas?
                </span>
              </h3>
              <p className="font-body text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Conversemos para identificar la mejor solución para tu situación específica y crear algo extraordinario juntos
              </p>
              <Button 
                size="lg" 
                className="font-accent font-bold px-12 py-6 rounded-xl premium-gradient text-background border-0 glow-shadow hover:scale-110 transition-all duration-500 animate-magnetic-hover"
              >
                🚀 Agendar Conversación Gratuita
              </Button>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 premium-gradient rounded-full opacity-50 animate-particle-float" />
              <div className="absolute -bottom-4 -right-4 w-6 h-6 accent-gradient rounded-full opacity-50 animate-particle-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ServicesSection;