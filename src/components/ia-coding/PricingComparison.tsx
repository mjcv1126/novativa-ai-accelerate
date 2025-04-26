
import React from 'react';
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

const PricingComparison = () => {
  return (
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
  );
};

export default PricingComparison;
