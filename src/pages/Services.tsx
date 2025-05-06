
import React from 'react';
import { Link } from 'react-router-dom';
import ScheduleDialog from '@/components/shared/ScheduleDialog';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Video, FileText, Users, Code, Clock, BrainCircuit, Mic, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();
  
  return <>
    <section className="pt-32 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('services.page.title')} <span className="text-novativa-teal">{t('services.page.title')}</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.page.subtitle')}
          </p>
        </div>
      </div>
    </section>
    
    {/* Agente IA Web Section */}
    <section className="py-16 bg-white" id="agente-ia-web">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-novativa-teal">{t('services.aiagents.title')}</h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('services.aiagents.description')}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Bot className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">{t('services.aiagents.feature1')}</h3>
                  <p className="text-gray-600">
                    {t('services.aiagents.feature1.desc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <MessageSquare className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">{t('services.aiagents.feature2')}</h3>
                  <p className="text-gray-600">
                    {t('services.aiagents.feature2.desc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Video className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">{t('services.aiagents.feature3')}</h3>
                  <p className="text-gray-600">
                    {t('services.aiagents.feature3.desc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FileText className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">{t('services.aiagents.feature4')}</h3>
                  <p className="text-gray-600">
                    {t('services.aiagents.feature4.desc')}
                  </p>
                </div>
              </div>
            </div>
            
            <Button asChild className="bg-novativa-teal hover:bg-novativa-lightTeal">
              <Link to="/contacto">
                {t('services.aiagents.cta')}
              </Link>
            </Button>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-xl bg-white">
            <img alt="AI Agent Animation" src="https://edea.juntadeandalucia.es/bancorecursos/file/41832ff2-cfcb-4923-ac63-5abdf63e5087/1/CDI_1BAC_REA_01_v01.zip/gif_animado_narrador_juvenil.gif" className="w-full h-[400px] object-contain" />
          </div>
        </div>
      </div>
    </section>
    
    {/* Agentes IA + NovaChannel Section */}
    <section className="py-16 bg-gray-50" id="agentes-ia-novachannel">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Agentes IA + <span className="text-novativa-orange">NovaChannel</span></h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Una solución completa para gestionar la comunicación con tus clientes a través de múltiples canales.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-t-4 border-t-novativa-teal">
            <CardHeader>
              <CardTitle className="text-2xl">Diamante</CardTitle>
              <CardDescription>Para empresas grandes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">$99<span className="text-gray-500 text-base font-normal">/mes</span></div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-novativa-orange" /> 
                  <span>14,000 usuarios activos/mes</span>
                </li>
                <li className="flex items-center">
                  <Bot className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>20 bots/flujos automatizados</span>
                </li>
                <li className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>5 agentes para LiveChat</span>
                </li>
                <li className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>3 usuarios administradores</span>
                </li>
                <li className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>Historial de chat: 65 días</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-novativa-teal hover:bg-novativa-lightTeal">
                <Link to="/contacto?plan=diamante">
                  Seleccionar plan
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-t-4 border-t-novativa-teal">
            <CardHeader>
              <CardTitle className="text-2xl">Elite</CardTitle>
              <CardDescription>Para empresas medianas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">$60<span className="text-gray-500 text-base font-normal">/mes</span></div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-novativa-orange" /> 
                  <span>5,000 usuarios activos/mes</span>
                </li>
                <li className="flex items-center">
                  <Bot className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>15 bots/flujos automatizados</span>
                </li>
                <li className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>3 agentes para LiveChat</span>
                </li>
                <li className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>2 usuarios administradores</span>
                </li>
                <li className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>Historial de chat: 65 días</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-novativa-teal hover:bg-novativa-lightTeal">
                <Link to="/contacto?plan=elite">
                  Seleccionar plan
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-t-4 border-t-novativa-orange">
            <CardHeader>
              <CardTitle className="text-2xl">Starter</CardTitle>
              <CardDescription>Para pequeñas empresas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">$49<span className="text-gray-500 text-base font-normal">/mes</span></div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-novativa-orange" /> 
                  <span>3,000 usuarios activos/mes</span>
                </li>
                <li className="flex items-center">
                  <Bot className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>10 bots/flujos automatizados</span>
                </li>
                <li className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>2 agentes para LiveChat</span>
                </li>
                <li className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>1 usuario administrador</span>
                </li>
                <li className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>Historial de chat: 65 días</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-novativa-orange hover:bg-novativa-lightOrange">
                <Link to="/contacto?plan=starter">
                  Seleccionar plan
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="border-t-4 border-t-gray-300">
            <CardHeader>
              <CardTitle className="text-2xl">Demo</CardTitle>
              <CardDescription>Para evaluación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">Gratis</div>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-novativa-orange" /> 
                  <span>50 usuarios activos/mes</span>
                </li>
                <li className="flex items-center">
                  <Bot className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>5 bots/flujos automatizados</span>
                </li>
                <li className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>N/A agentes para LiveChat</span>
                </li>
                <li className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>N/A usuarios administradores</span>
                </li>
                <li className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-novativa-orange" />
                  <span>Historial de chat: 15 días</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10">
                <Link to="/contacto?plan=demo">Probar Gratis</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-gray-600 italic max-w-2xl mx-auto">
            ¿Te gustaría implementar un flujo automatizado y automatizar procesos complejos? ¿O te gustaría conectarlo con otras plataformas? Nuestro servicio de Setup Inicial + Creación de Flujos Automatizados tiene un costo de $100 por flujo, pero si eliges el plan anual, es completamente gratis.
          </p>
        </div>
      </div>
    </section>
    
    {/* IA para Generación de Contenido */}
    <section className="py-16 bg-white" id="ia-contenido">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-xl">
            <img alt="IA para Generación de Contenido" className="w-full h-auto object-cover" src="https://cdn-site-assets.veed.io/cdn-cgi/image/width=1536,quality=75,format=auto/AI_Avatar_6a9e429709/AI_Avatar_6a9e429709.png" />
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-6 text-novativa-teal">IA para Generación de Contenido</h2>
            <p className="text-lg text-gray-600 mb-8">
              Crea contenido de alta calidad automáticamente para tu sitio web, blog, redes sociales y más.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FileText className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">Clonación de Avatar</h3>
                  <p className="text-gray-600">Generamos un avatar identico a ti o la persona de tu preferencia que mantiene el tono y estilo de tu marca.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Mic className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">Clonación de Voz</h3>
                  <p className="text-gray-600">
                    Crea contenido de audio con una voz que suene igual a la tuya o a tu voz de marca.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Share2 className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">Automatizaciones para Redes Sociales</h3>
                  <p className="text-gray-600">
                    Creación y programación automática de contenido para todas tus plataformas.
                  </p>
                </div>
              </div>
            </div>
            
            <Button asChild className="bg-novativa-teal hover:bg-novativa-lightTeal">
              <Link to="/contacto">
                Conocer más
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
    
    {/* Desarrollo con IA y Agentes Autónomos */}
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="bg-novativa-teal/10 p-3 rounded-full w-fit mb-6">
              <Code className="text-novativa-teal" size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Desarrollo con IA</h2>
            <p className="text-gray-600 mb-6">
              Creación de aplicaciones web personalizadas con integración de IA para optimizar tus procesos y mejorar la experiencia de usuario.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                <span>Desarrollo web con funcionalidades de IA</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                <span>Integración con APIs de inteligencia artificial</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                <span>Optimización de procesos con machine learning</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                <span>Consultoría y mejora continua</span>
              </li>
            </ul>
            <ScheduleDialog className="bg-novativa-teal hover:bg-novativa-lightTeal">
              <Link to="/iacoding">Solicitar información</Link>
            </ScheduleDialog>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="bg-novativa-orange/10 p-3 rounded-full w-fit mb-6">
              <BrainCircuit className="text-novativa-orange" size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Agentes Autónomos</h2>
            <p className="text-gray-600 mb-6">
              Desarrollo de agentes de IA para automatización de procesos complejos que actúan de forma autónoma para resolver tareas específicas.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                <span>Automatización de procesos de negocio</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                <span>Agentes de toma de decisiones</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                <span>Integración con sistemas existentes</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                <span>Optimización continua del rendimiento</span>
              </li>
            </ul>
            <ScheduleDialog className="bg-novativa-orange hover:bg-novativa-lightOrange">
              Solicitar información
            </ScheduleDialog>
          </div>
        </div>
      </div>
    </section>
    
    {/* CTA Section */}
    <section className="py-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Listo para impulsar tu negocio con IA?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Agenda una demostración y descubre cómo nuestras soluciones pueden transformar tu empresa.
        </p>
        <ScheduleDialog className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-6" size="lg">
          Agenda una demostración gratuita
        </ScheduleDialog>
      </div>
    </section>
  </>;
};

export default Services;
