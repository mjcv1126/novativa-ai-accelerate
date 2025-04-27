
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-r from-[#1A1F2C] to-[#2C3E50] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white bg-clip-text">
            Contact Center Humano
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
            La perfecta combinación de atención humana personalizada con la eficiencia de la IA
          </p>
        </div>
        <div className="flex justify-center">
          <Button asChild size="lg" className="bg-white text-[#1A1F2C] hover:bg-gray-100 animate-fade-in">
            <Link to="/contacto">Solicitar Información</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

