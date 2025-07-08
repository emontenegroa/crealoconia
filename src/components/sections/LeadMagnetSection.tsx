import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import ScrollAnimation from '@/components/ScrollAnimation';

const LeadMagnetSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    consentimiento: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConsentChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      consentimiento: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Brevo
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 border-y border-muted/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollAnimation>
          <div className="text-center space-y-8">
            {/* Gift Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full">
              <div className="text-2xl">🎁</div>
            </div>
            
            {/* Content */}
            <div className="space-y-6 max-w-2xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Antes de crear tu web.
              </h2>
              <p className="font-body text-xl md:text-2xl text-accent font-medium">
                Lee esto primero.
              </p>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                "Lo que NADIE te dice cuando creas tu primera página web" - Un PDF gratuito que te va a abrir los ojos (antes de perder tiempo, dinero y energía).
              </p>
            </div>
            
            {/* Simple CTA */}
            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-4 rounded-full text-lg hover:scale-105 transition-all duration-300"
              >
                Obtener PDF gratuito 🎁
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default LeadMagnetSection;