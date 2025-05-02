
import React from 'react';
import Layout from '@/components/layout/Layout';

const TermsAndConditions = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Términos y Condiciones de Novativa</h1>
        <p className="text-gray-600 mb-6">Fecha de última actualización: 2 de mayo de 2025</p>
        <p className="mb-8">Este documento regula el acceso y uso de los servicios proporcionados por ADN Emprendedor LLC, operando comercialmente como Novativa ("Novativa", "nosotros", "nuestro"), con domicilio en 2 S Biscayne Boulevard Suite 3200 #4369, Miami, Florida, 33131, United States, y presencia en América Latina, el Caribe, Europa y Estados Unidos.</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Términos y Condiciones de Servicio</h2>
          <h3 className="text-xl font-medium mb-3">1.1 Aceptación de los Términos</h3>
          <p className="mb-4">Al acceder y utilizar los servicios de Novativa, el Usuario manifiesta su consentimiento expreso a los presentes Términos, a nuestra Política de Privacidad y al Acuerdo de Nivel de Servicio (SLA).</p>

          <h3 className="text-xl font-medium mb-3">1.2 Servicios Ofrecidos</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>NovaChannel: Plataforma omnicanal para atención al cliente impulsada por inteligencia artificial.</li>
            <li>Generación de Contenido y Clonación: Creación automatizada de contenido multimedia, clonación de voz y de avatares digitales.</li>
            <li>Desarrollo con Inteligencia Artificial: Aceleración de proyectos de software mediante herramientas de IA avanzadas.</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">1.3 Planes y Precios</h3>
          <p className="mb-4">Los precios y características de los planes de servicio podrán ser actualizados periódicamente.</p>

          <h3 className="text-xl font-medium mb-3">1.4 Uso Aceptable</h3>
          <p className="mb-4">El Usuario se compromete a utilizar los servicios de manera lícita. Novativa se reserva el derecho de suspender o cancelar los servicios ante cualquier incumplimiento.</p>

          <h3 className="text-xl font-medium mb-3">1.5 Propiedad Intelectual</h3>
          <p className="mb-4">Todos los sistemas, software, marcas, tecnologías, bases de datos y contenidos desarrollados por Novativa son propiedad exclusiva de ADN Emprendedor LLC.</p>

          <h3 className="text-xl font-medium mb-3">1.6 Exención de Responsabilidad sobre Clonación de Avatares y Voz</h3>
          <p className="mb-4">El Usuario declara y garantiza que cuenta con todos los permisos para solicitar clonaciones. Novativa no se hace responsable de reclamaciones de terceros.</p>

          <h3 className="text-xl font-medium mb-3">1.7 Reembolsos</h3>
          <p className="mb-4">Las solicitudes de reembolso deben realizarse conforme a la política vigente publicada en: www.novativa.org/politica-reembolso</p>

          <h3 className="text-xl font-medium mb-3">1.8 Limitación de Responsabilidad</h3>
          <p className="mb-4">Novativa no será responsable por pérdidas indirectas, incidentales, especiales, punitivas o consecuenciales.</p>

          <h3 className="text-xl font-medium mb-3">1.9 Modificaciones a los Términos</h3>
          <p className="mb-4">Novativa podrá modificar en cualquier momento los presentes Términos.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Acuerdo de Nivel de Servicio (SLA)</h2>
          <h3 className="text-xl font-medium mb-3">2.1 Tiempo de Disponibilidad (Uptime)</h3>
          <p className="mb-4">Compromiso de 99.5% de disponibilidad mensual.</p>

          <h3 className="text-xl font-medium mb-3">2.2 Soporte Técnico</h3>
          <p className="mb-4">Soporte disponible vía correo electrónico a soporte@novativa.org, de lunes a viernes, de 9:00 a.m. a 5:00 p.m. hora de Miami.</p>

          <h3 className="text-xl font-medium mb-3">2.3 Clasificación de Incidencias</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Alta prioridad (crítico): resolución tentativa en 4-8 horas hábiles.</li>
            <li>Media prioridad: resolución tentativa en 24-48 horas hábiles.</li>
            <li>Baja prioridad: respuesta en máximo 72 horas hábiles.</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">2.4 Actualizaciones y Mantenimiento</h3>
          <p className="mb-4">Actualizaciones de seguridad automáticas, monitoreo predictivo y documentación técnica continua.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Política de Privacidad</h2>
          <h3 className="text-xl font-medium mb-3">3.1 Datos Recopilados</h3>
          <p className="mb-4">Información de identificación, información técnica e información proveniente de integraciones.</p>

          <h3 className="text-xl font-medium mb-3">3.2 Finalidad del Tratamiento</h3>
          <p className="mb-4">Prestación de servicios, facturación, análisis de uso y personalización.</p>

          <h3 className="text-xl font-medium mb-3">3.3 Base Legal</h3>
          <p className="mb-4">Consentimiento, ejecución de contrato, obligaciones legales e interés legítimo.</p>

          <h3 className="text-xl font-medium mb-3">3.4 Transferencias Internacionales</h3>
          <p className="mb-4">Los datos pueden ser procesados en jurisdicciones fuera del país del Usuario.</p>

          <h3 className="text-xl font-medium mb-3">3.5 Conservación de Datos</h3>
          <p className="mb-4">Se conservarán mientras persista la relación contractual.</p>

          <h3 className="text-xl font-medium mb-3">3.6 Seguridad de Datos</h3>
          <p className="mb-4">Implementamos medidas para proteger los datos.</p>

          <h3 className="text-xl font-medium mb-3">3.7 Derechos de los Usuarios</h3>
          <p className="mb-4">Los usuarios pueden ejercer sus derechos escribiendo a legal@novativa.org.</p>

          <h3 className="text-xl font-medium mb-3">3.8 Datos en Modelos de Inteligencia Artificial</h3>
          <p className="mb-4">Tratamiento confidencial y anonimizado de los datos.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Canales Oficiales de Contacto</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Soporte Técnico: soporte@novativa.org</li>
            <li>Consultas Legales y Privacidad: legal@novativa.org</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nota Final</h2>
          <p>El uso continuo de nuestros servicios implica la aceptación íntegra de estos Términos de Servicio, el Acuerdo de Nivel de Servicio (SLA) y la Política de Privacidad</p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
