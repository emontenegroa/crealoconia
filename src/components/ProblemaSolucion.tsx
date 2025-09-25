import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock, Wrench, DollarSign, Frown, Smile, ArrowRight } from "lucide-react";

const ProblemaSolucion = () => {
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
      descripcion: "No tienes conocimientos técnicos y no sabes con quién crear tu página web"
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
                <Card key={index} className="border-red-200 bg-red-50/50">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {problema.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{problema.titulo}</h4>
                        <p className="text-muted-foreground text-sm">{problema.descripcion}</p>
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
                <Card key={index} className="border-emerald-200 bg-emerald-50/50">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {solucion.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{solucion.titulo}</h4>
                        <p className="text-muted-foreground text-sm">{solucion.descripcion}</p>
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
                ¿Listo para cambiar tu experiencia? 🚀
              </h3>
              <p className="text-foreground mb-6">
                Deja atrás las frustraciones y obtén la página web profesional que tu negocio merece
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>✅ Sin tecnicismos</span>
                <span>✅ Sin esperas</span>
                <span>✅ Sin riesgos</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProblemaSolucion;