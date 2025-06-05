
import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Zap, Globe, Mail, Sparkles } from 'lucide-react';

const ImportantNotice = () => {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      {/* Lo que recibes */}
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 rounded-2xl p-8 mb-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
            <h2 className="text-3xl font-bold text-gray-900">🎯 Esto es lo que vas a recibir</h2>
          </div>
          <p className="text-xl text-gray-700 font-semibold">
            Un asistente IA completo que genera todo lo que necesitas para dominar tu mercado
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-emerald-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-bold text-emerald-800">📱 Contenido para Redes Sociales</h3>
            </div>
            <ul className="space-y-2 text-emerald-700">
              <li>1️⃣ Publicaciones virales (carrousel, post de autoridad, contenido de ventas)</li>
              <li>2️⃣ Guiones de Reels y Shorts para viralización y captación</li>
              <li>3️⃣ Historias de Instagram con engagement emocional y venta indirecta</li>
              <li>4️⃣ Series educativas para construir autoridad y lead magnet</li>
              <li>5️⃣ Preguntas frecuentes convertidas en contenido educativo</li>
            </ul>
          </div>

          <div className="bg-white border border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-blue-800">💰 Estrategias de Venta y Marketing</h3>
            </div>
            <ul className="space-y-2 text-blue-700">
              <li>6️⃣ Secuencias de email marketing (captación, nutrición, lanzamiento)</li>
              <li>7️⃣ Guiones de venta (para webinars, DM, sesiones discovery)</li>
              <li>8️⃣ Guiones para webinars o clases online de conversión</li>
              <li>9️⃣ Copy para landings de captación o venta</li>
              <li>🔟 Diseño de embudo de lanzamiento digital</li>
            </ul>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6 text-center">
          <p className="text-yellow-800 font-bold text-lg mb-2">
            ⚡ Todo esto valorado en más de $2,000 USD
          </p>
          <p className="text-yellow-700 text-lg">
            Lo generas de forma ilimitada con tu Super Prompt personalizado
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
        
        <div className="grid md:grid-cols-2 gap-8">
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
            <h3 className="text-xl font-bold text-gray-900 mb-3">Recibes todo por email</h3>
            <p className="text-gray-700">Tu Super Prompt + la URL de tu sitio web profesional funcionando.</p>
          </div>
        </div>
      </div>

      {/* Mensaje importante sobre el sitio web */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">🌐 Bonus: Tu sitio web profesional</h2>
          </div>
        </div>
        
        <div className="bg-white border border-purple-200 rounded-xl p-6 text-center">
          <p className="text-lg text-gray-800 mb-4">
            <strong>Posterior a completar el formulario, recibirás la URL de tu sitio web</strong> 
            el cual podrás revisar y si te encanta, <strong>te generaremos una propuesta 
            irresistible para las mejoras y publicarlo</strong>.
          </p>
          <p className="text-purple-700 font-semibold">
            ✨ Sin compromiso, sin pagos adelantados, sin letra pequeña
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportantNotice;
