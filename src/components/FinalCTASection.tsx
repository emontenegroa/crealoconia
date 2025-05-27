
import React from 'react';

const FinalCTASection = () => {
  return (
    <div className="max-w-3xl mx-auto mt-12 text-center">
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-lg rounded-xl p-8">
        <h3 className="text-white text-2xl font-bold mb-4">
          ¿Por qué este kit vale $197 USD?
        </h3>
        <p className="text-purple-100 text-lg leading-relaxed mb-6">
          Te ahorra semanas de trabajo que te costarían +$1,500 USD si contrataras profesionales.
          <br />
          <strong className="text-yellow-200">Pero hoy es 100% GRATIS para ti.</strong>
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-purple-200 mb-6">
          <span>✅ Sin costos ocultos</span>
          <span>✅ Acceso inmediato</span>
          <span>✅ Contenido premium</span>
        </div>
        <div className="bg-green-500/20 border border-green-300/30 rounded-lg p-4">
          <p className="text-green-200 font-semibold">
            🎁 Kit completamente GRATUITO
          </p>
          <p className="text-green-300 text-sm mt-2">
            Solo completa el formulario y recibe tu kit personalizado
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
