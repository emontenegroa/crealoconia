import React from 'react';
import { Button } from '@/components/ui/button';
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-accent/5 subtle-gradient">
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-20 bg-gradient-to-b from-accent to-transparent animate-matrix-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 cyber-border rounded-full animate-float animate-tech-pulse" style={{
        animationDelay: '0s'
      }} />
        <div className="absolute top-40 right-20 w-20 h-20 quantum-shadow rounded-full animate-float" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-accent/30 rounded-full animate-float hologram-effect" style={{
        animationDelay: '4s'
      }} />
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-primary/30 rounded-full animate-float animate-tech-pulse" style={{
        animationDelay: '1s'
      }} />
        
        {/* Enhanced Neural Network */}
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1200 800">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <line x1="200" y1="200" x2="400" y2="300" stroke="currentColor" strokeWidth="2" className="text-accent" filter="url(#glow)">
            <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="800" y1="150" x2="600" y2="400" stroke="currentColor" strokeWidth="2" className="text-primary" filter="url(#glow)">
            <animate attributeName="stroke-opacity" values="0.2;1;0.2" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="300" y1="600" x2="900" y2="200" stroke="currentColor" strokeWidth="2" className="text-accent" filter="url(#glow)">
            <animate attributeName="stroke-opacity" values="0.1;0.9;0.1" dur="5s" repeatCount="indefinite" />
          </line>
          <circle cx="200" cy="200" r="3" fill="currentColor" className="text-accent animate-tech-pulse" />
          <circle cx="400" cy="300" r="3" fill="currentColor" className="text-primary animate-tech-pulse" />
          <circle cx="800" cy="150" r="3" fill="currentColor" className="text-accent animate-tech-pulse" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
        <div className="animate-fade-in">
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-8 leading-tight">
            Solo necesitas saber lo que haces y ofreces.{' '}
            <span className="animate-text-shimmer animate-neon-glow font-black">
              Yo me encargo
            </span>{' '}
            de que se vea genial.
          </h1>
          
          <p className="font-body text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto mb-12 leading-relaxed animate-slide-up" style={{
          animationDelay: '0.3s'
        }}>Potencia tu marca digital con inteligencia artificial. </p>
          
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