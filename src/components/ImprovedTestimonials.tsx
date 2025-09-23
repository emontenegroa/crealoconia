import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";

const ImprovedTestimonials = () => {
  const testimonials = [
    {
      name: "María González",
      role: "Coach de Vida",
      image: "/lovable-uploads/ejemplos-emprendedora.png",
      quote: "En 3 días ya tenía 15 leads nuevos desde mi sitio web. El super prompt me ayudó a crear contenido que realmente conecta.",
      result: "+300% leads en 2 semanas",
      website: "#"
    },
    {
      name: "Carlos Mendoza", 
      role: "Consultor Digital",
      image: "/lovable-uploads/ejemplos-dojo.png",
      quote: "Mi sitio anterior no generaba nada. Con este nuevo enfoque, ya cerré 2 mentorías en el primer mes.",
      result: "$680.000 CLP facturados",
      website: "#"
    },
    {
      name: "Ana Sofía Torres",
      role: "Terapeuta Holística",
      image: "/lovable-uploads/ejemplos-sonrisas.png", 
      quote: "El prompt me dio ideas de contenido para 6 meses. Mi Instagram creció de 800 a 2.300 seguidores.",
      result: "+190% seguidores",
      website: "#"
    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Resultados Reales de Nuestros Clientes
          </h2>
          <p className="text-xl text-gray-700">
            No son solo testimonios bonitos. Son resultados medibles:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>

                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-3 mb-3">
                  <p className="text-center font-bold text-emerald-800">
                    📈 {testimonial.result}
                  </p>
                </div>

                <div className="text-center">
                  <a 
                    href={testimonial.website}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                  >
                    Ver sitio web <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-blue-50 border-blue-200 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                🎯 Promedio de resultados de nuestros clientes:
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">+250%</div>
                  <div className="text-blue-700 text-sm">Aumento en leads</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">72h</div>
                  <div className="text-emerald-700 text-sm">Primer contacto</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">4.9/5</div>
                  <div className="text-purple-700 text-sm">Satisfacción</div>
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