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
          
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
