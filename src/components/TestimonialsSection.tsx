import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
const TestimonialsSection = () => {
  const testimonials = [{
    name: "Cami",
    role: "Fundadora de Hampi.cl",
    image: "/lovable-uploads/e48a73d7-90a6-465c-b6c4-91e0bf88434b.png",
    quote: "He vivido procesos muy engorrosos, me pedían mucha información que se copiaba y pegaba tal cual, sin dinamismo o gráficas atractivas, lo que siento que hacía las páginas poco atractivas. Y nunca enganché bien con las plataformas de correos institucionales. Me encanta que esta opción me permita usar mi cuenta de google con la que ya estoy familiarizada, que le agregaron mucho dinamismo a la info que entregué y qué decir de lo rápido del proceso también 🤩 quedé muy impresionada de ver todo lo que construyeron con solo responder 10 preguntas 👏🏻👏🏻👏🏻",
    result: "Optimizó su flujo de inscripciones con claridad"
  }, {
    name: "Marina",
    role: "Fundadora de La Polilla Azucarada",
    image: "/lovable-uploads/e0380c49-8f82-4856-9335-d983feca1e1b.png",
    quote: "Probé el Kit IA y la mentoría de Esteban, y sinceramente… fue un antes y un después. Llevaba mucho tiempo (y plata) tratando de tener una página que fuera bonita y que realmente reflejara lo que soy. Pero solo me llevé frustraciones, tiempo perdido y desilusiones. Con este sistema, en pocos días obtuve una web que me representa de verdad, y sin enredos. Rápido, confiable y con resultados que me emocionaron. Gracias Esteban, tu mentoría vale totalmente la pena. 💛",
    result: "Web que la representa de verdad en pocos días"
  }, {
    name: "Rocío Sánchez",
    role: "soyrociosanchez.com",
    image: "/lovable-uploads/58b8ac39-402a-4cd2-b456-0476134d8376.png",
    quote: "En muy poco tiempo creé un quiz con IA y el resultado fue espectacular. Era parte de un lead magnet, y no solo fue rápido y simple, sino que sentí total acompañamiento. Esteban no solo entrega tecnología, te mentorea con claridad y generosidad. La experiencia fue fluida y transformadora.",
    result: "Quiz con IA espectacular como lead magnet"
  }, {
    name: "Marketéate Lab",
    role: "Agencia de Marketing 360",
    image: "/lovable-uploads/c0af655b-7fe3-4d3c-99f5-67b5a3edef7d.png",
    quote: "En pocos días teníamos una web de alto nivel, moderna, funcional y con todo lo que necesitábamos para operar como agencia. Integración con formulario de contacto, newsletter, chat en vivo e inteligencia artificial. La experiencia con Crealoconia fue rápida, profesional y realmente nos sorprendió.",
    result: "Web moderna y funcional con IA integrada"
  }];
  return <div className="max-w-6xl mx-auto mb-16 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 my-[30px]">
          Historias de Transformación Real
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Estos son algunos de los emprendedores que han transformado su presencia digital 
          y multiplicado sus resultados con nuestra metodología única.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => <Card key={index} className="hover:shadow-lg transition-all duration-500 border-gray-200 hover:scale-105 animate-fade-in opacity-0" style={{
        animationDelay: `${index * 200}ms`,
        animationFillMode: 'forwards'
      }}>
            <CardContent className="p-6">
              {/* Author at top */}
              <div className="flex items-center gap-4 mb-6">
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover border-3 border-blue-200 shadow-lg hover:scale-110 transition-transform duration-300" />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 hover:scale-125 transition-transform duration-200" style={{
              animationDelay: `${index * 200 + i * 100}ms`
            }} />)}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic border-l-4 border-gray-200 pl-4">
                "{testimonial.quote}"
              </blockquote>

              {/* Result highlight */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 font-semibold text-lg">🎯</span>
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Resultado:</p>
                    <p className="text-blue-700 font-bold">{testimonial.result}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>
    </div>;
};
export default TestimonialsSection;