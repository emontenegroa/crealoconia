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
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column - Content */}
          <ScrollAnimation>
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  Antes de crear tu web.
                </h2>
                <p className="font-body text-2xl md:text-3xl text-muted-foreground font-medium">
                  Lee esto primero.
                </p>
                <p className="font-body text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  "Lo que NADIE te dice cuando creas tu primera página web" - Un PDF gratuito que te va a abrir los ojos (antes de perder tiempo, dinero y energía).
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="max-w-md space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="nombre" className="font-body font-medium text-foreground text-base">Nombre</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="font-body h-14 bg-background border-muted-foreground/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 rounded-xl"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="correo" className="font-body font-medium text-foreground text-base">Correo electrónico</Label>
                  <Input
                    id="correo"
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                    className="font-body h-14 bg-background border-muted-foreground/20 focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 rounded-xl"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="consentimiento"
                    checked={formData.consentimiento}
                    onCheckedChange={handleConsentChange}
                    required
                    className="mt-1.5"
                  />
                  <Label htmlFor="consentimiento" className="font-body text-sm text-muted-foreground leading-relaxed">
                    Acepto recibir información valiosa sobre digitalización y estrategia. 
                    Puedes cancelar tu suscripción en cualquier momento.
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full font-accent font-semibold text-lg h-16 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 hover:scale-[1.02]"
                  disabled={!formData.consentimiento}
                >
                  Descargar PDF gratuito
                </Button>
              </form>
            </div>
          </ScrollAnimation>

          {/* Right Column - Device Mockup */}
          <ScrollAnimation delay={300}>
            <div className="relative flex justify-center">
              {/* iPhone Mockup */}
              <div className="relative">
                <div className="w-80 h-[640px] bg-foreground rounded-[3rem] shadow-2xl overflow-hidden">
                  {/* iPhone Screen */}
                  <div className="absolute inset-2 bg-background rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="h-12 bg-foreground/5 flex items-center justify-between px-8 text-sm font-semibold text-foreground">
                      <span>9:41</span>
                      <div className="flex gap-1.5">
                        <div className="w-5 h-3 bg-foreground/60 rounded-sm"></div>
                        <div className="w-5 h-3 bg-foreground/60 rounded-sm"></div>
                        <div className="w-7 h-3 bg-foreground/80 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* PDF Preview */}
                    <div className="p-8 space-y-8">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-accent/20 rounded-xl mx-auto flex items-center justify-center">
                          <div className="w-8 h-10 bg-accent rounded-sm"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-6 bg-foreground/10 rounded-lg w-4/5 mx-auto"></div>
                          <div className="h-4 bg-foreground/5 rounded w-3/5 mx-auto"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="h-3 bg-accent/30 rounded w-full"></div>
                          <div className="h-3 bg-foreground/10 rounded w-5/6"></div>
                          <div className="h-3 bg-foreground/10 rounded w-4/5"></div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="h-3 bg-accent/30 rounded w-full"></div>
                          <div className="h-3 bg-foreground/10 rounded w-full"></div>
                          <div className="h-3 bg-foreground/10 rounded w-3/4"></div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="h-3 bg-accent/30 rounded w-4/5"></div>
                          <div className="h-3 bg-foreground/10 rounded w-5/6"></div>
                          <div className="h-3 bg-foreground/10 rounded w-2/3"></div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <div className="h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                          <div className="text-xs font-medium text-accent">Descargar PDF</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-background/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;