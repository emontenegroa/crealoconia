import React from 'react';
import { Sparkles } from "lucide-react";

const FooterNew = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Crealoconia</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © 2025 Crealoconia.com. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Términos
            </a>
            <a href="/support" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Soporte
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
