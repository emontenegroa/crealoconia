
import React from 'react';

const FinalCTASection = () => {
  return (
    <div className="max-w-3xl mx-auto mt-16 text-center">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12">
        <h3 className="text-gray-900 text-3xl font-bold mb-6">
          🎯 ¿Por qué crear tu sitio web de esta forma?
        </h3>
        <div className="text-gray-700 text-lg leading-relaxed mb-8 space-y-4">
          <p>✅ <strong>Sin buscar plantillas</strong> - Te creamos todo desde cero</p>
          <p>✅ <strong>Sin escribir textos</strong> - Los generamos automáticamente</p>
          <p>✅ <strong>Sin lidiar con tecnología</strong> - Nosotros nos encargamos</p>
          <p>✅ <strong>Sin contratar agencias</strong> - Proceso directo y personal</p>
          
          <div className="pt-6 border-t border-gray-200">
            <p className="text-blue-600 font-bold text-2xl">🎁 Resultado: Tu sitio web funcionando sin estrés</p>
            <p className="text-gray-900 text-xl font-semibold mt-3">
              Solo completa el formulario y nosotros hacemos el resto
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-8">
          <span>✅ 10 preguntas</span>
          <span>✅ 95% automatizado</span>
          <span>✅ Sitio funcionando</span>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <p className="text-blue-700 font-semibold mb-3 text-lg">
            🚀 ¿Qué pasa después del formulario?
          </p>
          <div className="text-blue-600 space-y-2">
            <p>📧 <strong>Inmediato:</strong> Kit IA con contenido en tu email</p>
            <p>🌐 <strong>24-48 horas:</strong> URL de tu sitio web para revisar</p>
            <p>🎨 <strong>Opcional:</strong> Reunión para ajustes finales</p>
            <p>💼 <strong>Resultado:</strong> Sitio web operativo y listo para clientes</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <p className="text-green-700 font-semibold mb-3 text-lg">
            ✨ Al final tendrás:
          </p>
          <div className="text-green-600 space-y-2">
            <p>🎯 Sitio web 95% terminado sin tu intervención</p>
            <p>🤖 Asistente IA para contenido ilimitado</p>
            <p>🌐 URL funcionando lista para promocionar</p>
            <p>📱 Todo optimizado para atraer clientes</p>
          </div>
        </div>
        
        <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 font-bold">⏰ Deja de postergar tu presencia digital</p>
          <p className="text-red-600 text-sm mt-1">Cada día sin sitio web es una oportunidad perdida</p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
