
import React from 'react';

const HowItWorks = () => {
  return (
    <div className="max-w-3xl mx-auto mb-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
        ¿Cómo funciona?
      </h2>
      
      <div className="space-y-8">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              1
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Completas el formulario</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              10 preguntas sobre tu negocio y servicios. Nos cuentas qué haces y cómo te quieres ver online.
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              2
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Recibes tu Kit IA</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Al instante en tu email: prompts personalizados para generar contenido ilimitado y textos para tu web.
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              3
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Nosotros creamos tu web</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              En 24-48 horas tienes tu sitio web funcionando, optimizado y listo para recibir clientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
