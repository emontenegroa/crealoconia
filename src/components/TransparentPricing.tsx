import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";
const TransparentPricing = () => {
  const scrollToForm = () => {
    // Scroll to the top where the form is
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // After scrolling, highlight the form fields
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[name="marca"], input[name="email"]');
      inputs.forEach(input => {
        if (input instanceof HTMLElement) {
          input.style.transform = 'scale(1.05)';
          input.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
          input.style.transition = 'all 0.3s ease';

          // Reset after animation
          setTimeout(() => {
            input.style.transform = 'scale(1)';
            input.style.boxShadow = '';
          }, 2000);
        }
      });
    }, 800);
  };
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

        <div className="flex justify-center mb-8">
          {/* Publicación Completa */}
          <Card className="border-2 border-primary/30 bg-card relative max-w-md">
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
                  <span>Super Prompt de Marketing para tus redes sociales</span>
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
                    
                    
                  </li>
                </ul>
                
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
          <Button onClick={scrollToForm} size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] px-8 py-4 text-lg font-semibold">
            <Sparkles className="w-5 h-5 mr-2" />
            Empezar ahora
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
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