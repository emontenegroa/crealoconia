import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import PortfolioSection from "@/components/PortfolioSection";

const Landing1 = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.email || !formData.telefono) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor ingresa un email válido",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Use the upsert function to handle existing incomplete submissions
      const { data, error } = await supabase.rpc('upsert_form_submission', {
        p_email: formData.email,
        p_form_data: {
          nombre: formData.nombre,
          telefono: formData.telefono,
          landing_type: 'landing1_initial'
        },
        p_attempt_number: 1,
        p_completed: false
      });

      if (error) {
        console.error('Error de Supabase:', error);
        throw error;
      }

      toast({
        title: "¡Perfecto!",
        description: "Continuemos con las siguientes preguntas",
      });

      // Redirect to landing 2 with email
      window.location.href = `/landing2?email=${encodeURIComponent(formData.email)}`;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Hubo un problema. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Crea tu Web Profesional con IA en Minutos
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Si eres coach, terapeuta o profesional independiente, tu web es tu carta de presentación. 
            Consíguela lista, sin complicaciones técnicas y enfocada en atraer clientes.
          </p>
        </div>

        {/* Qué Incluye */}
        <Card className="mb-8 p-6 bg-card/80 backdrop-blur">
          <h2 className="text-xl font-bold text-foreground mb-4">Qué Incluye</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-primary text-xl font-bold">1.</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Asistente de IA Personalizado (Gratis)</h3>
                <p className="text-foreground/80 text-sm">
                  Genera contenido, guiones y mensajes para atraer clientes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-primary text-xl font-bold">2.</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Mentoría 1 a 1</h3>
                <p className="text-foreground/80 text-sm">
                  Definimos tu propuesta de valor y mensaje para atraer a tus clientes ideales
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-primary text-xl font-bold">3.</span>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Tu Web + Dominio (2 años)</h3>
                <p className="text-foreground/80 text-sm mb-2">
                  Sitio profesional diseñado para convertir visitantes en clientes
                </p>
                <p className="text-lg font-bold text-primary">
                  $197.000 CLP (pago único, incluye hosting por 24 meses)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Formulario */}
        <Card className="p-8 bg-card/90 backdrop-blur">
          <h2 className="text-xl font-bold text-center text-foreground mb-6">
            Paso 1: Recibe tu Asistente de IA (Gratis)
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nombre</label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Correo electrónico</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Teléfono</label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => handleInputChange('telefono', e.target.value)}
                placeholder="+56 9 1234 5678"
                className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
            >
              {isSubmitting ? 'Procesando...' : 'Crear mi Web con IA'}
            </Button>
          </form>
        </Card>

        {/* Casos de éxito */}
        <div className="mt-16">
          <PortfolioSection />
        </div>
      </div>
    </div>
  );
};

export default Landing1;
