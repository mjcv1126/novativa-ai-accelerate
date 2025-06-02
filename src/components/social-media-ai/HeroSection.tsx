
import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, TrendingUp } from 'lucide-react';

interface HeroSectionProps {
  isVisible: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isVisible }) => {
  return (
    <section className="min-h-screen relative flex items-center justify-center pt-10 pb-20">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1920&h=1080&fit=crop&crop=center" 
          alt="Social Media Analytics"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Gestión Estratégica de Redes Sociales con IA
            </h1>
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 blur"></div>
              <p className="relative bg-black text-xl md:text-2xl px-4 py-2">
                Automatiza tu contenido, optimiza tu impacto y potencia tus resultados sin esfuerzo
              </p>
            </div>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl px-10 py-8 animate-bounce-slow"
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <TrendingUp className="mr-2 h-6 w-6" />
              Agenda una Consultoría Gratuita
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
