import { Button } from "@/components/ui/button";
import { Mail, Calendar, CheckCircle, Info, Sparkles, Target, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Landing3 = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const { toast } = useToast();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      } catch (error) {
        console.error('Error parsing userData:', error);
      }
    }
  }, []);

  const handleSchedule = () => {
    window.open('https://wa.me/56945487423?text=HeY%20como%20es%20eso%20de%20que%20creas%20paginas%20web%20en%204%20horas%3F', '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="relative z-20 border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">Crealoconia.com</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-muted-foreground text-sm md:text-base">
              Paso 3 de 3 ✓ Completado
            </p>
            <p className="text-primary text-sm md:text-base font-semibold">
              100%
            </p>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        {/* Hero Confirmation */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-primary animate-bounce" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            ¡Tu página web ya está lista!
          </h1>
          <div className="flex items-center justify-center gap-3 text-muted-foreground mb-4">
            <Globe className="w-6 h-6 text-primary" />
            <p className="text-base md:text-lg">
              Nos contactaremos contigo para mostrártela
            </p>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Tu sitio web profesional ha sido creado y está esperando por ti. 
            Además, recibirás en tu correo el asistente de contenido con IA para crear publicaciones efectivas.
          </p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-xl mx-auto">
            <p className="text-primary text-sm md:text-base flex items-center gap-2 justify-center">
              <Info className="w-5 h-5" />
              <strong>Primera sesión gratuita de 15 minutos</strong> para mostrarte tu sitio web
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="animated-border-wrapper mb-12 md:mb-16">
          <div className="bg-card rounded-[calc(1rem-2px)] p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-center">
              ¿Qué incluye tu primera sesión?
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              En 15 minutos te mostramos tu sitio web ya creado y listo para publicar. 
              Es completamente gratuito y sin compromiso.
            </p>

            {/* Info Box */}
            <div className="bg-primary/5 border-l-4 border-primary p-4 md:p-6 rounded-r-lg mb-6">
              <h3 className="text-foreground font-bold mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                ¿Por qué funciona así?
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Porque creemos en mostrar primero, cobrar después. Verás tu web en vivo, optimizada y lista para convertir. 
                Si te encanta, finalizas la compra en ese momento y agendas la mentoría.
              </p>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleSchedule}
              className="w-full mb-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 md:py-8 rounded-full text-base md:text-xl transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]">

              <Calendar className="w-6 h-6 mr-2" />
              Quiero ver mi sitio ahora
            </Button>

            {/* Mentorship Features */}
            <div className="bg-secondary border border-border rounded-lg p-6 mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                En la mentoría 1 a 1 con Esteban Montenegro:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Revisamos tu propuesta de valor</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Ajustamos tu mensaje para que sea claro y persuasivo</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Agendamos sesión de mentoría para publicar el sitio</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Final Results */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Al finalizar la mentoría tendrás:
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="feature-card p-6 bg-card border border-border rounded-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Tu identidad de marca clara
              </h3>
            </div>

            <div className="feature-card p-6 bg-card border border-border rounded-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Tu asistente de contenido listo para usar
              </h3>
            </div>

            <div className="feature-card p-6 bg-card border border-border rounded-2xl text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Tu página web publicada con tu dominio propio
              </h3>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
            Inversión en tu presencia profesional
          </h2>
          
          <div className="mb-6">
            <p className="text-muted-foreground mb-4 text-base md:text-lg">
              La mentoría para crear y lanzar tu web es <strong className="text-foreground">sin costo al agendar</strong>.
            </p>
            <p className="text-muted-foreground mb-4 text-base md:text-lg">El pago de $390.000 CLP (web + dominio + hosting 2 años + Asistentes de IA + Mentoría personalizada) se realiza durante la sesión, mediante un enlace de pago seguro.
              <strong className="text-foreground text-xl">$390.000 CLP</strong> (web + dominio + hosting 2 años + mentoría personalizada) 
              se realiza <strong className="text-foreground">durante la sesión</strong>, mediante un enlace de pago seguro.
            </p>
            <p className="text-muted-foreground text-base md:text-lg">
              Esto permite que primero veas tu página web creada y optimizada en vivo, y solo después decidas avanzar.
            </p>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-12">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-foreground font-bold mb-2">Nota importante</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Si no ves el correo en 5 minutos, revisa las carpetas <strong>Promociones</strong> o <strong>Spam</strong>. 
                A veces los sistemas de email los envían ahí por error.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm space-y-2 pt-8 border-t border-border">
          <div className="flex justify-center gap-4 mb-2">
            <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
            <span>|</span>
            <a href="#" className="hover:text-foreground transition-colors">Términos</a>
            <span>|</span>
            <a href="#" className="hover:text-foreground transition-colors">Contacto</a>
          </div>
          <p>esteban@crealoconia.com</p>
          <Button
            variant="outline"
            onClick={() => window.open('https://wa.me/56945487423?text=HeY%20como%20es%20eso%20de%20que%20creas%20paginas%20web%20en%204%20horas%3F', '_blank')}
            className="mt-4 border-border text-muted-foreground hover:bg-secondary hover:text-foreground">

            WhatsApp: +56 9 6124 9991
          </Button>
        </footer>
      </div>
    </div>);

};

export default Landing3;