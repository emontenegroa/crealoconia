import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import CodeInput from '@/components/ui/CodeInput';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Admin from './Admin';

interface AdminSession {
  email: string;
  authenticatedAt: number;
  expiresAt: number;
}

export default function AdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [tempKey, setTempKey] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  // Verificar sesión existente al cargar
  useEffect(() => {
    const checkExistingSession = () => {
      const sessionData = localStorage.getItem('admin_session');
      if (sessionData) {
        try {
          const session: AdminSession = JSON.parse(sessionData);
          const now = Date.now();
          
          if (now < session.expiresAt) {
            setIsAuthenticated(true);
            setEmail(session.email);
            return;
          } else {
            // Sesión expirada
            localStorage.removeItem('admin_session');
          }
        } catch (error) {
          localStorage.removeItem('admin_session');
        }
      }
    };

    checkExistingSession();
  }, []);

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

      // Crear sesión persistente (24 horas)
      const now = Date.now();
      const session: AdminSession = {
        email,
        authenticatedAt: now,
        expiresAt: now + (24 * 60 * 60 * 1000) // 24 horas
      };
      
      localStorage.setItem('admin_session', JSON.stringify(session));
      setIsAuthenticated(true);

      // Log de seguridad
      await supabase.functions.invoke('send-email', {
        body: {
          type: 'admin',
          to: email,
          subject: 'Acceso al panel administrativo',
          data: {
            timestamp: new Date().toLocaleString('es-ES'),
            ip: 'N/A' // Sería necesario obtener la IP real
          }
        }
      });

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

  const logout = () => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
    setEmail('');
    setStep('email');
    setTempKey('');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente"
    });
  };

  const goBack = () => {
    setStep('email');
    setTempKey('');
    setCountdown(0);
  };

  if (isAuthenticated) {
    return <Admin onLogout={logout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <ThemeToggle />
      <div className="w-full max-w-md">
        
        {step === 'email' ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="w-16 h-16 bg-gray-900 dark:bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <div className="text-white dark:text-gray-900 text-2xl font-semibold">🔐</div>
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Panel de Administración
            </h1>
            
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Ingresa tu email para recibir un código de acceso
            </p>

            <div className="space-y-6">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="h-12 text-center text-lg border-gray-200 dark:border-gray-600 rounded-xl 
                         focus:border-gray-900 dark:focus:border-gray-100 
                         focus:ring-gray-900 dark:focus:ring-gray-100
                         bg-white dark:bg-gray-900 
                         text-gray-900 dark:text-gray-100
                         placeholder:text-gray-400 dark:placeholder:text-gray-500"
                disabled={loading}
                onKeyPress={(e) => e.key === 'Enter' && requestCode()}
              />
              
              <Button 
                onClick={requestCode}
                disabled={loading || !email}
                className="w-full h-12 text-base font-medium 
                         bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 
                         text-white dark:text-gray-900 rounded-xl"
              >
                {loading ? "Enviando..." : "Enviar código"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="w-16 h-16 bg-gray-900 dark:bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <div className="text-white dark:text-gray-900 text-2xl">✉️</div>
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Código enviado
            </h1>
            
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              Ingresa el código de 6 dígitos enviado a
            </p>
            
            <p className="text-gray-900 dark:text-gray-100 font-medium mb-8">
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
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  El código expira en {countdown} segundo{countdown !== 1 ? 's' : ''}
                </p>
              )}
              
              <Button 
                onClick={verifyCode}
                disabled={loading || tempKey.length !== 6}
                className="w-full h-12 text-base font-medium 
                         bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 
                         text-white dark:text-gray-900 rounded-xl"
              >
                {loading ? "Verificando..." : "Verificar código"}
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  onClick={goBack}
                  variant="outline"
                  disabled={loading}
                  className="flex-1 h-11 text-sm rounded-xl 
                           border-gray-200 dark:border-gray-600 
                           hover:bg-gray-50 dark:hover:bg-gray-700
                           text-gray-900 dark:text-gray-100"
                >
                  Cambiar email
                </Button>
                
                {countdown === 0 && (
                  <Button 
                    onClick={requestCode}
                    variant="outline"
                    disabled={loading}
                    className="flex-1 h-11 text-sm rounded-xl 
                             border-gray-200 dark:border-gray-600 
                             hover:bg-gray-50 dark:hover:bg-gray-700
                             text-gray-900 dark:text-gray-100"
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