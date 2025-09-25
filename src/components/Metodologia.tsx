import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Brain, Palette, Rocket, Clock, CheckCircle } from "lucide-react";
const Metodologia = () => {
  const pasos = [{
    numero: "01",
    icono: <MessageSquare className="w-8 h-8 text-blue-600" />,
    titulo: "Responde 10 preguntas",
    descripcion: "Formulario inteligente que captura la esencia de tu negocio",
    tiempo: "5 minutos",
    detalles: "Preguntas estratégicas sobre tu marca, audiencia, servicios y objetivos"
  }, {
    numero: "02",
    icono: <Brain className="w-8 h-8 text-purple-600" />,
    titulo: "IA analiza y estructura",
    descripcion: "Inteligencia artificial procesa tu información y crea la arquitectura",
    tiempo: "Automático",
    detalles: "Genera textos, estructura de contenido y estrategia de conversión"
  }, {
    numero: "03",
    icono: <Palette className="w-8 h-8 text-emerald-600" />,
    titulo: "Diseño y desarrollo",
    descripcion: "Creamos el diseño visual y desarrollamos tu página web",
    tiempo: "18-20 horas",
    detalles: "Diseño profesional, responsive, optimizado para conversión"
  }, {
    numero: "04",
    icono: <Rocket className="w-8 h-8 text-orange-600" />,
    titulo: "Entrega y revisión",
    descripcion: "Te enviamos tu página para revisión y feedback",
    tiempo: "24 horas",
    detalles: "Página funcional completa con dominio temporal para revisión"
  }, {
    numero: "05",
    icono: <Clock className="w-8 h-8 text-blue-500" />,
    titulo: "Sesión personalizada",
    descripcion: "Agenda tu sesión de 15 minutos para que conozcas tu página y resolver tus consultas",
    tiempo: "15 minutos",
    detalles: "Haces el pago y agendamos la sesión personalizada para las integraciones que necesites realizar y publicar tu sitio web"
  }];
  return <div className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mi Metodología: Simple, Rápida y Efectiva 🎯
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            En solo 5 pasos convertimos tu información en una página web profesional que genera resultados
          </p>
        </div>

        {/* Timeline de pasos */}
        <div className="relative">
          {/* Línea conectora */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-emerald-500 hidden lg:block"></div>
          
          <div className="space-y-12">
            {pasos.map((paso, index) => <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Contenido */}
                <div className="flex-1">
                  <Card className="border border-border bg-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {paso.icono}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-3xl font-bold text-primary">{paso.numero}</span>
                            <div className="bg-primary/10 px-3 py-1 rounded-full">
                              <span className="text-primary font-medium text-sm">{paso.tiempo}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{paso.titulo}</h3>
                          <p className="text-muted-foreground mb-3">{paso.descripcion}</p>
                          <p className="text-sm text-foreground font-medium">{paso.detalles}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Número central para desktop */}
                <div className="hidden lg:flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full font-bold text-xl z-10">
                  {index + 1}
                </div>

                {/* Espaciador */}
                <div className="flex-1 hidden lg:block"></div>
              </div>)}
          </div>
        </div>

        {/* Garantías y beneficios adicionales */}
        

        {/* CTA de la metodología */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-emerald-500/10 border-primary/30 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                ¿Quieres ver esta metodología en acción? 🚀
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                Déjanos crear tu propuesta gratuita y comprueba por ti mismo la calidad de nuestro trabajo
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span>⚡ Sin compromisos</span>
                <span>⚡ Sin pagos anticipados</span>
                <span>⚡ Resultado garantizado</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default Metodologia;