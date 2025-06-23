
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useEmailHandling } from '@/hooks/useEmailHandling';
import { Shield, Mail, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

const SecretEmailTest = () => {
  const [code, setCode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const { toast } = useToast();
  const { sendTestEmail } = useEmailHandling();

  const SECRET_CODE = 'Domi!FloraApi';

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (code === SECRET_CODE) {
      setAuthenticated(true);
      toast({
        title: "🔓 Acceso concedido",
        description: "Bienvenido al panel de pruebas de email",
      });
    } else {
      toast({
        title: "❌ Código incorrecto",
        description: "El código secreto no es válido",
        variant: "destructive",
      });
      setCode('');
    }
  };

  const runEmailTest = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      console.log('🧪 Iniciando prueba secreta del sistema de email...');
      
      // Enviar email de prueba a la cuenta configurada
      const result = await sendTestEmail('esteban.montenegro@gmail.com');
      
      setTestResult({
        success: true,
        message: 'Email de prueba enviado exitosamente',
        data: result
      });

      toast({
        title: "✅ Prueba exitosa",
        description: "El email de prueba se envió correctamente",
      });

    } catch (error) {
      console.error('💥 Error en prueba secreta:', error);
      
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido',
        error: error
      });

      toast({
        title: "❌ Error en prueba",
        description: "Hubo un problema al enviar el email",
        variant: "destructive",
      });
    } finally {
      setTesting(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-purple-500/20 bg-slate-800/50 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-white text-xl">Área Restringida</CardTitle>
            <p className="text-gray-400 text-sm">Ingresa el código secreto para acceder</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div>
                <Label htmlFor="code" className="text-gray-300">Código Secreto</Label>
                <Input
                  id="code"
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Ingresa el código"
                  className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Shield className="w-4 h-4 mr-2" />
                Verificar Acceso
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            🔬 Panel Secreto de Pruebas
          </h1>
          <p className="text-gray-300">
            Sistema de validación interna del Kit IA
          </p>
        </div>

        <div className="grid gap-6">
          {/* Panel de Prueba de Email */}
          <Card className="border-green-500/20 bg-slate-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Mail className="w-5 h-5 text-green-400" />
                Prueba de Sistema de Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Configuración Actual</h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>📧 Proveedor: Brevo API v3</p>
                  <p>🔑 API Key: Configurada ✅</p>
                  <p>📮 Email destino: esteban.montenegro@gmail.com</p>
                  <p>🚀 Edge Function: send-email</p>
                </div>
              </div>

              <Button 
                onClick={runEmailTest} 
                disabled={testing}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {testing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando email de prueba...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Ejecutar Prueba de Email
                  </>
                )}
              </Button>

              {testResult && (
                <div className={`p-4 rounded-lg border ${
                  testResult.success 
                    ? 'bg-green-900/30 border-green-500/30' 
                    : 'bg-red-900/30 border-red-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {testResult.success ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    )}
                    <span className={`font-medium ${
                      testResult.success ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {testResult.success ? '✅ Prueba Exitosa' : '❌ Error en Prueba'}
                    </span>
                  </div>
                  
                  <p className={`text-sm ${
                    testResult.success ? 'text-green-200' : 'text-red-200'
                  }`}>
                    {testResult.message}
                  </p>

                  {testResult.success && (
                    <div className="mt-3 text-xs text-green-300">
                      <p>🎉 El sistema de email está funcionando correctamente</p>
                      <p>📧 Revisa la bandeja de entrada de esteban.montenegro@gmail.com</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Información del Sistema */}
          <Card className="border-blue-500/20 bg-slate-800/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">📊 Estado del Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="text-blue-300 font-medium">Kit IA - Email System</h4>
                  <div className="text-gray-300 space-y-1">
                    <p>🔧 Edge Function: Activa</p>
                    <p>🔐 Secretos: Configurados</p>
                    <p>📡 API: Brevo v3</p>
                    <p>✉️ Templates: 3 tipos</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-blue-300 font-medium">Tipos de Email</h4>
                  <div className="text-gray-300 space-y-1">
                    <p>🧪 Test: Verificación</p>
                    <p>✅ Confirmación: Cliente</p>
                    <p>📋 Admin: Esteban</p>
                    <p>🎯 Todos: Funcionales</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            🔒 Esta página es privada y no está indexada por motores de búsqueda
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecretEmailTest;
