import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Clock, Wrench, DollarSign, Frown, Smile, ArrowRight, Sparkles } from "lucide-react";

const ProblemaSolucion = () => {
  const scrollToForm = () => {
    // Scroll to the top where the form is
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
    
    // After scrolling, highlight the form fields
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[name="marca"], input[name="email"]');
      inputs.forEach((input) => {
        const element = input as HTMLElement;
        element.style.animation = 'pulse 1s ease-in-out 2';
        element.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
        
        // Remove the highlight after animation
        setTimeout(() => {
          element.style.animation = '';
          element.style.boxShadow = '';
        }, 2000);
      });
    }, 800);
  };
  const problemas = [
    {
      icon: <Frown className="w-6 h-6 text-red-500" />,
      titulo: "Proceso engorroso y frustrante",
      descripcion: "Te piden mucha información que se copia y pega sin dinamismo ni gráficas atractivas"
    },
    {
      icon: <Clock className="w-6 h-6 text-red-500" />,
      titulo: "Tiempo y foco perdidos",
      descripcion: "La página se diluye en el tiempo, pierdes el foco y no sabes por dónde continuar"
    },
    {
      icon: <Wrench className="w-6 h-6 text-red-500" />,
      titulo: "Falta de experiencia técnica",
      descripcion: "No tienes conocimientos técnicos, lo haces tu pero a la mitad te das cuenta que no era tan fácil como parecía y no sabes como continuar."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-red-500" />,
      titulo: "Inversión sin resultados",
      descripcion: "Has gastado tiempo y dinero en intentos anteriores sin obtener lo que necesitas"
    }
  ];

  const soluciones = [
    {
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      titulo: "Proceso simple y dinámico",
      descripcion: "Solo respondes 10 preguntas y nosotros creamos todo con dinamismo y diseño atractivo"
    },
    {
      icon: <Clock className="w-6 h-6 text-emerald-600" />,
      titulo: "Entrega en 24 horas",
      descripcion: "Tu página web funcional y profesional lista en tiempo récord"
    },
    {
      icon: <Wrench className="w-6 h-6 text-emerald-600" />,
      titulo: "Nos encargamos de todo lo técnico",
      descripcion: "Diseño, estructura, textos, imágenes, colores - sin complicaciones para ti"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
      titulo: "Propuesta gratuita primero",
      descripcion: "Ves el resultado antes de decidir - sin riesgos ni compromisos"
    }
  ];

  return (
    <div className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Te suena familiar esta situación? 🤔
          </h2>
          <p className="text-xl text-muted-foreground">
            La mayoría de mis clientes llegan después de experiencias frustrantes...
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Problemas */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                😤 Antes (Lo que NO quieres vivir)
              </h3>
              <p className="text-muted-foreground">
                Los problemas típicos al crear una página web
              </p>
            </div>
            
            <div className="space-y-4">
              {problemas.map((problema, index) => (
                <Card key={index} className="border-red-300/60 bg-red-100/80 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {problema.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-900 mb-2">{problema.titulo}</h4>
                        <p className="text-red-700 text-sm leading-relaxed">{problema.descripcion}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Soluciones */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                😊 Con CrealoconIA (Tu nueva realidad)
              </h3>
              <p className="text-muted-foreground">
                Cómo resolvemos cada uno de estos problemas
              </p>
            </div>
            
            <div className="space-y-4">
              {soluciones.map((solucion, index) => (
                <Card key={index} className="border-emerald-300/60 bg-emerald-100/80 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {solucion.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-emerald-900 mb-2">{solucion.titulo}</h4>
                        <p className="text-emerald-700 text-sm leading-relaxed">{solucion.descripcion}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-primary/10 border-primary/30 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-4">
                NO es el clásico texto de ChatGPT 🚀
              </h3>
              <p className="text-foreground mb-6">
                La inteligencia artificial toma tus respuestas y las transforma en algo genial. CrealoconIA no te categoriza por rubro o servicio, lo crea para ti (colores, diseño, texto, diagrama de proceso, imágenes, llamados a la acción)
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>✅ Personalizado para ti</span>
                <span>✅ No genérico</span>
                <span>✅ 100% único</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Button */}
        <div className="mt-12 text-center">
          <Button 
            onClick={scrollToForm}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] px-8 py-4 text-lg font-semibold"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Empezar ahora
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProblemaSolucion;