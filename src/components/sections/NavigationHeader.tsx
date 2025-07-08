import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const NavigationHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/d5a1d369-f067-4b34-8454-e4ea330bfa99.png" 
              alt="Crealo con IA" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-heading font-bold text-xl text-primary">
              Crealo con IA
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('servicios')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('proceso')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Proceso
            </button>
            <button 
              onClick={() => scrollToSection('testimonios')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Testimonios
            </button>
            <button 
              onClick={() => scrollToSection('contacto')}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection('contacto')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Crear mi web ahora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('servicios')}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Servicios
              </button>
              <button 
                onClick={() => scrollToSection('proceso')}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Proceso
              </button>
              <button 
                onClick={() => scrollToSection('testimonios')}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Testimonios
              </button>
              <button 
                onClick={() => scrollToSection('contacto')}
                className="block w-full text-left text-muted-foreground hover:text-primary transition-colors"
              >
                Contacto
              </button>
              <Button 
                onClick={() => scrollToSection('contacto')}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Crear mi web ahora
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavigationHeader;