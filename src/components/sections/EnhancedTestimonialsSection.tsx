import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ScrollAnimation from '@/components/ScrollAnimation';

const EnhancedTestimonialsSection = () => {
  const testimonials = [
    {
      name: "María González",
      role: "Coach de Vida",
      avatar: "MG",
      content: "Después de 6 meses intentando crear mi web con diferentes plataformas, Esteban lo resolvió en una sesión. No solo tengo una web profesional, sino que ya estoy recibiendo clientes a través de ella. La IA realmente entendió mi mensaje y lo tradujo perfectamente.",
      result: "300% más consultas en 2 meses",
      business: "Coaching personal"
    },
    {
      name: "Carlos Mendoza",
      role: "Abogado Especialista",
      avatar: "CM",
      content: "Como abogado, necesitaba transmitir confianza y autoridad. La web que me creó Esteban no solo se ve increíblemente profesional, sino que el contenido generado por IA capturó exactamente mi expertise. Mis colegas no pueden creer que se hizo con IA.",
      result: "250% más casos nuevos",
      business: "Derecho corporativo"
    },
    {
      name: "Ana Rodríguez",
      role: "Consultora de Negocios",
      avatar: "AR",
      content: "Había gastado más de $5,000 en agencias que me entregaron webs genéricas. Con Esteban obtuve una web que realmente me representa y vende mis servicios. El proceso fue tan fácil que hasta yo podría replicarlo para mis propios clientes.",
      result: "ROI del 400% en 3 meses",
      business: "Consultoría empresarial"
    },
    {
      name: "Roberto Silva",
      role: "Mentor de Emprendimiento",
      avatar: "RS",
      content: "Lo que más me impresionó fue cómo la IA entendió mi metodología y la plasmó en la web mejor de lo que yo hubiera podido explicar. Ahora tengo una herramienta de ventas 24/7 que trabaja mientras duermo.",
      result: "Automatizó 70% de sus ventas",
      business: "Mentoring empresarial"
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
                        <div className="text-sm text-muted-foreground">Resultado</div>
                        <div className="font-semibold text-accent">{testimonial.result}</div>
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