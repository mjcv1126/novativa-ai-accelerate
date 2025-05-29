
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Users, Bot, Clock, BarChart, User, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ConsultaEficiente = () => {
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    // Activar CTA después de 2 minutos
    const timer = setTimeout(() => {
      setShowCTA(true);
    }, 120000); // 2 minutos

    return () => clearTimeout(timer);
  }, []);

  const openTidyCal = () => {
    window.open('https://tidycal.com/novativa/demo-gratis', '_blank');
  };

  return (
    <Layout>
      {/* Sección 1: Video + Impacto */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video de fondo */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'brightness(0.4)' }}
        >
          <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        
        {/* Contenido superpuesto */}
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            ¿Y si tu consulta funcionara mejor… <br />
            <span className="text-novativa-orange">sin que tengas que hacer más?</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Descubrí cómo transformar la experiencia de tus pacientes, optimizar tu tiempo y mejorar tu imagen profesional sin cambiar tu práctica habitual.
          </p>
          
          <p className="text-lg mb-8">
            🎥 Mirá el video. El botón para agendar tu llamada se activará en unos minutos.
          </p>
          
          {showCTA && (
            <Button
              onClick={openTidyCal}
              size="lg"
              className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-8 py-4 text-lg animate-fade-in"
            >
              <Calendar className="w-6 h-6 mr-2" />
              Agendá tu llamada personalizada
            </Button>
          )}
        </div>
      </section>

      {/* Sección 2: El Problema */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Estás perdiendo pacientes por cosas que nadie te cuenta.
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Podés ser un excelente profesional y aun así perder pacientes por fallas fuera de tu consulta.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 border-l-4 border-l-red-500">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-3">Pacientes que no vuelven</h3>
                <p className="text-gray-600">aunque los atendiste bien.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-l-4 border-l-red-500">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-3">Primeras impresiones</h3>
                <p className="text-gray-600">que no controlás.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-l-4 border-l-red-500">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-3">Falta de seguimiento</h3>
                <p className="text-gray-600">después de la consulta.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-l-4 border-l-red-500">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-3">Detalles logísticos</h3>
                <p className="text-gray-600">que espantan pacientes.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-l-4 border-l-red-500">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-3">Comunicación informal</h3>
                <p className="text-gray-600">que no refleja tu calidad.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 border-l-4 border-l-red-500">
              <CardContent className="p-0">
                <h3 className="font-semibold text-lg mb-3">Falta de herramientas</h3>
                <p className="text-gray-600">y tiempo para gestionarlo.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección 3: La Solución */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tu consulta, organizada. Tu atención, profesional. <br />
              <span className="text-novativa-teal">Tu tiempo, intacto.</span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Desarrollamos una plataforma exclusiva para vos. No tenés que adaptarte a un software. El sistema se adapta a vos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Calendar className="w-12 h-12 text-novativa-orange mb-4" />
                <h3 className="font-semibold text-lg mb-3">🗓️ Agenda Inteligente</h3>
                <p className="text-gray-600">confirmaciones y recordatorios automáticos.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <MessageSquare className="w-12 h-12 text-novativa-orange mb-4" />
                <h3 className="font-semibold text-lg mb-3">💬 Centro de Mensajes Unificado</h3>
                <p className="text-gray-600">WhatsApp, Instagram y más en un solo lugar.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Clock className="w-12 h-12 text-novativa-orange mb-4" />
                <h3 className="font-semibold text-lg mb-3">🔁 Seguimiento Automático</h3>
                <p className="text-gray-600">retención sin esfuerzo.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Users className="w-12 h-12 text-novativa-orange mb-4" />
                <h3 className="font-semibold text-lg mb-3">🧠 Flujos Personalizados</h3>
                <p className="text-gray-600">atención diferenciada según tipo de paciente.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <BarChart className="w-12 h-12 text-novativa-orange mb-4" />
                <h3 className="font-semibold text-lg mb-3">📊 Reportes Ejecutivos</h3>
                <p className="text-gray-600">entendé lo que está pasando con tu consulta.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <User className="w-12 h-12 text-novativa-orange mb-4" />
                <h3 className="font-semibold text-lg mb-3">👩‍💻 Atención Digital Externa</h3>
                <p className="text-gray-600">tu asistente virtual humana.</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-3">
              <CardContent className="p-0 text-center">
                <Bot className="w-12 h-12 text-novativa-orange mb-4 mx-auto" />
                <h3 className="font-semibold text-lg mb-3">🤖 Asistente con IA</h3>
                <p className="text-gray-600">respuestas 24/7 que educan y filtran pacientes reales.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección 4: Nuestra Diferencia */}
      <section className="py-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            No es una app. Es tu solución.
          </h2>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed">
            No implementamos sistemas genéricos. Evaluamos tu práctica actual y desarrollamos una solución 100% personalizada, sin que tengas que aprender herramientas nuevas.
          </p>
          <p className="text-lg mt-6 max-w-3xl mx-auto">
            Tecnología desarrollada por expertos en automatización, diseñada con criterio médico y humano.
          </p>
        </div>
      </section>

      {/* Sección 5: Beneficios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Lo que vas a notar desde el primer mes.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
              <span className="text-lg">Más pacientes regresan</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
              <span className="text-lg">Imagen más profesional</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
              <span className="text-lg">Menos tiempo en tareas repetitivas</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
              <span className="text-lg">Control total de la experiencia</span>
            </div>
            
            <div className="flex items-center space-x-3 md:col-span-2 lg:col-span-2 justify-center">
              <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
              <span className="text-lg">Tranquilidad en cada paso del proceso</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 6: Validación Social */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ya estamos ayudando a profesionales como vos.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">👨‍⚕️</div>
                <blockquote className="text-lg italic text-gray-700">
                  "Nunca supe que perdía tantos pacientes hasta que automatizamos el seguimiento."
                </blockquote>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">👩‍⚕️</div>
                <blockquote className="text-lg italic text-gray-700">
                  "El asistente con IA me filtra consultas y me deja tiempo para lo importante."
                </blockquote>
              </CardContent>
            </Card>
            
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="text-4xl mb-4">🏥</div>
                <blockquote className="text-lg italic text-gray-700">
                  "La gente cree que tengo un equipo enorme… es Novativa."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección 7: Llamado Final */}
      <section className="py-16 bg-gradient-to-r from-novativa-orange to-novativa-lightOrange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Querés dar mejor atención sin complicarte. <br />
            Nosotros te mostramos cómo.
          </h2>
          <p className="text-xl mb-8">
            🎯 Agendá tu llamada personalizada y descubrí cómo funcionaría para vos.
          </p>
          
          {showCTA && (
            <Button
              onClick={openTidyCal}
              size="lg"
              className="bg-white text-novativa-orange hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Calendar className="w-6 h-6 mr-2" />
              📅 Agendá tu llamada personalizada
            </Button>
          )}
        </div>
      </section>

      {/* Sticky CTA flotante */}
      {showCTA && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
          <Button
            onClick={openTidyCal}
            size="lg"
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-6 py-3 rounded-full shadow-lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Agendar llamada
          </Button>
        </div>
      )}
    </Layout>
  );
};

export default ConsultaEficiente;
