import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Share2, PenTool, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HomeTabs = () => {
  return <section className="py-16 bg-white">
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
              <TabsTrigger value="novachannel" className="flex gap-2">
                <Share2 className="h-4 w-4" />
                <span>NovaChannel</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex gap-2">
                <PenTool className="h-4 w-4" />
                <span>Contenido</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Desarrollo IA</span>
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
                    <Link to="/servicios/ai-agents">
                      Conocer más
                    </Link>
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <img src="/lovable-uploads/0c1c88bd-2391-4fa2-b5f0-0e97a595fd49.png" alt="Chatbot Interface" className="rounded-lg shadow-lg mx-auto" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="novachannel" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">NovaChannel - Plataforma Omnicanal</h3>
                  <p className="text-gray-600 mb-4">
                    Gestiona todas tus conversaciones y canales de comunicación desde una única plataforma potenciada por IA. Optimiza la atención al cliente y aumenta las ventas.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Integración con WhatsApp, Messenger y más</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Chatbot IA personalizado para tu negocio</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Panel unificado para gestión de conversaciones</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link to="/novachannel">
                      Conocer más
                    </Link>
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <img src="/lovable-uploads/0badf3e6-586c-4660-86d6-0e50a6ffb597.png" alt="NovaChannel Platform" className="rounded-lg shadow-lg mx-auto" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Clonación de Avatar y Generación de Videos</h3>
                  <p className="text-gray-600 mb-4">
                    Crea tu clon digital para producir contenido de video de alta calidad automáticamente. Recupera tu tiempo, reduce costos y genera contenido viral sin contratar actores o editores.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Clonación de avatar digital con tu imagen y voz</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Creación automática de videos virales</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Ahorro en costos de contratación de actores y editores</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link to="/servicios/contenido">
                      Conocer más
                    </Link>
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <img alt="Content Generation" className="rounded-lg shadow-lg mx-auto" src="https://buzoapp.com/wp-content/uploads/2025/04/novativa-avatar-clone.png" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Desarrollo con IA</h3>
                  <p className="text-gray-600 mb-4">
                    Revolucionamos el desarrollo de software con IA para crear soluciones web y móviles más rápido y con mejor calidad.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Desarrollo acelerado con IA</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Aplicaciones web y móviles inteligentes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-novativa-teal mr-2">✓</span>
                      <span>Integración con sistemas existentes</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link to="/iacoding">
                      Conocer más
                    </Link>
                  </Button>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                  <img 
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXd5MXUzZHJvZ2RvYnl3dTJ3ZXBlYmNmb2Q2eDhwYnR2NnJtNWZmbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qgQUggAC3Pfv687qPC/giphy.gif" 
                    alt="Programming GIF" 
                    className="rounded-lg shadow-lg mx-auto"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>;
};

export default HomeTabs;
