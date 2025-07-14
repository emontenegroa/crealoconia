import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ScrollAnimation from '@/components/ScrollAnimation';

const EnhancedTestimonialsSection = () => {
  const testimonials = [
    {
      name: "María González",
      role: "Coach de vida",
      content: "En 3 semanas recibí 12 consultas nuevas. Mi web anterior no me generaba ni una.",
      metric: "+400% consultas",
      image: "/lovable-uploads/58b8ac39-402a-4cd2-b456-0476134d8376.png"
    },
    {
      name: "Ana Rodríguez", 
      role: "Consultora empresarial",
      content: "Cerré 2 proyectos corporativos el primer mes. ROI recuperado en 30 días.",
      metric: "$15,000 USD primer mes",
      image: "/lovable-uploads/c0af655b-7fe3-4d3c-99f5-67b5a3edef7d.png"
    },
    {
      name: "Roberto Silva",
      role: "Mentor de negocios", 
      content: "Mi web ahora vende mientras duermo. 5 clientes nuevos sin hacer nada más.",
      metric: "+300% ventas automáticas",
      image: "/lovable-uploads/e48a73d7-90a6-465c-b6c4-91e0bf88434b.png"
    }
  ];

  return (
    <section className="py-20 bg-muted/30" id="testimonios">
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              ¿Dudas de si esto funciona?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No son promesas. Son resultados reales de profesionales como tú.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimation key={index} delay={200 + index * 200}>
              <Card className="border border-primary/20 bg-card hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  {/* Métrica destacada */}
                  <div className="bg-primary/10 text-primary font-bold text-lg px-3 py-2 rounded-lg mb-4 text-center">
                    {testimonial.metric}
                  </div>
                  
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {/* Stats */}
        <ScrollAnimation delay={1000}>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-heading font-bold mb-4">
                Resultados que hablan por sí solos
              </h3>
              <p className="text-muted-foreground text-lg">
                Datos reales de los últimos 12 meses trabajando con profesionales
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Clientes satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">72h</div>
                <div className="text-muted-foreground">Tiempo promedio de entrega</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">280%</div>
                <div className="text-muted-foreground">Aumento promedio en consultas</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                <div className="text-muted-foreground">Webs creadas con IA</div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default EnhancedTestimonialsSection;