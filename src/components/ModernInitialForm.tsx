import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mail, 
  User, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Globe,
  MessageSquare
} from 'lucide-react';
import { FormData } from '@/hooks/useFormHandler';
import MathCaptcha from '@/components/ui/MathCaptcha';

interface ModernInitialFormProps {
  formData: FormData;
  onInputChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
  onLoadExample: () => void;
  onMathCaptchaChange: (isValid: boolean) => void;
}

const ModernInitialForm = ({
  formData,
  onInputChange,
  onSubmit,
  isValid,
  onLoadExample,
  onMathCaptchaChange
}: ModernInitialFormProps) => {
  const [selectedPackage, setSelectedPackage] = useState<'content' | 'complete'>('complete');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const packages = [
    {
      id: 'content' as const,
      icon: MessageSquare,
      title: 'Contenido Personalizado',
      description: 'Email inmediato con tu super prompt para ChatGPT',
      features: ['15 días de posts estratégicos', 'Prompt personalizado para IA', 'Contenido que vende'],
      accent: 'text-primary',
      bgAccent: 'bg-primary/10',
      borderAccent: 'border-primary/30'
    },
    {
      id: 'complete' as const,
      icon: Globe,
      title: 'Sitio Web Completo',
      description: 'Segundo email con tu sitio web funcionando',
      features: ['Todo lo anterior +', 'Sitio web profesional', 'Optimizado para conversiones'],
      accent: 'text-secondary',
      bgAccent: 'bg-secondary/10',
      borderAccent: 'border-secondary/30',
      popular: true
    }
  ];

  const progress = () => {
    let filled = 0;
    if (formData.marca) filled += 50;
    if (formData.email) filled += 50;
    return filled;
  };

  return (
    <section className="py-20 px-6" data-form-section>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-gradient">Comencemos con tu información básica</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Solo necesitamos 2 datos para comenzar tu transformación digital
          </p>
        </div>

        {/* Package Selection */}
        <div className="mb-12 animate-slide-up">
          <h3 className="text-2xl font-bold text-center mb-8">Elige tu paquete:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`glass-card hover-lift cursor-pointer transition-all duration-300 ${
                  selectedPackage === pkg.id 
                    ? `ring-2 ring-primary shadow-glow ${pkg.borderAccent}` 
                    : 'hover:border-primary/20'
                } ${pkg.popular ? 'relative' : ''}`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-4 py-1 animate-pulse">
                    ⭐ Más Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${pkg.bgAccent} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <pkg.icon className={`w-8 h-8 ${pkg.accent}`} />
                  </div>
                  <h4 className="text-xl font-bold">{pkg.title}</h4>
                  <p className="text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
              ✅ Solo necesitamos 2 datos para empezar
            </Badge>
            <span className="text-sm text-muted-foreground">{progress()}% completado</span>
          </div>
          <Progress value={progress()} className="h-2" />
        </div>

        {/* Form */}
        <Card className="glass-card animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-8">
            <form onSubmit={onSubmit} className="space-y-8">
              {/* Field 1 */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-lg font-semibold">
                  <User className="w-5 h-5 text-primary" />
                  <span>1. ¿Cómo se llama tu emprendimiento o marca personal?</span>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Ej: Coaching con María, Consultora Digital, etc."
                    value={formData.marca}
                    onChange={(e) => onInputChange('marca', e.target.value)}
                    onFocus={() => setFocusedField('marca')}
                    onBlur={() => setFocusedField(null)}
                    className={`h-14 text-lg transition-all duration-300 ${
                      focusedField === 'marca' ? 'ring-2 ring-primary shadow-glow' : ''
                    } ${formData.marca ? 'border-green-500' : ''}`}
                  />
                  {formData.marca && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {focusedField === 'marca' && (
                  <p className="text-sm text-muted-foreground animate-fade-in">
                    💡 Escribe el nombre que usas para tu negocio o marca personal
                  </p>
                )}
              </div>

              {/* Field 2 */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-lg font-semibold">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>2. Correo electrónico (donde recibirás tu Kit IA)</span>
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => onInputChange('email', e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`h-14 text-lg transition-all duration-300 ${
                      focusedField === 'email' ? 'ring-2 ring-primary shadow-glow' : ''
                    } ${formData.email ? 'border-green-500' : ''}`}
                  />
                  {formData.email && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {focusedField === 'email' && (
                  <p className="text-sm text-muted-foreground animate-fade-in">
                    📧 Aquí recibirás tu contenido personalizado y sitio web
                  </p>
                )}
              </div>

              {/* Security Captcha */}
              <div className="space-y-4">
                <label className="flex items-center space-x-2 text-lg font-semibold">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Verificación de seguridad</span>
                </label>
                <div className="bg-muted/30 p-6 rounded-xl border border-dashed border-muted-foreground/30">
                  <MathCaptcha onVerify={onMathCaptchaChange} />
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-6">
                <Button
                  type="submit"
                  disabled={!isValid}
                  className={`w-full h-16 text-xl font-bold transition-all duration-300 ${
                    isValid 
                      ? 'btn-gradient animate-pulse-glow hover:scale-[1.02]' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {isValid ? (
                    <>
                      CONTINUAR CON EL FORMULARIO
                      <ArrowRight className="ml-2 w-6 h-6" />
                    </>
                  ) : (
                    'Completa todos los campos para continuar'
                  )}
                </Button>

                {/* Trust Indicators */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center justify-center space-x-4">
                    <span className="flex items-center">
                      <Shield className="w-4 h-4 mr-1 text-green-500" />
                      100% seguro y sin spam
                    </span>
                    <span className="flex items-center">
                      <Sparkles className="w-4 h-4 mr-1 text-blue-500" />
                      Resultado inmediato
                    </span>
                  </p>
                  
                  <Button 
                    type="button" 
                    variant="link" 
                    onClick={onLoadExample}
                    className="text-primary hover:text-primary/80"
                  >
                    ¿Prefieres ver un ejemplo primero?
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ModernInitialForm;