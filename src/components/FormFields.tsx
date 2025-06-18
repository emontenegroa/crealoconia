
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import FormField from '@/components/FormField';
import { Users, Mail, Phone, Globe, Instagram, Target, MessageSquare, Rocket } from "lucide-react";
import { useLanguage } from '@/hooks/useLanguage';

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
  const { t, translations } = useLanguage();

  // Preparar las opciones de estilo para el select
  const styleOptions = ["Cercano", "Profesional", "Inspirador", "Con humor", "Técnico"];
  const styleLabels = styleOptions.map(option => translations.styles[option as keyof typeof translations.styles]);

  return (
    <div className="space-y-8">
      <FormField
        type="input"
        label={t('brandLabel')}
        placeholder={t('brandPlaceholder')}
        name="marca"
        value={formData.marca}
        onChange={onInputChange}
        icon={Users}
      />

      <FormField
        type="input"
        label={t('emailLabel')}
        placeholder={t('emailPlaceholder')}
        name="email"
        value={formData.email}
        onChange={onInputChange}
        icon={Mail}
      />

      <FormField
        type="input"
        label={t('whatsappLabel')}
        placeholder={t('whatsappPlaceholder')}
        name="whatsapp"
        value={formData.whatsapp}
        onChange={onInputChange}
        icon={Phone}
      />

      <div className="space-y-3 group">
        <FormField
          type="input"
          label={t('websiteLabel')}
          placeholder={t('websitePlaceholder')}
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
            {t('noWebsite')}
          </label>
        </div>
      </div>

      <div className="space-y-3 group">
        <FormField
          type="input"
          label={t('instagramLabel')}
          placeholder={t('instagramPlaceholder')}
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
            {t('noInstagram')}
          </label>
        </div>
      </div>

      <FormField
        type="textarea"
        label={t('whoAreYouLabel')}
        placeholder={t('whoAreYouPlaceholder')}
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
        label={t('problemLabel')}
        placeholder={t('problemPlaceholder')}
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
        label={t('faqLabel')}
        placeholder={t('faqPlaceholder')}
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
        label={t('styleLabel')}
        name="estilo"
        value={formData.estilo}
        onChange={onInputChange}
        options={styleOptions}
        icon={MessageSquare}
      />

      <FormField
        type="textarea"
        label={t('productLabel')}
        placeholder={t('productPlaceholder')}
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
