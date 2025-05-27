
import React from 'react';

const FinalCTASection = () => {
  return (
    <div className="max-w-3xl mx-auto mt-12 text-center">
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-lg rounded-xl p-8">
        <h3 className="text-white text-2xl font-bold mb-4">
          ¿Por qué cambié de gratuito a $197?
        </h3>
        <p className="text-purple-100 text-lg leading-relaxed mb-6">
          Después de ver los resultados increíbles que generaba este kit, me di cuenta del valor real que entrega. 
          Te ahorra semanas de trabajo que te costarían +$1,500 USD si contrataras profesionales.
          <br />
          <strong className="text-yellow-200">$197 USD es una inversión mínima para el valor que obtienes.</strong>
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-purple-200 mb-6">
          <span>✅ Sin costos ocultos</span>
          <span>✅ Acceso inmediato</span>
          <span>✅ Garantía 30 días</span>
        </div>
        <div className="bg-green-500/20 border border-green-300/30 rounded-lg p-4">
          <p className="text-green-200 font-semibold">
            🚀 Precio de lanzamiento: Solo los primeros 100 usuarios pagarán $197
          </p>
          <p className="text-green-300 text-sm mt-2">
            Después el precio subirá a $497 USD (precio real de mercado)
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
