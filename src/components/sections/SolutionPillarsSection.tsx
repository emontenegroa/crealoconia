import React from 'react';
import { Card } from '@/components/ui/card';
import { Target, Brain, HandHeart } from 'lucide-react';

const SolutionPillarsSection = () => {
  const pillars = [
    {
      icon: Target,
      title: "Estrategia Clara",
      description: "Definimos exactamente qué problema resuelves y para quién. Sin esto, todo lo demás es ruido.",
      benefits: ["Mensaje que conecta", "Audiencia definida", "Propuesta irresistible"]
    },
    {
      icon: Brain,
      title: "IA Personalizada",
      description: "Uso IA avanzada para crear contenido que suena como tú y convierte como las mejores webs del mercado.",
      benefits: ["Contenido optimizado", "Copywriting persuasivo", "Automatización inteligente"]
    },
    {
      icon: HandHeart,
      title: "Acompañamiento Real",
      description: "No te dejo solo con un template. Te acompaño hasta que tu web esté generando resultados reales.",
      benefits: ["Soporte directo", "Ajustes incluidos", "Resultados garantizados"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Mi metodología de 3 pilares
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <span className="font-bold text-foreground">150+ proyectos exitosos</span> con el mismo sistema que transformará tu presencia digital.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <Card key={index} className="p-8 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                  <pillar.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground">{pillar.description}</p>
              </div>
              
              <div className="space-y-3">
                {pillar.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground">
            <span className="font-bold text-primary">Resultado:</span> Una web que trabaja para ti mientras duermes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SolutionPillarsSection;