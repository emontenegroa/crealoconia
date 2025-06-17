
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { TestTube, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AdminTestButton = () => {
  const [isChecking, setIsChecking] = useState(false);

  const checkAbandonedForms = async () => {
    setIsChecking(true);
    try {
      console.log('🔍 Iniciando revisión de formularios abandonados...');
      
      toast({
        title: "Revisando formularios...",
        description: "Buscando formularios abandonados y enviando reporte."
      });

      const { data, error } = await supabase.functions.invoke('check-abandoned-forms', {
        body: {}
      });

      if (error) {
        console.error('❌ Error al revisar formularios abandonados:', error);
        throw error;
      }

      console.log('✅ Revisión completada:', data);
      
      toast({
        title: "Revisión completada",
        description: data.message || "Reporte enviado exitosamente a tu email."
      });

    } catch (error) {
      console.error('💥 Error en revisión de formularios:', error);
      toast({
        title: "Error en la revisión",
        description: "Hubo un problema al revisar los formularios abandonados.",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={checkAbandonedForms}
        disabled={isChecking}
        className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        size="sm"
      >
        {isChecking ? (
          <>
            <TestTube className="w-4 h-4 mr-2 animate-spin" />
            Revisando...
          </>
        ) : (
          <>
            <Mail className="w-4 h-4 mr-2" />
            Revisar Abandonados
          </>
        )}
      </Button>
    </div>
  );
};

export default AdminTestButton;
