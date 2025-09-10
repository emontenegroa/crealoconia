import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
const TestimonialsSection = () => {
  const testimonials = [{
    name: "Marina",
    role: "La Polilla Azucarada",
    image: "/lovable-uploads/e48a73d7-90a6-465c-b6c4-91e0bf88434b.png",
    quote: "En pocos días obtuve una web que me representa de verdad. Rápido, confiable y con resultados que me emocionaron.",
    result: "+50% leads en 1 semana"
  }, {
    name: "Marketéate Lab",
    role: "Agencia Marketing",
    image: "/lovable-uploads/c0af655b-7fe3-4d3c-99f5-67b5a3edef7d.png",
    quote: "En pocos días teníamos una web de alto nivel con IA integrada. La experiencia fue rápida y profesional.",
    result: "Web lista en 1 día"
  }];
  return <div className="max-w-6xl mx-auto mb-16 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Resultados reales
        </h2>
      </div>

      {/* Testimonials Grid - Compacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-4 border border-gray-200">
            <CardContent className="p-0">
              <div className="flex items-center gap-3 mb-3">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              
              <p className="text-gray-700 mb-3 text-sm">"{testimonial.quote}"</p>
              
              <div className="bg-blue-50 p-3 rounded">
                <p className="text-blue-700 font-bold text-sm">{testimonial.result}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          Ver más historias →
        </button>
      </div>
    </div>;
};
export default TestimonialsSection;