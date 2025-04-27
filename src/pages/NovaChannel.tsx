
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Users, Clock, BrainCircuit, Zap, Globe, Star, Rocket } from 'lucide-react';
import ScreenshotCarousel from '@/components/NovaChannel/ScreenshotCarousel';
import LouisebotWidget from '@/components/shared/LouisebotWidget';

const NovaChannel = () => {
  return (
    <>
      <LouisebotWidget />
      
      {/* Hero Section with Dynamic Background */}
      <section className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-novativa-darkTeal via-novativa-teal to-novativa-lightTeal relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/0badf3e6-586c-4660-86d6-0e50a6ffb597.png')] opacity-10 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className="inline-block animate-bounce-slow mb-4">
              <span className="text-4xl">💬</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white bg-clip-text">
              NovaChannel
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Tu plataforma todo-en-uno para una comunicación multicanal extraordinaria 🚀
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105"
              >
                <a href="https://tidycal.com/novativa" target="_blank" rel="noopener noreferrer">
                  ¡Pruébalo Gratis! ✨
                </a>
              </Button>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <ScreenshotCarousel />
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-novativa-teal">
            Características Innovadoras 🎯
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="text-novativa-orange h-8 w-8" />}
              title="Chatbots IA Avanzados"
              description="Automatiza respuestas inteligentes 24/7 con IA que entiende el contexto 🤖"
              bgImage="/lovable-uploads/bb515735-f62d-4e6a-9820-1802c67cab23.png"
            />
            <FeatureCard
              icon={<Globe className="text-novativa-teal h-8 w-8" />}
              title="Omnicanalidad Total"
              description="WhatsApp, Facebook, Instagram y más, todo en un solo lugar 🌐"
              bgImage="/lovable-uploads/a3722601-7c29-4740-8c43-cef8f215270b.png"
            />
            <FeatureCard
              icon={<Zap className="text-novativa-orange h-8 w-8" />}
              title="Automatización Smart"
              description="Flujos de trabajo personalizados que optimizan tu tiempo ⚡"
              bgImage="/lovable-uploads/a0c26d06-b57f-45ed-aa8d-9f9dd707c35b.png"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-novativa-darkTeal text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            ¿Por qué elegir NovaChannel? 🤔
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard
              icon={<Users className="h-10 w-10" />}
              title="Gestión Unificada"
              description="Maneja todos tus canales desde un solo dashboard intuitivo"
            />
            <BenefitCard
              icon={<Clock className="h-10 w-10" />}
              title="Servicio 24/7"
              description="Atención ininterrumpida con respuestas automáticas inteligentes"
            />
            <BenefitCard
              icon={<Star className="h-10 w-10" />}
              title="Experiencia Premium"
              description="Interacciones personalizadas que encantan a tus clientes"
            />
            <BenefitCard
              icon={<Rocket className="h-10 w-10" />}
              title="Escalabilidad Total"
              description="Crece sin límites con una plataforma que se adapta a ti"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-novativa-teal">
            ¡Revoluciona tu comunicación hoy! 🚀
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Únete a las empresas que ya transformaron su manera de conectar con clientes
          </p>
          <Button
            asChild
            size="lg"
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105"
          >
            <a href="https://tidycal.com/novativa" target="_blank" rel="noopener noreferrer">
              Agenda una Demo Personalizada 🎯
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, bgImage }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-transparent z-10" />
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-300"
      style={{ backgroundImage: `url(${bgImage})` }}
    />
    <div className="relative z-20 p-8">
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-white/90">{description}</p>
    </div>
  </div>
);

// Benefit Card Component
const BenefitCard = ({ icon, title, description }) => (
  <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-novativa-teal to-novativa-orange mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-white/80">{description}</p>
  </div>
);

export default NovaChannel;

