import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Admin from './Admin';
import type { Session } from '@supabase/supabase-js';

export default function AdminRoute() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      toast({
        title: "Campos incompletos",
        description: "Ingresa tu email y contraseña",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user has admin role
      const { data: hasAdminRole, error: roleError } = await supabase
        .rpc('has_role', { _user_id: data.user.id, _role: 'admin' });

      if (roleError || !hasAdminRole) {
        await supabase.auth.signOut();
        throw new Error('No tienes permisos de administrador');
      }

      toast({
        title: "Acceso autorizado",
        description: "Bienvenido al panel administrativo"
      });
    } catch (error: any) {
      toast({
        title: "Error de autenticación",
        description: error.message || "No se pudo iniciar sesión",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      toast({
        title: "Campos incompletos",
        description: "Ingresa tu email y contraseña",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });

      if (error) throw error;

      toast({
        title: "Registro exitoso",
        description: "Revisa tu email para confirmar tu cuenta. Si eres un administrador autorizado, tendrás acceso automático.",
      });
      setIsSignUp(false);
    } catch (error: any) {
      toast({
        title: "Error de registro",
        description: error.message || "No se pudo crear la cuenta",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setEmail('');
    setPassword('');
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Cargando...</div>
      </div>
    );
  }

  if (session) {
    return <Admin onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <ThemeToggle />
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="w-16 h-16 bg-gray-900 dark:bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <div className="text-white dark:text-gray-900 text-2xl font-semibold">🔐</div>
          </div>
          
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Panel de Administración
          </h1>
          
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {isSignUp ? 'Crear nueva cuenta de administrador' : 'Inicia sesión para acceder'}
          </p>

          <div className="space-y-4">
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
            />
            
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="h-12 text-center text-lg border-gray-200 dark:border-gray-600 rounded-xl 
                       focus:border-gray-900 dark:focus:border-gray-100 
                       focus:ring-gray-900 dark:focus:ring-gray-100
                       bg-white dark:bg-gray-900 
                       text-gray-900 dark:text-gray-100
                       placeholder:text-gray-400 dark:placeholder:text-gray-500"
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && (isSignUp ? handleSignUp() : handleSignIn())}
            />
            
            <Button 
              onClick={isSignUp ? handleSignUp : handleSignIn}
              disabled={loading || !email || !password}
              className="w-full h-12 text-base font-medium 
                       bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 
                       text-white dark:text-gray-900 rounded-xl"
            >
              {loading ? "Procesando..." : (isSignUp ? "Crear cuenta" : "Iniciar sesión")}
            </Button>

            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline"
              disabled={loading}
            >
              {isSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿Necesitas una cuenta? Regístrate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}