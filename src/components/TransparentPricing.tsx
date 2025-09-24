import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const TransparentPricing = () => {
  return (
    <div className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Precios 100% Transparentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Sin sorpresas, sin letra pequeña. Esto es exactamente lo que pagas:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Propuesta Gratuita */}
          <Card className="border-2 border-emerald-500/30 bg-card relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                100% GRATIS
              </span>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl text-emerald-700">Propuesta Inicial</CardTitle>
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
          <Card className="border-2 border-primary/30 bg-card relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                OPCIONAL
              </span>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl text-primary">Publicación en Tu Dominio</CardTitle>
              <div className="text-4xl font-bold text-primary">$197.000 CLP</div>
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
                <h4 className="font-bold text-foreground mb-2">⚠️ No incluye:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-destructive" />
                    <span>Dominio (~$15.000-25.000 CLP/año)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-destructive" />
                    <span>Hosting (~$8.000-15.000 CLP/mes)</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  Te recomendamos proveedores confiables y económicos
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Paquete de Cambios */}
        <Card className="bg-accent/50 border-accent">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-accent-foreground mb-2">
                💡 Paquete de Cambios Adicionales
              </h3>
              <p className="text-accent-foreground mb-4">
                ¿Necesitas modificaciones después? 3 cambios por solo <span className="font-bold">$20.000 CLP</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Incluye: cambios de texto, colores, imágenes, secciones adicionales
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 inline-block">
            <p className="text-primary font-medium">
              🛡️ <strong>Garantía total:</strong> Si no te encanta tu sitio, te devolvemos tu dinero o lo ajustamos sin costo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparentPricing;