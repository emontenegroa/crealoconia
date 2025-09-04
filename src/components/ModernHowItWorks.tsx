import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Sparkles, 
  Globe, 
  ArrowRight, 
  CheckCircle,
  Zap,
  Target,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const ModernHowItWorks = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const steps = [
    {
      icon: FileText,
      number: "1",
      title: "Completa el formulario",
      description: "Respondes 10 preguntas simples sobre tu negocio, tu audiencia y tus objetivos.",
      details: "Solo toma 3-5 minutos. Preguntas inteligentes que nos ayudan a entender tu marca perfectamente.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Sparkles,
      number: "2", 
      title: "Recibes tu Super Prompt IA",
      description: "Apenas termines el formulario, generamos y te enviamos tu prompt personalizado para ChatGPT.",
      details: "15 días de contenido estratégico listo para usar. Posts que realmente venden y conectan.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Globe,
      number: "3",
      title: "Generamos tu sitio web profesional", 
      description: "Con tus respuestas generamos internamente tu sitio web completo y te lo enviamos funcionando.",
      details: "Página profesional con textos persuasivos, diseño responsive y optimizada para conversiones.",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    }
  ];

  const features = [
    { icon: CheckCircle, text: "Sin conocimiento técnico" },
    { icon: Zap, text: "Resultado en minutos" },
    { icon: Target, text: "Optimizado para ventas" }
  ];

  return (
    <section className="py-20 px-6" id="como-funciona">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-gradient">¿Cómo funciona?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tres pasos simples para tener tu presencia digital profesional lista para vender
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="glass-card hover-lift group cursor-pointer relative overflow-hidden"
            >
              {/* Number Badge */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                {step.number}
              </div>
              
              <CardContent className="p-8">
                {/* Icon */}
                <div className={`w-16 h-16 ${step.bgColor} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-center">{step.title}</h3>
                <p className="text-muted-foreground text-center mb-4 leading-relaxed">
                  {step.description}
                </p>
                
                {isExpanded && (
                  <div className="animate-slide-up">
                    <div className="h-px bg-border my-4" />
                    <p className="text-sm text-muted-foreground/80 text-center italic">
                      {step.details}
                    </p>
                  </div>
                )}
              </CardContent>
              
              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-primary transform -translate-y-1/2 z-10">
                  <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-primary" />
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-300"
            >
              <feature.icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn-glass"
          >
            {isExpanded ? 'Ver menos detalles' : 'Ver más detalles'}
            {isExpanded ? (
              <ChevronUp className="ml-2 w-4 h-4" />
            ) : (
              <ChevronDown className="ml-2 w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModernHowItWorks;