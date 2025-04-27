
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, MessageSquare, FileText, Video, Settings, Star, List } from 'lucide-react';

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
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Nuestros Servicios</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <MessageSquare className="h-8 w-8 text-novativa-teal mb-4" />
              <h3 className="text-xl font-semibold mb-2">NovaChannel</h3>
              <p className="text-gray-600 mb-4">
                Plataforma omnicanal para atención al cliente con inteligencia artificial integrada.
              </p>
              <ul className="space-y-2 mb-4 text-sm text-gray-600">
                <li>• Chatbot IA personalizado</li>
                <li>• Integración con WhatsApp</li>
                <li>• Panel de control unificado</li>
                <li>• Analítica avanzada</li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/novachannel">Ver detalles <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <Code className="h-8 w-8 text-novativa-orange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Desarrollo con IA</h3>
              <p className="text-gray-600 mb-4">
                Desarrollo de software y aplicaciones potenciado por inteligencia artificial.
              </p>
              <ul className="space-y-2 mb-4 text-sm text-gray-600">
                <li>• Aplicaciones web personalizadas</li>
                <li>• Automatización de procesos</li>
                <li>• Integración de sistemas</li>
                <li>• Mantenimiento y soporte</li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/iacoding">Ver detalles <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <FileText className="h-8 w-8 text-novativa-teal mb-4" />
              <h3 className="text-xl font-semibold mb-2">Generación de Contenido</h3>
              <p className="text-gray-600 mb-4">
                Creación de contenido automatizado y optimizado con IA.
              </p>
              <ul className="space-y-2 mb-4 text-sm text-gray-600">
                <li>• Contenido para redes sociales</li>
                <li>• Artículos y blogs</li>
                <li>• Copywriting</li>
                <li>• SEO y optimización</li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/servicios/contenido">Ver detalles <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Preguntas Frecuentes</h2>
            
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="pricing">
                <AccordionTrigger>¿Cómo funcionan los planes y precios?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Ofrecemos planes flexibles que se adaptan a diferentes necesidades y tamaños de empresa:
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li>• Plan Demo: Gratis para pruebas iniciales</li>
                    <li>• Plan Starter: $49/mes - Ideal para pequeñas empresas</li>
                    <li>• Plan Elite: $60/mes - Para empresas en crecimiento</li>
                    <li>• Plan Diamante: $99/mes - Solución empresarial completa</li>
                  </ul>
                  <p className="mt-4 text-gray-600">
                    Todos los planes incluyen soporte técnico y actualizaciones regulares.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="implementation">
                <AccordionTrigger>¿Cómo es el proceso de implementación?</AccordionTrigger>
                <AccordionContent>
                  <ol className="space-y-2 text-gray-600">
                    <li>1. Consulta inicial y evaluación de necesidades</li>
                    <li>2. Propuesta personalizada de solución</li>
                    <li>3. Configuración y personalización del sistema</li>
                    <li>4. Capacitación del equipo</li>
                    <li>5. Lanzamiento y soporte continuo</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="time">
                <AccordionTrigger>¿Cuánto tiempo toma la implementación?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    El tiempo de implementación varía según el servicio y la complejidad del proyecto:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-600">
                    <li>• NovaChannel: 1-2 días</li>
                    <li>• Desarrollo con IA: 2-8 semanas</li>
                    <li>• Generación de Contenido: 1-2 semanas</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="support">
                <AccordionTrigger>¿Qué tipo de soporte ofrecen?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600">
                    Nuestro soporte incluye:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-600">
                    <li>• Soporte técnico por email y chat</li>
                    <li>• Documentación detallada</li>
                    <li>• Capacitación inicial</li>
                    <li>• Mantenimiento preventivo</li>
                    <li>• Actualizaciones regulares</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-center mt-16">
              <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
              <p className="text-gray-600 mb-8">
                Agenda una demostración gratuita y descubre cómo podemos ayudarte
              </p>
              <Button asChild size="lg" className="bg-novativa-teal hover:bg-novativa-lightTeal">
                <Link to="/agenda">
                  Agendar demostración <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default KnowledgeBase;
