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
    <section className="py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-60 h-60 bg-primary rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <ScrollAnimation>
          <Card className="glass-effect border-accent/30 shadow-2xl hover:shadow-3xl transition-all duration-500">
            <CardContent className="p-12 lg:p-16 text-center">
              <div className="mb-8">
                <h2 className="font-heading text-4xl md:text-6xl font-bold text-primary mb-6">
                  ¿Estás por crear tu web?{' '}
                  <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    Primero lee esto:
                  </span>
                </h2>
                <p className="font-body text-xl md:text-2xl text-muted-foreground mb-4">
                  "Lo que NADIE te dice cuando creas tu primera página web"
                </p>
                <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto">
                  Un PDF gratuito que te va a abrir los ojos (antes de perder tiempo, dinero y energía).
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-8">
                <div className="space-y-3 text-left">
                  <Label htmlFor="nombre" className="font-body font-medium text-foreground">Nombre</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="font-body h-12 glass-effect focus:ring-2 focus:ring-accent/50 transition-all duration-300"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div className="space-y-3 text-left">
                  <Label htmlFor="correo" className="font-body font-medium text-foreground">Correo electrónico</Label>
                  <Input
                    id="correo"
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                    className="font-body h-12 glass-effect focus:ring-2 focus:ring-accent/50 transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div className="flex items-start space-x-3 text-left">
                  <Checkbox
                    id="consentimiento"
                    checked={formData.consentimiento}
                    onCheckedChange={handleConsentChange}
                    required
                    className="mt-1"
                  />
                  <Label htmlFor="consentimiento" className="font-body text-sm text-muted-foreground leading-relaxed">
                    Acepto recibir información valiosa sobre digitalización y estrategia. 
                    Puedes cancelar tu suscripción en cualquier momento.
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full font-accent font-semibold text-lg h-14 animate-pulse-glow hover:scale-105 transition-all duration-300"
                  disabled={!formData.consentimiento}
                >
                  Descargar ahora
                </Button>
              </form>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default LeadMagnetSection;