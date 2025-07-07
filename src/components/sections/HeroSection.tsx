import React from 'react';
import { Button } from '@/components/ui/button';
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-accent/5 animate-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-accent/30 rounded-full animate-float" style={{
        animationDelay: '0s'
      }} />
        <div className="absolute top-40 right-20 w-20 h-20 border border-primary/30 rounded-full animate-float" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{
        animationDelay: '4s'
      }} />
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-primary/20 rounded-full animate-float" style={{
        animationDelay: '1s'
      }} />
        
        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <line x1="200" y1="200" x2="400" y2="300" stroke="currentColor" strokeWidth="1" className="text-accent">
            <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="800" y1="150" x2="600" y2="400" stroke="currentColor" strokeWidth="1" className="text-primary">
            <animate attributeName="stroke-opacity" values="0.2;0.9;0.2" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="300" y1="600" x2="900" y2="200" stroke="currentColor" strokeWidth="1" className="text-accent">
            <animate attributeName="stroke-opacity" values="0.1;0.7;0.1" dur="5s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
        <div className="animate-fade-in">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-8 leading-tight">
            Solo necesitas saber lo que haces y ofreces.{' '}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent animate-gradient">
              Yo me encargo
            </span>{' '}
            de que se vea genial.
          </h1>
          
          <p className="font-body text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{
          animationDelay: '0.3s'
        }}>Potencia tu marca digital con inteligencia artificial. Creamos sitios web, landing pages y MVPs estratégicos para vender, postular a fondos como CORFO o dar forma a tus ideas. Con visión, tecnología y acompañamiento experto.</p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in" style={{
          animationDelay: '0.6s'
        }}>
            <Button size="lg" className="text-lg px-10 py-6 font-accent font-semibold animate-pulse-glow hover:scale-105 transition-all duration-300">
              Quiero mi presencia digital
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-6 font-accent font-semibold glass-effect hover:scale-105 transition-all duration-300">
              Ver cómo funciona
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>;
};
export default HeroSection;