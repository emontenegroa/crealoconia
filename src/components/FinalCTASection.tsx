
import React from 'react';

const FinalCTASection = () => {
  return (
    <div className="max-w-3xl mx-auto mt-12 text-center">
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-lg rounded-xl p-8">
        <h3 className="text-white text-2xl font-bold mb-4">
          ¿Por qué te doy esto gratis?
        </h3>
        <p className="text-purple-100 text-lg leading-relaxed mb-6">
          Porque sé que cuando veas la calidad del contenido que genero, 
          querrás trabajar conmigo en proyectos más grandes. 
          <br />
          <strong className="text-yellow-200">Esta es mi forma de mostrarte el poder de la IA aplicada correctamente.</strong>
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-purple-200">
          <span>✅ Sin tarjeta de crédito</span>
          <span>✅ Sin suscripciones</span>
          <span>✅ Sin letra pequeña</span>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
