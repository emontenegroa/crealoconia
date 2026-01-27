import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, CheckCircle, Sparkles } from "lucide-react";
import confetti from 'canvas-confetti';

interface FormData {
  marca: string;
  quien_eres: string;
  problemas: string;
  preguntas_frecuentes: string;
  estilo: string;
  producto: string;
  email: string;
  whatsapp: string;
  website: string;
  instagram: string;
}

interface ResultsDisplayProps {
  formData: FormData;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  formData,
  onReset
}) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    const triggerMegaConfetti = () => {
      const colors = ['#10B981', '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6'];

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
      });

      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { x: 0.2, y: 0.7 },
          colors: colors
        });
      }, 300);

      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { x: 0.8, y: 0.7 },
          colors: colors
        });
      }, 600);

      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#10B981', '#14B8A6', '#FFD700']
        });
      }, 1000);
    };

    triggerMegaConfetti();
    setTimeout(triggerMegaConfetti, 3000);
  }, []);

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

      <div className="container mx-auto px-4 py-12">
        
        {/* Celebration Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            🎉 ¡Felicitaciones!
          </h1>
          
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground mb-8">
            <p className="font-medium text-foreground">
              Acabas de dar el paso hacia tu web fácil, rápida y profesional.
            </p>
            
            <p>
              Nuestra IA ya está trabajando en tu sitio.
              En pocos minutos recibirás un correo con el Asistente para contenido y publicación y para mostrarte la página web nos pondremos en CONTACTO contigo.
            </p>
            
            <p className="font-medium text-foreground">
              Una web pensada para trabajar por ti 24/7 y ayudarte a conseguir clientes sin perder tiempo.
            </p>
          </div>

          <Button 
            onClick={onReset} 
            variant="outline" 
            className="border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Crear otro Kit IA
          </Button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-xl">
          <div className="p-8 space-y-10">
            
            {/* Email Section */}
            <div className="border-b border-border pb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                📧 Revisa tu bandeja de entrada
              </h2>
              
              {/* SPAM Alert */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
                <p className="text-primary font-semibold text-center mb-2">
                  ⚠️ IMPORTANTE: Revisa tu carpeta de SPAM
                </p>
                <p className="text-primary/80 text-sm text-center">
                  Si no ves más correos nuestros en tu bandeja principal, búscalos en spam/correo no deseado y márcanos como "no es spam" o busca por correo esteban@crealoconia.com
                </p>
              </div>
              
              <div className="space-y-3 text-muted-foreground">
                <p>Ahí encontrarás las instrucciones importantes para el siguiente paso.</p>
                <p>Ese correo te dirá cómo revisar tu web y cómo avanzar en la publicación si decides hacerlo.</p>
                <p className="font-semibold text-foreground">👉 Es fundamental que lo leas para no perder tu proyecto.</p>
              </div>
            </div>

            {/* Important Section */}
            <div className="border-b border-border pb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                🎯 Importante
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>En Crealoconia no generamos sitios para todos los formularios.</p>
                <p>Seleccionamos algunos proyectos y les creamos una propuesta 100% funcional, lista para revisar y evaluar sin compromiso.</p>
                <p className="font-semibold text-foreground">👉 Si tu sitio te convence y quieres publicarlo, avanzaremos con una sesión de ajuste y actualización para dejarlo afinado a tus necesidades y publicarlo en tu propio dominio.</p>
              </div>
            </div>

            {/* Bonus Section */}
            <div className="border-b border-border pb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                🎁 Bonus de regalo
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Además de tu web, recibirás un Super Prompt exclusivo para ChatGPT.</p>
                <p>Con él podrás crear:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Contenido para redes sociales</li>
                  <li>Emails de captación y venta</li>
                  <li>Textos de alta conversión para tu negocio</li>
                </ul>
                <p>Este bonus llegará también a tu correo junto con tu web.</p>
              </div>
            </div>

            {/* Next Steps Section */}
            <div className="border-b border-border pb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                🚀 Tus próximos pasos
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-foreground">1.</span>
                  <div>
                    <span className="font-semibold text-foreground">📧 Abre tu correo:</span>
                    <span className="text-muted-foreground"> revisa las instrucciones.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-foreground">2.</span>
                  <div>
                    <span className="font-semibold text-foreground">🌐 Recibe tu web:</span>
                    <span className="text-muted-foreground"> analiza el diseño funcional que hemos creado para ti.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-foreground">3.</span>
                  <div>
                    <span className="font-semibold text-foreground">🎁 Usa tu Super Prompt:</span>
                    <span className="text-muted-foreground"> potencia tu comunicación digital.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                💬 ¿Necesitas ayuda en el camino?
              </h2>
              <p className="text-muted-foreground mb-4">Estamos disponibles para ti:</p>
              <div className="flex items-center justify-center gap-4">
                <a 
                  href={`mailto:esteban@crealoconia.com?subject=Consulta sobre mi proyecto ${formData.marca}`} 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg shadow-primary/25"
                >
                  <Mail className="w-4 h-4" />
                  📧 Email
                </a>
                <a 
                  href={`https://wa.me/56962791772?text=Hola%2C%20completé%20el%20formulario%20para%20${encodeURIComponent(formData.marca)}%20y%20tengo%20una%20consulta`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg shadow-primary/25"
                >
                  <Phone className="w-4 h-4" />
                  💬 WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md mx-auto">
            <p className="text-muted-foreground font-medium">
              <strong className="text-primary text-lg">Crealoconia.com</strong>
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Tu presencia digital sin complicaciones ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
