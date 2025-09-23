import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const TransparentPricing = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Precios 100% Transparentes
          </h2>
          <p className="text-xl text-gray-700">
            Sin sorpresas, sin letra pequeña. Esto es exactamente lo que pagas:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Propuesta Gratuita */}
          <Card className="border-2 border-emerald-200 bg-white relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                100% GRATIS
              </span>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl text-emerald-800">Propuesta Inicial</CardTitle>
              <div className="text-4xl font-bold text-emerald-600">$0 CLP</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Super Prompt IA personalizado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>15 días de contenido para redes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Textos completos para tu web</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Sitio web funcional de demostración</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Entrega en máximo 4 horas</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Publicación Completa */}
          <Card className="border-2 border-blue-200 bg-white relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                OPCIONAL
              </span>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl text-blue-800">Publicación en Tu Dominio</CardTitle>
              <div className="text-4xl font-bold text-blue-600">$197.000 CLP</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-4">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Tu sitio publicado en tu dominio personalizado</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Sesión de personalización (1 hora)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Configuración técnica completa</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>30 días de soporte incluido</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Garantía de satisfacción 100%</span>
                </li>
              </ul>
              
              <div className="border-t pt-4">
                <h4 className="font-bold text-gray-800 mb-2">⚠️ No incluye:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    <span>Dominio (~$15.000-25.000 CLP/año)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-red-500" />
                    <span>Hosting (~$8.000-15.000 CLP/mes)</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  Te recomendamos proveedores confiables y económicos
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Paquete de Cambios */}
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-purple-800 mb-2">
                💡 Paquete de Cambios Adicionales
              </h3>
              <p className="text-purple-700 mb-4">
                ¿Necesitas modificaciones después? 3 cambios por solo <span className="font-bold">$20.000 CLP</span>
              </p>
              <p className="text-sm text-purple-600">
                Incluye: cambios de texto, colores, imágenes, secciones adicionales
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 inline-block">
            <p className="text-blue-800 font-medium">
              🛡️ <strong>Garantía total:</strong> Si no te encanta tu sitio, te devolvemos tu dinero o lo ajustamos sin costo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparentPricing;