import React from 'react';
const FinalCTASection = () => {
  return <div className="max-w-3xl mx-auto mt-12 text-center">
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-lg rounded-xl p-8">
        <h3 className="text-white text-2xl font-bold mb-4">
          ¿Por qué este kit completo vale $197 USD?
        </h3>
        <div className="text-purple-100 text-lg leading-relaxed mb-6 space-y-3">
          <p>✅ <strong>15 posts virales + 30 stories + 5 reels</strong> = $89 USD con copywriter</p>
          <p>✅ <strong>Asistente IA de marketing 24/7</strong> = $47 USD/mes con herramientas premium</p>
          <p>✅ <strong>Página web profesional completa</strong> = $97 USD con diseñador</p>
          <div className="pt-3 border-t border-purple-300/30">
            <p className="text-yellow-200 font-bold text-xl">= $197 USD de valor real</p>
            <p className="text-green-200 text-2xl font-black mt-2">
              🎁 Tu precio HOY: $0 - GRATIS
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-sm text-purple-200 mb-6">
          <span>✅ Sin costos ocultos</span>
          <span>✅ Acceso inmediato</span>
          <span>✅ Contenido premium</span>
        </div>
        
        <div className="bg-green-500/20 border border-green-300/30 rounded-lg p-4">
          <p className="text-green-200 font-semibold mb-2">
            📧 ¿Qué pasa después de completar el formulario?
          </p>
          <div className="text-green-300 text-sm space-y-1">
            <p>⚡ <strong>Minuto 1:</strong> Recibes email con tu Kit IA personalizado</p>
            <p>🚀 <strong>Minuto 3:</strong> Ya puedes crear tu primer post viral</p>
            <p>🌟 <strong>Minuto 5:</strong> Tu web profesional está funcionando</p>
          </div>
        </div>
        
        {/* Recordatorio de urgencia */}
        <div className="mt-6 bg-red-500/20 border border-red-300/30 rounded-lg p-3">
          <p className="text-red-200 font-bold text-sm">⏰ Disponible GRATIS por muy poco tiempo</p>
        </div>
      </div>
    </div>;
};
export default FinalCTASection;