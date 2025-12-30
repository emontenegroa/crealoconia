import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, CheckCircle, XCircle, Briefcase, TrendingUp, Target } from "lucide-react";

interface QualificationWizardProps {
  onQualified: () => void;
  onDisqualified: () => void;
}

type BusinessModel = "coach" | "agency" | "professional" | "other" | null;
type Revenue = "under1k" | "1k-5k" | "over5k" | null;
type Investment = "results" | "cheapest" | null;

const QualificationWizard = ({ onQualified, onDisqualified }: QualificationWizardProps) => {
  const [step, setStep] = useState(1);
  const [businessModel, setBusinessModel] = useState<BusinessModel>(null);
  const [revenue, setRevenue] = useState<Revenue>(null);
  const [investment, setInvestment] = useState<Investment>(null);
  const [isDisqualified, setIsDisqualified] = useState(false);

  const businessOptions = [
    { value: "coach", label: "Coach / Consultor", icon: <Target className="w-5 h-5" /> },
    { value: "agency", label: "Agencia", icon: <Briefcase className="w-5 h-5" /> },
    { value: "professional", label: "Servicios Profesionales", icon: <TrendingUp className="w-5 h-5" /> },
    { value: "other", label: "Otros", icon: <CheckCircle className="w-5 h-5" /> },
  ];

  const revenueOptions = [
    { value: "under1k", label: "Menos de $1,000 USD/mes" },
    { value: "1k-5k", label: "$1,000 - $5,000 USD/mes" },
    { value: "over5k", label: "Más de $5,000 USD/mes" },
  ];

  const investmentOptions = [
    { value: "results", label: "Busco resultados e inversión", description: "Estoy dispuesto a invertir en un sistema profesional" },
    { value: "cheapest", label: "Busco lo más barato", description: "Mi prioridad es el menor costo posible" },
  ];

  const handleNext = () => {
    if (step === 2 && revenue === "under1k") {
      setIsDisqualified(true);
      return;
    }
    if (step === 3 && investment === "cheapest") {
      setIsDisqualified(true);
      return;
    }
    if (step === 3 && investment === "results") {
      onQualified();
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    if (step === 1) return businessModel !== null;
    if (step === 2) return revenue !== null;
    if (step === 3) return investment !== null;
    return false;
  };

  if (isDisqualified) {
    return (
      <Card className="max-w-2xl mx-auto border-border bg-card">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-8">
            <XCircle className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Gracias por tu interés
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            En este momento nuestro sistema está diseñado para negocios con mayor facturación 
            y disposición a invertir en crecimiento profesional.
          </p>
          <p className="text-muted-foreground mb-8">
            Te invitamos a seguirnos en redes para contenido gratuito que puede ayudarte 
            a llegar al siguiente nivel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="rounded-xl"
              onClick={() => window.open('https://instagram.com/crealoconia', '_blank')}
            >
              Seguir en Instagram
            </Button>
            <Button 
              variant="outline" 
              className="rounded-xl"
              onClick={() => {
                setIsDisqualified(false);
                setStep(1);
                setBusinessModel(null);
                setRevenue(null);
                setInvestment(null);
              }}
            >
              Volver a intentar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto border-border bg-card">
      <CardContent className="p-8 lg:p-12">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? 'w-12 bg-primary' : s < step ? 'w-8 bg-primary/50' : 'w-8 bg-border'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Business Model */}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                ¿Cuál es tu modelo de negocio?
              </h3>
              <p className="text-muted-foreground">
                Esto nos ayuda a personalizar tu experiencia
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {businessOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setBusinessModel(option.value as BusinessModel)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    businessModel === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30 bg-secondary/30'
                  }`}
                >
                  <div className={`mb-3 ${businessModel === option.value ? 'text-primary' : 'text-muted-foreground'}`}>
                    {option.icon}
                  </div>
                  <span className={`font-medium ${businessModel === option.value ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Revenue */}
        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                ¿Cuál es tu facturación mensual actual?
              </h3>
              <p className="text-muted-foreground">
                Esto nos permite recomendarte el servicio adecuado
              </p>
            </div>
            
            <div className="space-y-4">
              {revenueOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setRevenue(option.value as Revenue)}
                  className={`w-full p-5 rounded-xl border-2 transition-all duration-300 text-left ${
                    revenue === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30 bg-secondary/30'
                  }`}
                >
                  <span className={`font-medium text-lg ${revenue === option.value ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Investment Mindset */}
        {step === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                ¿Cuál es tu enfoque de inversión?
              </h3>
              <p className="text-muted-foreground">
                Queremos asegurarnos de que somos el fit correcto
              </p>
            </div>
            
            <div className="space-y-4">
              {investmentOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setInvestment(option.value as Investment)}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    investment === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/30 bg-secondary/30'
                  }`}
                >
                  <span className={`font-semibold text-lg block mb-1 ${investment === option.value ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {option.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
            className="rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-foreground hover:bg-foreground/90 text-background rounded-xl"
          >
            {step === 3 ? 'Continuar' : 'Siguiente'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualificationWizard;
