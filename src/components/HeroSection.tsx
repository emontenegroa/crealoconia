import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Mail, ArrowRight, Sparkles, Zap, Trophy } from "lucide-react";
import { FormData } from '@/hooks/useFormHandler';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
  const portfolioImages = [
    { src: "/ejemplos/emontenegroa.png", title: "Esteban Montenegro", delay: "0s" },
    { src: "/ejemplos/totalsport.png", title: "Total Sport", delay: "0.5s" },
    { src: "/ejemplos/artescreen.png", title: "Arte Transfer", delay: "1s" },
    { src: "/ejemplos/mamasmentorasscren.png", title: "Mamás Mentoras", delay: "1.5s" },
    { src: "/ejemplos/gatitos-2.png", title: "Gatitos Barbería", delay: "2s" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Patrón de fondo personalizado */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      {/* Gradientes sutiles personalizados */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header minimalista */}
        <div className="flex items-center mb-12">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Crealoconia</span>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[75vh]">
          {/* Columna izquierda - Contenido (8 columnas) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                CrealoconIA.com - Páginas web con IA
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                <span className="block">Tu página web</span>
                <span className="block">profesional</span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent block">
                  lista en 24 horas
                </span>
              </h1>
              
              <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
                Deja de perder tiempo con procesos complicados. Usamos Inteligencia Artificial para crear páginas web de forma rápida, fácil y profesionales que representan tu marca y convierten visitantes en clientes.
              </p>
            </div>

            {/* Formulario profesional */}
            <form onSubmit={onSubmit} className="space-y-4 max-w-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    name="marca"
                    value={formData.marca}
                    onChange={(e) => onInputChange('marca', e.target.value)}
                    placeholder="Tu negocio o marca personal"
                    className="h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm rounded-xl"
                  />
                </div>
                
                <div className="relative">
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => onInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    className="h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm rounded-xl"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] w-full md:w-auto" 
                disabled={!isValid}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Crear mi página web gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center text-emerald-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  100% gratuito
                </div>
                <div className="flex items-center text-blue-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Entrega en 24 horas
                </div>
              </div>
            </form>
          </div>

          {/* Columna derecha - Carrusel mobile (5 columnas) */}
          <div className="lg:col-span-5 relative lg:block hidden">
            <div className="relative h-full flex items-center justify-center">
              <div className="w-full max-w-xl">
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {portfolioImages.map((image, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 basis-3/5">
                        <div className="relative mx-auto w-48 h-96 animate-fade-in" 
                             style={{ 
                               animationDelay: `${index * 0.2}s`,
                               animationDuration: '0.6s',
                               animationFillMode: 'both'
                             }}>
                          {/* Marco del teléfono */}
                          <div className="relative w-full h-full bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl border-4 border-slate-700">
                            {/* Pantalla del teléfono */}
                            <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                              {/* Barra superior del teléfono */}
                              <div className="absolute top-0 left-0 right-0 h-8 bg-white z-10 flex items-center justify-between px-6 text-xs text-black">
                                <span className="font-medium">9:41</span>
                                <div className="flex items-center space-x-1">
                                  <div className="w-4 h-2 border border-black rounded-sm">
                                    <div className="w-3 h-1 bg-black rounded-sm m-0.5"></div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Contenido de la página web */}
                              <div className="pt-8 h-full">
                                <img
                                  src={image.src}
                                  alt={image.title}
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              
                              {/* Indicador home del iPhone */}
                              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-black rounded-full opacity-40"></div>
                            </div>
                            
                            {/* Título flotante */}
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1">
                              <span className="text-white text-sm font-medium">{image.title}</span>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll personalizado */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 text-sm flex flex-col items-center space-y-3">
          <span className="font-medium">Descubre más</span>
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center relative">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;