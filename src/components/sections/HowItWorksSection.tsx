import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from '@/components/ScrollAnimation';
const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const steps = [{
    title: "Escuchamos y ordenamos tus ideas",
    description: "A través de preguntas estratégicas, extraemos la esencia de lo que haces y cómo lo haces."
  }, {
    title: "Convertimos tus respuestas en una base digital",
    description: "Usamos IA para estructurar tu conocimiento en contenido web profesional y estratégico."
  }, {
    title: "Creamos tu sitio web real (o MVP, landing, POC)",
    description: "Desarrollamos tu presencia digital con tecnología real, no plantillas genéricas."
  }, {
    title: "Te mentoreamos y afinamos juntos cada detalle",
    description: "Acompañamiento personalizado hasta que tengas exactamente lo que necesitas."
  }];
  return;
};
export default HowItWorksSection;