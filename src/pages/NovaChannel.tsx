
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Users, Clock, BrainCircuit, Zap, Globe, Star, Rocket } from 'lucide-react';
import ScreenshotCarousel from '@/components/NovaChannel/ScreenshotCarousel';
import LouisebotWidget from '@/components/shared/LouisebotWidget';
import { platforms } from '@/config/platformsConfig';
import PricingTable from '@/components/pricing/PricingTable';

const NovaChannel = () => {
  return (
    <>
      <LouisebotWidget />
      
      {/* Hero Section with Animated Background */}
      <section className="min-h-screen pt-32 pb-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" /> {/* Lighter overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://www.ismartrecruit.com/assets/frontend/images/isr-learn_more-AI_&_Automation/Chat-Bot.gif')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block animate-bounce-slow mb-4">
              <span className="text-4xl">🤖</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              NovaChannel
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Tu plataforma todo-en-uno para una comunicación multicanal extraordinaria. 
              Crea un agente IA que atiende a tus clientes mientras duermes 😴✨
            </p>
            <div className="mt-8 flex flex-col items-center gap-8">
              <Button
                asChild
                size="lg"
                className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105 shadow-lg"
              >
                <a href="https://tidycal.com/novativa" target="_blank" rel="noopener noreferrer">
                  ¡Pruébalo Gratis! ✨
                </a>
              </Button>
              
              {/* Platforms Grid */}
              <div className="flex flex-wrap justify-center items-center gap-8 bg-white/80 p-6 rounded-xl backdrop-blur-sm">
                {platforms.map((platform) => (
                  <div 
                    key={platform.name}
                    className="flex flex-col items-center gap-2 transition-transform hover:scale-110"
                  >
                    <img 
                      src={platform.icon} 
                      alt={platform.name}
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {platform.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <ScreenshotCarousel />
          </div>
        </div>
      </section>

      {/* Features Grid Section with New Design */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
            Características Innovadoras 🎯
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-novativa-teal/10 p-4 rounded-full w-fit mb-6">
                <Bot className="text-novativa-teal h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Chatbots IA Avanzados</h3>
              <p className="text-gray-600">
                Automatiza respuestas inteligentes 24/7 con IA que entiende el contexto 🤖
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-novativa-orange/10 p-4 rounded-full w-fit mb-6">
                <Globe className="text-novativa-orange h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Omnicanalidad Total</h3>
              <p className="text-gray-600">
                WhatsApp, Facebook, Instagram y más, todo en un solo lugar 🌐
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="bg-novativa-teal/10 p-4 rounded-full w-fit mb-6">
                <Zap className="text-novativa-teal h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Automatización Smart</h3>
              <p className="text-gray-600">
                Flujos de trabajo personalizados que optimizan tu tiempo ⚡
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
            Planes y Precios 💎
          </h2>
          <PricingTable billingCycle="monthly" />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
            ¿Por qué elegir NovaChannel? 🤔
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BenefitCard
              icon={<Users className="h-10 w-10 text-novativa-teal" />}
              title="Gestión Unificada"
              description="Maneja todos tus canales desde un solo dashboard intuitivo"
            />
            <BenefitCard
              icon={<Clock className="h-10 w-10 text-novativa-orange" />}
              title="Servicio 24/7"
              description="Atención ininterrumpida con respuestas automáticas inteligentes"
            />
            <BenefitCard
              icon={<Star className="h-10 w-10 text-novativa-teal" />}
              title="Experiencia Premium"
              description="Interacciones personalizadas que encantan a tus clientes"
            />
            <BenefitCard
              icon={<Rocket className="h-10 w-10 text-novativa-orange" />}
              title="Escalabilidad Total"
              description="Crece sin límites con una plataforma que se adapta a ti"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            ¡Revoluciona tu comunicación hoy! 🚀
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600">
            Únete a las empresas que ya transformaron su manera de conectar con clientes
          </p>
          <Button
            asChild
            size="lg"
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105 shadow-lg"
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

