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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Gradiente de fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header con logo */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/d5a1d369-f067-4b34-8454-e4ea330bfa99.png" 
              alt="Crealo con IA" 
              className="w-10 h-10 object-contain opacity-90" 
            />
            <span className="ml-3 text-foreground font-medium text-lg">Crealo con IA</span>
          </div>
        </div>

        {/* Contenido principal - Layout de dos columnas */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          {/* Columna izquierda - Contenido */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-foreground">Sitios web</span>
                <br />
                <span className="text-foreground">profesionales</span>
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  comienzan aquí.
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                Responde 2 preguntas y recibe tu super prompt de IA personalizado y tu página web lista para vender en menos de 4 horas.
              </p>
            </div>

            {/* Formulario integrado */}
            <form onSubmit={onSubmit} className="space-y-4 max-w-md">
              <div className="space-y-3">
                <div>
                  <Input
                    name="marca"
                    value={formData.marca}
                    onChange={(e) => onInputChange('marca', e.target.value)}
                    placeholder="Nombre de tu emprendimiento"
                    className="h-12 text-base bg-card/50 border-border/50 focus:border-primary transition-colors backdrop-blur-sm"
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => onInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    className="h-12 text-base bg-card/50 border-border/50 focus:border-primary transition-colors backdrop-blur-sm"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="h-12 px-8 text-base font-medium bg-foreground hover:bg-foreground/90 text-background transition-all duration-200" 
                disabled={!isValid}
              >
                Crear mi sitio web
              </Button>
              
              <p className="text-xs text-muted-foreground">
                ✅ Propuesta inicial gratuita • ⚡ Resultados en 4 horas
              </p>
            </form>
          </div>

          {/* Columna derecha - Elemento visual */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* Contenedor principal con efecto glassmorphism */}
              <div className="relative w-80 h-96 mx-auto">
                {/* Fondo con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 rounded-3xl backdrop-blur-sm border border-border/30"></div>
                
                {/* Elementos flotantes decorativos */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full opacity-80 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-accent to-accent/70 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Contenido interno simulando una interfaz */}
                <div className="relative p-8 h-full flex flex-col justify-center items-center text-center space-y-4">
                  <div className="w-full space-y-3">
                    <div className="h-3 bg-primary/30 rounded-full animate-pulse"></div>
                    <div className="h-3 bg-primary/20 rounded-full w-4/5 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="h-3 bg-primary/15 rounded-full w-3/5 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/40 rounded-xl animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-2 w-full">
                    <div className="h-2 bg-muted/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    <div className="h-2 bg-muted/20 rounded-full w-3/4 animate-pulse" style={{ animationDelay: '2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground text-sm flex flex-col items-center space-y-2">
          <span>Conoce más</span>
          <div className="w-6 h-10 border border-border rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;