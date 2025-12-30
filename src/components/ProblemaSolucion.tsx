import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Check, ArrowRight } from "lucide-react";

const ProblemaSolucion = () => {
  const scrollToForm = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
    
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[name="marca"], input[name="email"]');
      inputs.forEach((input) => {
        const element = input as HTMLElement;
        element.style.boxShadow = '0 0 0 3px hsl(var(--primary) / 0.2)';
        
        setTimeout(() => {
          element.style.boxShadow = '';
        }, 2000);
      });
    }, 800);
  };

  const problemas = [
    "Proceso engorroso y frustrante que se diluye en el tiempo",
    "Pérdida de foco sin saber cómo continuar",
    "Falta de conocimientos técnicos para avanzar",
    "Inversión de tiempo y dinero sin resultados claros"
  ];

  const soluciones = [
    "Proceso guiado: 10 preguntas y nosotros hacemos el resto",
    "Entrega en 24 horas con diseño profesional",
    "Nos encargamos de todo lo técnico por ti",
    "Ves el resultado antes de comprometerte"
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            El problema
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            ¿Te suena familiar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La mayoría de nuestros clientes llegan después de experiencias frustrantes 
            intentando crear su presencia digital.
          </p>
        </div>

        {/* Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {/* Problems */}
          <Card className="bg-card border border-border">
            <CardContent className="p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                  <X className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Sin un sistema claro</h3>
              </div>
              
              <ul className="space-y-5">
                {problemas.map((problema, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5 text-destructive" />
                    </div>
                    <span className="text-muted-foreground leading-relaxed">{problema}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Solutions */}
          <Card className="bg-primary/5 border border-primary/20">
            <CardContent className="p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Con CrealoconIA</h3>
              </div>
              
              <ul className="space-y-5">
                {soluciones.map((solucion, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground leading-relaxed">{solucion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Differentiator */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center p-10 bg-secondary/50 rounded-3xl border border-border max-w-3xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              No es el texto genérico de ChatGPT
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              La IA toma tus respuestas y las transforma en algo único: 
              colores, diseño, textos, diagramas e imágenes creados específicamente para ti.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                Personalizado
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                No genérico
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                100% único
              </span>
            </div>
            <Button 
              onClick={scrollToForm}
              className="h-14 px-10 bg-foreground hover:bg-foreground/90 text-background rounded-xl font-semibold transition-all duration-300"
            >
              Aplicar ahora
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemaSolucion;
