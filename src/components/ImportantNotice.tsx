
import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';

const ImportantNotice = () => {
  return (
    <div className="max-w-4xl mx-auto mb-16">
      {/* Lo que recibes */}
      <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border border-emerald-200 rounded-2xl p-8 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
            ✅ Esto es exactamente lo que obtienes
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-emerald-200 rounded-xl p-6 text-center">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-emerald-800 text-lg mb-3">📧 En tu email (inmediato)</h3>
            <ul className="text-emerald-700 text-sm space-y-2 text-left">
              <li>• Super Prompt personalizado para ChatGPT</li>
              <li>• Generador de contenido viral</li>
              <li>• Scripts de venta persuasivos</li>
              <li>• Estrategias de email marketing</li>
              <li>• <strong>Contenido ilimitado</strong></li>
            </ul>
          </div>
          
          <div className="bg-white border border-blue-200 rounded-xl p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-blue-800 text-lg mb-3">🌐 En máximo 4 horas</h3>
            <ul className="text-blue-700 text-sm space-y-2 text-left">
              <li>• URL de tu sitio web funcionando</li>
              <li>• Textos de venta ya escritos</li>
              <li>• Optimizado para móviles</li>
              <li>• Formulario de contacto activo</li>
              <li>• <strong>Listo para recibir clientes</strong></li>
            </ul>
          </div>
          
          <div className="bg-white border border-purple-200 rounded-xl p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-purple-800 text-lg mb-3">🎯 Resultado final</h3>
            <ul className="text-purple-700 text-sm space-y-2 text-left">
              <li>• Presencia digital profesional</li>
              <li>• Contenido estratégico ilimitado</li>
              <li>• Herramientas de venta automatizadas</li>
              <li>• Sin costos de desarrollo</li>
              <li>• <strong>Sin estrés tecnológico</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Proceso simple */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">
          🚀 Proceso súper simple (5 minutos)
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-blue-600">1</span>
            </div>
            <p className="font-semibold text-gray-800">Completas 10 preguntas</p>
            <p className="text-gray-600 text-sm">Sobre tu negocio y objetivos</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-emerald-600">2</span>
            </div>
            <p className="font-semibold text-gray-800">Recibes tu Super Prompt IA</p>
            <p className="text-gray-600 text-sm">En tu email inmediatamente</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-purple-600">3</span>
            </div>
            <p className="font-semibold text-gray-800">Obtienes tu sitio web</p>
            <p className="text-gray-600 text-sm">URL lista en máximo 4 horas</p>
          </div>
        </div>
      </div>

      {/* Información importante */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-yellow-800 text-lg mb-2">
              💯 Garantía de calidad:
            </h3>
            <ul className="text-yellow-700 space-y-1">
              <li>• <strong>Tu Super Prompt IA funcionará</strong> o te ayudamos hasta que lo haga</li>
              <li>• <strong>Tu sitio web estará listo</strong> o refinamos hasta que quedes satisfecho</li>
              <li>• <strong>Soporte directo</strong> via email</li>
              <li>• <strong>Cero riesgo:</strong> Si no quedas conforme, mejoramos todo sin costo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantNotice;
