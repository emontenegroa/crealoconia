
import React from 'react';
import EmailTestButton from '@/components/EmailTestButton';

const EmailTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Validación del Sistema de Email
          </h1>
          <p className="text-gray-600">
            Verifica que el sistema de envío de correos esté funcionando correctamente
          </p>
        </div>
        
        <EmailTestButton />
      </div>
    </div>
  );
};

export default EmailTest;
