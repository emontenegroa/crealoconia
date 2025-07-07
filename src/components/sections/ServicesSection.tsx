import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ServicesSection = () => {
  const services = [
    "Sitios Web Profesionales",
    "Landing Pages que convierten",
    "MVPs / POCs para validar productos", 
    "Digitalización de tu negocio",
    "Mentorías estratégicas con Esteban"
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            Servicios
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-primary/20 hover:border-accent/40 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300">
                  <div className="w-6 h-6 bg-accent rounded-full group-hover:scale-125 transition-transform duration-300" />
                </div>
                <h3 className="font-accent text-lg font-semibold text-primary mb-2">
                  {service}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;