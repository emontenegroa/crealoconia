
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import FormField from '@/components/FormField';
import { Users, Mail, Phone, Globe, Instagram, Target, MessageSquare, Rocket } from "lucide-react";

interface FormData {
  marca: string;
  quien_eres: string;
  problemas: string;
  preguntas_frecuentes: string;
  estilo: string;
  producto: string;
  email: string;
  whatsapp: string;
  website: string;
  instagram: string;
}

interface FormFieldsProps {
  formData: FormData;
  onInputChange: (name: string, value: string) => void;
  onAIUsageUpdate: (fieldName: string, count: number) => void;
  sessionId: string;
  noWebsite: boolean;
  noInstagram: boolean;
  setNoWebsite: (value: boolean) => void;
  setNoInstagram: (value: boolean) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormFields = ({
  formData,
  onInputChange,
  onAIUsageUpdate,
  sessionId,
  noWebsite,
  noInstagram,
  setNoWebsite,
  setNoInstagram,
  setFormData
}: FormFieldsProps) => {
  return (
    <div className="space-y-8">
      <FormField
        type="input"
        label="1. ¿Cómo se llama tu emprendimiento o marca personal?"
        placeholder="Ej: Luz Interior Coaching, Panadería Las 3 Hermanas, Soy Nombre Apellido"
        name="marca"
        value={formData.marca}
        onChange={onInputChange}
        icon={Users}
      />

      <FormField
        type="input"
        label="2. Correo electrónico (donde recibirás tu Kit IA)"
        placeholder="Ej: info@tumarca.com"
        name="email"
        value={formData.email}
        onChange={onInputChange}
        icon={Mail}
      />

      <FormField
        type="input"
        label="3. WhatsApp (para agregar botón de contacto en tu web)"
        placeholder="Ej: 56945487423 (solo números, sin +)"
        name="whatsapp"
        value={formData.whatsapp}
        onChange={onInputChange}
        icon={Phone}
      />

      <div className="space-y-3 group">
        <FormField
          type="input"
          label="4. Página web actual (si tienes)"
          placeholder="Ej: www.tumarca.com"
          name="website"
          value={formData.website}
          onChange={onInputChange}
          icon={Globe}
        />
        <div className="flex items-center space-x-2 ml-8">
          <Checkbox 
            id="no-website" 
            checked={noWebsite}
            onCheckedChange={(checked) => {
              setNoWebsite(checked as boolean);
              if (checked) {
                setFormData(prev => ({ ...prev, website: '' }));
              }
            }}
          />
          <label htmlFor="no-website" className="text-gray-700 text-sm cursor-pointer">
            No tengo página web (se creará automáticamente)
          </label>
        </div>
      </div>

      <div className="space-y-3 group">
        <FormField
          type="input"
          label="5. Instagram (nombre de usuario, sin @)"
          placeholder="Ej: tumarca"
          name="instagram"
          value={formData.instagram}
          onChange={onInputChange}
          icon={Instagram}
        />
        <div className="flex items-center space-x-2 ml-8">
          <Checkbox 
            id="no-instagram" 
            checked={noInstagram}
            onCheckedChange={(checked) => {
              setNoInstagram(checked as boolean);
              if (checked) {
                setFormData(prev => ({ ...prev, instagram: '' }));
              }
            }}
          />
          <label htmlFor="no-instagram" className="text-gray-700 text-sm cursor-pointer">
            No tengo Instagram
          </label>
        </div>
      </div>

      <FormField
        type="textarea"
        label="6. ¿Quién eres y qué te apasiona de tu trabajo? ¿A quién ayudas? (Sé específico)"
        placeholder="Ej: Soy Carolina, coach de vida certificada con 8 años de experiencia. Me apasiona acompañar a mujeres emprendedoras de 30-45 años que buscan reconectar con su propósito..."
        name="quien_eres"
        value={formData.quien_eres}
        onChange={onInputChange}
        icon={Users}
        showAIEnhance={true}
        context={{
          marca: formData.marca,
          estilo: formData.estilo
        }}
        sessionId={sessionId}
        onAIUsageUpdate={onAIUsageUpdate}
      />

      <FormField
        type="textarea"
        label="7. ¿Qué problema específico vives día a día con tus clientes y cómo los ayudas a solucionarlo?"
        placeholder="Ej: Mis clientas llegan sintiéndose bloqueadas emocionalmente, con miedo al fracaso y síndrome del impostor. Yo las ayudo con un proceso de autoconocimiento profundo usando técnicas de PNL..."
        name="problemas"
        value={formData.problemas}
        onChange={onInputChange}
        icon={Target}
        showAIEnhance={true}
        context={{
          marca: formData.marca,
          estilo: formData.estilo
        }}
        sessionId={sessionId}
        onAIUsageUpdate={onAIUsageUpdate}
      />

      <FormField
        type="textarea"
        label="8. ¿Qué te preguntan siempre tus clientes o qué disfrutas explicar una y otra vez?"
        placeholder="Ej: Me preguntan constantemente si es posible cambiar de vida después de los 40 años cuando ya tienes responsabilidades. Me encanta mostrarles que siempre es posible..."
        name="preguntas_frecuentes"
        value={formData.preguntas_frecuentes}
        onChange={onInputChange}
        icon={MessageSquare}
        showAIEnhance={true}
        context={{
          marca: formData.marca,
          estilo: formData.estilo
        }}
        sessionId={sessionId}
        onAIUsageUpdate={onAIUsageUpdate}
      />

      <FormField
        type="select"
        label="9. ¿Cómo te gusta comunicarte en redes sociales?"
        name="estilo"
        value={formData.estilo}
        onChange={onInputChange}
        options={["Cercano", "Profesional", "Inspirador", "Con humor", "Técnico"]}
        icon={MessageSquare}
      />

      <FormField
        type="textarea"
        label="10. ¿Cuál es tu producto o servicio principal que quieres vender más? (Describe beneficios específicos)"
        placeholder="Ej: Mi programa 'Renace', un proceso de coaching de 8 semanas que incluye sesiones individuales, workbook personalizado y comunidad privada. Está diseñado para mujeres que quieren cambios profundos en 90 días..."
        name="producto"
        value={formData.producto}
        onChange={onInputChange}
        icon={Rocket}
        showAIEnhance={true}
        context={{
          marca: formData.marca,
          estilo: formData.estilo
        }}
        sessionId={sessionId}
        onAIUsageUpdate={onAIUsageUpdate}
      />
    </div>
  );
};

export default FormFields;
