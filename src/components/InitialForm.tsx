import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Mail } from "lucide-react";
import FormField from '@/components/FormField';
import { FormData } from '@/hooks/useFormHandler';
import { Recaptcha } from '@/components/ui/recaptcha';
interface InitialFormProps {
  formData: FormData;
  onInputChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
  onLoadExample: () => void;
  recaptchaToken: string | null;
  setRecaptchaToken: (token: string | null) => void;
}
const InitialForm = ({
  formData,
  onInputChange,
  onSubmit,
  isValid,
  onLoadExample,
  recaptchaToken,
  setRecaptchaToken
}: InitialFormProps) => {
  return <Card className="max-w-2xl mx-auto bg-white border-gray-200 shadow-lg">
      <CardHeader className="text-center pb-6 bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-2xl text-gray-900 mb-3">
          Comencemos con tu información básica
        </CardTitle>
        
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <span className="font-bold text-blue-800">Contenido Personalizado</span>
              </div>
              <p className="text-blue-700 text-sm">📧 Email inmediato con tu super prompt para ChatGPT</p>
            </div>
            <div className="bg-white border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <span className="font-bold text-purple-800">Sitio Web Completo</span>
              </div>
              <p className="text-purple-700 text-sm">🌐 Segundo email con tu sitio web funcionando</p>
            </div>
          </div>
          <div className="bg-emerald-100 border border-emerald-300 rounded-lg p-3 mt-4 text-center">
            <p className="text-emerald-800 font-bold">
              ⏱️ Solo necesitamos 2 datos para empezar
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 bg-white">
        <form onSubmit={onSubmit} className="space-y-6">
          <FormField type="input" label="1. ¿Cómo se llama tu emprendimiento o marca personal?" placeholder="Ej: Luz Interior Coaching, Panadería Las 3 Hermanas, Soy Nombre Apellido" name="marca" value={formData.marca} onChange={onInputChange} icon={Users} />

          <FormField type="input" label="2. Correo electrónico (donde recibirás tu Kit IA)" placeholder="Ej: info@tumarca.com" name="email" value={formData.email} onChange={onInputChange} icon={Mail} />

          <Recaptcha
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={setRecaptchaToken}
            onExpired={() => setRecaptchaToken(null)}
            onError={() => setRecaptchaToken(null)}
          />

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
            <p className="text-amber-800">
              ⚠️ <strong>Configuración pendiente:</strong> Usando clave de prueba de reCAPTCHA. 
              <br/>Configura tu propia clave en Google reCAPTCHA para producción.
            </p>
          </div>

          <Button type="submit" className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200" disabled={!isValid || !recaptchaToken}>
            CONTINUAR CON EL FORMULARIO
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <div className="text-center space-y-3">
            <p className="text-gray-600 text-sm">
              🔐 100% seguro y sin spam
            </p>
            
          </div>
        </form>
      </CardContent>
    </Card>;
};
export default InitialForm;