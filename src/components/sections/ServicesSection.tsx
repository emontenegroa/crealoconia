import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const ServicesSection = () => {
  const services = [
    {
      title: "Crear tu página con IA",
      subtitle: "Presencia digital en minutos",
      description: "Transforma tu idea en una web profesional con inteligencia artificial. Sin código, sin complicaciones.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
      color: "from-blue-500 to-purple-600",
      accentColor: "border-blue-500 bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      title: "Consultoría Empresarial", 
      subtitle: "Transformación digital estratégica",
      description: "20+ años de experiencia liderando equipos. Diagnóstico, estrategia y ROI medible para tu empresa.",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop",
      color: "from-emerald-500 to-teal-600",
      accentColor: "border-emerald-500 bg-emerald-50",
      textColor: "text-emerald-700"
    },
    {
      title: "IA para Negocios",
      subtitle: "Inteligencia artificial aplicada", 
      description: "Automatización inteligente de procesos y análisis predictivo. Integración práctica en tu negocio.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      color: "from-orange-500 to-red-600",
      accentColor: "border-orange-500 bg-orange-50",
      textColor: "text-orange-700"
    }
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluciones digitales integrales para transformar tu presencia online
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="space-y-32">
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 200}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                
                {/* Image */}
                <div className={`relative group ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105 ${service.accentColor} p-2`}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                    </div>
                    
                    {/* Floating accent elements */}
                    <div className={`absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br ${service.color} rounded-full opacity-60 animate-float`} />
                    <div className={`absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br ${service.color} rounded-full opacity-40 animate-float`} style={{ animationDelay: '2s' }} />
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="space-y-6">
                    <div className={`inline-block px-4 py-2 rounded-full border-2 ${service.accentColor} ${service.textColor} font-medium text-sm`}>
                      {service.subtitle}
                    </div>
                    
                    <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  
                  <Button 
                    size="lg"
                    className={`bg-gradient-to-r ${service.color} hover:shadow-xl hover:scale-105 transition-all duration-300 text-white border-0 px-8 py-6 text-lg font-semibold rounded-full`}
                  >
                    {index === 0 ? "Crear mi página 🚀" : index === 1 ? "Solicitar consultoría 💼" : "Explorar IA 🤖"}
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollAnimation delay={800}>
          <div className="text-center mt-32 bg-gradient-to-br from-muted/50 to-muted/30 rounded-3xl p-16 backdrop-blur-sm border border-muted/20">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿No estás seguro cuál necesitas?
            </h3>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Conversemos para identificar la mejor solución para tu situación específica
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:scale-105 transition-all duration-300 text-white px-10 py-6 text-lg font-semibold rounded-full"
            >
              Agendar Conversación Gratuita ✨
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ServicesSection;