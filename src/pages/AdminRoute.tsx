import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Admin from './Admin';

export default function AdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [tempKey, setTempKey] = useState('');
  const [keyRequested, setKeyRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const requestTempKey = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu email",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: {
          email: email,
          action: 'generate'
        }
      });

      if (error) throw error;

      setKeyRequested(true);
      toast({
        title: "Clave enviada",
        description: "Revisa tu email para obtener la clave temporal (válida por 15 minutos)"
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar la clave temporal",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyTempKey = async () => {
    if (!tempKey) {
      toast({
        title: "Error",
        description: "Por favor ingresa la clave temporal",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: {
          email: email,
          tempKey: tempKey,
          action: 'verify'
        }
      });

      if (error) throw error;

      setIsAuthenticated(true);
      toast({
        title: "Acceso concedido",
        description: "Bienvenido al panel de administración"
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Acceso denegado",
        description: "Clave temporal inválida o expirada",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const resetForm = () => {
    setEmail('');
    setTempKey('');
    setKeyRequested(false);
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Panel de Administración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!keyRequested ? (
              <>
                <div>
                  <Label htmlFor="admin-email">Email del Administrador</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, requestTempKey)}
                    placeholder="tu@email.com"
                    disabled={loading}
                  />
                </div>
                <Button 
                  onClick={requestTempKey} 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Solicitar Clave Temporal"}
                </Button>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="temp-key">Clave Temporal (del email)</Label>
                  <Input
                    id="temp-key"
                    type="text"
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, verifyTempKey)}
                    placeholder="123456"
                    disabled={loading}
                    maxLength={6}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Revisa tu email: {email}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={verifyTempKey} 
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? "Verificando..." : "Verificar Clave"}
                  </Button>
                  <Button 
                    onClick={resetForm} 
                    variant="outline"
                    disabled={loading}
                  >
                    Cambiar Email
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return <Admin />;
}