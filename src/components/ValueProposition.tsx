import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Sparkles } from 'lucide-react';

const ValueProposition = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="glass-card hover-lift border-primary/20">
          <CardContent className="p-12">
            {/* Emoji Target Animado */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary text-4xl animate-pulse-glow">
                🎯
              </div>
            </div>
            
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-black mb-8">
              <span className="text-gradient">¿Por qué genero tu sitio web gratis?</span>
            </h2>
            
            {/* Main Value */}
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-muted-foreground">
              Porque cuando veas la <span className="text-gradient font-bold">calidad profesional</span> y el{' '}
              <span className="text-gradient-secondary font-bold">potencial de ventas</span> de tu sitio personalizado,{' '}
              querrás que lo optimicemos y publiquemos oficialmente.
            </p>
            
            {/* Emotional Hook */}
            <div className="flex items-center justify-center space-x-3 p-6 rounded-2xl bg-gradient-primary/10 border border-primary/20">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <span className="text-xl font-bold">Es que te va a volar la cabeza</span>
              <span className="text-2xl animate-bounce">🤯</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ValueProposition;