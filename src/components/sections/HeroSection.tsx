import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden neural-network">
      {/* Aurora Background */}
      <div className="absolute inset-0 animate-aurora opacity-40" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 premium-gradient rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Data Streams */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 w-32 accent-gradient animate-data-stream"
            style={{
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random()}s`
            }}
          />
        ))}
      </div>
      
      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
          </linearGradient>
        </defs>
        
        {/* Dynamic Neural Lines */}
        <line x1="100" y1="200" x2="300" y2="400" stroke="url(#neuralGradient)" strokeWidth="2">
          <animate attributeName="stroke-opacity" values="0.2;1;0.2" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="800" y1="100" x2="600" y2="500" stroke="url(#neuralGradient)" strokeWidth="2">
          <animate attributeName="stroke-opacity" values="0.1;0.8;0.1" dur="6s" repeatCount="indefinite" />
        </line>
        <line x1="400" y1="700" x2="900" y2="300" stroke="url(#neuralGradient)" strokeWidth="2">
          <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="5s" repeatCount="indefinite" />
        </line>
        
        {/* Neural Nodes */}
        <circle cx="100" cy="200" r="4" fill="hsl(var(--primary-glow))" className="animate-tech-pulse" />
        <circle cx="300" cy="400" r="4" fill="hsl(var(--accent))" className="animate-tech-pulse" />
        <circle cx="800" cy="100" r="4" fill="hsl(var(--primary))" className="animate-tech-pulse" />
        <circle cx="600" cy="500" r="4" fill="hsl(var(--accent-glow))" className="animate-tech-pulse" />
      </svg>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
        <div className="animate-fade-in">
          {/* Main Headline */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-9xl font-black text-foreground mb-8 leading-tight">
            Solo necesitas saber{' '}
            <span className="block mt-4 premium-gradient bg-clip-text text-transparent animate-text-shimmer">
              lo que haces y ofreces.
            </span>
          </h1>
          
          {/* Subtitle with subtle glow */}
          <div className="relative mb-8">
            <span className="font-accent text-2xl md:text-3xl lg:text-4xl font-medium text-accent animate-neon-glow">
              Yo me encargo de que se vea genial.
            </span>
          </div>
          
          {/* Description */}
          <p className="font-body text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto mb-12 leading-relaxed animate-slide-up opacity-90" style={{
            animationDelay: '0.3s'
          }}>
            Potencia tu marca digital con inteligencia artificial y efectos que sorprenden.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in" style={{
            animationDelay: '0.6s'
          }}>
            <Button 
              size="lg" 
              className="text-lg px-12 py-6 font-accent font-bold morphism-glass hover:scale-110 transition-all duration-500 animate-magnetic-hover glow-shadow border-0"
            >
              🧠 Quiero mi presencia digital
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-12 py-6 font-accent font-semibold accent-gradient text-background hover:scale-110 transition-all duration-500 animate-magnetic-hover border-0"
            >
              ⚡ Ver cómo funciona
            </Button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-accent rounded-full flex justify-center premium-gradient p-0.5">
          <div className="w-2 h-4 bg-background rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;