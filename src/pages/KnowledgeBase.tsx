
import React from 'react';

const KnowledgeBase = () => {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Centro de Conocimiento Novativa
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Información detallada sobre nuestros servicios, soluciones y procesos
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">NovaChannel</h2>
              <div className="space-y-4 text-gray-600">
                <p>NovaChannel es una plataforma omnicanal para atención al cliente con inteligencia artificial integrada.</p>
                <p>La plataforma incluye:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Chatbot IA personalizado que se adapta a tu negocio</li>
                  <li>Integración completa con WhatsApp Business API</li>
                  <li>Panel de control unificado para gestionar todas las conversaciones</li>
                  <li>Analítica avanzada y reportes detallados</li>
                  <li>Capacidad de atender múltiples canales simultáneamente</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Desarrollo con IA</h2>
              <div className="space-y-4 text-gray-600">
                <p>Servicio de desarrollo de software y aplicaciones potenciado por inteligencia artificial.</p>
                <p>El servicio incluye:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Desarrollo de aplicaciones web personalizadas</li>
                  <li>Automatización de procesos empresariales</li>
                  <li>Integración de sistemas existentes</li>
                  <li>Mantenimiento continuo y soporte técnico</li>
                  <li>Optimización de rendimiento y escalabilidad</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Generación de Contenido</h2>
              <div className="space-y-4 text-gray-600">
                <p>Servicio de creación de contenido automatizado y optimizado con IA.</p>
                <p>El servicio incluye:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Creación de contenido para redes sociales</li>
                  <li>Redacción de artículos y blogs</li>
                  <li>Copywriting optimizado para SEO</li>
                  <li>Estrategias de contenido personalizadas</li>
                  <li>Análisis de rendimiento y optimización</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Planes y Precios</h2>
              <div className="space-y-4 text-gray-600">
                <p>Ofrecemos diferentes planes que se adaptan a las necesidades de cada empresa:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Plan Demo: Gratis para pruebas iniciales</li>
                  <li>Plan Starter: $49/mes - Ideal para pequeñas empresas</li>
                  <li>Plan Elite: $60/mes - Para empresas en crecimiento</li>
                  <li>Plan Diamante: $99/mes - Solución empresarial completa</li>
                </ul>
                <p>Todos los planes incluyen soporte técnico y actualizaciones regulares.</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Proceso de Implementación</h2>
              <div className="space-y-4 text-gray-600">
                <p>El proceso de implementación sigue los siguientes pasos:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Consulta inicial y evaluación de necesidades</li>
                  <li>Propuesta personalizada de solución</li>
                  <li>Configuración y personalización del sistema</li>
                  <li>Capacitación del equipo</li>
                  <li>Lanzamiento y soporte continuo</li>
                </ol>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Tiempos de Implementación</h2>
              <div className="space-y-4 text-gray-600">
                <p>Los tiempos de implementación varían según el servicio:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>NovaChannel: 1-2 días</li>
                  <li>Desarrollo con IA: 2-8 semanas</li>
                  <li>Generación de Contenido: 1-2 semanas</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Soporte Técnico</h2>
              <div className="space-y-4 text-gray-600">
                <p>Nuestro soporte técnico incluye:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Soporte por email y chat en horario laboral</li>
                  <li>Documentación técnica detallada</li>
                  <li>Capacitación inicial del equipo</li>
                  <li>Mantenimiento preventivo mensual</li>
                  <li>Actualizaciones regulares del sistema</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KnowledgeBase;
