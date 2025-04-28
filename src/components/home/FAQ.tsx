
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "¿Qué es la inteligencia artificial y cómo puede beneficiar a mi negocio?",
      answer: "La inteligencia artificial es un conjunto de tecnologías que permite a las máquinas aprender de datos, razonar y tomar decisiones similares a las humanas. Para tu negocio, puede automatizar procesos, personalizar la experiencia del cliente, analizar grandes volúmenes de datos para obtener insights valiosos y optimizar operaciones, lo que resulta en mayor eficiencia y reducción de costos."
    },
    {
      question: "¿Cuánto tiempo toma implementar soluciones de IA en mi empresa?",
      answer: "El tiempo de implementación varía según la complejidad del proyecto. Un chatbot básico puede estar listo en 1-2 semanas, mientras que soluciones más complejas como sistemas de recomendación personalizados pueden tomar 4-8 semanas. Durante nuestra consulta inicial, estableceremos un cronograma realista basado en tus necesidades específicas."
    },
    {
      question: "¿Necesito conocimientos técnicos para usar vuestras soluciones?",
      answer: "No. Nuestras soluciones están diseñadas pensando en la facilidad de uso. Proporcionamos capacitación completa y soporte continuo para asegurar que tu equipo pueda utilizar eficazmente nuestras herramientas sin necesidad de experiencia técnica previa."
    },
    {
      question: "¿Qué tipo de datos necesitan para implementar soluciones de IA?",
      answer: "El tipo de datos varía según el proyecto. Podemos trabajar con datos históricos de ventas, interacciones con clientes, registros de servicio, comportamiento en sitio web y más. Todos los datos son tratados con estricta confidencialidad y cumpliendo con normativas de protección de datos como GDPR."
    },
    {
      question: "¿Cómo se integrarán vuestras soluciones con nuestros sistemas existentes?",
      answer: "Nuestras soluciones están diseñadas para integrarse de manera fluida con la mayoría de los sistemas empresariales comunes a través de APIs. Trabajamos con plataformas como Salesforce, HubSpot, Shopify, WordPress y muchas otras. Durante la fase de planificación, evaluamos tu infraestructura actual para asegurar una integración sin contratiempos."
    },
    {
      question: "¿Qué soporte ofrecéis después de la implementación?",
      answer: "Ofrecemos varios niveles de soporte post-implementación, desde asistencia técnica básica hasta mantenimiento completo y optimización continua. Todos nuestros planes incluyen al menos 30 días de soporte posteriores al lanzamiento, y ofrecemos planes de mantenimiento mensual para asegurar que tu solución continúe evolucionando con tu negocio."
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Preguntas Frecuentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Resolvemos tus dudas sobre nuestras soluciones de inteligencia artificial
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
