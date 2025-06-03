
import React from 'react';
import { Zap, Clock, Star } from 'lucide-react';

const SocialProof = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-300/30 backdrop-blur-lg rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-green-400" />
          <div>
            <p className="text-white font-semibold">Sin perder tiempo</p>
            <p className="text-green-200 text-sm">Web en 48 horas</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 backdrop-blur-lg rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-purple-400" />
          <div>
            <p className="text-white font-semibold">Sin estrés técnico</p>
            <p className="text-purple-200 text-sm">Todo automático</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-300/30 backdrop-blur-lg rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Star className="w-5 h-5 text-yellow-400" />
          <div>
            <p className="text-white font-semibold">Sin plantillas</p>
            <p className="text-yellow-200 text-sm">100% personalizado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
