
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Rocket, TrendingUp } from "lucide-react";

const FeatureCards = () => {
  const features = [
    { icon: MessageSquare, title: "Contenido que Vende", desc: "15 días de posts estratégicos que generan clientes reales", color: "text-green-300" },
    { icon: Rocket, title: "Web en 2 Minutos", desc: "Página profesional automática con Lovable.dev", color: "text-blue-300" },
    { icon: TrendingUp, title: "IA Personal 24/7", desc: "Tu asistente de marketing que nunca duerme", color: "text-purple-300" }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
      {features.map((feature, index) => (
        <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
          <CardContent className="p-6 text-center">
            <feature.icon className={`w-12 h-12 ${feature.color} mx-auto mb-4`} />
            <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-purple-200 text-sm">{feature.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
