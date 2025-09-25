import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";

const ImprovedTestimonials = () => {
  const testimonials = [
    {
      name: "Cami",
      role: "Fundadora de Hampi.cl",
      image: "/lovable-uploads/ejemplos-emprendedora.png",
      quote: "He vivido procesos muy engorrosos, me pedían mucha información que se copiaba y pegaba tal cual, sin dinamismo. Me encanta que esta opción me permita usar mi cuenta de google y el dinamismo que le agregaron a mi info. Quedé muy impresionada de ver todo lo que construyeron con solo responder 10 preguntas 👏🏻",
      result: "4to intento exitoso",
      website: "https://hampi.cl"
    },
    {
      name: "Marina", 
      role: "Fundadora de La Polilla Azucarada",
      image: "/lovable-uploads/ejemplos-sonrisas.png",
      quote: "Probé el Kit IA y la mentoría de Esteban, y sinceramente… fue un antes y un después. Llevaba mucho tiempo (y plata) tratando de tener una página que fuera bonita y que realmente reflejara lo que soy. Con este sistema, en pocos días obtuve una web que me representa de verdad, y sin enredos.",
      result: "Página en 24 horas",
      website: "https://lapolillaazucarada.cl"
    },
    {
      name: "Rocío Sánchez",
      role: "soyrociosanchez.com",
      image: "/lovable-uploads/ejemplos-dojo.png", 
      quote: "En muy poco tiempo creé un quiz con IA y el resultado fue espectacular. Era parte de un lead magnet, y no solo fue rápido y simple, sino que sentí total acompañamiento. Esteban no solo entrega tecnología, te mentorea con claridad y generosidad.",
      result: "Quiz con IA exitoso",
      website: "https://rociosanchez-quiz.crealoconia.com/"
    }
  ];

  return (
    <div className="py-16 bg-card">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Casos de Éxito Reales
          </h2>
          <p className="text-xl text-muted-foreground">
            Estos son algunos de nuestros clientes que ya tienen su página web funcionando:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-border hover:shadow-lg transition-shadow duration-300 bg-background">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-foreground">{testimonial.name}</h3>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-foreground mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>

                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-3">
                  <p className="text-center font-bold text-emerald-600">
                    📈 {testimonial.result}
                  </p>
                </div>

                <div className="text-center">
                  <a 
                    href={testimonial.website}
                    className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                  >
                    Ver sitio web <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-primary/10 border-primary/30 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-primary mb-2">
                🎯 Estadísticas de CrealoconIA:
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">24h</div>
                  <div className="text-muted-foreground text-sm">Tiempo de entrega</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">50+</div>
                  <div className="text-muted-foreground text-sm">Páginas creadas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent-foreground">100%</div>
                  <div className="text-muted-foreground text-sm">Con IA</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImprovedTestimonials;