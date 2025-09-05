import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Mail, 
  User, 
  Shield, 
  ArrowRight, 
  CheckCircle,
  MessageSquare,
  Globe
} from 'lucide-react';
import { FormData } from '@/hooks/useFormHandler';
import MathCaptcha from '@/components/ui/MathCaptcha';

interface CleanFormProps {
  formData: FormData;
  onInputChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isValid: boolean;
  onLoadExample: () => void;
  onMathCaptchaChange: (isValid: boolean) => void;
}

const CleanForm = ({
  formData,
  onInputChange,
  onSubmit,
  isValid,
  onLoadExample,
  onMathCaptchaChange
}: CleanFormProps) => {
  const [selectedPackage, setSelectedPackage] = useState<'content' | 'complete'>('complete');

  const packages = [
    {
      id: 'content' as const,
      icon: MessageSquare,
      title: 'Contenido Personalizado',
      description: 'Email con tu super prompt para ChatGPT',
      features: ['15 días de posts estratégicos', 'Prompt personalizado', 'Contenido que vende']
    },
    {
      id: 'complete' as const,
      icon: Globe,
      title: 'Sitio Web Completo',
      description: 'Todo lo anterior + tu sitio web funcionando',
      features: ['Contenido personalizado', 'Sitio web profesional', 'Optimizado para conversiones'],
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
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Comencemos con tu información básica
          </h2>
          <p className="text-lg text-muted-foreground">
            Solo necesitamos 2 datos para comenzar tu transformación digital
          </p>
        </div>

        {/* Package Selection */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-8">Elige tu paquete:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPackage === pkg.id 
                    ? 'border-primary bg-primary/5' 
                    : 'hover:border-primary/50'
                } ${pkg.popular ? 'relative' : ''}`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Más Popular
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <pkg.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold">{pkg.title}</h4>
                  <p className="text-sm text-muted-foreground">{pkg.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Progreso</span>
            <span className="text-sm text-muted-foreground">{progress()}% completado</span>
          </div>
          <Progress value={progress()} className="h-2" />
        </div>

        {/* Form */}
        <Card className="card-minimal">
          <CardContent className="p-8">
            <form onSubmit={onSubmit} className="space-y-8">
              {/* Field 1 */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-sm font-medium">
                  <User className="w-4 h-4 text-primary" />
                  <span>¿Cómo se llama tu emprendimiento o marca personal?</span>
                </label>
                <Input
                  type="text"
                  placeholder="Ej: Coaching con María, Consultora Digital, etc."
                  value={formData.marca}
                  onChange={(e) => onInputChange('marca', e.target.value)}
                  className={`h-12 focus-ring ${formData.marca ? 'border-green-500' : ''}`}
                />
                {formData.marca && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Perfecto</span>
                  </div>
                )}
              </div>

              {/* Field 2 */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-sm font-medium">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>Correo electrónico (donde recibirás tu Kit IA)</span>
                </label>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => onInputChange('email', e.target.value)}
                  className={`h-12 focus-ring ${formData.email ? 'border-green-500' : ''}`}
                />
                {formData.email && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Email válido</span>
                  </div>
                )}
              </div>

              {/* Security */}
              <div className="space-y-4">
                <label className="flex items-center space-x-2 text-sm font-medium">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Verificación de seguridad</span>
                </label>
                <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
                  <MathCaptcha onVerify={onMathCaptchaChange} />
                </div>
              </div>

              {/* Submit */}
              <div className="space-y-4">
                <Button
                  type="submit"
                  disabled={!isValid}
                  className={`w-full h-12 font-medium transition-all ${
                    isValid 
                      ? 'btn-primary' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {isValid ? (
                    <>
                      Continuar con el formulario
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  ) : (
                    'Completa todos los campos'
                  )}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center justify-center space-x-4">
                    <span>🔒 100% seguro</span>
                    <span>✨ Sin spam</span>
                    <span>⚡ Resultado inmediato</span>
                  </p>
                  
                  <Button 
                    type="button" 
                    variant="link" 
                    onClick={onLoadExample}
                    className="text-primary"
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

export default CleanForm;