
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

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

interface ProgressDialogProps {
  show: boolean;
  attemptCount: number;
  onLoadPrevious: () => void;
  onStartFresh: () => void;
}

const ProgressDialog = ({ show, attemptCount, onLoadPrevious, onStartFresh }: ProgressDialogProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white border-2 border-purple-300">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            ¿Continuar progreso anterior?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-center">
            Encontramos un formulario incompleto con este email. 
            <br />
            <strong>Intento #{attemptCount} de 3 permitidos</strong>
          </p>
          <div className="flex gap-3">
            <Button 
              onClick={onLoadPrevious}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Continuar donde lo dejé
            </Button>
            <Button 
              onClick={onStartFresh}
              variant="outline"
              className="flex-1"
            >
              Empezar de nuevo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressDialog;
