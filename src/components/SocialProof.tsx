
import React from 'react';
import { Zap, Clock, Star } from 'lucide-react';

const SocialProof = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 rounded-full p-3">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-lg">Sin perder tiempo</p>
            <p className="text-gray-600">Web en 48 horas</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 rounded-full p-3">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-lg">Sin estrés técnico</p>
            <p className="text-gray-600">Todo automático</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 rounded-full p-3">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-lg">Sin plantillas</p>
            <p className="text-gray-600">100% personalizado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
