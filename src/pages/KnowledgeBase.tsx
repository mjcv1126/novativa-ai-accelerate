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
                <p>NovaChannel es una plataforma omnicanal para atención al cliente que integra IA avanzada con capacidades de atención humana.</p>
                <p>Características principales:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Chatbot IA personalizado que aprende y se adapta a tu negocio</li>
                  <li>Integración completa con WhatsApp Business API</li>
                  <li>Panel de control unificado para gestionar conversaciones</li>
                  <li>Sistema de derivación inteligente a agentes humanos</li>
                  <li>Análisis de sentimientos y categorización automática</li>
                  <li>Reportes detallados de interacciones y satisfacción</li>
                  <li>Capacidad multicanal: chat web, WhatsApp, redes sociales</li>
                  <li>Automatización de respuestas frecuentes</li>
                  <li>Gestión de tickets y seguimiento de casos</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Generación de Contenido y Clonación</h2>
              <div className="space-y-4 text-gray-600">
                <p>Nuestro servicio de generación de contenido utiliza tecnología de IA avanzada para crear y personalizar contenido multimedia.</p>
                <p>Servicios específicos:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Clonación de Avatar Digital
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Creación de avatares realistas basados en personas reales</li>
                      <li>Personalización de gestos y expresiones</li>
                      <li>Integración con contenido de marca</li>
                      <li>Múltiples idiomas y acentos disponibles</li>
                    </ul>
                  </li>
                  <li>Clonación de Voz
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Replica exacta de voces humanas</li>
                      <li>Mantiene entonación y características únicas</li>
                      <li>Ideal para contenido consistente de marca</li>
                      <li>Soporte multilingüe</li>
                    </ul>
                  </li>
                  <li>Automatización de Contenido
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Generación automática para redes sociales</li>
                      <li>Contenido SEO optimizado</li>
                      <li>Programación y distribución automatizada</li>
                      <li>Análisis de rendimiento en tiempo real</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Desarrollo con IA</h2>
              <div className="space-y-4 text-gray-600">
                <p>Nuestro enfoque de desarrollo potenciado por IA revoluciona la creación de software empresarial.</p>
                <p>Ventajas clave:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Desarrollo Acelerado
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Reducción del tiempo de desarrollo hasta en un 70%</li>
                      <li>Generación automática de código optimizado</li>
                      <li>Pruebas automatizadas con IA</li>
                    </ul>
                  </li>
                  <li>Integración Inteligente
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Conexión seamless con sistemas existentes</li>
                      <li>APIs inteligentes y auto-documentadas</li>
                      <li>Migración asistida por IA</li>
                    </ul>
                  </li>
                  <li>Optimización Continua
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Monitoreo predictivo de rendimiento</li>
                      <li>Detección temprana de problemas</li>
                      <li>Sugerencias de mejora automáticas</li>
                    </ul>
                  </li>
                  <li>Mantenimiento Inteligente
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Actualizaciones automáticas de seguridad</li>
                      <li>Optimización continua del código</li>
                      <li>Documentación actualizada automáticamente</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Planes y Precios para NovaChannel</h2>
              <div className="space-y-4 text-gray-600">
                <p>Los siguientes planes son específicos para NovaChannel, nuestra solución de atención al cliente basada en IA:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Plan Demo: Gratis para pruebas iniciales</li>
                  <li>Plan Starter: $49/mes - Ideal para pequeñas empresas</li>
                  <li>Plan Elite: $60/mes - Para empresas en crecimiento</li>
                  <li>Plan Diamante: $99/mes - Solución empresarial completa</li>
                </ul>
                <p className="mt-4 italic text-sm">
                  Nota: Para otras soluciones como Generación de Contenido, Desarrollo con IA y servicios personalizados, 
                  los precios se determinan según las necesidades específicas de cada cliente. 
                  Le recomendamos agendar una consulta para obtener una cotización personalizada.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Proceso de Implementación Detallado</h2>
              <div className="space-y-4 text-gray-600">
                <p>Nuestro proceso de implementación está diseñado para garantizar una transición suave y exitosa:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Evaluación Inicial (1-2 días)
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Análisis de necesidades específicas</li>
                      <li>Evaluación de infraestructura actual</li>
                      <li>Identificación de puntos de mejora</li>
                    </ul>
                  </li>
                  <li>Diseño de Solución (2-3 días)
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Arquitectura personalizada</li>
                      <li>Plan de integración</li>
                      <li>Definición de KPIs</li>
                    </ul>
                  </li>
                  <li>Implementación (1-4 semanas)
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Configuración del sistema</li>
                      <li>Integración con sistemas existentes</li>
                      <li>Pruebas de calidad</li>
                    </ul>
                  </li>
                  <li>Capacitación (1 semana)
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Entrenamiento del personal</li>
                      <li>Documentación detallada</li>
                      <li>Recursos de apoyo</li>
                    </ul>
                  </li>
                  <li>Seguimiento y Optimización (Continuo)
                    <ul className="list-circle pl-6 mt-2 space-y-1">
                      <li>Monitoreo de rendimiento</li>
                      <li>Ajustes y optimizaciones</li>
                      <li>Soporte continuo</li>
                    </ul>
                  </li>
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
