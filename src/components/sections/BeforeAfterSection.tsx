import React from 'react';
import { Card } from '@/components/ui/card';
import { X, Check, ArrowRight } from 'lucide-react';

const BeforeAfterSection = () => {
  const beforeItems = [
    "Web genérica que no destaca",
    "Visitantes que no convierten",
    "Mensaje confuso y poco claro",
    "Dependes solo del boca a boca",
    "Competencia te gana online"
  ];

  const afterItems = [
    "Web única que refleja tu expertise",
    "Sistema optimizado para conversión",
    "Mensaje claro y convincente",
    "Generas clientes automáticamente",
    "Te posicionas como el experto"
  ];

  return (
    <section className="py-20 bg-muted/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Antes vs Después
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            La diferencia entre tener una web y tener <span className="font-bold text-foreground">un sistema que vende</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* ANTES */}
          <Card className="p-8 border-destructive/20 bg-destructive/5">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-destructive/20 rounded-full mb-4">
                <X className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">ANTES</h3>
              <p className="text-muted-foreground">Tu situación actual</p>
            </div>
            
            <div className="space-y-4">
              {beforeItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <X className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* FLECHA */}
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* DESPUÉS */}
          <Card className="p-8 border-primary/20 bg-primary/5">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-4">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">DESPUÉS</h3>
              <p className="text-muted-foreground">Tu nueva realidad</p>
            </div>
            
            <div className="space-y-4">
              {afterItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
            <p className="text-lg font-bold text-foreground mb-2">
              El cambio no es gradual. Es instantáneo.
            </p>
            <p className="text-muted-foreground">
              En 7 días tienes una web que genera confianza, autoridad y clientes automáticamente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;