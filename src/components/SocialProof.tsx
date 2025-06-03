
import React from 'react';
import { Zap, TrendingUp, Clock, Star, Users, Award } from 'lucide-react';

const SocialProof = () => {
  return (
    <div className="space-y-6">
      {/* Dolor principal que resolvemos */}
      <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-300/30 rounded-xl p-4 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-red-400 animate-pulse" />
          <div>
            <p className="text-white font-semibold">🔥 Deja de perder tiempo</p>
            <p className="text-red-200 text-sm">Miles de plantillas, textos que escribir, tecnología que no entiendes</p>
          </div>
        </div>
      </div>

      {/* Lo que logras con nosotros */}
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-300/30 rounded-xl p-4 backdrop-blur-lg">
        <div className="flex items-center gap-3 mb-3">
          <Award className="w-5 h-5 text-yellow-400" />
          <p className="text-white font-semibold">✅ Con este sistema obtienes</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2 text-green-200">
            <Clock className="w-4 h-4" />
            <span>Sitio web en 48 horas</span>
          </div>
          <div className="flex items-center gap-2 text-blue-200">
            <Star className="w-4 h-4" />
            <span>95% terminado automáticamente</span>
          </div>
          <div className="flex items-center gap-2 text-purple-200">
            <Users className="w-4 h-4" />
            <span>Listo para recibir clientes</span>
          </div>
        </div>
      </div>

      {/* Diferenciador clave */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 rounded-xl p-4 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-white font-semibold">⚡ La diferencia: Sin plantillas genéricas</p>
            <p className="text-purple-200 text-sm">Cada sitio se crea específicamente según tus respuestas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
