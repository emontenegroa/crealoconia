import React from 'react';
import { Zap, TrendingUp, Clock, Star } from 'lucide-react';
const SocialProof = () => {
  return <div className="space-y-6">
      {/* Urgencia/Escasez */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-300/30 rounded-xl p-4 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-red-400 animate-pulse" />
          <div>
            <p className="text-white font-semibold">🔥 Precio de lanzamiento limitado</p>
            <p className="text-red-200 text-sm">Solo para personas seleccionadas</p>
          </div>
        </div>
      </div>

      {/* Beneficios clave */}
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-300/30 rounded-xl p-4 backdrop-blur-lg">
        <div className="flex items-center gap-3 mb-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <p className="text-white font-semibold">✅ Resultados garantizados en minutos</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2 text-green-200">
            <Clock className="w-4 h-4" />
            <span>Contenido listo</span>
          </div>
          <div className="flex items-center gap-2 text-blue-200">
            <Star className="w-4 h-4" />
            <span>Web profesional</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200">
            <Zap className="w-4 h-4" />
            <span>IA personalizada</span>
          </div>
        </div>
      </div>
    </div>;
};
export default SocialProof;