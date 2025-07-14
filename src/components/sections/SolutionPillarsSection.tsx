import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Sparkles, Handshake } from 'lucide-react';

const SolutionPillarsSection = () => {
  const pillars = [
    {
      icon: MessageSquare,
      title: "Estrategia Clara",
      description: "Ordenamos tus ideas y definimos tu mensaje antes de diseñar",
      detail: "Formulario estratégico + sesión de claridad"
    },
    {
      icon: Sparkles,
      title: "IA Personalizada",
      description: "Contenido único creado con IA entrenada específicamente para ti",
      detail: "Superprompt personalizado + contenido optimizado"
    },
    {
      icon: Handshake,
      title: "Acompañamiento Real",
      description: "No te dejo solo. Trabajamos juntos hasta el lanzamiento",
      detail: "Revisiones en vivo + ajustes estratégicos"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Cómo creo webs que sí funcionan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No es solo diseño. Es un sistema completo que combina estrategia, IA y experiencia humana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <Card key={index} className="border-primary/20 bg-gradient-to-br from-card to-primary/5 hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <pillar.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {pillar.description}
                  </p>
                  <div className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full inline-block">
                    {pillar.detail}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-3xl mx-auto">
            <p className="text-lg text-foreground font-medium mb-4">
              "No es una plantilla. No es un diseño genérico."
            </p>
            <p className="text-2xl font-bold text-primary">
              Es tu mensaje, tu estilo, tu presencia digital única.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionPillarsSection;