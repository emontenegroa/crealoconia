import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target } from 'lucide-react';

const CleanValueSection = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <Card className="card-minimal">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              ¿Por qué genero tu sitio web gratis?
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Porque cuando veas la calidad profesional y el potencial de ventas de tu sitio personalizado, 
              querrás que lo optimicemos y publiquemos oficialmente.
            </p>
            
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-foreground font-medium">
              ✨ Es que te va a volar la cabeza 🤯
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CleanValueSection;