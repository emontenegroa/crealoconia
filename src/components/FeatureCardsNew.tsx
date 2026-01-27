import React from 'react';
import { Rocket, Sparkles, CreditCard } from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Lanzamiento Rápido",
    description: "Olvídate de procesos de meses. Tu web profesional lista y optimizada en horas."
  },
  {
    icon: Sparkles,
    title: "Diseño IA + Humano",
    description: "Algoritmos que estructuran, expertos que refinan. El equilibrio perfecto."
  },
  {
    icon: CreditCard,
    title: "Pago Único",
    description: "Sin suscripciones mensuales ocultas. Pagas por tu activo digital una sola vez."
  }
];

const FeatureCardsNew = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card p-8 bg-card border border-border rounded-2xl"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCardsNew;
