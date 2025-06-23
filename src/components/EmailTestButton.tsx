
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { testEmailSystem, validateEmailConfig } from '@/utils/emailTest';
import { Mail, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

const EmailTestButton = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runTest = async () => {
    setTesting(true);
    setResult(null);

    try {
      // Primero validar configuración
      const validation = await validateEmailConfig();
      
      if (!validation.valid) {
        setResult({
          success: false,
          type: 'validation',
          message: validation.message,
          issue: validation.issue
        });
        return;
      }

      // Si la validación pasa, ejecutar prueba completa
      const testResult = await testEmailSystem();
      setResult(testResult);

    } catch (error) {
      setResult({
        success: false,
        type: 'error',
        message: error instanceof Error ? error.message : 'Error desconocido'
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Validador del Sistema de Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={runTest} 
            disabled={testing}
            className="w-full"
          >
            {testing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Validando sistema...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Probar Sistema de Email
              </>
            )}
          </Button>

          {result && (
            <div className={`p-4 rounded-lg border ${
              result.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.success ? 'Sistema funcionando correctamente' : 'Error en el sistema'}
                </span>
              </div>
              
              {result.message && (
                <p className={`text-sm ${
                  result.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.message}
                </p>
              )}

              {result.success && result.data && (
                <div className="mt-3 text-sm text-green-700">
                  <p>✅ Email de prueba: {result.data.testEmail ? 'Enviado' : 'Error'}</p>
                  <p>✅ Email de confirmación: {result.data.confirmationEmail ? 'Enviado' : 'Error'}</p>
                  <p>✅ Email administrativo: {result.data.adminEmail ? 'Enviado' : 'Error'}</p>
                </div>
              )}

              {!result.success && result.issue && (
                <div className="mt-3 text-sm text-red-700">
                  <p><strong>Tipo de error:</strong> {result.issue}</p>
                  {result.step && <p><strong>Paso fallido:</strong> {result.step}</p>}
                </div>
              )}
            </div>
          )}

          <div className="text-xs text-gray-500 space-y-1">
            <p>• Este test envía emails reales a esteban.montenegro@gmail.com</p>
            <p>• Valida la configuración de Brevo API y las edge functions</p>
            <p>• Prueba los 3 tipos de email: test, confirmación y administrativo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailTestButton;
