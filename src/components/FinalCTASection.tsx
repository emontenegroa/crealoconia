
import React from 'react';

const FinalCTASection = () => {
  return (
    <div className="max-w-4xl mx-auto mt-16 text-center">
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-12">
        <h3 className="text-gray-900 text-4xl font-bold mb-8">
          🔥 No busques más excusas para no tener presencia digital
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Antes */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h4 className="font-bold text-red-800 text-xl mb-4">❌ ANTES (sin este Kit IA):</h4>
            <ul className="text-red-700 space-y-2 text-left">
              <li>• Contratar desarrollador web: $2,000+</li>
              <li>• Copywriter para textos: $800+</li>
              <li>• Diseñador gráfico: $500+</li>
              <li>• Estratega de contenido: $1,200+</li>
              <li>• Tiempo invertido: 2-3 meses</li>
              <li>• <strong>Total: $4,500+ y mucho estrés</strong></li>
            </ul>
          </div>
          
          {/* Después */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
            <h4 className="font-bold text-emerald-800 text-xl mb-4">✅ AHORA (con este Kit IA):</h4>
            <ul className="text-emerald-700 space-y-2 text-left">
              <li>• Kit IA personalizado: GRATIS</li>
              <li>• Sitio web profesional: GRATIS</li>
              <li>• Textos de venta incluidos: GRATIS</li>
              <li>• Estrategia de contenido: GRATIS</li>
              <li>• Tiempo invertido: 5 minutos</li>
              <li>• <strong>Total: $0 y cero estrés</strong></li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-100 to-blue-100 border border-emerald-300 rounded-xl p-8 mb-8">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 ¿Por qué te doy esto gratis?
          </h4>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Porque cuando veas el <strong>poder real de la IA aplicada a tu negocio</strong>, 
            querrás que te ayude a llevarlo al siguiente nivel con estrategias más avanzadas.
          </p>
          <p className="text-blue-700 font-semibold text-xl">
            Este es mi regalo para que compruebes por ti mismo lo que es posible.
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 mb-8">
          <p className="text-yellow-800 font-bold text-lg mb-2">
            ⚠️ Importante: No es para todos
          </p>
          <p className="text-yellow-700">
            Solo para emprendedores y profesionales que realmente quieren 
            <strong> resultados medibles</strong> y están dispuestos a implementar 
            las estrategias que recibirán.
          </p>
        </div>

        <div className="bg-red-100 border border-red-300 rounded-xl p-6">
          <p className="text-red-800 font-bold text-xl mb-2">
            🔥 Tu competencia ya está usando IA para escalar
          </p>
          <p className="text-red-700 text-lg">
            Mientras tú sigues posponiendo, otros están capturando TUS clientes 
            con presencia digital profesional y contenido estratégico.
          </p>
          <p className="text-red-900 font-bold text-lg mt-3">
            ¿Vas a seguir esperando o vas a actuar HOY?
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
