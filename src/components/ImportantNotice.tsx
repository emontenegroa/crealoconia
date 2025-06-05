
import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Zap, Globe, Mail, Sparkles, DollarSign } from 'lucide-react';

const ImportantNotice = () => {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      {/* Lo que recibes */}
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 rounded-2xl p-8 mb-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-900">🌐 Tu sitio web profesional GRATIS</h2>
          </div>
          <p className="text-xl text-gray-700 font-semibold">
            La primera versión de tu sitio web completamente personalizado para revisar
          </p>
        </div>

        <div className="bg-white border border-emerald-200 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-emerald-800 mb-6 text-center">✨ Lo que incluye tu sitio web:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ul className="space-y-3 text-emerald-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Diseño profesional y moderno</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Textos de venta optimizados</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Estructura clara y persuasiva</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Responsive (se ve perfecto en móvil)</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3 text-emerald-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Secciones estratégicas de conversión</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Llamadas a la acción efectivas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Optimizado para buscadores (SEO)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Carga rápida y profesional</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-300 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-800">💰 Si te encanta tu sitio web...</h3>
          </div>
          <p className="text-blue-700 text-lg mb-3">
            <strong>Precio fijo: $197.000 CLP</strong> para mejorarlo, optimizarlo y publicarlo oficialmente.
          </p>
          <p className="text-blue-600 text-base">
            Incluye reunión personalizada para implementar mejoras y dejarlo 100% listo para generar ventas.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-6 h-6 text-yellow-600" />
            <h4 className="text-lg font-bold text-yellow-800">🎁 Bonus Incluido: Super Prompt IA</h4>
          </div>
          <p className="text-yellow-700">
            Recibes también tu asistente IA personalizado que genera contenido ilimitado para redes sociales, 
            emails de marketing, guiones de venta y mucho más.
          </p>
        </div>
      </div>

      {/* Proceso simple */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 mb-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">⚡ Proceso ultra simple</h2>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Completas 10 preguntas</h3>
            <p className="text-gray-700">5 minutos máximo. Sobre tu negocio, servicios y objetivos digitales.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Recibes la URL para revisar</h3>
            <p className="text-gray-700">Tu sitio web funcionando + tu Super Prompt IA por email.</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Si te gusta, lo publicamos</h3>
            <p className="text-gray-700">Reunión de mejoras + publicación oficial por $197.000 CLP.</p>
          </div>
        </div>
      </div>

      {/* Mensaje importante */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎯 ¿Por qué genero tu sitio web gratis?
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Porque cuando veas la <strong>calidad profesional y el potencial de ventas</strong> 
            de tu sitio personalizado, querrás que lo optimicemos y publiquemos oficialmente.
          </p>
          <p className="text-purple-700 font-semibold text-xl">
            ✨ Esta es mi forma de demostrarte que realmente sé crear sitios que venden
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportantNotice;
