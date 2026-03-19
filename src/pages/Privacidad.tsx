import FooterNew from "@/components/FooterNew";

const Privacidad = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Política de Privacidad</h1>
        <p className="text-sm text-muted-foreground mb-10">Última actualización: 17 de marzo de 2026</p>

        <section className="space-y-8 text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-2">1. Quiénes somos</h2>
            <p>Crealo con IA es una plataforma de creación de contenido asistida por inteligencia artificial para profesionales y empresas de salud, bienestar y servicios en Chile y Latinoamérica.</p>
            <p className="mt-1">Contacto: <a href="mailto:esteban@crealoconia.com" className="text-primary underline">esteban@crealoconia.com</a></p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Qué datos recopilamos</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Datos de cuenta:</strong> nombre, correo electrónico, contraseña (cifrada).</li>
              <li><strong>Datos de perfil profesional:</strong> información que ingresas voluntariamente (especialidad, servicios, bio).</li>
              <li><strong>Contenido generado:</strong> textos e imágenes creados dentro de la plataforma.</li>
              <li><strong>Datos de uso:</strong> páginas visitadas, funciones utilizadas, frecuencia de acceso.</li>
              <li><strong>Datos de Instagram</strong> (cuando conectas tu cuenta): perfil público, publicaciones recientes, métricas de engagement. Ver sección 4.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Para qué usamos tus datos</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Proveer y mejorar el servicio de generación de contenido con IA.</li>
              <li>Personalizar el contenido según tu perfil profesional y audiencia.</li>
              <li>Enviar notificaciones relacionadas con tu cuenta.</li>
            </ul>
            <p className="mt-2 font-medium">No vendemos, arrendamos ni compartimos tus datos personales con terceros con fines comerciales.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Conexión con Instagram / Facebook</h2>
            <p>Cuando conectas tu cuenta de Instagram, accedemos con tu autorización a:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Nombre de usuario, biografía y estadísticas públicas del perfil.</li>
              <li>Publicaciones recientes (captions, tipo de contenido, fecha).</li>
              <li>Métricas de engagement: likes, comentarios, alcance e impresiones (cuentas Business/Creator).</li>
            </ul>
            <p className="mt-2">Estos datos se usan exclusivamente para personalizar el contenido generado por IA dentro de Crealo con IA. No publicamos en tu nombre ni accedemos a tus mensajes privados.</p>
            <p className="mt-2">Puedes desconectar tu cuenta de Instagram en cualquier momento desde <strong>Perfil 360° → Desconectar</strong>. Al desconectar, eliminamos todos los datos de Instagram almacenados.</p>
            <p className="mt-2 text-sm text-muted-foreground">Esta integración utiliza la Instagram Graph API de Meta Platforms, Inc.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Almacenamiento y seguridad</h2>
            <p>Tus datos se almacenan en servidores seguros con base de datos PostgreSQL cifrada. Los tokens de acceso de Instagram se almacenan cifrados y se usan únicamente cuando lo solicitas.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Retención de datos</h2>
            <p>Conservamos tus datos mientras tu cuenta esté activa. Si eliminas tu cuenta, eliminamos todos tus datos personales en un plazo máximo de 30 días.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Tus derechos (Ley 19.628)</h2>
            <p>Tienes derecho a acceder, rectificar, cancelar u oponerte al tratamiento de tus datos. Escríbenos a <a href="mailto:esteban@crealoconia.com" className="text-primary underline">esteban@crealoconia.com</a> — respondemos en máximo 15 días hábiles.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Cookies</h2>
            <p>Usamos cookies de sesión estrictamente necesarias para mantener tu sesión iniciada. No usamos cookies de rastreo ni publicidad comportamental.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9. Cambios a esta política</h2>
            <p>Te notificaremos por correo si los cambios son significativos.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">10. Contacto</h2>
            <p><a href="mailto:esteban@crealoconia.com" className="text-primary underline">esteban@crealoconia.com</a></p>
          </div>
        </section>
      </main>
      <FooterNew />
    </div>);

};

export default Privacidad;