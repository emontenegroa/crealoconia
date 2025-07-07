import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="section-hero relative min-h-screen flex items-center justify-center overflow-hidden animate-morphing">
      {/* Spectacular Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-white/30 rounded-full animate-glow-pulse" />
          </div>
        ))}

        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
          {[...Array(6)].map((_, i) => (
            <line
              key={i}
              x1={Math.random() * 1200}
              y1={Math.random() * 800}
              x2={Math.random() * 1200}
              y2={Math.random() * 800}
              stroke="currentColor"
              strokeWidth="1"
              className="text-white animate-neural-lines"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>

        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-40 h-40 border-2 border-white/20 rounded-full animate-float-magical" 
             style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/30 rotate-45 animate-float-magical"
             style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-white/10 rounded-lg animate-float-magical"
             style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
        <div className="animate-slide-up-bounce">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-morphism px-6 py-3 rounded-full mb-8 hover-glow">
            <Sparkles className="w-5 h-5 text-white animate-glow-pulse" />
            <span className="text-white font-accent font-semibold">
              Crealoconia · IA + Estrategia Digital
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight animate-text-glow">
            Solo necesitas saber lo que haces y ofreces.{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Yo me encargo
              </span>
              <div className="absolute -inset-1 bg-white/20 blur-xl rounded-lg animate-glow-pulse" />
            </span>{' '}
            de que se vea genial.
          </h1>
          
          <p className="font-body text-xl md:text-2xl lg:text-3xl text-white/90 max-w-5xl mx-auto mb-12 leading-relaxed animate-slide-up-bounce"
             style={{ animationDelay: '0.3s' }}>
            Potencia tu presencia digital con inteligencia artificial. Creamos sitios web, landing pages y MVPs estratégicos para vender, postular a fondos como CORFO o dar forma a tus ideas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-bounce"
               style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="glass-morphism text-lg px-10 py-6 font-accent font-semibold text-white border-white/30 hover-spectacular group"
            >
              <Zap className="w-5 h-5 mr-2 group-hover:animate-glow-pulse" />
              Quiero mi presencia digital
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-10 py-6 font-accent font-semibold glass-effect text-white border-white/30 hover-float"
            >
              <ArrowDown className="w-5 h-5 mr-2" />
              Ver cómo funciona
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float-magical">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center glass-effect">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-glow-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;