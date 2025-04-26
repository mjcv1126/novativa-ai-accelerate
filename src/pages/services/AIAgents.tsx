
import React from 'react';
import { Bot, MessageSquare, Video, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ShopifyIcon, WooCommerceIcon, WixIcon, WordpressIcon } from '@/components/shared/EcommerceIcons';

const AIAgents = () => {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Agentes IA Web
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Automatiza la interacción con tus clientes usando agentes virtuales inteligentes
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <Bot className="h-8 w-8 text-novativa-teal mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chatbot para Leads</h3>
              <p className="text-gray-600">
                Captura información valiosa de tus visitantes y convierte el tráfico en oportunidades de ventas.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <MessageSquare className="h-8 w-8 text-novativa-orange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Widget IA en Web</h3>
              <p className="text-gray-600">
                Responde preguntas sobre tu negocio 24/7 con inteligencia artificial avanzada.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <Video className="h-8 w-8 text-novativa-teal mb-4" />
              <h3 className="text-xl font-semibold mb-2">Videobot</h3>
              <p className="text-gray-600">
                Presentación visual interactiva con vídeo para un engagement más personalizado.
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <FileText className="h-8 w-8 text-novativa-orange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Página IA</h3>
              <p className="text-gray-600">
                Combina contenido estático con asistentes IA para una experiencia informativa completa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CMS Integration Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Integrable con tus plataformas favoritas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm w-32 h-32 flex items-center justify-center">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/shopify.svg"
                  alt="Shopify"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <p className="mt-3 font-medium">Shopify</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm w-32 h-32 flex items-center justify-center">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/woocommerce.svg"
                  alt="WooCommerce"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <p className="mt-3 font-medium">WooCommerce</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm w-32 h-32 flex items-center justify-center">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/wix.svg"
                  alt="Wix"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <p className="mt-3 font-medium">Wix</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm w-32 h-32 flex items-center justify-center">
                <img 
                  src="https://cdn.worldvectorlogo.com/logos/wordpress-blue.svg"
                  alt="WordPress"
                  className="w-20 h-20 object-contain"
                />
              </div>
              <p className="mt-3 font-medium">WordPress</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-lg text-gray-600 mb-8">
              Nuestros agentes IA se integran perfectamente con las principales plataformas de comercio electrónico y CMS, permitiéndote mejorar la experiencia de tus clientes sin importar qué plataforma utilices.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-novativa-orange hover:bg-novativa-lightOrange"
            >
              <a href="https://tidycal.com/novativa" target="_blank" rel="noopener noreferrer">
                Descubre cómo integrar IA en tu plataforma
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Beneficios de los Agentes IA</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Atención 24/7</h3>
                <p className="text-gray-600">
                  Tus clientes reciben respuestas instantáneas en cualquier momento del día, mejorando la satisfacción y reduciendo los tiempos de espera.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Reducción de Costos</h3>
                <p className="text-gray-600">
                  Automatiza tareas repetitivas y reduce la carga de trabajo de tu equipo de soporte, permitiéndoles enfocarse en tareas más estratégicas.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Escalabilidad</h3>
                <p className="text-gray-600">
                  Maneja múltiples conversaciones simultáneas sin perder calidad en la atención, permitiendo el crecimiento de tu negocio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para implementar Agentes IA?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Agenda una demostración y descubre cómo los agentes IA pueden transformar la interacción con tus clientes
          </p>
          <Button
            asChild
            size="lg"
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white"
          >
            <a href="https://tidycal.com/novativa" target="_blank" rel="noopener noreferrer">
              Agenda una demostración gratuita
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default AIAgents;
