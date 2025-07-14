import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ScrollAnimation from '@/components/ScrollAnimation';

const EnhancedTestimonialsSection = () => {
  const testimonials = [
    {
      name: "María González",
      role: "Psicóloga",
      avatar: "MG",
      content: "De 2 consultas mensuales pasé a 15. La web no solo se ve profesional, realmente funciona para convertir visitantes en pacientes.",
      result: "+400% consultas",
      business: "Consulta Privada",
      metric: "+400% consultas"
    },
    {
      name: "Carlos Ruiz",
      role: "Coach",
      avatar: "CR",
      content: "En mi primer mes con la nueva web generé $15,000 USD en servicios. El ROI fue inmediato y sigue creciendo.",
      result: "$15K primer mes",
      business: "Desarrollo Personal",
      metric: "$15K primer mes"
    },
    {
      name: "Ana Martín",
      role: "Consultora",
      avatar: "AM",
      content: "Pasé de buscar clientes a que me busquen a mí. La web posicionó mi expertise de manera que ahora cobro 3x más por proyecto.",
      result: "3x precio por proyecto",
      business: "Estrategia Digital",
      metric: "3x precio por proyecto"
    },
    {
      name: "Roberto Silva",
      role: "Terapeuta",
      avatar: "RS",
      content: "Mi agenda se llenó en 2 semanas. La web comunica confianza y profesionalismo que mi anterior no tenía.",
      result: "Agenda llena en 2 semanas",
      business: "Bienestar Integral",
      metric: "Agenda llena en 2 semanas"
    }
  ];

  return (
    <section className="py-20 bg-muted/30" id="testimonios">
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Resultados reales de profesionales como tú
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Estos son solo algunos de los profesionales que ya han transformado su presencia digital 
              y están viendo resultados concretos en sus negocios.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimation key={index} delay={200 + index * 200}>
              <Card className="border border-accent/20 bg-card hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="" alt={testimonial.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-heading font-semibold text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <blockquote className="text-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Results */}
                  <div className="border-t border-border pt-4">
                     <div className="flex justify-between items-center">
                       <div>
                         <div className="text-sm text-muted-foreground">Sector</div>
                         <div className="font-semibold">{testimonial.business}</div>
                       </div>
                       <div className="text-right">
                         <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                           {testimonial.metric}
                         </div>
                       </div>
                     </div>
                  </div>
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