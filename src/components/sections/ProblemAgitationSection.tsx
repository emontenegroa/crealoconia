import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X, Clock, Brain, AlertTriangle } from 'lucide-react';

const ProblemAgitationSection = () => {
  const problems = [
    {
      icon: X,
      title: "No sabes qué decir en tu web",
      description: "Tienes experiencia, pero no logras comunicar tu valor de forma clara"
    },
    {
      icon: Clock,
      title: "Llevas meses posponiendo tu web",
      description: "Entre clientes y responsabilidades, nunca encuentras tiempo para enfocarte"
    },
    {
      icon: Brain,
      title: "Las plantillas no te representan",
      description: "Todo suena genérico y no captura lo que realmente haces diferente"
    },
    {
      icon: AlertTriangle,
      title: "Los intentos anteriores fallaron",
      description: "Agencias costosas, freelancers que desaparecen, resultados que no venden"
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            ¿Te sientes identificado?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No eres el único. El 90% de emprendedores y consultores luchan con estos mismos problemas:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <Card key={index} className="border-destructive/20 bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive flex-shrink-0">
                    <problem.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2 text-lg">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-xl text-foreground font-medium">
            <span className="text-primary font-bold">Tu expertise merece mejor que esto.</span><br />
            Es momento de crear algo que realmente funcione.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemAgitationSection;