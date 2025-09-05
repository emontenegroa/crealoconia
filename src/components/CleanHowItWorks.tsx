import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Sparkles, Globe } from 'lucide-react';

const CleanHowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      number: "01",
      title: "Completa el formulario",
      description: "Respondes 10 preguntas simples sobre tu negocio en menos de 3 minutos."
    },
    {
      icon: Sparkles,
      number: "02", 
      title: "Recibes tu Super Prompt IA",
      description: "Apenas termines el formulario, generamos y te enviamos un prompt personalizado para ChatGPT."
    },
    {
      icon: Globe,
      number: "03",
      title: "Generamos tu sitio web",
      description: "Con tus respuestas generamos internamente un sitio web profesional optimizado para tu negocio."
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un proceso simple de 3 pasos para transformar tu negocio en una presencia digital profesional
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="card-minimal group">
              <CardContent className="pt-6">
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-2xl font-bold text-muted-foreground/30">
                    {step.number}
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CleanHowItWorks;