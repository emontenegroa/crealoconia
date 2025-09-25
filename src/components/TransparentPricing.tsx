import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
const TransparentPricing = () => {
  return <div className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sistema CrealoconIA: Transparente y Simple
          </h2>
          <p className="text-xl text-muted-foreground">
            Página web profesional en 24 horas - Precio fijo sin sorpresas:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8 justify-center max-w-2xl mx-auto">
          {/* Propuesta Gratuita */}
          <Card className="border-2 border-emerald-500/30 bg-card relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                100% GRATIS
              </span>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl text-emerald-700">Propuesta Gratuita</CardTitle>
              <div className="text-4xl font-bold text-emerald-600">$0 CLP</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Página web funcional completa</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Diseño profesional y responsive</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Textos creados con IA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Estructura optimizada para conversión</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Entrega en 24 horas máximo</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Publicación Completa */}
          <Card className="border-2 border-primary/30 bg-card relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                INVERSIÓN
              </span>
            </div>
            <CardHeader className="text-center pt-8">
              <CardTitle className="text-2xl text-primary">Página Web Publicada</CardTitle>
              <div className="text-4xl font-bold text-primary">$197.000 CLP</div>
              <div className="text-sm text-muted-foreground mt-2">Funciona por 2 años completos</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-4">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Página publicada con tu dominio .com o .cl</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Mentoría personalizada 1 a 1 para mejoras</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Hosting incluido por 2 años</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Configuración técnica completa</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-600" />
                  <span>Soporte técnico incluido</span>
                </li>
              </ul>
              
              <div className="border-t pt-4">
                
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <X className="w-4 h-4 text-destructive" />
                    <span>No incluye Dominio (~$15.000-25.000 CLP/año)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    
                    
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
                Necesitas modificaciones después? tenemos paquetes desde los 3 cambios
              </p>
              <p className="text-sm text-muted-foreground">
                Incluye: cambios de texto, colores, imágenes, secciones adicionales
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Botón de llamado a la acción */}
        <div className="mt-8 text-center">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg text-lg font-bold transition-colors">
            🚀 Crear Mi Página Web Ahora
          </button>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 inline-block">
            <p className="text-primary font-medium">
              🛡️ <strong>Garantía total:</strong> Si no te encanta tu sitio, te devolvemos tu dinero o lo ajustamos sin costo
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default TransparentPricing;