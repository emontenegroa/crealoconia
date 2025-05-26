
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, RefreshCw, MessageSquare, Globe, Brain, Check } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface FormData {
  marca: string;
  quien_eres: string;
  problemas: string;
  preguntas_frecuentes: string;
  estilo: string;
  producto: string;
}

interface ResultsDisplayProps {
  formData: FormData;
  onReset: () => void;
}

const ResultsDisplay = ({ formData, onReset }: ResultsDisplayProps) => {
  const [copiedContent, setCopiedContent] = useState<string | null>(null);

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedContent(type);
    toast({
      title: "¡Copiado!",
      description: `${type} copiado al portapapeles`,
    });
    setTimeout(() => setCopiedContent(null), 2000);
  };

  // Generate content based on form data
  const socialMediaContent = `🌟 CONTENIDO PARA REDES SOCIALES - ${formData.marca}

📝 POST PRESENTACIÓN:
"¡Hola! Soy parte de ${formData.marca} 👋
${formData.quien_eres}

Mi misión es ayudarte con: ${formData.problemas}

¿Te resuena? ¡Hablemos! 💬"

📝 POST EDUCATIVO:
"💡 ¿Sabías que...?
${formData.preguntas_frecuentes}

En ${formData.marca}, creemos que siempre hay una solución 🚀
${formData.problemas}

¿Qué opinas? Cuéntame en comentarios 👇"

📝 POST DE PRODUCTO:
"🎯 ¿Listo para transformar tu vida?
Te presento: ${formData.producto}

✨ Diseñado especialmente para quienes:
${formData.problemas}

¡Envíame DM para más información! 📩"

#${formData.marca.replace(/\s+/g, '')} #transformacion #crecimiento`;

  const websiteContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.marca} - Transformando vidas</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 100px 20px; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .hero h1 { font-size: 3rem; margin-bottom: 20px; }
        .hero p { font-size: 1.3rem; margin-bottom: 30px; }
        .btn { background: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 50px; display: inline-block; font-weight: bold; }
        .section { padding: 80px 0; }
        .about { background: #f8f9fa; }
        .services { padding: 80px 0; }
        .service-card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin: 20px 0; }
    </style>
</head>
<body>
    <header class="hero">
        <div class="container">
            <h1>${formData.marca}</h1>
            <p>${formData.quien_eres}</p>
            <a href="#contacto" class="btn">¡Empecemos juntos!</a>
        </div>
    </header>

    <section class="about section">
        <div class="container">
            <h2>¿Te sientes identificado?</h2>
            <p>${formData.problemas}</p>
            <p>${formData.preguntas_frecuentes}</p>
        </div>
    </section>

    <section class="services section">
        <div class="container">
            <h2>Mi Propuesta Para Ti</h2>
            <div class="service-card">
                <h3>Producto Destacado</h3>
                <p>${formData.producto}</p>
                <a href="#contacto" class="btn">Más información</a>
            </div>
        </div>
    </section>

    <footer id="contacto" class="hero">
        <div class="container">
            <h2>¿Listo para el cambio?</h2>
            <p>Contáctame y empecemos tu transformación hoy mismo</p>
            <a href="mailto:hola@${formData.marca.toLowerCase().replace(/\s+/g, '')}.com" class="btn">Escribir ahora</a>
        </div>
    </footer>
</body>
</html>`;

  const lovablePrompt = `Crea una página web profesional para "${formData.marca}" con las siguientes especificaciones:

MARCA Y PERSONALIDAD:
- Nombre: ${formData.marca}
- Estilo de comunicación: ${formData.estilo}
- Descripción: ${formData.quien_eres}

CONTENIDO PRINCIPAL:
- Problema que resuelve: ${formData.problemas}
- Preguntas frecuentes: ${formData.preguntas_frecuentes}
- Producto/servicio principal: ${formData.producto}

ESTRUCTURA REQUERIDA:
1. Header con navegación y llamada a la acción
2. Sección hero con propuesta de valor clara
3. Sección "Sobre mí/nosotros" 
4. Sección de servicios/productos
5. Testimonios (crear 3 ejemplos realistas)
6. FAQ basada en las preguntas frecuentes
7. Footer con formulario de contacto

DISEÑO:
- Estilo moderno y profesional
- Gradientes y colores vibrantes
- Animaciones suaves
- Responsive design
- Botones de llamada a la acción prominentes

FUNCIONALIDADES:
- Formulario de contacto funcional
- Navegación suave entre secciones
- Efectos hover en botones e imágenes
- Optimizado para conversión

Usa componentes de shadcn/ui y Tailwind CSS para crear una experiencia visual impactante.`;

  const chatGPTPrompt = `Eres un experto en marketing digital y creación de contenido para "${formData.marca}".

