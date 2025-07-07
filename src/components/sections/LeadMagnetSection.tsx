import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LeadMagnetSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Brevo
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 to-primary/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="border-accent/20 shadow-xl">
          <CardContent className="p-12 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
              ¿Estás por crear tu web? Primero lee esto:
            </h2>
            <p className="font-body text-xl text-muted-foreground mb-8">
              Descarga gratis el PDF "Lo que NADIE te dice cuando creas tu primera página web"
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
              <div className="space-y-2 text-left">
                <Label htmlFor="nombre" className="font-body font-medium">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="font-body"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div className="space-y-2 text-left">
                <Label htmlFor="correo" className="font-body font-medium">Correo</Label>
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required
                  className="font-body"
                  placeholder="tu@email.com"
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full font-accent font-semibold text-lg">
                Descargar ahora
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LeadMagnetSection;