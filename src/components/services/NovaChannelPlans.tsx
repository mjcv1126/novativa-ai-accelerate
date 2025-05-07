
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Bot, MessageSquare, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const NovaChannelPlans = () => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default NovaChannelPlans;
