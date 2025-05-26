
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Brain, Rocket, Users, MessageSquare, Globe } from "lucide-react";
import FormField from '@/components/FormField';
import ResultsDisplay from '@/components/ResultsDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';

interface FormData {
  marca: string;
  quien_eres: string;
  problemas: string;
  preguntas_frecuentes: string;
  estilo: string;
  producto: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    marca: '',
    quien_eres: '',
    problemas: '',
    preguntas_frecuentes: '',
    estilo: '',
    producto: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsGenerating(false);
    setShowResults(true);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  if (showResults) {
    return <ResultsDisplay formData={formData} onReset={() => {
      setShowResults(false);
      setFormData({
        marca: '',
        quien_eres: '',
        problemas: '',
        preguntas_frecuentes: '',
        estilo: '',
        producto: ''
      });
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-400 to-blue-400 p-4 rounded-2xl shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
            SuperPrompt
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 font-light max-w-4xl mx-auto leading-relaxed">
            Crea tu presencia online en minutos con inteligencia artificial
          </p>
          <p className="text-lg text-purple-200 mt-4 max-w-3xl mx-auto">
            Responde estas 6 preguntas para generar contenido para tus redes sociales, una página web completa y un prompt listo para usar en ChatGPT y Lovable.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: MessageSquare, title: "Contenido para Redes", desc: "Posts optimizados para todas las plataformas" },
            { icon: Globe, title: "Página Web Completa", desc: "Diseño y contenido listo para publicar" },
            { icon: Rocket, title: "Prompts de IA", desc: "Instrucciones para ChatGPT y Lovable" }
          ].map((feature, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-purple-200 text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Form */}
        <Card className="max-w-4xl mx-auto bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl text-white flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              Cuéntanos sobre tu proyecto
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {isGenerating ? (
              <LoadingSpinner />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <FormField
                  type="input"
                  label="¿Cómo se llama tu emprendimiento o marca personal?"
                  placeholder="Ej: Luz Interior Coaching, Panadería Las 3 Hermanas, Soy Nombre Apellido"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  icon={Users}
                />

                <FormField
                  type="textarea"
                  label="¿Quién eres y qué disfrutas hacer en tu trabajo? ¿A quién ayudas?"
                  placeholder="Ej: Soy Carolina, coach de vida. Me encanta acompañar a mujeres que buscan reconectar con su propósito."
                  name="quien_eres"
                  value={formData.quien_eres}
                  onChange={handleInputChange}
                  icon={Users}
                />

                <FormField
                  type="textarea"
                  label="¿Qué problema frecuente tiene tu cliente ideal y cómo tú lo solucionas?"
                  placeholder="Ej: Mis clientas suelen sentirse bloqueadas emocionalmente. Yo las ayudo a recuperar claridad con sesiones de coaching."
                  name="problemas"
                  value={formData.problemas}
                  onChange={handleInputChange}
                  icon={MessageSquare}
                />

                <FormField
                  type="textarea"
                  label="¿Qué te preguntan siempre o qué disfrutas explicar una y otra vez?"
                  placeholder="Ej: Me preguntan si realmente es posible cambiar de vida después de los 40. Me encanta mostrar que siempre es posible."
                  name="preguntas_frecuentes"
                  value={formData.preguntas_frecuentes}
                  onChange={handleInputChange}
                  icon={MessageSquare}
                />

                <FormField
                  type="select"
                  label="¿Cómo te gusta comunicarte en redes sociales?"
                  name="estilo"
                  value={formData.estilo}
                  onChange={handleInputChange}
                  options={["Cercano", "Profesional", "Inspirador", "Con humor", "Técnico"]}
                  icon={MessageSquare}
                />

                <FormField
                  type="textarea"
                  label="¿Qué producto o servicio principal quieres vender o promover hoy?"
                  placeholder="Ej: Mi programa 'Renace', un proceso de coaching de 8 semanas para mujeres que quieren recuperar su autoestima."
                  name="producto"
                  value={formData.producto}
                  onChange={handleInputChange}
                  icon={Rocket}
                />

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  disabled={!isFormValid}
                >
                  <Brain className="w-6 h-6 mr-3" />
                  🧠 Generar mi SuperPrompt
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