CONTEXTO DE LA MARCA:
- Nombre: ${formData.marca}
- Quién soy: ${formData.quien_eres}
- Problema que resuelvo: ${formData.problemas}
- Preguntas que me hacen: ${formData.preguntas_frecuentes}
- Estilo de comunicación: ${formData.estilo}
- Producto principal: ${formData.producto}

INSTRUCCIONES:
1. Siempre responde en un tono ${formData.estilo.toLowerCase()}
2. Enfócate en el problema: ${formData.problemas}
3. Usa ejemplos relacionados con mi experiencia
4. Menciona mi producto cuando sea relevante: ${formData.producto}
5. Crea contenido que genere engagement y confianza

TAREAS QUE PUEDES HACER:
- Crear posts para Instagram, Facebook, LinkedIn
- Escribir newsletters
- Generar ideas de contenido educativo
- Redactar páginas de venta
- Crear scripts para videos/reels
- Desarrollar funnels de marketing
- Escribir respuestas a objeciones comunes

¿En qué te puedo ayudar hoy con el contenido de ${formData.marca}?`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 text-lg">
            ✅ ¡SuperPrompt Generado!
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tu presencia digital está lista
          </h1>
          <p className="text-purple-200 text-lg mb-6 max-w-2xl mx-auto">
            Aquí tienes todo el contenido personalizado para <strong>{formData.marca}</strong>
          </p>
          <Button 
            onClick={onReset}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Crear otro SuperPrompt
          </Button>
        </div>

        {/* Results Tabs */}
        <Card className="max-w-6xl mx-auto bg-white/10 border-white/20 backdrop-blur-xl">
          <CardContent className="p-6">
            <Tabs defaultValue="social" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-lg">
                <TabsTrigger value="social" className="flex items-center gap-2 data-[state=active]:bg-purple-500/50">
                  <MessageSquare className="w-4 h-4" />
                  Redes Sociales
                </TabsTrigger>
                <TabsTrigger value="website" className="flex items-center gap-2 data-[state=active]:bg-purple-500/50">
                  <Globe className="w-4 h-4" />
                  Página Web
                </TabsTrigger>
                <TabsTrigger value="lovable" className="flex items-center gap-2 data-[state=active]:bg-purple-500/50">
                  <Brain className="w-4 h-4" />
                  Prompt Lovable
                </TabsTrigger>
                <TabsTrigger value="chatgpt" className="flex items-center gap-2 data-[state=active]:bg-purple-500/50">
                  <Brain className="w-4 h-4" />
                  Prompt ChatGPT
                </TabsTrigger>
              </TabsList>

              <TabsContent value="social" className="mt-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-6 h-6" />
                        Contenido para Redes Sociales
                      </span>
                      <Button
                        onClick={() => copyToClipboard(socialMediaContent, "Contenido de Redes Sociales")}
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        {copiedContent === "Contenido de Redes Sociales" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-purple-100 whitespace-pre-wrap text-sm bg-black/20 p-4 rounded-lg overflow-auto max-h-96">
                      {socialMediaContent}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="website" className="mt-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Globe className="w-6 h-6" />
                        Código HTML de tu Página Web
                      </span>
                      <Button
                        onClick={() => copyToClipboard(websiteContent, "Código de Página Web")}
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        {copiedContent === "Código de Página Web" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-purple-100 whitespace-pre-wrap text-xs bg-black/20 p-4 rounded-lg overflow-auto max-h-96 font-mono">
                      {websiteContent}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lovable" className="mt-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Brain className="w-6 h-6" />
                        Prompt para Lovable
                      </span>
                      <Button
                        onClick={() => copyToClipboard(lovablePrompt, "Prompt para Lovable")}
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        {copiedContent === "Prompt para Lovable" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-purple-100 whitespace-pre-wrap text-sm bg-black/20 p-4 rounded-lg overflow-auto max-h-96">
                      {lovablePrompt}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chatgpt" className="mt-6">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Brain className="w-6 h-6" />
                        Prompt para ChatGPT
                      </span>
                      <Button
                        onClick={() => copyToClipboard(chatGPTPrompt, "Prompt para ChatGPT")}
                        variant="outline"
                        size="sm"
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        {copiedContent === "Prompt para ChatGPT" ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-purple-100 whitespace-pre-wrap text-sm bg-black/20 p-4 rounded-lg overflow-auto max-h-96">
                      {chatGPTPrompt}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="max-w-4xl mx-auto mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white text-center">🎉 ¡Próximos pasos!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-green-100 text-lg">
              Ahora tienes todo lo necesario para lanzar tu presencia digital:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">📱 Redes Sociales</h4>
                <p className="text-purple-200 text-sm">Copia y adapta el contenido generado para tus posts</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">🌐 Página Web</h4>
                <p className="text-purple-200 text-sm">Usa el HTML o el prompt de Lovable para crear tu sitio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsDisplay;
