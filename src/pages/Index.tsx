import React from 'react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent mb-8">
            Bienvenido a Crealoconia
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Nueva página principal en construcción
          </p>
          <a 
            href="/web" 
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Ir al Generador de Sitios Web
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;