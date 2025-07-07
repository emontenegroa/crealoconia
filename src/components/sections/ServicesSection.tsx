import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';
import { Rocket, Building2, Bot, ArrowRight, Sparkles } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Rocket,
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
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: Building2,
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
      gradient: "from-purple-500 to-pink-400"
    },
    {
      icon: Bot,
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
      gradient: "from-emerald-500 to-teal-400"
    }
  ];

  return (
    <section className="section-services py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          >
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 glass-morphism px-6 py-3 rounded-full mb-6 hover-glow">
              <Sparkles className="w-5 h-5 text-white animate-glow-pulse" />
              <span className="text-white font-accent font-semibold">
                Tres servicios. Una visión.
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 animate-text-glow">
              Servicios Estratégicos
            </h2>
            <p className="font-body text-xl text-white/90 max-w-3xl mx-auto">
              Cada servicio está diseñado para diferentes momentos de tu viaje digital, pero todos comparten el mismo objetivo: transformar tu presencia online.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollAnimation key={index} delay={index * 200}>
                <Card className="glass-morphism hover-spectacular group h-full border-white/20">
                  <CardContent className="p-8 h-full flex flex-col">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="relative inline-block mb-6">
                        <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 text-3xl animate-float-magical">
                          {service.emoji}
                        </div>
                      </div>
                      
                      <h3 className="font-heading font-bold text-white text-2xl mb-2 group-hover:animate-text-glow">
                        {service.title}
                      </h3>
                      <p className="font-accent text-white/80 text-lg font-semibold">
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-white/90 leading-relaxed mb-6 font-body">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex-grow mb-8">
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3 text-white/80">
                            <div className="w-2 h-2 bg-gradient-to-r from-white to-cyan-200 rounded-full mt-2 flex-shrink-0 animate-glow-pulse" />
                            <span className="font-body leading-relaxed text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <Button className="w-full glass-effect border-white/30 text-white hover-magnetic group/btn">
                      <span className="font-accent font-semibold">{service.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            );
          })}
        </div>

        <ScrollAnimation delay={600}>
          <div className="text-center mt-16">
            <Card className="glass-morphism border-white/20 hover-glow inline-block">
              <CardContent className="p-8">
                <h3 className="font-heading text-2xl font-bold text-white mb-4">
                  ¿No estás seguro cuál necesitas?
                </h3>
                <p className="text-white/90 mb-6 font-body">
                  Conversemos para identificar la mejor solución para tu situación específica
                </p>
                <Button size="lg" className="glass-effect border-white/30 text-white hover-spectacular">
                  <span className="font-accent font-semibold">Agendar Conversación Gratuita</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ServicesSection;