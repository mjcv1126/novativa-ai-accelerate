
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Rocket, Code } from 'lucide-react';
import TidyCalEmbed from '@/components/schedule/TidyCalEmbed';

const IACoding = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-gradient-to-br from-novativa-teal/10 via-transparent to-novativa-orange/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
              Desarrollo de Apps con IA
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700">
              Soluciones rápidas, innovadoras y a bajo costo potenciadas por Inteligencia Artificial
            </p>
            <Button 
              size="lg"
              className="bg-novativa-teal hover:bg-novativa-lightTeal text-white text-lg px-8 py-6"
              onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Rocket className="mr-2 h-5 w-5" />
              Agenda una Demo Gratis
            </Button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-novativa-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-novativa-orange/10 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-novativa-teal/10 p-3 rounded-full w-fit mb-6">
                <Zap className="text-novativa-teal h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Desarrollo Acelerado</h3>
              <p className="text-gray-600">
                Utilizamos IA para acelerar el desarrollo, reduciendo tiempos y costos hasta en un 70%.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-novativa-orange/10 p-3 rounded-full w-fit mb-6">
                <Code className="text-novativa-orange h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Soluciones Innovadoras</h3>
              <p className="text-gray-600">
                Creamos apps web y móviles elegantes y confiables usando las últimas tecnologías.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="bg-novativa-teal/10 p-3 rounded-full w-fit mb-6">
                <Rocket className="text-novativa-teal h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">Costos Reducidos</h3>
              <p className="text-gray-600">
                De $15,000-$40,000 a una fracción del precio sin sacrificar calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Ahorra hasta un <span className="text-novativa-teal">70%</span> en Desarrollo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-500">Desarrollo Tradicional</h3>
              <p className="text-4xl font-bold mb-4">$15,000 - $40,000</p>
              <ul className="space-y-3 text-gray-600">
                <li>• Tiempos de desarrollo extensos</li>
                <li>• Costos de personal elevados</li>
                <li>• Procesos manuales lentos</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-novativa-teal to-novativa-darkTeal p-6 rounded-xl text-white">
              <h3 className="text-xl font-semibold mb-4">Desarrollo con IA</h3>
              <p className="text-4xl font-bold mb-4">70% más económico</p>
              <ul className="space-y-3">
                <li>• Desarrollo ultra rápido</li>
                <li>• Costos optimizados</li>
                <li>• Soluciones innovadoras</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para dar vida a tu idea?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Agenda una demo gratuita y descubre cómo podemos ayudarte a crear tu aplicación
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <TidyCalEmbed path="desarrollo-ia" className="rounded-xl shadow-lg" />
          </div>
        </div>
      </section>
    </>
  );
};

export default IACoding;
