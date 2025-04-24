
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, X, HelpCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  
  return (
    <>
      <section className="pt-32 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Planes y <span className="text-novativa-teal">Precios</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Soluciones escalables para empresas de todos los tamaños
            </p>
          </div>
        </div>
      </section>
      
      {/* Pricing Tab Section */}
      <section className="py-16 bg-white">
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
                <div className="mb-8 text-center">
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
                  
                  <p className="text-gray-600 mb-6">
                    Nuestros planes Agentes IA + NovaChannel incluyen todas las herramientas necesarias para gestionar la comunicación con tus clientes mediante IA.
                  </p>
                </div>
                
                <div className="overflow-x-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-1/5">Característica</TableHead>
                        <TableHead className="text-center">Diamante</TableHead>
                        <TableHead className="text-center">Elite</TableHead>
                        <TableHead className="text-center">Starter</TableHead>
                        <TableHead className="text-center">Demo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Usuarios Activos / Mes</TableCell>
                        <TableCell className="text-center">14,000</TableCell>
                        <TableCell className="text-center">5,000</TableCell>
                        <TableCell className="text-center">3,000</TableCell>
                        <TableCell className="text-center">50</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Bots/Flujos Automatizados</TableCell>
                        <TableCell className="text-center">20</TableCell>
                        <TableCell className="text-center">15</TableCell>
                        <TableCell className="text-center">10</TableCell>
                        <TableCell className="text-center">5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Creación de Formularios y Bloques</TableCell>
                        <TableCell className="text-center">Ilimitados</TableCell>
                        <TableCell className="text-center">Ilimitados</TableCell>
                        <TableCell className="text-center">Ilimitados</TableCell>
                        <TableCell className="text-center">Ilimitados</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">NovaChannel: OmniChannel LiveChat</TableCell>
                        <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
                        <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
                        <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
                        <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Webhooks y API's Disponible</TableCell>
                        <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
                        <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
                        <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
                        <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Agentes para LiveChat</TableCell>
                        <TableCell className="text-center">5</TableCell>
                        <TableCell className="text-center">3</TableCell>
                        <TableCell className="text-center">2</TableCell>
                        <TableCell className="text-center">N/A</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Usuarios Administradores</TableCell>
                        <TableCell className="text-center">3</TableCell>
                        <TableCell className="text-center">2</TableCell>
                        <TableCell className="text-center">1</TableCell>
                        <TableCell className="text-center">N/A</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Historial de Chat</TableCell>
                        <TableCell className="text-center">65 días</TableCell>
                        <TableCell className="text-center">65 días</TableCell>
                        <TableCell className="text-center">65 días</TableCell>
                        <TableCell className="text-center">15 días</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Onboarding de Implementación</TableCell>
                        <TableCell className="text-center">1 hora</TableCell>
                        <TableCell className="text-center">1 hora</TableCell>
                        <TableCell className="text-center">N/A</TableCell>
                        <TableCell className="text-center">N/A</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Precio Mensual</TableCell>
                        <TableCell className="text-center font-bold">
                          {billingCycle === 'monthly' ? '$99.00' : '$84.15'}
                        </TableCell>
                        <TableCell className="text-center font-bold">
                          {billingCycle === 'monthly' ? '$60.00' : '$51.00'}
                        </TableCell>
                        <TableCell className="text-center font-bold">
                          {billingCycle === 'monthly' ? '$49.00' : '$41.65'}
                        </TableCell>
                        <TableCell className="text-center font-bold">Gratis</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium"></TableCell>
                        <TableCell className="text-center">
                          <Button 
                            asChild
                            className="bg-novativa-teal hover:bg-novativa-lightTeal w-full"
                          >
                            <Link to="/contacto?plan=diamante">
                              Seleccionar
                            </Link>
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            asChild
                            className="bg-novativa-teal hover:bg-novativa-lightTeal w-full"
                          >
                            <Link to="/contacto?plan=elite">
                              Seleccionar
                            </Link>
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            asChild
                            className="bg-novativa-orange hover:bg-novativa-lightOrange w-full"
                          >
                            <Link to="/contacto?plan=starter">
                              Seleccionar
                            </Link>
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button 
                            asChild
                            variant="outline"
                            className="border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10 w-full"
                          >
                            <Link to="/contacto?plan=demo">
                              Probar
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="text-center mt-6 text-gray-600 text-sm">
                  <p>Todos los precios están en dólares americanos (USD). Para facturación en moneda local, contáctanos.</p>
                  <p className="mt-2">Si eliges el plan anual, el servicio de Setup Inicial + Creación de Flujos Automatizados es gratis.</p>
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
      
      {/* FAQs Section */}
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
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-novativa-orange to-novativa-lightOrange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para potenciar tu negocio?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comienza hoy mismo con nuestras soluciones de IA y automatización. ¡El primer paso hacia la transformación digital de tu empresa!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              asChild
              className="bg-white text-novativa-orange hover:bg-gray-100"
              size="lg"
            >
              <Link to="/contacto">
                Contáctanos Ahora
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              size="lg"
            >
              <Link to="/servicios">
                Explorar Servicios
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
