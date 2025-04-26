
import React from 'react';

const PricingFAQ = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Respuestas a las dudas más comunes sobre nuestros planes y servicios
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">¿Puedo cambiar de plan en cualquier momento?</h3>
              <p className="text-gray-600">
                Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán en tu próximo ciclo de facturación, y se ajustarán los precios de manera proporcional.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">¿Ofrecen soporte técnico?</h3>
              <p className="text-gray-600">
                Todos nuestros planes incluyen soporte técnico. Los planes Diamante y Elite tienen soporte prioritario, mientras que los planes Starter y Demo tienen soporte estándar con tiempos de respuesta más largos.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">¿Qué métodos de pago aceptan?</h3>
              <p className="text-gray-600">
                Aceptamos tarjetas de crédito principales (Visa, Mastercard, American Express) y transferencias bancarias. Para empresas en Costa Rica, también ofrecemos opciones de pago locales.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">¿Los precios incluyen impuestos?</h3>
              <p className="text-gray-600">
                Los precios mostrados no incluyen impuestos. Dependiendo de tu ubicación y la legislación fiscal aplicable, se pueden añadir impuestos adicionales.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-2">¿Pueden personalizar un plan para mis necesidades específicas?</h3>
              <p className="text-gray-600">
                Absolutamente. Contáctanos para discutir tus necesidades específicas y te ofreceremos una solución personalizada que se ajuste a los requerimientos de tu negocio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
