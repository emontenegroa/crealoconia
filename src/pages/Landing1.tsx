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

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert([{
          email: formData.email,
          form_data: {
            nombre: formData.nombre,
            telefono: formData.telefono,
            landing_type: 'landing1_initial'
          },
          completed: false
        }]);

      if (error) throw error;

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
            Haz Crecer tu Negocio con una Web Profesional en Minutos
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            (Impulsada por tu propio asistente de IA)
          </p>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Si eres coach, terapeuta o profesional, tu web es tu carta de presentación. 
            Consíguela lista sin complicaciones técnicas y enfocada en conseguir clientes.
          </p>
        </div>

        {/* Por qué esto importa */}
        <Card className="mb-12 p-8 bg-card/80 backdrop-blur">
          <h2 className="text-2xl font-bold text-foreground mb-4">Por qué esto importa</h2>
          <p className="text-foreground/80">
            Tus potenciales clientes buscan una web clara, profesional y que comunique tu valor para ellos, 
            si no, simplemente pasan al siguiente.
          </p>
        </Card>

        {/* Cómo Funciona */}
        <Card className="mb-12 p-8 bg-card/80 backdrop-blur">
          <h2 className="text-2xl font-bold text-foreground mb-6">Cómo Funciona (3 Servicios en 1)</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                1) Prompt Estratégico Personalizado (Gratis)
              </h3>
              <p className="text-foreground/80">
                Completa un breve formulario y la IA creará un asistente exclusivo para tu marca, 
                que te ayudará a generar contenido, guiones de video, mensajes para redes y diseñar tu web.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                2) Mentoría 1 a 1 con Esteban Montenegro
              </h3>
              <p className="text-foreground/80">
                Revisamos tu propuesta de valor, optimizamos tu comunicación y ajustamos tu mensaje 
                para atraer a los clientes correctos.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                3) Sitio Web Profesional + Dominio (2 años incluidos)
              </h3>
              <p className="text-foreground/80 mb-3">
                Tu web diseñada para convertir, con tu propuesta clara y enfocada a conseguir nuevos clientes.
              </p>
              <p className="text-xl font-bold text-primary">
                Precio: $197.000 CLP (pago único, hosting incluido por 24 meses)
              </p>
            </div>
          </div>
        </Card>

        {/* Beneficios Clave */}
        <Card className="mb-12 p-8 bg-card/80 backdrop-blur">
          <h2 className="text-2xl font-bold text-foreground mb-6">Beneficios Clave</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span className="text-foreground/80">Posicionamiento profesional inmediato</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span className="text-foreground/80">Mensaje claro y persuasivo para atraer clientes</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span className="text-foreground/80">Acompañamiento experto, no estás solo</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span className="text-foreground/80">Sin necesidad de saber diseño o tecnología</span>
            </li>
          </ul>
        </Card>

        {/* Formulario */}
        <Card className="p-8 bg-card/90 backdrop-blur">
          <h2 className="text-2xl font-bold text-center text-foreground mb-6">
            Comienza ahora gratis → Recibe tu Prompt Personalizado
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
