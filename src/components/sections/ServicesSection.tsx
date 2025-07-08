import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const ServicesSection = () => {
  const services = [
    {
      title: "Crealoconia",
      subtitle: "Metodología de Activación Digital",
      description: "Rápido. Eficiente. Profesional.",
      longDescription: "Plataforma revolucionaria que convierte 10 preguntas estratégicas en un sitio web profesional completo.",
      backgroundClass: "bg-gradient-to-br from-orange-400 via-pink-500 to-blue-600",
      textColor: "text-white",
      features: [
        "Metodología única probada en 500+ proyectos",
        "Super prompt personalizado de IA", 
        "Sitio web generado profesionalmente"
      ]
    },
    {
      title: "Consultoría Empresarial", 
      subtitle: "Transformación Digital Estratégica",
      description: "Ve rápido. Ve lejos.",
      longDescription: "20+ años liderando equipos multidisciplinarios en empresas como IDM Technology y Empresas Eltit.",
      backgroundClass: "bg-gradient-to-br from-slate-900 to-slate-700",
      textColor: "text-white",
      features: [
        "Diagnóstico integral de procesos digitales",
        "Estrategia de transformación escalable",
        "ROI medible y seguimiento continuo"
      ]
    },
    {
      title: "IA para Negocios",
      subtitle: "Inteligencia Artificial Estratégica", 
      description: "Equipo de ensueño.",
      longDescription: "Implementación práctica de IA en procesos de negocio con formación especializada en IA aplicada (2025).",
      backgroundClass: "bg-gradient-to-br from-green-400 to-emerald-600",
      textColor: "text-white",
      features: [
        "Automatización inteligente de procesos",
        "Análisis predictivo y Business Intelligence",
        "Integración con sistemas existentes"
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Conoce Crealoconia.
            </h2>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 200}>
              <div 
                className={`${service.backgroundClass} rounded-3xl p-8 lg:p-12 relative overflow-hidden min-h-[500px] group cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-2xl`}
              >
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <p className={`text-sm font-medium ${service.textColor} opacity-80 mb-2`}>
                      {service.subtitle}
                    </p>
                    <h3 className={`font-heading text-3xl lg:text-4xl font-bold ${service.textColor} mb-4 leading-tight`}>
                      {service.title}
                    </h3>
                    <p className={`text-xl lg:text-2xl font-semibold ${service.textColor} mb-6`}>
                      {service.description}
                    </p>
                    <p className={`${service.textColor} opacity-90 mb-8 text-lg leading-relaxed`}>
                      {service.longDescription}
                    </p>
                    
                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className={`flex items-start ${service.textColor} opacity-90`}>
                          <div className="w-2 h-2 bg-white rounded-full mt-2.5 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full px-6 py-3 font-semibold transition-all duration-300 backdrop-blur-sm self-start"
                  >
                    {index === 0 ? "Probar Crealoconia" : index === 1 ? "Solicitar Consultoría" : "Explorar IA"}
                  </Button>
                </div>

                {/* Subtle overlay for better text readability */}
                <div className="absolute inset-0 bg-black/10 rounded-3xl" />
                
                {/* Animated background elements */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700" />
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollAnimation delay={600}>
          <div className="text-center mt-20 bg-muted/30 rounded-3xl p-12 backdrop-blur-sm">
            <h3 className="font-heading text-3xl font-bold text-foreground mb-4">
              ¿No estás seguro cuál necesitas?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Conversemos para identificar la mejor solución para tu situación específica
            </p>
            <Button size="lg" className="font-semibold px-8 py-4 rounded-full text-lg">
              Agendar Conversación Gratuita
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ServicesSection;