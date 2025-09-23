import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Mail, ArrowRight } from "lucide-react";
import { FormData } from '@/hooks/useFormHandler';

interface HeroSectionProps {
  formData: FormData;
  onInputChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
}

const HeroSection = ({
  formData,
  onInputChange,
  onSubmit,
  isValid
}: HeroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/d5a1d369-f067-4b34-8454-e4ea330bfa99.png" 
            alt="Crealo con IA" 
            className="w-16 h-16 mx-auto object-contain opacity-90 hover:scale-105 transition-transform duration-300" 
          />
        </div>

        {/* Título principal */}
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Genera tu sitio web
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            en menos de 4 horas
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
          Responde 2 preguntas y recibe tu <span className="text-primary font-bold">super prompt de IA</span> y tu <span className="text-primary font-bold">página web profesional</span>
        </p>

        {/* Formulario integrado */}
        <form onSubmit={onSubmit} className="max-w-lg mx-auto space-y-6">
          <div className="space-y-4">
            <div className="text-left">
              <Label htmlFor="marca" className="text-foreground font-medium flex items-center gap-2 mb-2">
                <Users className="w-4 h-4" />
                Nombre de tu emprendimiento o marca personal
              </Label>
              <Input
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={(e) => onInputChange('marca', e.target.value)}
                placeholder="Ej: Luz Interior Coaching, Panadería Las 3 Hermanas..."
                className="h-12 text-lg bg-card border-border focus:border-primary transition-colors"
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="email" className="text-foreground font-medium flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4" />
                Correo electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                placeholder="Ej: info@tumarca.com"
                className="h-12 text-lg bg-card border-border focus:border-primary transition-colors"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200" 
            disabled={!isValid}
          >
            🚀 CREAR MI SITIO AHORA
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-center text-sm text-muted-foreground">
            ✅ Propuesta inicial 100% gratuita • ⚡ Resultados en 4 horas
          </p>
        </form>

        <div className="mt-8 text-center space-y-3">
          <p className="text-muted-foreground text-sm">
            🔐 Tus datos están seguros • 📧 No enviamos spam • ✨ Cancelación libre
          </p>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;