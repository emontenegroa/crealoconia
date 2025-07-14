import React from 'react';
import { Card } from '@/components/ui/card';
import { X, AlertTriangle } from 'lucide-react';

const ProblemAgitationSection = () => {
  const problems = [
    "Tu web actual parece una plantilla más del montón",
    "Los visitantes entran y salen sin convertir",
    "No generas la confianza que tu expertise merece",
    "Pierdes clientes que van con tu competencia"
  ];

  return (
    <section className="py-20 bg-muted/5">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full border border-destructive/20 mb-6">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-semibold">¿Te suena familiar?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Tu web no está cumpliendo su trabajo
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mientras tu competencia consigue clientes online, tú sigues dependiendo del boca a boca. 
            <span className="font-bold text-foreground"> Es hora de cambiar eso.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <Card key={index} className="p-6 border-destructive/20 bg-destructive/5">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                <p className="text-foreground font-medium">{problem}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            <span className="font-bold text-foreground">Cada día que pasa sin una web que venda</span> es dinero que dejas sobre la mesa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemAgitationSection;