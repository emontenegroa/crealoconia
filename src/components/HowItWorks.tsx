
import React from 'react';

const HowItWorks = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">¿Cómo funciona el Kit IA?</h2>
      
      <div className="space-y-8">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              1
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Completa el formulario</h3>
            <p className="text-gray-700 text-lg leading-relaxed">Respondes 10 preguntas simples sobre tu negocio, tus servicios y la presencia digital que quieres construir. Con esta información recopilamos los datos clave para generar el contenido alineado a lo que realmente ofreces.</p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              2
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Recibes tu Super Prompt IA</h3>
            <p className="text-gray-700 text-lg leading-relaxed">Apenas terminas el formulario, generamos y te enviamos tu Super Prompt personalizado para ChatGPT. Este prompt está diseñado específicamente para tu negocio, y te permite crear contenido profesional, publicaciones, ideas de venta y materiales de marketing con IA de forma ilimitada. Te lo entregamos listo para copiar y usar directamente en ChatGPT.</p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              3
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Generamos tu sitio web profesional</h3>
            <p className="text-gray-700 text-lg leading-relaxed">Con tus respuestas generamos internamente la primera versión de tu sitio web. Normalmente lo tenemos listo en minutos, aunque dependiendo de la demanda puede tardar hasta un máximo de 4 horas. Nuestro equipo revisa y ajusta cada sitio antes de enviártelo, para garantizarte una base profesional, no una plantilla genérica. Cuando tu sitio esté listo, recibirás por email la URL para que lo revises y valides.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
