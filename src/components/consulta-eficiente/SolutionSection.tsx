
import React from 'react';
import { CheckCircle, Stethoscope, Calendar, MessageSquare, TrendingUp, Users, BarChart, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import NovaMedicCarousel from './NovaMedicCarousel';

const SolutionSection: React.FC = () => {
  const features = [
    { icon: Calendar, title: "🗓️ Agenda Inteligente", desc: "Confirmaciones y recordatorios automáticos que reducen el ausentismo", color: "novativa-teal", animation: "animate-bounce-custom" },
    { icon: MessageSquare, title: "💬 Centro de Comunicación", desc: "WhatsApp, Instagram y más plataformas unificadas en un solo lugar", color: "novativa-orange", animation: "animate-pulse-custom" },
    { icon: TrendingUp, title: "📈 Seguimiento Post-Consulta", desc: "Retención automática de pacientes con flujos personalizados", color: "novativa-teal", animation: "animate-swing" },
    { icon: Users, title: "👥 Flujos Personalizados", desc: "Atención diferenciada según el tipo de paciente y especialidad", color: "novativa-orange", animation: "animate-shake-custom" },
    { icon: BarChart, title: "📊 Analytics Médicos", desc: "Reportes ejecutivos para entender tu práctica como nunca antes", color: "novativa-teal", animation: "animate-pulse-custom" },
    { icon: Zap, title: "⚡ Automatización Total", desc: "Liberate de tareas repetitivas y enfócate en lo que importa", color: "novativa-orange", animation: "animate-heart" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-novativa-teal/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-novativa-teal/10 rounded-full mb-6 border border-novativa-teal/20">
            <Stethoscope className="w-12 h-12 text-novativa-teal animate-swing" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-gray-900">
            <span className="bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
              NovaMedic
            </span> <br />
            Tu Consulta Inteligente
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Una plataforma completa que se adapta a tu forma de trabajar, no al revés
          </p>
        </div>

        {/* Carrusel de pantallas de NovaMedic */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4 text-novativa-teal">
              🖥️ Módulos y Funcionalidades
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubre todas las herramientas que NovaMedic pone a tu disposición para revolucionar tu práctica médica
            </p>
          </div>
          <NovaMedicCarousel />
        </div>
        
        {/* Feature con imagen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 max-w-6xl mx-auto">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-novativa-teal">
              🤖 Asistente IA Médico
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Tu asistente virtual especializado que atiende consultas 24/7, filtra pacientes reales y programa citas automáticamente.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 animate-pulse-custom" />
                <span className="text-gray-700">Respuestas médicas precisas y educativas</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 animate-pulse-custom" />
                <span className="text-gray-700">Filtrado inteligente de urgencias</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 animate-pulse-custom" />
                <span className="text-gray-700">Agendado automático de citas</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-novativa-teal/10 to-novativa-orange/10 rounded-2xl p-8 border border-gray-200 shadow-lg">
              <img alt="Doctor using AI technology" className="w-full h-80 object-cover rounded-xl" src="https://media4.giphy.com/media/k8GoZ9AxmxR6isQt9V/giphy.gif" />
            </div>
          </div>
        </div>

        {/* Grid de características */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="group relative p-8 bg-white border-2 border-gray-100 hover:border-novativa-teal/30 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              <CardContent className="p-0">
                <div className="absolute inset-0 bg-novativa-teal/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                <div className="relative z-10 text-center">
                  <div className="bg-gray-50 p-4 rounded-full w-fit mb-6 mx-auto border border-gray-200">
                    <feature.icon className={`w-8 h-8 text-${feature.color} ${feature.animation}`} />
                  </div>
                  <h3 className={`font-semibold text-lg mb-3 text-${feature.color}`}>{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
