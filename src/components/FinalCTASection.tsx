
import React from 'react';

const FinalCTASection = () => {
  return (
    <div className="max-w-4xl mx-auto mt-16 text-center">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-12">
        <h3 className="text-gray-900 text-4xl font-bold mb-8">
          🔥 Deja de postergar tu presencia digital profesional
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Antes */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h4 className="font-bold text-red-800 text-xl mb-4">❌ MÉTODO TRADICIONAL:</h4>
            <ul className="text-red-700 space-y-2 text-left">
              <li>• Contratar desarrollador web: $500.000+</li>
              <li>• Copywriter para textos: $200.000+</li>
              <li>• Diseñador gráfico: $150.000+</li>
              <li>• Tiempo de desarrollo: 2-3 meses</li>
              <li>• Sin garantía de que venda</li>
              <li>• <strong>Total: $850.000+ y meses de espera</strong></li>
            </ul>
          </div>
          
          {/* Después */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h4 className="font-bold text-emerald-800 text-xl mb-4">✅ CON NUESTRO MÉTODO:</h4>
            <ul className="text-emerald-700 space-y-2 text-left">
              <li>• Sitio web de muestra: GRATIS</li>
              <li>• Textos de venta optimizados: INCLUIDOS</li>
              <li>• Diseño profesional: INCLUIDO</li>
              <li>• Tiempo de generación: Minutos</li>
              <li>• Solo pagas si te encanta el resultado</li>
              <li>• <strong>Mejoras y publicación: Solo $197.000</strong></li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-100 to-blue-100 border border-emerald-300 rounded-xl p-8 mb-8">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 La diferencia está en la estrategia
          </h4>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            No es solo un sitio web bonito. Es una <strong>máquina de generar clientes</strong> 
            diseñada específicamente para tu negocio y tu audiencia.
          </p>
          <p className="text-blue-700 font-semibold text-xl">
            Primero lo ves funcionando, después decides si quieres llevarlo al siguiente nivel.
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 mb-8">
          <p className="text-yellow-800 font-bold text-lg mb-2">
            ⚠️ Solo para emprendedores serios
          </p>
          <p className="text-yellow-700">
            Que realmente quieren <strong>resultados medibles</strong> y están listos para 
            tener la presencia digital que su negocio merece.
          </p>
        </div>

        <div className="bg-red-100 border border-red-300 rounded-xl p-6">
          <p className="text-red-800 font-bold text-xl mb-2">
            🚨 Mientras lees esto, tu competencia ya está vendiendo online
          </p>
          <p className="text-red-700 text-lg">
            Cada día que esperas es un día que pierdes clientes potenciales. 
            Tu sitio web puede estar listo en minutos.
          </p>
          <p className="text-red-900 font-bold text-lg mt-3">
            ¿Vas a seguir esperando el "momento perfecto" o vas a actuar HOY?
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
