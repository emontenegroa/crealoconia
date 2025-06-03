
import React from 'react';

const FinalCTASection = () => {
  return (
    <div className="max-w-3xl mx-auto mt-12 text-center">
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-lg rounded-xl p-8">
        <h3 className="text-white text-2xl font-bold mb-4">
          🎯 ¿Por qué crear tu sitio web de esta forma?
        </h3>
        <div className="text-purple-100 text-lg leading-relaxed mb-6 space-y-3">
          <p>✅ <strong>Sin buscar plantillas</strong> - Te creamos todo desde cero</p>
          <p>✅ <strong>Sin escribir textos</strong> - Los generamos automáticamente</p>
          <p>✅ <strong>Sin lidiar con tecnología</strong> - Nosotros nos encargamos</p>
          <p>✅ <strong>Sin contratar agencias</strong> - Proceso directo y personal</p>
          <div className="pt-3 border-t border-purple-300/30">
            <p className="text-yellow-200 font-bold text-xl">🎁 Resultado: Tu sitio web funcionando sin estrés</p>
            <p className="text-green-200 text-lg font-semibold mt-2">
              Solo completa el formulario y nosotros hacemos el resto
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-sm text-purple-200 mb-6">
          <span>✅ 10 preguntas</span>
          <span>✅ 95% automatizado</span>
          <span>✅ Sitio funcionando</span>
        </div>
        
        <div className="bg-blue-500/20 border border-blue-300/30 rounded-lg p-4 mb-4">
          <p className="text-blue-200 font-semibold mb-2">
            🚀 ¿Qué pasa después del formulario?
          </p>
          <div className="text-blue-300 text-sm space-y-1">
            <p>📧 <strong>Inmediato:</strong> Kit IA con contenido en tu email</p>
            <p>🌐 <strong>24-48 horas:</strong> URL de tu sitio web para revisar</p>
            <p>🎨 <strong>Opcional:</strong> Reunión para ajustes finales</p>
            <p>💼 <strong>Resultado:</strong> Sitio web operativo y listo para clientes</p>
          </div>
        </div>

        <div className="bg-green-500/20 border border-green-300/30 rounded-lg p-4 mb-4">
          <p className="text-green-200 font-semibold mb-2">
            ✨ Al final tendrás:
          </p>
          <div className="text-green-300 text-sm space-y-1">
            <p>🎯 Sitio web 95% terminado sin tu intervención</p>
            <p>🤖 Asistente IA para contenido ilimitado</p>
            <p>🌐 URL funcionando lista para promocionar</p>
            <p>📱 Todo optimizado para atraer clientes</p>
          </div>
        </div>
        
        {/* Urgencia sin ser falsa */}
        <div className="mt-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-300/30 rounded-lg p-3">
          <p className="text-red-200 font-bold text-sm">⏰ Deja de postergar tu presencia digital</p>
          <p className="text-orange-200 text-xs mt-1">Cada día sin sitio web es una oportunidad perdida</p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTASection;
