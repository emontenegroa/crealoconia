import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react';
const ImportantNotice = () => {
  return <div className="max-w-4xl mx-auto mb-16">
      {/* Lo que recibes */}
      

      {/* Proceso simple */}
      

      {/* Compromiso */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-yellow-800 text-lg mb-2">
              💯 Mi compromiso contigo:
            </h3>
            <ul className="text-yellow-700 space-y-1">
              <li>• <strong>Tu Kit IA funcionará</strong> o te ayudo hasta que lo haga</li>
              <li>• <strong>Tu sitio web estará listo</strong> o refinamos hasta que quedes satisfecho</li>
              <li>• <strong>Soporte directo conmigo</strong> via WhatsApp o email</li>
              <li>• <strong>Cero riesgo:</strong> Si no quedas conforme, mejoramos todo sin costo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
};
export default ImportantNotice;