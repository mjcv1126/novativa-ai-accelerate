import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Rocket, Code, Star, Smartphone, Users, Calendar } from 'lucide-react';
import TidyCalEmbed from '@/components/schedule/TidyCalEmbed';

const IACoding = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section with Animated Code Background */}
      <section className="min-h-screen relative flex items-center justify-center pt-10 pb-20">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://gifdb.com/images/high/computer-system-coding-j3szfjv9fwb5at9x.gif" 
            alt="Coding Animation"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-novativa-teal via-blue-500 to-novativa-orange bg-clip-text text-transparent">
                Desarrollo con IA
              </h1>
              <div className="relative inline-block mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-novativa-teal to-novativa-orange blur"></div>
                <p className="relative bg-black text-xl md:text-2xl px-4 py-2">
                  Tu lo imaginas, la IA lo construye
                </p>
              </div>
              <Button 
                size="lg"
                className="bg-novativa-teal hover:bg-novativa-lightTeal text-white text-xl px-10 py-8 animate-bounce-slow"
                onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Rocket className="mr-2 h-6 w-6" />
                Agenda una Demo Gratis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Hover Effects */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="text-novativa-teal h-8 w-8" />,
                title: "Desarrollo Ultra Rápido",
                description: "Reducimos tiempos de desarrollo hasta en un 70% con IA"
              },
              {
                icon: <Code className="text-novativa-orange h-8 w-8" />,
                title: "Código Inteligente",
                description: "Soluciones innovadoras usando las últimas tecnologías"
              },
              {
                icon: <Star className="text-yellow-400 h-8 w-8" />,
                title: "Calidad Garantizada",
                description: "Apps elegantes y confiables a una fracción del costo"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative p-8 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-novativa-teal/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="bg-black/30 p-4 rounded-full w-fit mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Examples Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-novativa-teal/10 to-novativa-orange/10 opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Apps Creadas con IA
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="text-novativa-teal h-8 w-8" />,
                title: "Delivery App",
                description: "Sistema completo de delivery con tracking en tiempo real, pagos y notificaciones"
              },
              {
                icon: <Users className="text-novativa-orange h-8 w-8" />,
                title: "Red Social",
                description: "Plataforma social con perfiles, posts, comentarios y mensajería instantánea"
              },
              {
                icon: <Calendar className="text-yellow-400 h-8 w-8" />,
                title: "Sistema de Reservas",
                description: "Gestión de citas y reservas con calendarios sincronizados y recordatorios"
              }
            ].map((example, index) => (
              <div 
                key={index}
                className="relative p-8 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-800 hover:border-novativa-teal/50 transition-all duration-300 group"
              >
                <div className="bg-black/30 p-4 rounded-full w-fit mb-6">
                  {example.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{example.title}</h3>
                <p className="text-gray-300 mb-6">
                  {example.description}
                </p>
                <Button 
                  className="w-full bg-novativa-teal hover:bg-novativa-lightTeal"
                  onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Crea tu App
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Beneficios del Desarrollo con IA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Desarrollo Ultra Rápido",
                description: "Reducimos tiempos hasta en un 70% con IA"
              },
              {
                title: "Costos Optimizados",
                description: "Ahorra hasta un 60% en costos de desarrollo"
              },
              {
                title: "Alta Calidad",
                description: "Código limpio y mantenible generado por IA"
              },
              {
                title: "Innovación Constante",
                description: "Siempre usando las últimas tecnologías"
              }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-800 hover:border-novativa-orange/50 transition-all duration-300"
              >
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
                  {benefit.title}
                </h3>
                <p className="text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white text-xl px-10 py-8"
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Star className="mr-2 h-6 w-6" />
              ¡Comienza Tu Proyecto Ahora!
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Comparison with Animation */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-novativa-teal/10 via-transparent to-novativa-orange/10 opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Ahorra hasta un <span className="text-novativa-teal animate-pulse">70%</span> en Desarrollo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-gray-400">Desarrollo Tradicional</h3>
              <p className="text-4xl font-bold mb-6 text-gray-200">$15,000 - $40,000</p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Tiempos de desarrollo extensos
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Costos de personal elevados
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Procesos manuales lentos
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-novativa-teal to-novativa-darkTeal p-8 rounded-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-novativa-teal/20 to-novativa-orange/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <h3 className="text-xl font-semibold mb-4">Desarrollo con IA</h3>
              <p className="text-4xl font-bold mb-6">$1,500 - $15,000</p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Desarrollo ultra rápido
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Costos optimizados
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Soluciones innovadoras
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:from-novativa-lightTeal hover:to-novativa-lightOrange text-white text-lg px-8 py-6"
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Rocket className="mr-2 h-5 w-5" />
              ¡Empieza Tu Proyecto Ahora!
            </Button>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-black relative">
        <div className="absolute inset-0 bg-gradient-to-t from-novativa-teal/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para Revolucionar tu Idea?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Agenda una demo gratuita y descubre cómo la IA puede transformar tu visión en realidad
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-gray-900/50 p-6 rounded-xl backdrop-blur">
            <TidyCalEmbed path="desarrollo-ia" className="rounded-xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default IACoding;
