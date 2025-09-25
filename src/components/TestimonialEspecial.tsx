import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const TestimonialEspecial = () => {
  return (
    <div className="py-16 bg-primary/5">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="border-0 bg-transparent">
          <CardContent className="p-8 text-center">
            <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
            
            <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-8 leading-relaxed">
              "En pocos días teníamos una web de alto nivel, moderna, funcional y con todo lo que necesitábamos para operar como agencia. 
              <span className="text-primary font-semibold"> Integración con formulario de contacto, newsletter, chat en vivo e inteligencia artificial.</span>"
            </blockquote>
            
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <div className="font-bold text-lg text-foreground">Marketéate Lab</div>
                <div className="text-muted-foreground">Agencia de Marketing 360</div>
              </div>
              
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-6 py-3">
                <p className="text-emerald-600 font-semibold">
                  🚀 La experiencia con Crealoconia fue rápida y fácil
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestimonialEspecial;