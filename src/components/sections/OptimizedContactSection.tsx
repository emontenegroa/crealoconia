import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import ScrollAnimation from '@/components/ScrollAnimation';
import { useToast } from '@/hooks/use-toast';

const OptimizedContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    profesion: '',
    situacion: '',
    presupuesto: '',
    urgencia: '',
    mensaje: ''
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aquí iría la lógica para enviar el formulario
    toast({
      title: "¡Mensaje enviado!",
      description: "Te contactaré en las próximas 24 horas para agendar nuestra primera sesión.",
    });
    
    // Reset form
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      profesion: '',
      situacion: '',
      presupuesto: '',
      urgencia: '',
      mensaje: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5" id="contacto">
      <div className="container mx-auto px-4 max-w-6xl">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold mb-4">
              💬 Empezar ahora
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Tu web estratégica te espera.<br />
              <span className="text-primary">Solo falta dar el primer paso.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Cuéntame sobre tu proyecto. <strong>Respuesta garantizada en 24h.</strong>
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulario */}
          <ScrollAnimation delay={200}>
            <div className="lg:col-span-2">
              <Card className="border border-primary/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">
                    Cuéntame sobre tu proyecto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="nombre">Nombre completo *</Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={(e) => handleChange('nombre', e.target.value)}
                          placeholder="Tu nombre y apellido"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder="tu@email.com"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="telefono">WhatsApp</Label>
                        <Input
                          id="telefono"
                          value={formData.telefono}
                          onChange={(e) => handleChange('telefono', e.target.value)}
                          placeholder="+56 9 XXXX XXXX"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="profesion">¿A qué te dedicas? *</Label>
                        <Select onValueChange={(value) => handleChange('profesion', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecciona tu profesión" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="coach">Coach de vida/negocios</SelectItem>
                            <SelectItem value="mentor">Mentor/Consultor</SelectItem>
                            <SelectItem value="abogado">Abogado</SelectItem>
                            <SelectItem value="psicologo">Psicólogo/Terapeuta</SelectItem>
                            <SelectItem value="contador">Contador/Financiero</SelectItem>
                            <SelectItem value="marketing">Marketing/Ventas</SelectItem>
                            <SelectItem value="salud">Profesional de la salud</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="situacion">¿Cuál es tu situación actual? *</Label>
                      <Select onValueChange={(value) => handleChange('situacion', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Describe tu situación" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sin-web">No tengo web y necesito una</SelectItem>
                          <SelectItem value="web-mala">Tengo web pero no me representa</SelectItem>
                          <SelectItem value="intentos-fallidos">He intentado crear una pero no funciona</SelectItem>
                          <SelectItem value="actualizar">Quiero actualizar/mejorar la que tengo</SelectItem>
                          <SelectItem value="desde-cero">Empiezo desde cero con mi marca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="presupuesto">Presupuesto aproximado</Label>
                        <Select onValueChange={(value) => handleChange('presupuesto', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Rango de inversión" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500-1000">$500 - $1.000 USD</SelectItem>
                            <SelectItem value="1000-2500">$1.000 - $2.500 USD</SelectItem>
                            <SelectItem value="2500-5000">$2.500 - $5.000 USD</SelectItem>
                            <SelectItem value="5000+">$5.000+ USD</SelectItem>
                            <SelectItem value="no-definido">Aún no definido</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="urgencia">¿Qué tan urgente es?</Label>
                        <Select onValueChange={(value) => handleChange('urgencia', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Tiempo requerido" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inmediato">Necesito algo esta semana</SelectItem>
                            <SelectItem value="pronto">En las próximas 2 semanas</SelectItem>
                            <SelectItem value="mes">Dentro del próximo mes</SelectItem>
                            <SelectItem value="flexible">Sin apuro, cuando sea posible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="mensaje">Cuéntame más sobre tu proyecto</Label>
                      <Textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={(e) => handleChange('mensaje', e.target.value)}
                        placeholder="¿Qué servicios ofreces? ¿A quién ayudas? ¿Qué problemas resuelves? ¿Qué te ha impedido tener una web hasta ahora?"
                        className="mt-1 min-h-[120px]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold py-6"
                    >
                      Quiero mi web profesional 🚀
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>

          {/* Información de contacto y garantías */}
          <ScrollAnimation delay={400}>
            <div className="space-y-6">
              {/* Contacto directo */}
              <Card className="border border-accent/20 bg-accent/5">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">
                    Contacto directo
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-accent">📧</span>
                      <span className="text-sm">contacto@crealoconia.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-accent">📱</span>
                      <span className="text-sm">+56 9 6279 1772</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-accent">🌐</span>
                      <span className="text-sm">www.crealoconia.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-accent">📸</span>
                      <span className="text-sm">@crealocon.ia</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Garantías */}
              <Card className="border border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">
                    Mi compromiso contigo
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="text-primary">✅</span>
                      <span>Respuesta en menos de 24 horas</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary">✅</span>
                      <span>Primera consulta sin costo</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary">✅</span>
                      <span>Revisiones hasta que quedes 100% satisfecho</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-primary">✅</span>
                      <span>Soporte post-lanzamiento por 30 días</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Proceso rápido */}
              <Card className="border border-accent/20">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-4">
                    Proceso express
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">1</span>
                      <span>Completas este formulario</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">2</span>
                      <span>Te contacto en 24h para agendar</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">3</span>
                      <span>Sesión de estrategia y generación IA</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">4</span>
                      <span>Tu web funcionando en 72h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default OptimizedContactSection;