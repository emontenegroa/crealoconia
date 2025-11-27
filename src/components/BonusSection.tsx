import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Handshake, 
  FileText, 
  TrendingUp, 
  Image, 
  Layers, 
  Gift, 
  Unlock 
} from "lucide-react";

const BonusSection = () => {
  const bonuses = [
    {
      id: 1,
      title: "Asistente CrealoconIA",
      subtitle: "Tu copiloto inteligente",
      icon: Sparkles,
      isBonus: false,
    },
    {
      id: 2,
      title: "Asesoría Personalizada Durante el Proceso",
      subtitle: "Acompañamiento experto",
      icon: Handshake,
      isBonus: false,
    },
    {
      id: 3,
      title: "Listado de Prompts Premium",
      subtitle: "Herramientas profesionales",
      icon: FileText,
      isBonus: true,
      bonusNumber: 1,
    },
    {
      id: 4,
      title: "Prompts Premium de Redes Sociales y Marketing",
      subtitle: "Contenido que convierte",
      icon: TrendingUp,
      isBonus: true,
      bonusNumber: 2,
    },
    {
      id: 5,
      title: "Nano Banana Prompts para Generación de Imágenes",
      subtitle: "Creatividad visual ilimitada",
      icon: Image,
      isBonus: false,
    },
    {
      id: 6,
      title: "Colección: Los 120 mejores Nano Banana Prompts",
      subtitle: "Para retoques, transferencia de estilo y edición",
      icon: Layers,
      isBonus: false,
    },
    {
      id: 7,
      title: "Más Ideas de Prompts Premium",
      subtitle: "Recursos adicionales exclusivos",
      icon: Gift,
      isBonus: true,
      bonusNumber: 3,
    },
    {
      id: 8,
      title: "Acceso a la Biblioteca Privada de Prompts",
      subtitle: "Contenido reservado para clientes",
      icon: Unlock,
      isBonus: false,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-primary text-sm font-bold tracking-wider uppercase border border-primary/30 px-4 py-1 rounded-full">
              INCLUIDO EN TU SERVICIO
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            TUS <span className="text-primary">BONUS EXCLUSIVOS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            8 recursos premium que recibes al contratar
          </p>
        </div>

        {/* Grid de bonuses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {bonuses.map((bonus, index) => {
            const Icon = bonus.icon;
            const hasGoldenBorder = bonus.isBonus;
            
            return (
              <Card
                key={bonus.id}
                className={`
                  group relative overflow-hidden
                  bg-card border-border
                  hover:shadow-lg hover:shadow-primary/20
                  transition-all duration-300 hover:scale-105
                  ${hasGoldenBorder ? 'border-2 border-primary/50 hover:border-primary' : ''}
                `}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Badge en la esquina superior derecha */}
                {bonus.isBonus && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge 
                      variant="default" 
                      className="bg-primary text-primary-foreground font-bold shadow-lg text-sm px-3 py-1"
                    >
                      BONUS #{bonus.bonusNumber}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div 
                      className={`
                        p-3 rounded-lg
                        ${hasGoldenBorder ? 'bg-primary/10' : 'bg-secondary'}
                        transition-colors group-hover:bg-primary/20
                      `}
                    >
                      <Icon 
                        className={`
                          w-6 h-6 
                          ${hasGoldenBorder ? 'text-primary' : 'text-muted-foreground'}
                          group-hover:text-primary transition-colors
                        `} 
                      />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-2">
                  <CardTitle className="text-lg font-bold text-card-foreground leading-tight">
                    {bonus.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {bonus.subtitle}
                  </p>
                  
                  <div className="pt-2">
                    <Badge 
                      variant="secondary" 
                      className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20"
                    >
                      ✓ INCLUIDO
                    </Badge>
                  </div>
                </CardContent>

                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            );
          })}
        </div>

        {/* Footer text */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground font-medium">
            Todo esto recibes al contratar • Sin costos adicionales
          </p>
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
