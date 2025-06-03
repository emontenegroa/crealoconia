
import React from 'react';
const FinalCTASection = () => {
  return <div className="max-w-3xl mx-auto mt-12 text-center">
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-lg rounded-xl p-8">
        <h3 className="text-white text-2xl font-bold mb-4">
          🎯 ¿Por qué este Kit IA es diferente a todo lo que has visto?
        </h3>
        <div className="text-purple-100 text-lg leading-relaxed mb-6 space-y-3">
          <p>✅ <strong>Contenido personalizado</strong> - No son plantillas genéricas</p>
          <p>✅ <strong>Tu sitio web real</strong> - URL funcionando que podrás revisar</p>
          <p>✅ <strong>Asistente IA entrenado</strong> - Para seguir creando contenido ilimitado</p>
          <p>✅ <strong>Implementación guiada</strong> - Te acompañamos en el proceso</p>
          <div className="pt-3 border-t border-purple-300/30">
            <p className="text-yellow-200 font-bold text-xl">🎁 Todo esto... completamente accesible</p>
            <p className="text-green-200 text-lg font-semibold mt-2">
              Solo completa el formulario y comienza ahora
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-sm text-purple-200 mb-6">
          <span>✅ Acceso inmediato</span>
          <span>✅ Contenido personalizado</span>
          <span>✅ Sitio web incluido</span>
        </div>
        
        <div className="bg-blue-500/20 border border-blue-300/30 rounded-lg p-4 mb-4">
          <p className="text-blue-200 font-semibold mb-2">
            🚀 ¿Qué pasa después de completar el formulario?
          </p>
          <div className="text-blue-300 text-sm space-y-1">
            <p>📧 <strong>Inmediato:</strong> Recibes tu Kit IA personalizado por email</p>
            <p>🌐 <strong>En 24-48 horas:</strong> Te enviamos la URL de tu sitio web para revisión</p>
            <p>🎨 <strong>Después:</strong> Puedes solicitar ajustes y personalizaciones</p>
            <p>💼 <strong>Resultado:</strong> Presencia digital profesional funcionando</p>
          </div>
        </div>

        <div className="bg-green-500/20 border border-green-300/30 rounded-lg p-4 mb-4">
          <p className="text-green-200 font-semibold mb-2">
            ✨ Lo que vas a tener al final:
          </p>
          <div className="text-green-300 text-sm space-y-1">
            <p>🎯 Contenido para 15 días listo para publicar</p>
            <p>🤖 Tu propio asistente IA para generar más contenido</p>
            <p>🌐 Sitio web profesional con tu URL personalizada</p>
            <p>📱 Presencia digital que atrae clientes automáticamente</p>
          </div>
        </div>
        
        {/* Recordatorio de exclusividad */}
        <div className="mt-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-300/30 rounded-lg p-3">
          <p className="text-red-200 font-bold text-sm">⏰ Acceso limitado - Solo para emprendedores seleccionados</p>
          <p className="text-orange-200 text-xs mt-1">Esta oportunidad puede cerrarse sin previo aviso</p>
        </div>
      </div>
    </div>;
};
export default FinalCTASection;
