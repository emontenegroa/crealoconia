import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const TestimonialsSection = () => {
  const testimonials = [
    {
      badge: "CONSULTORÍA 1:1",
      name: "Cami",
      company: "Hampi.cl",
      quote: "Me encanta que esta opción me permita usar mi cuenta de google con la que ya estoy familiarizada, que le agregaron mucho dinamismo a la info que entregué y qué decir de lo rápido del proceso también 🤩",
      image: "/lovable-uploads/e48a73d7-90a6-465c-b6c4-91e0bf88434b.png",
      badgeColor: "bg-primary/10 text-primary"
    },
    {
      badge: "WEB PERSONALIZADA",
      name: "Marina",
      company: "La Polilla Azucarada",
      quote: "Probé el Kit IA y la mentoría de Esteban, y sinceramente… fue un antes y un después. Llevaba mucho tiempo (y plata) tratando de tener una página que fuera bonita y que realmente reflejara lo que soy.",
      image: "/lovable-uploads/e0380c49-8f82-4856-9335-d983feca1e1b.png",
      badgeColor: "bg-accent/10 text-accent"
    },
    {
      badge: "LEAD MAGNET CON IA",
      name: "Rocío Sánchez",
      company: "soyrociosanchez.com",
      quote: "En muy poco tiempo creé un quiz con IA y el resultado fue espectacular. Era parte de un lead magnet, y no solo fue rápido y simple, sino que sentí total acompañamiento.",
      image: "/lovable-uploads/58b8ac39-402a-4cd2-b456-0476134d8376.png",
      badgeColor: "bg-green-500/10 text-green-600"
    },
    {
      badge: "AGENCIA 360",
      name: "Marketéate Lab",
      company: "Agencia de Marketing 360",
      quote: "En pocos días teníamos una web de alto nivel, moderna, funcional y con todo lo que necesitábamos para operar como agencia. La experiencia con Crealoconia fue rápida, profesional y realmente nos sorprendió.",
      image: "/lovable-uploads/c0af655b-7fe3-4d3c-99f5-67b5a3edef7d.png",
      badgeColor: "bg-purple-500/10 text-purple-600"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-6">
              Casos de Éxito
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
              Testimonios reales de emprendedores que han transformado su presencia digital
            </p>
          </div>
        </ScrollAnimation>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollAnimation key={index} delay={index * 200}>
               <Card className="glass-effect border-accent/20 hover:border-accent/40 transition-all duration-700 group hover:scale-105 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.5)] transform hover:-translate-y-2">
                 <CardContent className="p-8">
                   {/* Badge */}
                   <div className="mb-6">
                     <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${testimonial.badgeColor}`}>
                       {testimonial.badge}
                     </span>
                   </div>

                   {/* Author Header */}
                   <div className="flex items-center gap-4 mb-6">
                     <div className="relative">
                       <img 
                         src={testimonial.image} 
                         alt={testimonial.name} 
                         className="w-16 h-16 rounded-full object-cover border-2 border-accent/30 shadow-lg group-hover:scale-110 transition-transform duration-500" 
                       />
                       <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse" />
                     </div>
                     <div>
                       <h4 className="font-accent font-semibold text-primary text-lg group-hover:text-accent transition-colors duration-300">
                         {testimonial.name}
                       </h4>
                       <p className="text-sm text-muted-foreground font-medium">
                         {testimonial.company}
                       </p>
                     </div>
                   </div>
                   
                   {/* Quote */}
                   <blockquote className="text-foreground leading-relaxed italic border-l-4 border-accent/30 pl-4 mb-6 group-hover:border-accent/60 transition-colors duration-300">
                     "{testimonial.quote}"
                   </blockquote>
                   
                   {/* CTA Button */}
                   <Button 
                     variant="ghost" 
                     size="sm"
                     className="font-accent font-medium hover:bg-accent/10 hover:text-accent transition-all duration-300"
                   >
                     Ver sitio →
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

export default TestimonialsSection;