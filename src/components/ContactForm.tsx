
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Target, MessageCircle, Globe, Instagram, Phone, User, Building, HelpCircle, Package, Palette, Mail } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import FormField from './FormField';
import LoadingSpinner from './LoadingSpinner';

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
  whatsapp: string;
}

interface ContactFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

const ContactForm = ({ onSubmit, isLoading }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    marca: '',
    quien_eres: '',
    problemas: '',
    preguntas_frecuentes: '',
    estilo: '',
    producto: '',
    email: '',
    website: '',
    instagram: '',
    whatsapp: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.marca || !formData.quien_eres || !formData.problemas || !formData.preguntas_frecuentes || !formData.estilo || !formData.producto || !formData.email) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios marcados con *",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">Kit IA</h1>
          </div>
          
          <Badge className="mb-6 bg-green-500/20 text-green-200 border-green-400/50 px-4 py-2 text-lg">
            ✨ Genera tu contenido personalizado con IA
          </Badge>
          
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Crea tu plan de contenido completo, prompts para IA y todo lo que necesitas para hacer crecer tu marca en redes sociales
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-white/95 border-gray-200 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              Cuéntanos sobre tu emprendimiento
            </CardTitle>
            <p className="text-gray-600 mt-2">Completa estos datos para generar tu Kit IA personalizado</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Nombre de tu marca *"
                  icon={Building}
                  placeholder="Ej: TuMarca Consulting"
                >
                  <Input
                    value={formData.marca}
                    onChange={(e) => handleInputChange('marca', e.target.value)}
                    className="pl-10"
                    required
                  />
                </FormField>

                <FormField
                  label="Tu email *"
                  icon={Mail}
                  placeholder="tu@email.com"
                >
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </FormField>
              </div>

              <FormField
                label="¿Quién eres y a qué te dedicas? *"
                icon={User}
                placeholder="Ej: Soy coach de vida especializada en ayudar a mujeres emprendedoras a encontrar su propósito..."
              >
                <Textarea
                  value={formData.quien_eres}
                  onChange={(e) => handleInputChange('quien_eres', e.target.value)}
                  className="pl-10 min-h-[100px]"
                  required
                />
              </FormField>

              <FormField
                label="¿Qué problemas resuelves? *"
                icon={Target}
                placeholder="Ej: Ayudo a personas que se sienten perdidas en su carrera profesional, que no saben cómo monetizar sus talentos..."
              >
                <Textarea
                  value={formData.problemas}
                  onChange={(e) => handleInputChange('problemas', e.target.value)}
                  className="pl-10 min-h-[100px]"
                  required
                />
              </FormField>

              <FormField
                label="¿Qué preguntas te hacen frecuentemente? *"
                icon={HelpCircle}
                placeholder="Ej: ¿Cómo puedo encontrar mi propósito? ¿Es posible cambiar de carrera a los 40? ¿Cómo empezar un negocio desde cero?"
              >
                <Textarea
                  value={formData.preguntas_frecuentes}
                  onChange={(e) => handleInputChange('preguntas_frecuentes', e.target.value)}
                  className="pl-10 min-h-[100px]"
                  required
                />
              </FormField>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="¿Cuál es tu estilo de comunicación? *"
                  icon={Palette}
                  placeholder="Ej: Cercano, motivacional, profesional, divertido..."
                >
                  <Input
                    value={formData.estilo}
                    onChange={(e) => handleInputChange('estilo', e.target.value)}
                    className="pl-10"
                    required
                  />
                </FormField>

                <FormField
                  label="¿Cuál es tu producto/servicio principal? *"
                  icon={Package}
                  placeholder="Ej: Sesiones de coaching 1:1, Curso online de emprendimiento..."
                >
                  <Input
                    value={formData.producto}
                    onChange={(e) => handleInputChange('producto', e.target.value)}
                    className="pl-10"
                    required
                  />
                </FormField>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  Información de contacto (opcional)
                </h3>
                <p className="text-sm text-gray-600 mb-4">Esta información se incluirá en tus prompts personalizados para generar contenido más relevante</p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <FormField
                    label="Sitio web"
                    icon={Globe}
                    placeholder="https://tumarca.com"
                  >
                    <Input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="pl-10"
                    />
                  </FormField>

                  <FormField
                    label="Instagram"
                    icon={Instagram}
                    placeholder="tuusuario"
                  >
                    <Input
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      className="pl-10"
                    />
                  </FormField>

                  <FormField
                    label="WhatsApp"
                    icon={Phone}
                    placeholder="+56912345678"
                  >
                    <Input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      className="pl-10"
                    />
                  </FormField>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generando tu Kit IA...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Generar mi Kit IA
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Creator signature */}
        <div className="text-center mt-8">
          <p className="text-purple-300 text-sm">
            Kit IA diseñado y desarrollado por <span className="font-semibold text-purple-200">Esteban Montenegro</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
