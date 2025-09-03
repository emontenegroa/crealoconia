import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import CodeInput from '@/components/ui/CodeInput';
import Admin from './Admin';

export default function AdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [tempKey, setTempKey] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const requestCode = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Email inválido",
        description: "Ingresa un email válido",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { email, action: 'generate' }
      });

      if (error) throw error;

      setStep('code');
      setCountdown(60);
      toast({
        title: "Código enviado",
        description: "Revisa tu email"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el código",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (tempKey.length !== 6) {
      toast({
        title: "Código incompleto",
        description: "Ingresa los 6 dígitos",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { email, tempKey, action: 'verify' }
      });

      if (error) throw error;

      setIsAuthenticated(true);
    } catch (error) {
      toast({
        title: "Código inválido",
        description: "Verifica el código o solicita uno nuevo",
        variant: "destructive"
      });
      setTempKey('');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    setStep('email');
    setTempKey('');
    setCountdown(0);
  };

  if (isAuthenticated) {
    return <Admin />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {step === 'email' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <div className="text-white text-2xl font-semibold">🔐</div>
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Panel de Administración
            </h1>
            
            <p className="text-gray-500 mb-8">
              Ingresa tu email para recibir un código de acceso
            </p>

            <div className="space-y-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ejemplo.com"
                className="h-12 text-center text-lg border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500"
                disabled={loading}
                onKeyPress={(e) => e.key === 'Enter' && requestCode()}
              />
              
              <Button 
                onClick={requestCode}
                disabled={loading || !email}
                className="w-full h-12 text-base font-medium bg-blue-500 hover:bg-blue-600 rounded-xl"
              >
                {loading ? "Enviando..." : "Enviar código"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <div className="text-white text-2xl">✉️</div>
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Código enviado
            </h1>
            
            <p className="text-gray-500 mb-2">
              Ingresa el código de 6 dígitos enviado a
            </p>
            
            <p className="text-gray-900 font-medium mb-8">
              {email}
            </p>

            <div className="space-y-6">
              <CodeInput
                value={tempKey}
                onChange={setTempKey}
                length={6}
                disabled={loading}
                autoFocus={true}
              />
              
              {countdown > 0 && (
                <p className="text-sm text-gray-500">
                  El código expira en {countdown} segundo{countdown !== 1 ? 's' : ''}
                </p>
              )}
              
              <Button 
                onClick={verifyCode}
                disabled={loading || tempKey.length !== 6}
                className="w-full h-12 text-base font-medium bg-blue-500 hover:bg-blue-600 rounded-xl"
              >
                {loading ? "Verificando..." : "Verificar código"}
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  onClick={goBack}
                  variant="outline"
                  disabled={loading}
                  className="flex-1 h-11 text-sm rounded-xl border-gray-200"
                >
                  Cambiar email
                </Button>
                
                {countdown === 0 && (
                  <Button 
                    onClick={requestCode}
                    variant="outline"
                    disabled={loading}
                    className="flex-1 h-11 text-sm rounded-xl border-gray-200"
                  >
                    Reenviar código
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}