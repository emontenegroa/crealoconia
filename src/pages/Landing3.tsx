import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Calendar, CheckCircle } from "lucide-react";

const Landing3 = () => {
  const handleSchedule = () => {
    // Link to scheduling tool (Calendly, Cal.com, etc.)
    window.open('https://wa.me/56961249991?text=Hola%20Esteban,%20quiero%20agendar%20mi%20mentoría%20para%20crear%20mi%20web', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-bounce" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ¡Listo! Tu Asistente de Contenido con IA está en camino a tu correo
          </h1>
          <div className="flex items-center justify-center gap-3 text-lg text-foreground/80">
            <Mail className="w-6 h-6 text-primary" />
            <p>
              Revisa tu bandeja de entrada en los próximos minutos. Ahí recibirás el prompt personalizado 
              que te ayudará a crear publicaciones, guiones y mensajes efectivos para atraer nuevos clientes.
            </p>
          </div>
        </div>

        {/* ¿Qué sigue ahora? */}
        <Card className="mb-8 p-8 bg-card/80 backdrop-blur">
          <h2 className="text-2xl font-bold text-foreground mb-4">¿Qué sigue ahora?</h2>
          <p className="text-foreground/80 mb-6">
            Tu asistente es poderoso, pero su verdadero potencial se activa cuando lo conectamos 
            con tu propuesta y tu web.
          </p>
          
          <h3 className="text-xl font-semibold text-foreground mb-4">
            En la mentoría 1 a 1 con Esteban Montenegro:
          </h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span className="text-foreground/80">Revisamos tu propuesta de valor</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span className="text-foreground/80">Ajustamos tu mensaje para que sea claro y persuasivo</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3 text-xl">✓</span>
              <span className="text-foreground/80">
                Creamos y lanzamos tu página web profesional durante la reunión (sí, en vivo)
              </span>
            </li>
          </ul>

          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
            <h3 className="text-xl font-semibold text-foreground mb-4">Al finalizar tendrás:</h3>
            <ul className="space-y-2 text-foreground/80">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Tu identidad de marca clara
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Tu asistente de contenido listo para usar
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Tu página web publicada con tu dominio propio
              </li>
            </ul>
          </div>
        </Card>

        {/* Inversión */}
        <Card className="mb-8 p-8 bg-card/90 backdrop-blur border-2 border-primary">
          <h2 className="text-2xl font-bold text-foreground mb-4 text-center">Inversión</h2>
          <p className="text-center text-foreground/80 mb-4">
            La mentoría para crear y lanzar tu web es sin costo al agendar.
          </p>
          <p className="text-center text-lg mb-6">
            El pago de{' '}
            <span className="text-2xl font-bold text-primary">$197.000 CLP</span>
            {' '}(web + dominio + hosting 2 años + mentoría personalizada) se realiza durante la sesión, 
            mediante un enlace de pago seguro.
          </p>
          
          <Button
            onClick={handleSchedule}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Agendar mi Mentoría Gratis
          </Button>
        </Card>

        {/* Información adicional */}
        <div className="text-center text-foreground/70 text-sm space-y-2">
          <p>¿Tienes dudas? Escríbeme directamente:</p>
          <Button
            variant="outline"
            onClick={() => window.open('https://wa.me/56961249991', '_blank')}
            className="bg-card border-border text-foreground hover:bg-card/80"
          >
            WhatsApp: +56 9 6124 9991
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing3;
