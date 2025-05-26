import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Brain, Rocket, Users, MessageSquare, TrendingUp, Zap } from "lucide-react";
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

  const loadExampleData = () => {
    setFormData({
      marca: 'Luz Interior Coaching',
      quien_eres: 'Soy Carolina, coach de vida certificada con 8 años de experiencia. Me apasiona acompañar a mujeres emprendedoras y profesionales que buscan reconectar con su propósito de vida y desarrollar todo su potencial. Disfruto profundamente crear espacios seguros donde mis clientas pueden explorar sus emociones, desbloquear sus miedos y diseñar la vida que realmente desean vivir.',
      problemas: 'Mis clientas suelen llegar a mí sintiéndose bloqueadas emocionalmente, con una sensación constante de estar viviendo en piloto automático sin conexión con lo que realmente las hace felices. Muchas experimentan el síndrome del impostor, miedo al fracaso y dificultades para tomar decisiones importantes. Yo las ayudo a través de un proceso de autoconocimiento profundo, técnicas de PNL y ejercicios prácticos que les permiten recuperar su claridad mental, confianza y dirección en la vida.',
      preguntas_frecuentes: 'Me preguntan constantemente si realmente es posible cambiar de vida después de los 35 o 40 años, especialmente cuando ya tienen responsabilidades familiares y económicas. También me consultan sobre cómo saber si están tomando la decisión correcta y cómo superar el miedo al juicio de otros. Me encanta explicar que la transformación es posible a cualquier edad y que el momento perfecto no existe, pero el momento presente sí.',
      estilo: 'Inspirador',
      producto: 'Mi programa insignia "Renace: Transforma tu Vida en 90 Días", un proceso de coaching integral que incluye 8 sesiones individuales, un workbook personalizado, meditaciones guiadas y acceso a mi comunidad privada de mujeres en transformación. El programa está diseñado para mujeres que quieren hacer cambios profundos y duraderos en su vida personal y profesional.'
    });
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
            Genera prompts optimizados para crear tu página web en Lovable, contenido para reels y posts de redes sociales que te ayuden a entender mejor tu negocio y vender más.
          </p>
          
          {/* Special offer notice */}
          <div className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
            <span className="text-yellow-100 font-medium">¡GRATIS por tiempo limitado!</span>
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>

          {/* Creator credit */}
          <p className="text-purple-300 mt-4 text-sm">
            Creado por <span className="font-semibold text-purple-200">Esteban Montenegro</span>
          </p>
        </div>

        {/* Important notice */}
        <Card className="max-w-4xl mx-auto mb-8 bg-white/95 border-gray-200 shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Brain className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Tómate tu tiempo para responder</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Entre más detalladas y reflexivas sean tus respuestas, mejor será el prompt generado. 
              La calidad de tu contenido depende de la información que compartas.
            </p>
          </CardContent>
        </Card>

        {/* Example data button */}
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <Button 
            onClick={loadExampleData}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            Cargar ejemplo para ver resultados
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: MessageSquare, title: "Contenido para Redes", desc: "Reels y posts optimizados para todas las plataformas" },
            { icon: Rocket, title: "Prompt para Lovable", desc: "Instrucciones detalladas para crear tu página web" },
            { icon: TrendingUp, title: "Estrategia de Negocio", desc: "Entiende mejor tu propuesta y mejora tus ventas" }
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
