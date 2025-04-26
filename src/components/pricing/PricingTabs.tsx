import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingTable from './PricingTable';
import { FavoriteBadge } from './FavoriteBadge';
import {
  Check,
  MessageSquare,
  Globe,
  HelpCircle
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PricingTabs = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <Tabs defaultValue="agentes-ia" className="w-full max-w-4xl">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="agentes-ia">Agentes IA + NovaChannel</TabsTrigger>
                <TabsTrigger value="agente-web">Agente IA Web</TabsTrigger>
                <TabsTrigger value="otros">Otros Servicios</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="agentes-ia">
              <div className="mb-8 text-center relative">
                <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg mb-8">
                  <Button
                    variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
                    className={billingCycle === 'monthly' ? 'bg-novativa-teal text-white' : 'text-gray-600'}
                    onClick={() => setBillingCycle('monthly')}
                  >
                    Mensual
                  </Button>
                  <Button
                    variant={billingCycle === 'annual' ? 'default' : 'ghost'}
                    className={billingCycle === 'annual' ? 'bg-novativa-teal text-white' : 'text-gray-600'}
                    onClick={() => setBillingCycle('annual')}
                  >
                    Anual (15% descuento)
                  </Button>
                </div>
                
                <div className="relative">
                  <FavoriteBadge />
                  <p className="text-gray-600 mb-6">
                    Nuestros planes Agentes IA + NovaChannel incluyen todas las herramientas necesarias para gestionar la comunicación con tus clientes mediante IA.
                  </p>
                </div>
              
                <PricingTable billingCycle={billingCycle} />
                
                <div className="text-center mt-6 text-gray-600 text-sm">
                  <p>Todos los precios están en dólares americanos (USD). Para facturación en moneda local, contáctanos.</p>
                  <p className="mt-2">Si eliges el plan anual, el servicio de Setup Inicial + Creación de Flujos Automatizados es gratis.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="agente-web">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Agente IA Web</h3>
                <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                  Implementa asistentes virtuales inteligentes en tu sitio web para captar leads y mejorar la experiencia de usuario.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border rounded-lg p-6 bg-white shadow-sm">
                  <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                    <span>Chatbot para captación de leads</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <HelpCircle className="h-4 w-4" />
                            <span className="sr-only">Información</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Implementamos un chatbot inteligente diseñado para captar información de tus visitantes y convertir tráfico web en leads.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Personalización con tu marca e identidad visual</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Integración con tu CRM o herramienta de gestión</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Flujos de conversación personalizados</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Entrenamiento con información de tu negocio</span>
                    </li>
                  </ul>
                  <div className="text-center mt-6">
                    <Button 
                      asChild
                      className="bg-novativa-teal hover:bg-novativa-lightTeal"
                    >
                      <Link to="/contacto?servicio=chatbot">
                        Solicitar presupuesto
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-6 bg-white shadow-sm">
                  <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                    <span>Videobot + Agente IA</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <HelpCircle className="h-4 w-4" />
                            <span className="sr-only">Información</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            Combinación de video interactivo con un agente de IA para una experiencia más inmersiva y personalizada.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Presentador virtual para tu sitio web</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Interacción multimedia con los visitantes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Personalizable según tu imagen corporativa</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Integración con tus sistemas</span>
                    </li>
                  </ul>
                  <div className="text-center mt-6">
                    <Button 
                      asChild
                      className="bg-novativa-orange hover:bg-novativa-lightOrange"
                    >
                      <Link to="/contacto?servicio=videobot">
                        Solicitar presupuesto
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-center text-sm text-gray-600 mt-6">
                  * Los precios varían según los requisitos específicos y la complejidad del proyecto. Contáctanos para obtener un presupuesto personalizado.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="otros">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Otros Servicios</h3>
                <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                  Soluciones personalizadas para necesidades específicas de tu negocio
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-6 bg-white shadow-sm">
                  <h3 className="text-xl font-bold mb-4">IA para Generación de Contenido</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Clonación de estilo de escritura</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Clonación de voz</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Automatizaciones para redes sociales</span>
                    </li>
                  </ul>
                  <div className="text-center mt-6">
                    <Button 
                      asChild
                      className="bg-novativa-teal hover:bg-novativa-lightTeal w-full"
                    >
                      <Link to="/contacto?servicio=contenido">
                        Solicitar presupuesto
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-6 bg-white shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Desarrollo con IA</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Aplicaciones web personalizadas</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Integración de IA en sistemas existentes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Desarrollo de soluciones a medida</span>
                    </li>
                  </ul>
                  <div className="text-center mt-6">
                    <Button 
                      asChild
                      className="bg-novativa-teal hover:bg-novativa-lightTeal w-full"
                    >
                      <Link to="/contacto?servicio=desarrollo">
                        Solicitar presupuesto
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-6 bg-white shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Agentes Autónomos</h3>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Automatización de procesos complejos</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Agentes de toma de decisiones</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
                      <span>Optimización continua del rendimiento</span>
                    </li>
                  </ul>
                  <div className="text-center mt-6">
                    <Button 
                      asChild
                      className="bg-novativa-orange hover:bg-novativa-lightOrange w-full"
                    >
                      <Link to="/contacto?servicio=agentes">
                        Solicitar presupuesto
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-600">
                  ¿Tienes una necesidad específica no listada? Contáctanos para discutir una solución personalizada.
                </p>
                <Button 
                  asChild
                  variant="outline"
                  className="mt-4 border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10"
                >
                  <Link to="/contacto">
                    Consulta personalizada
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default PricingTabs;
