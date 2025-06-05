import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";
const ImportantNotice = () => {
  return <Card className="max-w-4xl mx-auto mb-8 bg-white border-blue-200 shadow-xl">
      <CardContent className="p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Brain className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">⚠️ IMPORTANTE</h3>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          <strong>El resultado que obtendrás depende 100% de la calidad de tus respuestas.</strong>
          <br />
          👉 Cuanto más claro nos cuentes sobre tu negocio, tus servicios y tu cliente ideal, más precisos serán los textos, contenidos y estructura que generaremos para ti.
          <br />
          <span className="text-blue-600 font-semibold">
            Tómate el tiempo para responder con detalle.
          </span>
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 font-medium">
            🧠 <strong>Este no es un formulario genérico:</strong> es la base real sobre la que construiremos tu sitio profesional.
            <br />
          </p>
        </div>
      </CardContent>
    </Card>;
};
export default ImportantNotice;