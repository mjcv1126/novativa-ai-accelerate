import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Users, Bot, Clock, BarChart, User, CheckCircle, Stethoscope, Heart, Shield, Play, Star, ArrowRight, Zap, Target, TrendingUp, Activity, UserCheck, Timer } from 'lucide-react';
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
      {/* Sección 1: Hero con Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-novativa-teal/20 via-black to-novativa-orange/20" />
        
        {/* Elementos decorativos */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-novativa-teal/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-novativa-orange/10 rounded-full blur-2xl animate-pulse" />
        
        {/* Contenido principal */}
        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <img 
                src="/lovable-uploads/53b63427-314f-4c41-bbd8-fb0d8225d268.png" 
                alt="NovaMedic Logo" 
                className="h-8 md:h-10 w-auto"
              />
            </div>
            
            {/* Título principal */}
            <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
              Transformando la <br />
              <span className="bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
                Experiencia Médica
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-300">
              La plataforma de IA que revoluciona la atención médica. <br />
              Optimiza tu consulta, mejora la experiencia del paciente y potencia tu práctica profesional.
            </p>
            
            {/* Video demo - moved here */}
            <div className="relative bg-gradient-to-r from-novativa-teal/20 to-novativa-orange/20 rounded-2xl p-8 mb-12">
              <div className="bg-black/50 rounded-xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center h-64 bg-gradient-to-br from-novativa-teal/30 to-novativa-orange/30 rounded-lg">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-white mx-auto mb-4" />
                    <p className="text-lg text-gray-300">Demo: NovaMedic en Acción</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats section mejorada */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="group relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-novativa-teal/50 transition-all duration-500 hover:scale-105 hover:bg-white/15">
                  <div className="absolute inset-0 bg-gradient-to-br from-novativa-teal/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="bg-novativa-teal/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-novativa-teal/30 transition-colors duration-300">
                      <UserCheck className="w-8 h-8 text-novativa-teal mx-auto" />
                    </div>
                    <div className="text-4xl font-bold text-novativa-teal mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
                    <div className="text-white/80 font-medium">Satisfacción del paciente</div>
                    <div className="text-sm text-gray-400 mt-2">Pacientes más felices y confiados</div>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-novativa-orange/50 transition-all duration-500 hover:scale-105 hover:bg-white/15">
                  <div className="absolute inset-0 bg-gradient-to-br from-novativa-orange/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="bg-novativa-orange/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-novativa-orange/30 transition-colors duration-300">
                      <Timer className="w-8 h-8 text-novativa-orange mx-auto" />
                    </div>
                    <div className="text-4xl font-bold text-novativa-orange mb-2 group-hover:scale-110 transition-transform duration-300">60%</div>
                    <div className="text-white/80 font-medium">Menos tiempo administrativo</div>
                    <div className="text-sm text-gray-400 mt-2">Más tiempo para tus pacientes</div>
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-novativa-teal/50 transition-all duration-500 hover:scale-105 hover:bg-white/15">
                  <div className="absolute inset-0 bg-gradient-to-br from-novativa-teal/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="bg-novativa-teal/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-novativa-teal/30 transition-colors duration-300">
                      <Activity className="w-8 h-8 text-novativa-teal mx-auto" />
                    </div>
                    <div className="text-4xl font-bold text-novativa-teal mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                    <div className="text-white/80 font-medium">Atención automatizada</div>
                    <div className="text-sm text-gray-400 mt-2">Disponible cuando te necesitan</div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-lg mb-8 text-gray-300">
              🎥 Mirá el contenido. El botón para agendar tu llamada se activará en unos minutos.
            </p>
            
            {showCTA && (
              <Button 
                onClick={openTidyCal} 
                size="lg" 
                className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-12 py-6 text-xl animate-bounce-slow"
              >
                <Calendar className="w-6 h-6 mr-2" />
                Agendá tu Demo Personalizada
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Sección 2: El Problema Visual */}
      <section className="py-20 bg-gradient-to-b from-black to-red-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-red-500/10 rounded-full mb-6">
              <Target className="w-12 h-12 text-red-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="text-red-400">Los Problemas Invisibles</span> <br />
              que Afectan tu Consulta
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
              Incluso siendo un excelente profesional, estos factores pueden estar limitando tu práctica
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "Pacientes Perdidos",
                desc: "Falta de seguimiento post-consulta",
                impact: "30% no regresa"
              },
              {
                icon: Clock,
                title: "Tiempo Desperdiciado",
                desc: "Tareas administrativas repetitivas",
                impact: "2-3 horas diarias"
              },
              {
                icon: MessageSquare,
                title: "Comunicación Fragmentada",
                desc: "WhatsApp, llamadas, sin centralizar",
                impact: "Mensajes perdidos"
              },
              {
                icon: BarChart,
                title: "Sin Métricas Claras",
                desc: "No sabés qué está funcionando",
                impact: "Decisiones a ciegas"
              },
              {
                icon: Shield,
                title: "Imagen Desprofesionalizada",
                desc: "Comunicación informal",
                impact: "Menos confianza"
              },
              {
                icon: Bot,
                title: "Disponibilidad Limitada",
                desc: "Solo en horarios de consulta",
                impact: "Oportunidades perdidas"
              }
            ].map((problem, index) => (
              <Card key={index} className="group relative p-8 bg-gradient-to-br from-red-900/20 to-red-950/20 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                  <div className="relative z-10 text-center">
                    <div className="bg-red-500/10 p-4 rounded-full w-fit mb-6 mx-auto">
                      <problem.icon className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-red-400">{problem.title}</h3>
                    <p className="text-gray-300 mb-4">{problem.desc}</p>
                    <div className="bg-red-500/20 px-3 py-1 rounded-full text-red-300 text-sm">
                      {problem.impact}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 3: La Solución con Imágenes */}
      <section className="py-20 bg-gradient-to-b from-black to-novativa-teal/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-novativa-teal/20 rounded-full mb-6">
              <Stethoscope className="w-12 h-12 text-novativa-teal" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
                NovaMedic
              </span> <br />
              Tu Consulta Inteligente
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Una plataforma completa que se adapta a tu forma de trabajar, no al revés
            </p>
          </div>
          
          {/* Feature con imagen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-novativa-teal">
                🤖 Asistente IA Médico
              </h3>
              <p className="text-lg text-gray-300 mb-6">
                Tu asistente virtual especializado que atiende consultas 24/7, filtra pacientes reales y programa citas automáticamente.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Respuestas médicas precisas y educativas</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Filtrado inteligente de urgencias</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>Agendado automático de citas</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-novativa-teal/20 to-novativa-orange/20 rounded-2xl p-8">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=600" 
                  alt="Doctor using AI technology" 
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Grid de características */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Calendar,
                title: "🗓️ Agenda Inteligente",
                desc: "Confirmaciones y recordatorios automáticos que reducen el ausentismo",
                color: "novativa-teal"
              },
              {
                icon: MessageSquare,
                title: "💬 Centro de Comunicación",
                desc: "WhatsApp, Instagram y más plataformas unificadas en un solo lugar",
                color: "novativa-orange"
              },
              {
                icon: TrendingUp,
                title: "📈 Seguimiento Post-Consulta",
                desc: "Retención automática de pacientes con flujos personalizados",
                color: "novativa-teal"
              },
              {
                icon: Users,
                title: "👥 Flujos Personalizados",
                desc: "Atención diferenciada según el tipo de paciente y especialidad",
                color: "novativa-orange"
              },
              {
                icon: BarChart,
                title: "📊 Analytics Médicos",
                desc: "Reportes ejecutivos para entender tu práctica como nunca antes",
                color: "novativa-teal"
              },
              {
                icon: Zap,
                title: "⚡ Automatización Total",
                desc: "Liberate de tareas repetitivas y enfócate en lo que importa",
                color: "novativa-orange"
              }
            ].map((feature, index) => (
              <Card key={index} className="group relative p-8 bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 hover:border-novativa-teal/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="absolute inset-0 bg-novativa-teal/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                  <div className="relative z-10 text-center">
                    <div className="bg-black/30 p-4 rounded-full w-fit mb-6 mx-auto">
                      <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                    </div>
                    <h3 className={`font-semibold text-lg mb-3 text-${feature.color}`}>{feature.title}</h3>
                    <p className="text-gray-300">{feature.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 4: Testimonios Visuales */}
      <section className="py-20 bg-gradient-to-b from-novativa-teal/10 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block p-4 bg-novativa-orange/20 rounded-full mb-6">
              <Star className="w-12 h-12 text-novativa-orange" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Resultados que Hablan por Sí Solos
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Profesionales que ya transformaron su práctica con NovaMedic
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&h=150",
                name: "Dr. María González",
                specialty: "Cardióloga",
                quote: "Recuperé 3 horas diarias que ahora dedico a mis pacientes. El seguimiento automático aumentó mi retención un 40%.",
                result: "+40% retención"
              },
              {
                avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=150&h=150",
                name: "Dr. Carlos Rodríguez",
                specialty: "Gastroenterólogo",
                quote: "La IA filtra perfectamente las consultas urgentes. Mis pacientes se sienten mejor atendidos las 24 horas.",
                result: "24/7 disponible"
              },
              {
                avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&h=150",
                name: "Dra. Ana Martínez",
                specialty: "Pediatra",
                quote: "NovaMedic transformó completamente mi consulta. Los padres están más tranquilos y yo más organizada.",
                result: "+60% satisfacción"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-novativa-teal/20 hover:border-novativa-teal/50 transition-all duration-300">
                <CardContent className="p-0 text-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-6 border-4 border-novativa-teal/30"
                  />
                  <blockquote className="text-lg italic text-gray-300 leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mb-4">
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-novativa-teal">{testimonial.specialty}</div>
                  </div>
                  <div className="bg-novativa-orange/20 px-4 py-2 rounded-full text-novativa-orange font-semibold">
                    {testimonial.result}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 5: CTA Final */}
      <section className="py-20 bg-gradient-to-r from-novativa-teal/20 to-novativa-orange/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Heart className="w-16 h-16 text-novativa-orange mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Transformá tu Consulta <br />
              <span className="text-novativa-orange">Hoy Mismo</span>
            </h2>
            <p className="text-xl mb-12 text-gray-300 leading-relaxed">
              Descubrí cómo NovaMedic puede revolucionar tu práctica médica. <br />
              Agenda una demo personalizada y ve el futuro de la medicina en acción.
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
              <div className="flex items-center text-lg">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <span>Setup en 24 horas</span>
              </div>
              <div className="flex items-center text-lg">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <span>Soporte especializado</span>
              </div>
              <div className="flex items-center text-lg">
                <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                <span>ROI garantizado</span>
              </div>
            </div>
            
            {showCTA && (
              <Button 
                onClick={openTidyCal} 
                size="lg" 
                className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-12 py-8 text-xl font-semibold group"
              >
                <Calendar className="w-6 h-6 mr-2" />
                Agenda tu Demo Gratuita
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Sticky CTA flotante */}
      {showCTA && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            onClick={openTidyCal} 
            className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white px-6 py-3 rounded-full shadow-2xl animate-bounce-slow"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Demo Gratuita
          </Button>
        </div>
      )}
    </div>
  );
};

export default ConsultaEficiente;
