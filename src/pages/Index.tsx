
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Brain, Rocket, Users, MessageSquare, TrendingUp, Zap, Mail, Globe, Instagram } from "lucide-react";
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
  email: string;
  website: string;
  instagram: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    marca: '',
    quien_eres: '',
    problemas: '',
    preguntas_frecuentes: '',
    estilo: '',
    producto: '',
    email: '',
    website: '',
    instagram: ''
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
      producto: 'Mi programa insignia "Renace: Transforma tu Vida en 90 Días", un proceso de coaching integral que incluye 8 sesiones individuales, un workbook personalizado, meditaciones guiadas y acceso a mi comunidad privada de mujeres en transformación. El programa está diseñado para mujeres que quieren hacer cambios profundos y duraderos en su vida personal y profesional.',
      email: 'carolina@luzinteriorcoaching.com',
      website: 'www.luzinteriorcoaching.com',
      instagram: 'luzinteriorcoaching'
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

  // All fields are now required including contact information
  const isFormValid = formData.marca.trim() !== '' && 
                     formData.quien_eres.trim() !== '' && 
                     formData.problemas.trim() !== '' && 
                     formData.preguntas_frecuentes.trim() !== '' && 
                     formData.estilo !== '' && 
                     formData.producto.trim() !== '' &&
                     formData.email.trim() !== '' &&
                     formData.website.trim() !== '' &&
                     formData.instagram.trim() !== '';

  if (showResults) {
    return <ResultsDisplay formData={formData} onReset={() => {
      setShowResults(false);
      setFormData({
        marca: '',
        quien_eres: '',
        problemas: '',
        preguntas_frecuentes: '',
        estilo: '',
        producto: '',
        email: '',
        website: '',
        instagram: ''
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
            Kit IA de Esteban
          </h1>
          <h2 className="text-2xl md:text-3xl text-white mb-6 font-semibold">
            Lanza tu contenido y web con inteligencia artificial — gratis y en minutos
          </h2>
          <p className="text-lg text-purple-100 max-w-4xl mx-auto leading-relaxed mb-6">
            Este kit gratuito está diseñado para emprendedores, coaches, freelancers y marcas personales que quieren tener presencia digital sin enredarse. Responde solo 6 preguntas y genera tu contenido, tu web y tu estrategia en segundos.
          </p>
          
          {/* Value proposition */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-300" />
                ✅ Recibirás:
              </h3>
              <div className="text-purple-100 text-left space-y-2">
                <p>• Un prompt profesional para ChatGPT</p>
                <p>• Un plan de contenido para 15 días</p>
                <p>• Los textos completos para tu web</p>
                <p>• Un prompt para crear tu sitio automáticamente en Lovable</p>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <p className="text-yellow-200 font-medium">
                  🎁 Valor estimado: USD 50 – pero hoy lo recibes gratis como parte de esta comunidad.
                </p>
              </div>
            </div>
          </div>

          <p className="text-purple-300 text-sm">
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
              Entre más detalladas y reflexivas sean tus respuestas, mejor será el kit generado. 
              La calidad de tu contenido depende de la información que compartas.
            </p>
          </CardContent>
        </Card>

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

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: MessageSquare, title: "Plan de Contenido", desc: "15 días de contenido para redes sociales listo para usar" },
            { icon: Rocket, title: "Web Automática", desc: "Prompt para crear tu sitio profesional en Lovable" },
            { icon: TrendingUp, title: "Estrategia de Negocio", desc: "Prompt personalizado para ChatGPT y crecimiento" }
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
            <CardTitle className="text-2xl text-white flex items-center justify-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              Completa estas preguntas para generar tu Kit IA personalizado
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {isGenerating ? (
              <LoadingSpinner />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <FormField
                  type="input"
                  label="1. ¿Cómo se llama tu emprendimiento o marca personal?"
                  placeholder="Ej: Luz Interior Coaching, Panadería Las 3 Hermanas, Soy Nombre Apellido"
                  name="marca"
                  value={formData.marca}
                  onChange={handleInputChange}
                  icon={Users}
                />

                <FormField
                  type="textarea"
                  label="2. ¿Quién eres y qué disfrutas hacer en tu trabajo? ¿A quién ayudas?"
                  placeholder="Ej: Soy Carolina, coach de vida. Me encanta acompañar a mujeres que buscan reconectar con su propósito."
                  name="quien_eres"
                  value={formData.quien_eres}
                  onChange={handleInputChange}
                  icon={Users}
                />

                <FormField
                  type="textarea"
                  label="3. ¿Qué problema frecuente tiene tu cliente ideal y cómo tú lo solucionas?"
                  placeholder="Ej: Mis clientas suelen sentirse bloqueadas emocionalmente. Yo las ayudo a recuperar claridad con sesiones de coaching."
                  name="problemas"
                  value={formData.problemas}
                  onChange={handleInputChange}
                  icon={MessageSquare}
                />

                <FormField
                  type="textarea"
                  label="4. ¿Qué te preguntan siempre o qué disfrutas explicar una y otra vez?"
                  placeholder="Ej: Me preguntan si realmente es posible cambiar de vida después de los 40. Me encanta mostrar que siempre es posible."
                  name="preguntas_frecuentes"
                  value={formData.preguntas_frecuentes}
                  onChange={handleInputChange}
                  icon={MessageSquare}
                />

                <FormField
                  type="select"
                  label="5. ¿Cómo te gusta comunicarte en redes sociales?"
                  name="estilo"
                  value={formData.estilo}
                  onChange={handleInputChange}
                  options={["Cercano", "Profesional", "Inspirador", "Con humor", "Técnico"]}
                  icon={MessageSquare}
                />

                <FormField
                  type="textarea"
                  label="6. ¿Qué producto o servicio principal quieres vender o promover hoy?"
                  placeholder="Ej: Mi programa 'Renace', un proceso de coaching de 8 semanas para mujeres que quieren recuperar su autoestima."
                  name="producto"
                  value={formData.producto}
                  onChange={handleInputChange}
                  icon={Rocket}
                />

                {/* Contact information section - now required */}
                <div className="border-t border-white/20 pt-8">
                  <h3 className="text-white text-xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
                    <Mail className="w-6 h-6" />
                    Información de contacto
                  </h3>
                  <p className="text-purple-200 text-center mb-6 text-sm">
                    Estos datos son obligatorios y mejorarán significativamente tus prompts personalizados
                  </p>
                  
                  <div className="space-y-6">
                    <FormField
                      type="input"
                      label="7. Correo electrónico"
                      placeholder="Ej: info@tumarca.com"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      icon={Mail}
                    />

                    <FormField
                      type="input"
                      label="8. Página web"
                      placeholder="Ej: www.tumarca.com"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      icon={Globe}
                    />

                    <FormField
                      type="input"
                      label="9. Instagram (nombre de usuario)"
                      placeholder="Ej: tumarca (sin @)"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      icon={Instagram}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  disabled={!isFormValid}
                >
                  <Brain className="w-6 h-6 mr-3" />
                  🧠 Generar mi Kit IA personalizado
                </Button>

                <p className="text-center text-purple-200 text-sm mt-4">
                  🔐 Sin trucos. Sin ventas forzadas. Solo valor real.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
