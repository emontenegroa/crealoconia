
import React from 'react';

const HowItWorks = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">¿Cómo funciona Hazlo con IA?</h2>
      
      <div className="space-y-8">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              1
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Completas el formulario</h3>
            <p className="text-gray-700 text-lg leading-relaxed">Respondes 10 preguntas simples sobre tu negocio, tus servicios y el tipo de presencia digital que quieres construir. Nos das la información clave para crear contenido alineado a lo que realmente ofreces.</p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              2
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Recibes Hazlo con IA</h3>
            <p className="text-gray-700 text-lg leading-relaxed">Apenas terminas el formulario, generamos y te enviamos:  
Los textos base para tu web profesional,  Un prompt exclusivo para seguir creando contenido con IA asociado a tu información,  15 días de publicaciones. 
Todo lo que necesitas para empezar a construir tu presencia online con claridad.</p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              3
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Tu sitio web estará listo</h3>
            <p className="text-gray-700 text-lg leading-relaxed">Con tus respuestas generamos internamente la primera versión de tu sitio web, listo para revisar.
Normalmente lo tenemos en minutos, aunque en horas de alta demanda puede tardar un máximo de 4 horas.
Nuestro equipo revisa cada sitio antes de enviártelo para garantizar que recibas una base profesional, no solo una plantilla genérica.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
