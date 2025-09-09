import React from 'react';
import TypewriterText from './TypewriterText';
import { Button } from './ui/button';
import { Sparkles, Zap, Globe } from 'lucide-react';

interface HeroSectionProps {
  onLoadExample: () => void;
}

const HeroSection = ({
  onLoadExample
}: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen">
      {/* Glassmorphism Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/lovable-uploads/d5a1d369-f067-4b34-8454-e4ea330bfa99.png" 
                  alt="Crealo con IA" 
                  className="w-12 h-12 object-contain hover:scale-110 transition-all duration-300 filter drop-shadow-lg" 
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Crealo IA
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#como-funciona" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                Cómo funciona
              </a>
              <a href="#testimonios" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                Testimonios
              </a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium">
                FAQ
              </a>
              <Button 
                onClick={onLoadExample}
                variant="outline" 
                className="border-blue-200 text-blue-600 hover:bg-blue-50 backdrop-blur-sm bg-white/50"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Ver ejemplo
              </Button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className="w-full h-0.5 bg-gray-600"></div>
                  <div className="w-full h-0.5 bg-gray-600"></div>
                  <div className="w-full h-0.5 bg-gray-600"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-16 text-center">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Crea tu web profesional<br />
              en minutos para
            </h1>
            
            <div className="text-4xl md:text-6xl font-bold text-blue-600 mb-8 h-20 flex items-center justify-center">
              <TypewriterText />
            </div>
            
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
                <span className="text-blue-600 font-bold">Estás haciendo algo valioso.</span> Es hora de mostrarlo con <span className="text-emerald-600 font-bold">claridad, confianza y presencia profesional.</span><br />
                Tu web no puede seguir siendo un pendiente.
              </p>
            </div>

            {/* Feature Icons */}
            <div className="flex justify-center items-center space-x-8 mb-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span className="font-medium">Rápido</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Globe className="w-6 h-6 text-blue-500" />
                <span className="font-medium">Profesional</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <span className="font-medium">Con IA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;