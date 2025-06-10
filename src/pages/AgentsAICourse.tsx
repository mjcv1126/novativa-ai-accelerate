
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Users, DollarSign, TrendingUp, Star, Play, Zap, Target, Award, ArrowRight, MessageCircle } from 'lucide-react';
import ContactForm from '@/components/agents-ai-course/ContactForm';

const AgentsAICourse = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "Emprendedor Digital",
      image: "/lovable-uploads/0badf3e6-586c-4660-86d6-0e50a6ffb597.png",
      content: "En solo 3 meses logré automatizar mi negocio completamente. Los agentes de IA que creé me generan $8,000 mensuales sin intervención manual.",
      rating: 5
    },
    {
      name: "María González",
      role: "Consultora de Marketing",
      image: "/lovable-uploads/0c1c88bd-2391-4fa2-b5f0-0e97a595fd49.png",
      content: "Este curso cambió mi perspectiva del negocio. Ahora tengo 5 agentes trabajando 24/7 y mis ingresos se triplicaron.",
      rating: 5
    },
    {
      name: "Roberto Silva",
      role: "Desarrollador",
      image: "/lovable-uploads/11ed757e-fba1-459c-b7c2-b00756c96542.png",
      content: "La metodología es increíble. Sin conocimientos previos de IA, ahora genero $12,000 mensuales con mis propios agentes.",
      rating: 5
    },
    {
      name: "Ana Rodríguez",
      role: "Coach de Negocios",
      image: "/lovable-uploads/18b3896e-5858-4c87-a886-2b269d2f5d6c.png",
      content: "Los agentes de IA que desarrollé me permiten escalar mi negocio sin límites. Es realmente transformador.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Background GIF */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://tii.imgix.net/production/articles/11210/d6b28976-4039-4065-82af-faabeae1b5f6-jDPUnZ.gif?auto=compress&fit=crop&gif-q=50)'
        }}
      />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/c2890f6b-3389-4bdd-bda7-91fb9287a818.png" 
              alt="Novativa - Agencia IA & Automatización que Acelera tu Negocio" 
              className="h-12 md:h-16 w-auto"
            />
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Countdown Timer */}
            <div className="mb-6 p-4 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-lg border border-red-500/30 inline-block">
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-semibold">OFERTA LIMITADA</span>
              </div>
              <div className="flex gap-4 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                  <div className="text-xs">HORAS</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                  <div className="text-xs">MIN</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                  <div className="text-xs">SEG</div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent leading-tight">
              Crea Agentes de IA que Generen hasta $10,000 Mensuales de Forma Pasiva
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Aprende a construir y monetizar agentes de inteligencia artificial que trabajen 24/7 para tu negocio, 
              sin necesidad de experiencia previa en programación.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-6 h-6 text-novativa-teal" />
                  <span className="text-2xl font-bold text-white">500+</span>
                </div>
                <p className="text-gray-400">Estudiantes Exitosos</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="w-6 h-6 text-novativa-orange" />
                  <span className="text-2xl font-bold text-white">$10K+</span>
                </div>
                <p className="text-gray-400">Ingresos Mensuales Promedio</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <span className="text-2xl font-bold text-white">95%</span>
                </div>
                <p className="text-gray-400">Tasa de Éxito</p>
              </div>
            </div>

            <Button 
              onClick={scrollToForm}
              size="lg" 
              className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 animate-pulse transform hover:scale-105 transition-all mb-4"
            >
              <Play className="mr-2 h-5 w-5 md:mr-3 md:h-6 md:w-6" />
              Quiero Acceder al Curso
            </Button>
            
            <p className="text-sm text-gray-500">
              ✅ Acceso inmediato • ✅ Sin experiencia requerida • ✅ Garantía de satisfacción
            </p>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
              Lo Que Aprenderás en Este Curso
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8 text-novativa-teal" />,
                  title: "Fundamentos de IA",
                  description: "Comprende los conceptos básicos de inteligencia artificial y cómo aplicarlos en tu negocio."
                },
                {
                  icon: <Target className="w-8 h-8 text-novativa-orange" />,
                  title: "Creación de Agentes",
                  description: "Aprende a diseñar y desarrollar agentes de IA especializados para diferentes industrias."
                },
                {
                  icon: <DollarSign className="w-8 h-8 text-green-500" />,
                  title: "Estrategias de Monetización",
                  description: "Descubre múltiples formas de generar ingresos con tus agentes de IA."
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
                  title: "Escalamiento Automático",
                  description: "Técnicas para escalar tu negocio de agentes sin aumentar tu carga de trabajo."
                },
                {
                  icon: <Award className="w-8 h-8 text-purple-500" />,
                  title: "Casos de Éxito",
                  description: "Analiza casos reales de estudiantes que generan más de $10,000 mensuales."
                },
                {
                  icon: <Users className="w-8 h-8 text-pink-500" />,
                  title: "Comunidad Exclusiva",
                  description: "Acceso a nuestra comunidad privada de emprendedores de IA."
                }
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all transform hover:scale-105">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
              Lo Que Dicen Nuestros Estudiantes
            </h2>
            
            <div className="overflow-hidden">
              <div className="flex animate-scroll-testimonials-fast gap-8" style={{ width: 'calc(200% + 2rem)' }}>
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-gray-800 min-w-[300px] md:min-w-[400px] flex-shrink-0">
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 italic">"{testimonial.content}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
              Inversión Especial por Tiempo Limitado
            </h2>
            
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-bl-lg">
                <span className="font-bold">DESCUENTO 70%</span>
              </div>
              
              <div className="mb-6">
                <div className="text-gray-400 line-through text-2xl mb-2">$997</div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-2">$297</div>
                <div className="text-novativa-teal font-semibold">Pago único • Acceso de por vida</div>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  "✅ Curso completo con más de 50 videos",
                  "✅ Templates y herramientas incluidas", 
                  "✅ Comunidad exclusiva de estudiantes",
                  "✅ Soporte directo por 6 meses",
                  "✅ Actualizaciones gratuitas de por vida",
                  "✅ Garantía de satisfacción 30 días"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center justify-center gap-2 text-gray-300">
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={scrollToForm}
                size="lg" 
                className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white text-xl px-12 py-6 animate-pulse transform hover:scale-105 transition-all w-full"
              >
                <ArrowRight className="mr-3 h-6 w-6" />
                Comenzar Ahora
              </Button>
              
              <p className="text-gray-500 text-sm mt-4">
                Esta oferta expira en {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </section>

        {/* Sticky Footer CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-novativa-teal to-novativa-orange p-3 md:p-4 z-50 shadow-lg">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left flex-shrink-0">
                <div className="text-white font-bold text-sm md:text-base">¡Solo quedan {timeLeft.hours}h {timeLeft.minutes}m!</div>
                <div className="text-white/90 text-xs md:text-sm">Precio especial $297 (antes $997)</div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  onClick={scrollToForm}
                  className="bg-white text-novativa-teal hover:bg-gray-100 font-semibold text-sm md:text-base px-4 md:px-6 py-2 flex-1 sm:flex-initial"
                >
                  <Play className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                  Acceder Ahora
                </Button>
                <Button 
                  onClick={() => window.open('https://api.whatsapp.com/send?phone=50432142996', '_blank')}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm md:text-base px-3 md:px-4 py-2"
                >
                  <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Padding for Fixed Footer */}
        <div className="h-20 md:h-24"></div>
      </div>
    </div>
  );
};

export default AgentsAICourse;
