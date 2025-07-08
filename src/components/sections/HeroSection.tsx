import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden apple-gradient-bg">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
        <div className="animate-apple-fade-up">
          {/* Main Headline */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 leading-tight">
            Solo necesitas saber{' '}
            <span className="block mt-4 apple-text-gradient">
              lo que haces y ofreces.
            </span>
          </h1>
          
          {/* Subtitle */}
          <div className="relative mb-8">
            <span className="font-accent text-2xl md:text-3xl lg:text-4xl font-medium apple-text-gradient-green">
              Yo me encargo de que se vea genial.
            </span>
          </div>
          
          {/* Description */}
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed animate-apple-fade-up" style={{
            animationDelay: '0.2s'
          }}>
            Potencia tu marca digital con inteligencia artificial.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-apple-scale" style={{
            animationDelay: '0.4s'
          }}>
            <Button className="apple-button text-lg px-12 py-6 font-semibold">
              🧠 Quiero mi presencia digital
            </Button>
            
            <Button className="apple-button-secondary text-lg px-12 py-6 font-semibold">
              ⚡ Ver cómo funciona
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-apple-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;