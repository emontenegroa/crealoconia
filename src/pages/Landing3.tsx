import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Calendar, CheckCircle, Info, Sparkles, Target, Globe } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const Landing3 = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const handleSchedule = () => {
    window.open('https://wa.me/56961249991?text=Quiero%20ver%20mi%20sitio%20web!', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        
        {/* HEADER CONFIRMATION */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-300 text-sm md:text-base">
              Paso 3 de 3 ✓ Completado
            </p>
            <p className="text-green-400 text-sm md:text-base font-semibold">
              100%
            </p>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        {/* HERO SECTION - CONFIRMACIÓN */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-green-400 animate-bounce" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            ¡Tu página web ya está lista!
          </h1>
          <div className="flex items-center justify-center gap-3 text-slate-300 mb-4">
            <Globe className="w-6 h-6 text-green-400" />
            <p className="text-base md:text-lg">
              Nos contactaremos contigo para mostrártela
            </p>
          </div>
          <p className="text-slate-300 max-w-2xl mx-auto mb-6">
            Tu sitio web profesional ha sido creado y está esperando por ti. 
            Además, recibirás en tu correo el asistente de contenido con IA para crear publicaciones efectivas.
          </p>
          <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-4 max-w-xl mx-auto">
            <p className="text-blue-200 text-sm md:text-base flex items-center gap-2 justify-center">
              <Info className="w-5 h-5" />
              <strong>Primera sesión gratuita de 15 minutos</strong> para mostrarte tu sitio web
            </p>
          </div>
        </div>

        {/* ¿QUÉ SIGUE AHORA? */}
        <div className="mb-12 md:mb-16">
          <Card className="bg-slate-800/80 border-slate-700 backdrop-blur p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
              ¿Qué incluye tu primera sesión?
            </h2>
            <p className="text-slate-300 text-center mb-8">
              En 15 minutos te mostramos tu sitio web ya creado y listo para publicar. 
              Es completamente gratuito y sin compromiso.
            </p>

            {/* BOTÓN CTA PRINCIPAL */}
            <Button
              onClick={handleSchedule}
              className="w-full mb-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 md:py-8 rounded-full text-base md:text-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <Calendar className="w-6 h-6 mr-2" />
              Quiero ver mi sitio ahora
            </Button>

            {/* MENTORÍA 1 A 1 */}
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-6 mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                En la mentoría 1 a 1 con Esteban Montenegro:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Revisamos tu propuesta de valor</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Ajustamos tu mensaje para que sea claro y persuasivo</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">Agendamos sesión de mentoría para publicar el sitio</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* AL FINALIZAR TENDRÁS */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Al finalizar la mentoría tendrás:
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Tu identidad de marca clara
              </h3>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Tu asistente de contenido listo para usar
              </h3>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Tu página web publicada con tu dominio propio
              </h3>
            </Card>
          </div>
        </div>

        {/* INVERSIÓN */}
        <Card className="mb-8 md:mb-12 p-6 md:p-8 bg-slate-800/80 border-slate-700 backdrop-blur">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Inversión en tu presencia profesional
          </h2>
          
          <div className="mb-6">
            <p className="text-slate-300 mb-4 text-base md:text-lg">
              La mentoría para crear y lanzar tu web es <strong className="text-white">sin costo al agendar</strong>.
            </p>
            <p className="text-slate-300 mb-4 text-base md:text-lg">
              El pago de <strong className="text-white text-xl">$197.000 CLP</strong> (web + dominio + hosting 2 años + mentoría personalizada) 
              se realiza <strong className="text-white">durante la sesión</strong>, mediante un enlace de pago seguro.
            </p>
            <p className="text-slate-300 text-base md:text-lg">
              Esto permite que primero veas tu página web creada y optimizada en vivo, y solo después decidas avanzar.
            </p>
          </div>

          <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 md:p-6 rounded-r-lg">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-400" />
              ¿Por qué funciona así?
            </h3>
            <p className="text-slate-300 text-sm md:text-base">
              Porque creemos en mostrar primero, cobrar después. Verás tu web en vivo, optimizada y lista para convertir. 
              Si te encanta, finalizas la compra en ese momento.
            </p>
          </div>
        </Card>

        {/* NOTA IMPORTANTE */}
        <Card className="mb-12 p-6 bg-blue-500/10 border-blue-500/30 backdrop-blur">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-bold mb-2">Nota importante</h3>
              <p className="text-slate-300 text-sm md:text-base">
                Si no ves el correo en 5 minutos, revisa las carpetas <strong>Promociones</strong> o <strong>Spam</strong>. 
                A veces los sistemas de email los envían ahí por error.
              </p>
            </div>
          </div>
        </Card>

        {/* PIE DE PÁGINA */}
        <footer className="text-center text-slate-400 text-sm space-y-2 pt-8 border-t border-slate-700">
          <div className="flex justify-center gap-4 mb-2">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
          <p>contacto@crealoconia.com</p>
          <Button
            variant="outline"
            onClick={() => window.open('https://wa.me/56961249991', '_blank')}
            className="mt-4 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            WhatsApp: +56 9 6124 9991
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Landing3;
