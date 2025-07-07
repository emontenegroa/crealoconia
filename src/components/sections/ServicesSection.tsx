import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const ServicesSection = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  
  const services = [
    {
      title: "Sitios Web Profesionales",
      description: "Páginas web completas que reflejan tu expertise y atraen a tu cliente ideal."
    },
    {
      title: "Landing Pages que convierten",
      description: "Páginas específicas diseñadas para convertir visitantes en clientes."
    },
    {
      title: "MVPs / POCs para validar ideas",
      description: "Prototipos funcionales para probar tu concepto antes de la inversión completa."
    },
    {
      title: "Digitalización de tu negocio",
      description: "Transformamos procesos analógicos en experiencias digitales eficientes."
    },
    {
      title: "Mentorías estratégicas 1:1",
      description: "Sesiones personalizadas con Esteban para optimizar tu estrategia digital."
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-accent/5 to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-6">
              Servicios
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
              Soluciones digitales completas para transformar tu presencia online
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ScrollAnimation key={index} delay={index * 150}>
              <Card 
                className={`group glass-effect border-primary/20 hover:border-accent/50 transition-all duration-700 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl ${
                  hoveredService === index ? 'scale-105 ring-2 ring-accent/50' : ''
                }`}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent/30 to-primary/30 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    hoveredService === index ? 'rotate-12 scale-110' : ''
                  }`}>
                    <div className={`w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full transition-all duration-300 ${
                      hoveredService === index ? 'scale-125 animate-pulse' : ''
                    }`} />
                  </div>
                  
                  <h3 className="font-accent text-xl font-semibold text-primary mb-4 flex-grow">
                    {service.title}
                  </h3>
                  
                  <p className="font-body text-muted-foreground leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`font-accent font-medium transition-all duration-300 ${
                      hoveredService === index ? 'bg-accent/10 text-accent' : ''
                    }`}
                  >
                    Ver más
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;