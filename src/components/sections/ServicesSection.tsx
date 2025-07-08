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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="space-y-20">
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 200}>
              <div className={`bg-gradient-to-br ${service.color} rounded-3xl p-12 text-white relative overflow-hidden`}>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                  <div className="w-full h-full rounded-full bg-white/20" />
                </div>
                
                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    {service.title}
                  </h2>
                  
                  <p className="text-xl mb-8 opacity-90 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <Button 
                    size="lg"
                    variant="secondary"
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full border-0"
                  >
                    {index === 0 ? "Comenzar ahora" : index === 1 ? "Solicitar consulta" : "Explorar IA"}
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
        
        {/* Help section */}
        <ScrollAnimation delay={800}>
          <div className="text-center mt-20 bg-muted/30 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              ¿Necesitas ayuda para elegir?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Responde unas preguntas para encontrar la mejor solución para ti.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-full"
            >
              Empezar ✨
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default ServicesSection;