import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Users, Bot, Clock, BarChart, User, CheckCircle, Stethoscope, Heart, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ConsultaEficiente = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Sección 1: Video + Impacto */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video de fondo */}
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1920&h=1080" 
            alt="Medical Professional" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
        
        {/* Contenido superpuesto */}
        <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-novativa-teal to-novativa-orange blur"></div>
              <div className="relative bg-black px-4 py-2">
                <img 
                  src="/lovable-uploads/53b63427-314f-4c41-bbd8-fb0d8225d268.png" 
                  alt="NovaMedic Logo" 
                  className="h-16 md:h-24 w-auto mx-auto"
                />
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              ¿Y si tu consulta funcionara mejor… <br />
              <span className="text-novativa-orange">sin que tengas que hacer más?</span>
            </h2>
            
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed">
              Descubrí cómo transformar la experiencia de tus pacientes, optimizar tu tiempo y mejorar tu imagen profesional sin cambiar tu práctica habitual.
            </p>
            
            <p className="text-lg mb-8 text-gray-300">
              🎥 Mirá el contenido. El botón para agendar tu llamada se activará en unos minutos.
            </p>
            
            {showCTA && <Button onClick={openTidyCal} size="lg" className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-10 py-8 text-xl animate-bounce-slow">
                <Calendar className="w-6 h-6 mr-2" />
                Agendá tu llamada personalizada
              </Button>}
          </div>
        </div>
      </section>

      {/* Sección 2: El Problema */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              Estás perdiendo pacientes por lo invisible
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Podés ser un excelente profesional y aun así perder pacientes por fallas fuera de tu consulta.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[{
            title: "Pacientes que no vuelven",
            desc: "aunque los atendiste bien."
          }, {
            title: "Primeras impresiones",
            desc: "que no controlás."
          }, {
            title: "Falta de seguimiento",
            desc: "después de la consulta."
          }, {
            title: "Detalles logísticos",
            desc: "que espantan pacientes."
          }, {
            title: "Comunicación informal",
            desc: "que no refleja tu calidad."
          }, {
            title: "Falta de herramientas",
            desc: "y tiempo para gestionarlo."
          }].map((item, index) => <Card key={index} className="group relative p-8 bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <h3 className="font-semibold text-lg mb-3 text-red-400">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Sección 3: La Solución */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Tu consulta, organizada. Tu atención, profesional. <br />
              <span className="bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">Tu tiempo, intacto.</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Desarrollamos una plataforma exclusiva para vos. No tenés que adaptarte a un software. El sistema se adapta a vos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[{
            icon: Calendar,
            title: "🗓️ Agenda Inteligente",
            desc: "confirmaciones y recordatorios automáticos."
          }, {
            icon: MessageSquare,
            title: "💬 Centro de Mensajes Unificado",
            desc: "WhatsApp, Instagram y más en un solo lugar."
          }, {
            icon: Clock,
            title: "🔁 Seguimiento Automático",
            desc: "retención sin esfuerzo."
          }, {
            icon: Users,
            title: "🧠 Flujos Personalizados",
            desc: "atención diferenciada según tipo de paciente."
          }, {
            icon: BarChart,
            title: "📊 Reportes Ejecutivos",
            desc: "entendé lo que está pasando con tu consulta."
          }, {
            icon: User,
            title: "👩‍💻 Atención Digital Externa",
            desc: "tu asistente virtual humana."
          }, {
            icon: Bot,
            title: "🤖 Asistente con IA",
            desc: "respuestas 24/7 que educan y filtran pacientes reales.",
            span: "md:col-span-2 lg:col-span-3"
          }].map((item, index) => <Card key={index} className={`group relative p-8 bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 hover:border-novativa-orange/50 transition-all duration-300 hover:scale-105 ${item.span || ''}`}>
                <CardContent className="p-0">
                  <div className="absolute inset-0 bg-novativa-teal/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 text-center">
                    <div className="bg-black/30 p-4 rounded-full w-fit mb-6 mx-auto">
                      <item.icon className="w-8 h-8 text-novativa-orange" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3 text-novativa-teal">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Sección 4: Nuestra Diferencia */}
      <section className="py-20 bg-gradient-to-r from-novativa-teal/20 to-novativa-orange/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Stethoscope className="w-16 h-16 text-novativa-orange mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              No es una app. Es tu solución.
            </h2>
            <p className="text-xl leading-relaxed mb-8">
              No implementamos sistemas genéricos. Evaluamos tu práctica actual y desarrollamos una solución 100% personalizada, sin que tengas que aprender herramientas nuevas.
            </p>
            <p className="text-lg text-gray-300">
              Tecnología desarrollada por expertos en automatización, diseñada con criterio médico y humano.
            </p>
          </div>
        </div>
      </section>

      {/* Sección 5: Beneficios */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Heart className="w-16 h-16 text-novativa-orange mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Lo que vas a notar desde el primer mes.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {["Más pacientes regresan", "Imagen más profesional", "Menos tiempo en tareas repetitivas", "Control total de la experiencia", "Tranquilidad en cada paso del proceso"].map((benefit, index) => <div key={index} className="flex items-center space-x-4 p-6 rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-green-500/20 hover:border-green-500/50 transition-all duration-300">
                <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </div>)}
          </div>
        </div>
      </section>

      {/* Sección 6: Validación Social */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Shield className="w-16 h-16 text-novativa-teal mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ya estamos ayudando a profesionales como vos.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[{
            emoji: "👨‍⚕️",
            quote: "Nunca supe que perdía tantos pacientes hasta que automatizamos el seguimiento."
          }, {
            emoji: "👩‍⚕️",
            quote: "El asistente con IA me filtra consultas y me deja tiempo para lo importante."
          }, {
            emoji: "🏥",
            quote: "La gente cree que tengo un equipo enorme… es NovaMedic."
          }].map((testimonial, index) => <Card key={index} className="p-8 bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 hover:border-novativa-teal/50 transition-all duration-300">
                <CardContent className="p-0 text-center">
                  <div className="text-6xl mb-6">{testimonial.emoji}</div>
                  <blockquote className="text-lg italic text-gray-300 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Sección 7: Llamado Final */}
      <section className="py-20 bg-gradient-to-r from-novativa-orange/20 to-novativa-teal/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Querés dar mejor atención sin complicarte. <br />
            <span className="text-novativa-orange">Nosotros te mostramos cómo.</span>
          </h2>
          <p className="text-xl mb-12 text-gray-300">
            🎯 Agendá tu llamada personalizada y descubrí cómo funcionaría para vos.
          </p>
          
          {showCTA && <Button onClick={openTidyCal} size="lg" className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-10 py-8 text-xl font-semibold">
              <Calendar className="w-6 h-6 mr-2" />
              📅 Agendá tu llamada personalizada
            </Button>}
        </div>
      </section>

      {/* Sticky CTA flotante */}
      {showCTA && <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
          
        </div>}
    </div>
  );
};

export default ConsultaEficiente;
