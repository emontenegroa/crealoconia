import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marina",
      company: "La Polilla Azucarada",
      quote: "Probé el Kit IA y la mentoría de Esteban, y sinceramente… fue un antes y un después. Llevaba mucho tiempo (y plata) tratando de tener una página que fuera bonita y que realmente reflejara lo que soy.",
      image: "/lovable-uploads/e0380c49-8f82-4856-9335-d983feca1e1b.png"
    },
    {
      name: "Cami",
      company: "Hampi.cl",
      quote: "Me encanta que esta opción me permita usar mi cuenta de google con la que ya estoy familiarizada, que le agregaron mucho dinamismo a la info que entregué y qué decir de lo rápido del proceso también 🤩",
      image: "/lovable-uploads/e48a73d7-90a6-465c-b6c4-91e0bf88434b.png"
    },
    {
      name: "Rocío Sánchez",
      company: "soyrociosanchez.com",
      quote: "En muy poco tiempo creé un quiz con IA y el resultado fue espectacular. Era parte de un lead magnet, y no solo fue rápido y simple, sino que sentí total acompañamiento.",
      image: "/lovable-uploads/58b8ac39-402a-4cd2-b456-0476134d8376.png"
    },
    {
      name: "Marketéate Lab",
      company: "Agencia de Marketing 360",
      quote: "En pocos días teníamos una web de alto nivel, moderna, funcional y con todo lo que necesitábamos para operar como agencia. La experiencia con Crealoconia fue rápida, profesional y realmente nos sorprendió.",
      image: "/lovable-uploads/c0af655b-7fe3-4d3c-99f5-67b5a3edef7d.png"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            Testimonios Reales
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-500 border-accent/20 hover:border-accent/40 animate-fade-in opacity-0" style={{
              animationDelay: `${index * 200}ms`,
              animationFillMode: 'forwards'
            }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-accent/20 shadow-lg hover:scale-110 transition-transform duration-300" 
                  />
                  <div>
                    <h4 className="font-accent font-semibold text-primary text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-accent font-medium">{testimonial.company}</p>
                  </div>
                </div>
                
                <blockquote className="text-muted-foreground leading-relaxed italic border-l-4 border-accent/20 pl-4">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;