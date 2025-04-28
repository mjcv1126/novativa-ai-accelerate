
import React from 'react';
import Layout from '@/components/layout/Layout';

const RefundPolicy = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Política de Reembolsos de Novativa</h1>
        <p className="text-gray-600 mb-6">Fecha de última actualización: 27 de abril de 2025</p>
        <p className="mb-8">Esta Política de Reembolsos forma parte integral de los Términos y Condiciones de Servicio de ADN Emprendedor LLC, operando comercialmente como Novativa ("Novativa", "nosotros", "nuestro").</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Carácter No Reembolsable de Nuestros Servicios</h2>
          <p className="mb-4">Debido a la naturaleza digital, personalizada y de inmediata ejecución de los servicios ofrecidos por Novativa, todas las ventas son finales y no reembolsables, salvo en los casos expresamente establecidos en esta Política.</p>
          <p className="mb-4">Entre los servicios no reembolsables se incluyen, pero no se limitan a:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Acceso a la plataforma NovaChannel y sus módulos asociados.</li>
            <li>Generación de contenido automatizado, clonación de avatares digitales y voces humanas.</li>
            <li>Servicios de desarrollo personalizado impulsados por inteligencia artificial.</li>
            <li>Implementaciones, integraciones y configuraciones técnicas.</li>
            <li>Consultorías, capacitaciones y soporte técnico personalizado.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Excepciones Limitadas</h2>
          <p className="mb-4">Novativa podrá, a su sola discreción y de manera excepcional, evaluar solicitudes de reembolso únicamente en los siguientes casos:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Fallo técnico comprobable que haya imposibilitado totalmente el acceso o uso del servicio contratado, sin resolución durante más de treinta (30) días naturales desde la notificación formal al área de soporte.</li>
            <li>Cobros duplicados debidamente verificados y reportados dentro de un plazo máximo de siete (7) días naturales contados a partir de la fecha de la transacción.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Procedimiento para Solicitar un Reembolso</h2>
          <p className="mb-4">Toda solicitud de reembolso deberá cumplir estrictamente con los siguientes requisitos:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Enviar una solicitud formal por escrito a soporte@novativa.org detallando:
              <ul className="list-circle pl-6 mt-2 space-y-1">
                <li>Número de contrato o número de cliente.</li>
                <li>Servicio contratado.</li>
                <li>Descripción precisa del motivo de la solicitud.</li>
                <li>Evidencia documentada del fallo técnico (en su caso).</li>
              </ul>
            </li>
            <li>Plazo para presentar la solicitud: Dentro de los 7 días naturales posteriores al evento que motivó la solicitud.</li>
            <li>Evaluación: Novativa evaluará la solicitud en un plazo de hasta 30 días hábiles.</li>
          </ul>
          <p className="mb-4">La aceptación o rechazo de cualquier solicitud de reembolso queda sujeta al exclusivo criterio de Novativa.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Servicios Parcialmente Utilizados</h2>
          <p className="mb-4">No se emitirán reembolsos, ya sea totales o parciales, en caso de:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Cancelaciones voluntarias por parte del cliente.</li>
            <li>Incumplimiento del cliente en los procesos de integración, configuración o capacitación.</li>
            <li>Uso parcial de los servicios.</li>
            <li>Desacuerdos posteriores sobre las funcionalidades o alcances del servicio una vez entregado.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Modificaciones a la Política de Reembolsos</h2>
          <p className="mb-4">Novativa se reserva el derecho de modificar en cualquier momento esta Política de Reembolsos. Cualquier cambio será efectivo inmediatamente después de su publicación en nuestro sitio web: www.novativa.org/refund-policy</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contacto</h2>
          <p className="mb-4">Para consultas sobre esta política, puede escribir a:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Soporte: soporte@novativa.org</li>
            <li>Legal: legal@novativa.org</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
