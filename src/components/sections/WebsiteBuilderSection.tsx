import React from 'react';
import { Button } from '@/components/ui/button';
import ScrollAnimation from '@/components/ScrollAnimation';

const WebsiteBuilderSection = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <ScrollAnimation>
            <div className="space-y-8">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                Ayúdanos a crear
                <br />
                tu sitio web ideal.
              </h2>
              
              <div className="space-y-6">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Responde 6 preguntas estratégicas para encontrar 
                  <br />
                  el sitio web perfecto para ti y tu negocio.
                </p>
                
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105"
                >
                  Comenzar ahora
                </Button>
              </div>

              {/* Features preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm text-muted-foreground">Análisis personalizado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm text-muted-foreground">Diseño único</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm text-muted-foreground">Contenido estratégico</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-sm text-muted-foreground">Lista en minutos</span>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Right side - Visual */}
          <ScrollAnimation delay={200}>
            <div className="relative">
              {/* Main container with colorful background */}
              <div className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 lg:p-12 relative overflow-hidden min-h-[500px] flex items-center justify-center">
                
                {/* Colorful "Crealoconia" text */}
                <div className="text-center">
                  <div className="text-6xl lg:text-8xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      creal
                    </span>
                    <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
                      oconia
                    </span>
                  </div>
                  
                  {/* Subtle device mockup */}
                  <div className="relative mx-auto w-80 h-48 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-8 border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Screen content */}
                    <div className="p-4 space-y-3">
                      {/* Header bar */}
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                      </div>
                      
                      {/* Content bars */}
                      <div className="space-y-2">
                        <div className="h-3 bg-gradient-to-r from-purple-200 to-purple-300 dark:from-purple-700 dark:to-purple-600 rounded" />
                        <div className="h-3 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-700 dark:to-blue-600 rounded w-3/4" />
                        <div className="h-3 bg-gradient-to-r from-green-200 to-green-300 dark:from-green-700 dark:to-green-600 rounded w-1/2" />
                      </div>
                      
                      {/* Chart representation */}
                      <div className="flex items-end space-x-1 pt-4">
                        <div className="w-4 h-8 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t" />
                        <div className="w-4 h-12 bg-gradient-to-t from-purple-400 to-purple-600 rounded-t" />
                        <div className="w-4 h-6 bg-gradient-to-t from-green-400 to-green-600 rounded-t" />
                        <div className="w-4 h-10 bg-gradient-to-t from-orange-400 to-orange-600 rounded-t" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-8 left-8 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-70 animate-float" />
                <div className="absolute bottom-12 right-12 w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-70 animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-32 right-8 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-70 animate-float" style={{ animationDelay: '4s' }} />
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* Bottom section with process preview */}
        <ScrollAnimation delay={400}>
          <div className="mt-20 text-center">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-8">
              Un proceso simple, resultados extraordinarios
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                  1
                </div>
                <h4 className="font-semibold text-foreground">Responde 6 preguntas</h4>
                <p className="text-sm text-muted-foreground">
                  Sobre tu negocio, audiencia y objetivos
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                  2
                </div>
                <h4 className="font-semibold text-foreground">IA analiza y crea</h4>
                <p className="text-sm text-muted-foreground">
                  Generamos contenido y estructura personalizados
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                  3
                </div>
                <h4 className="font-semibold text-foreground">Tu web está lista</h4>
                <p className="text-sm text-muted-foreground">
                  Sitio profesional y optimizado para tu negocio
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default WebsiteBuilderSection;