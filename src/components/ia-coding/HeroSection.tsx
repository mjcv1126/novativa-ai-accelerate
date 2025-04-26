
import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

interface HeroSectionProps {
  isVisible: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isVisible }) => {
  return (
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
  );
};

export default HeroSection;
