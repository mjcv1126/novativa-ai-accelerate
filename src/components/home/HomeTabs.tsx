
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, BarChart3, PenTool, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomeTabs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Soluciones Adaptadas a Tus Necesidades
          </h2>
          
          <Tabs defaultValue="chatbots" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="chatbots" className="flex gap-2">
                <Bot className="h-4 w-4" />
                <span className="hidden md:inline">Asistentes</span>
                <span className="md:hidden">IA</span>
              </TabsTrigger>
              <TabsTrigger value="marketing" className="flex gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Marketing</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex gap-2">
                <PenTool className="h-4 w-4" />
                <span>Contenido</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Contact</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chatbots" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Asistentes Virtuales Inteligentes</h3>
                  <p className="text-gray-600 mb-4">
                    Implementa chatbots avanzados que entienden el lenguaje natural y aprenden de cada interacción para proporcionar respuestas precisas y personalizadas.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Disponibilidad 24/7 para atender consultas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Integración con WhatsApp, Messenger, Web</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Transferencia a agentes humanos cuando sea necesario</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link to="/servicios/agentes-ia">
                      Conocer más
                    </Link>
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <img 
                    src="/lovable-uploads/0c1c88bd-2391-4fa2-b5f0-0e97a595fd49.png" 
                    alt="Chatbot Interface" 
                    className="rounded-lg shadow-lg mx-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="marketing" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Marketing Potenciado por IA</h3>
                  <p className="text-gray-600 mb-4">
                    Optimiza tus campañas de marketing con análisis predictivo y segmentación inteligente para llegar al público adecuado en el momento perfecto.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Segmentación avanzada de audiencias</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Recomendaciones personalizadas de productos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Optimización automática de campañas</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link to="/novachannel">
                      Conocer más
                    </Link>
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <img 
                    src="/lovable-uploads/0badf3e6-586c-4660-86d6-0e50a6ffb597.png" 
                    alt="Marketing Analytics" 
                    className="rounded-lg shadow-lg mx-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Generación de Contenido</h3>
                  <p className="text-gray-600 mb-4">
                    Crea contenido de alta calidad en minutos con nuestras herramientas de generación basadas en inteligencia artificial.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Textos optimizados para SEO</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Creación de imágenes y gráficos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Adaptación a tu tono de comunicación</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link to="/servicios/contenido">
                      Conocer más
                    </Link>
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <img 
                    src="/lovable-uploads/4ca26889-5685-42df-b0a0-4032951f24ee.png" 
                    alt="Content Generation" 
                    className="rounded-lg shadow-lg mx-auto"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Contact Center Avanzado</h3>
                  <p className="text-gray-600 mb-4">
                    Combina la atención humana con la eficiencia de la IA para ofrecer un servicio al cliente excepcional.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Atención 24/7 con agentes capacitados</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Gestión integral de canales de comunicación</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Reportes detallados y análisis de conversaciones</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link to="/servicios/contact-center">
                      Conocer más
                    </Link>
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <img 
                    src="/lovable-uploads/8d19e3cc-82b2-4101-9c68-c405323f6c52.png" 
                    alt="Contact Center" 
                    className="rounded-lg shadow-lg mx-auto"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default HomeTabs;
