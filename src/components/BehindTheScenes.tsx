
import React from 'react';
import { CheckCircle, Rocket } from 'lucide-react';

const BehindTheScenes = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">🔧 ¿Cómo lo hacemos?</h2>
      
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          🔬 Detrás del Kit IA: la combinación de datos + estructura + inteligencia artificial
        </h3>
        
        <p className="text-gray-700 text-lg mb-8 text-center">
          Cuando completas el formulario, no solo capturamos tus respuestas. Lo que realmente hacemos es:
        </p>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Reunimos la información clave de tu negocio:</h4>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li>• Qué haces</li>
                <li>• A quién ayudas</li>
                <li>• Qué problemas resuelves</li>
                <li>• Qué vendes</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Aplicamos estructura de negocio digital:</h4>
              <p className="text-gray-700">
                Usamos frameworks profesionales de marketing digital y marca personal para organizar tu oferta, tu mensaje y el flujo de contenido que necesita tu cliente ideal.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Activamos los modelos de inteligencia artificial:</h4>
              <p className="text-gray-700">
                La IA no genera contenido al azar. La entrenamos para que, en base a tu información, proponga los textos adecuados, con coherencia de tono, claridad de oferta y lenguaje persuasivo.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Refinamos el contenido:</h4>
              <p className="text-gray-700">
                Ajustamos los textos para que tengan sentido comercial, sean claros para tu audiencia y estén listos para ser usados tanto en tu sitio web como en redes sociales.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 mt-1">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Generamos la estructura técnica de tu web:</h4>
              <p className="text-gray-700">
                Creamos una primera versión estructurada de tu sitio, adaptada a lo que tu negocio realmente necesita mostrar para atraer, conectar y vender.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 my-8"></div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="w-6 h-6 text-blue-600" />
            <h4 className="text-xl font-bold text-blue-800">El resultado:</h4>
          </div>
          <p className="text-blue-800 text-lg text-center leading-relaxed">
            No es solo contenido "hecho por IA".<br />
            Es tu negocio, organizado digitalmente y entregado en una base profesional para que puedas avanzar con claridad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BehindTheScenes;
