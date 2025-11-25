import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Brain, User, Code, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PortfolioSection from "@/components/PortfolioSection";
import { useFormPersistence } from "@/hooks/useFormPersistence";
const Landing1 = () => {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const { saveProgress } = useFormPersistence();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre || formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }
    if (!formData.telefono || formData.telefono.replace(/\D/g, '').length < 9) {
      newErrors.telefono = 'El teléfono debe tener al menos 9 dígitos';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Completa los campos correctamente",
        description: "Revisa los errores en el formulario",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // Guardar en localStorage para mantener compatibilidad
      localStorage.setItem('userData', JSON.stringify(formData));
      
      // Guardar en el backend
      const backendData = {
        marca: formData.nombre,
        email: formData.email,
        whatsapp: formData.telefono,
        quien_eres: '',
        problemas: '',
        preguntas_frecuentes: '',
        estilo: '',
        producto: '',
        website: '',
        instagram: ''
      };
      await saveProgress(backendData as any);
      console.log('✅ Datos iniciales guardados en backend');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      toast({
        title: "¡Perfecto!",
        description: "Continuemos con las siguientes preguntas"
      });
      navigate('/quiz');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Hubo un problema. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {
          ...prev
        };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Haz Crecer tu Negocio con una Web Profesional en Minutos
            <span className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              (Impulsada por tu propio asistente de IA)
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Ideal para <span className="text-white font-semibold">Coaches, Terapeutas, Psicólogos, Consultores, Nutricionistas, Abogados, Arquitectos, Contadores, Diseñadores, Asesores Financieros y Creadores de Contenido</span>.
          </p>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mt-4">
            Tu web es tu carta de presentación. Consíguela lista sin complicaciones técnicas y enfocada en conseguir clientes.
          </p>
        </div>

        <div className="mb-12 md:mb-16 text-center">
          <Card className="bg-blue-500/10 border-blue-500/30 backdrop-blur p-6 md:p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Por qué una web profesional es vital?
            </h2>
            <p className="text-slate-300 text-base md:text-lg">
              Tus potenciales clientes buscan una web clara, profesional y que comunique tu valor para ellos, 
              si no, simplemente pasan al siguiente.
            </p>
          </Card>
        </div>

        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 md:mb-12">
            Cómo Funciona: 3 Servicios en 1
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur p-6 hover:bg-slate-800/70 transition-all duration-300 animate-fade-in">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    Prompt Estratégico Personalizado
                  </h3>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">
                    Gratis
                  </span>
                </div>
              </div>
              <p className="text-slate-300 text-sm md:text-base">
                Completa un breve formulario y la IA creará un asistente exclusivo para tu marca, que te ayudará a generar contenido, guiones de video, mensajes para redes y texto para tu web.
              </p>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur p-6 hover:bg-slate-800/70 transition-all duration-300 animate-fade-in" style={{
            animationDelay: '0.1s'
          }}>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-3">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  Mentoría 1 a 1 con Esteban Montenegro
                </h3>
              </div>
              <p className="text-slate-300 text-sm md:text-base">
                Revisamos tu propuesta de valor, optimizamos tu comunicación y ajustamos tu mensaje 
                para atraer a los clientes correctos.
              </p>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur p-6 hover:bg-slate-800/70 transition-all duration-300 animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-3">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  Sitio Web Profesional
                </h3>
              </div>
              <p className="text-slate-300 text-sm md:text-base mb-3">
                Tu web diseñada para convertir, con tu propuesta clara y enfocada a conseguir nuevos clientes.
              </p>
              <p className="text-lg font-bold text-white mb-1">
                Precio: $197.000 CLP
              </p>
              <p className="text-xs text-slate-400">
                (pago único, incluye mentoría personalizada)
              </p>
              <p className="text-xs text-slate-400 mt-2">
                *No aplica para E-commerce
              </p>
            </Card>
          </div>
        </div>

        <div className="mb-12 md:mb-16">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur p-6 md:p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              Beneficios Clave
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-base md:text-lg">
                  Posicionamiento profesional inmediato
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-base md:text-lg">
                  Mensaje claro y persuasivo para atraer clientes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-base md:text-lg">
                  Acompañamiento experto, no estás solo
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-base md:text-lg">
                  Sin necesidad de saber diseño o tecnología
                </span>
              </li>
            </ul>
          </Card>
        </div>

        <div className="mb-12 md:mb-16">
          <Card className="bg-slate-800/80 border-slate-700 backdrop-blur p-6 md:p-8 max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
              ¡Empieza Ahora!   
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="nombre" className="text-white mb-2 block">
                  Nombre o nombre de tu negocio
                </Label>
                <Input id="nombre" type="text" placeholder="Tu nombre o nombre de tu negocio" value={formData.nombre} onChange={e => handleInputChange('nombre', e.target.value)} className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400" disabled={isSubmitting} />
                {errors.nombre && <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>}
              </div>

              <div>
                <Label htmlFor="email" className="text-white mb-2 block">
                  Correo electrónico
                </Label>
                <Input id="email" type="email" placeholder="tu@email.com" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400" disabled={isSubmitting} />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="telefono" className="text-white mb-2 block">
                  Teléfono
                </Label>
                <Input id="telefono" type="tel" placeholder="+56 9 XXXX XXXX" value={formData.telefono} onChange={e => handleInputChange('telefono', e.target.value)} className="bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-400" disabled={isSubmitting} />
                {errors.telefono && <p className="text-red-400 text-sm mt-1">{errors.telefono}</p>}
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6 rounded-full text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl" disabled={isSubmitting}>
                {isSubmitting ? "Procesando..." : "Crear mi Web con IA"}
              </Button>
            </form>
          </Card>
        </div>

        <PortfolioSection />

        <div className="mb-12 text-center">
          <p className="text-slate-300 text-sm md:text-base mb-4">
            Más de 150 emprendedores ya están usando CrealoConIA
          </p>
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                {String.fromCharCode(64 + i)}
              </div>)}
          </div>
        </div>

        <footer className="text-center text-slate-400 text-sm space-y-2 pt-8 border-t border-slate-700">
          <div className="flex justify-center gap-4 mb-2">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
          <p>contacto@crealoconia.com</p>
        </footer>
      </div>
    </div>;
};
export default Landing1;