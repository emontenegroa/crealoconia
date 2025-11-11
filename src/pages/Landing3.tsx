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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¡Felicitaciones! Tu Asistente de IA está Listo
          </h1>
          <div className="flex items-center justify-center gap-2 text-foreground/80 mb-6">
            <Mail className="w-5 h-5 text-primary" />
            <p className="text-lg">
              Revisa tu correo en los próximos minutos
            </p>
          </div>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Ahí encontrarás tu asistente personalizado listo para ayudarte a crear contenido 
            y mensajes que atraigan clientes.
          </p>
        </div>

        {/* Siguiente Paso */}
        <Card className="mb-8 p-6 bg-card/80 backdrop-blur">
          <h2 className="text-xl font-bold text-foreground mb-4">¿Quieres dar el siguiente paso?</h2>
          <p className="text-foreground/80 mb-4">
            En una mentoría 1 a 1 creamos tu web profesional en vivo:
          </p>
          
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span className="text-foreground/80">Definimos tu mensaje y propuesta de valor</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span className="text-foreground/80">Creamos tu web durante la sesión</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span className="text-foreground/80">Publicamos con tu dominio propio</span>
            </li>
          </ul>

          <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 mb-6">
            <p className="text-center text-lg mb-2">
              <span className="text-2xl font-bold text-primary">$197.000 CLP</span>
            </p>
            <p className="text-sm text-center text-foreground/70">
              Incluye: Web + Dominio + Hosting (2 años) + Mentoría
            </p>
          </div>
          
          <Button
            onClick={handleSchedule}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Agendar Mentoría Gratis
          </Button>
        </Card>

        {/* Contacto */}
        <div className="text-center">
          <p className="text-foreground/70 text-sm mb-3">¿Dudas? Escríbeme:</p>
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
