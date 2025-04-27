
import React from 'react';
import { Button } from '@/components/ui/button';
import { platforms } from '@/config/platformsConfig';

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-32 pb-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/40" />
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
      </div>
    </section>
  );
};

export default HeroSection;
