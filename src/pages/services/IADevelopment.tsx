
import React from 'react';
import { Code, Smartphone, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';

const IADevelopment = () => {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Desarrollo con IA
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Creamos soluciones web y móviles personalizadas potenciadas por inteligencia artificial
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-novativa-teal/10 p-3 rounded-full w-fit mb-6">
                <Code className="text-novativa-teal" size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Desarrollo Web con IA</h2>
              <p className="text-gray-600 mb-6">
                Creación de aplicaciones web personalizadas con integración de IA para optimizar tus procesos y mejorar la experiencia de usuario.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                  <span>Desarrollo web con funcionalidades de IA</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                  <span>Integración con APIs de inteligencia artificial</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                  <span>Optimización de procesos con machine learning</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                  <span>Consultoría y mejora continua</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-novativa-orange/10 p-3 rounded-full w-fit mb-6">
                <Smartphone className="text-novativa-orange" size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Desarrollo Móvil con IA</h2>
              <p className="text-gray-600 mb-6">
                Desarrollo de aplicaciones móviles nativas e híbridas con capacidades de inteligencia artificial para iOS y Android.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                  <span>Apps nativas con componentes de IA</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                  <span>Desarrollo multiplataforma (iOS/Android)</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                  <span>Integración de machine learning móvil</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                  <span>Optimización de rendimiento con IA</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-novativa-darkTeal/10 p-3 rounded-full w-fit mb-6">
                <Laptop className="text-novativa-darkTeal" size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Agentes Autónomos</h2>
              <p className="text-gray-600 mb-6">
                Desarrollo de agentes de IA para automatización de procesos complejos que actúan de forma autónoma para resolver tareas específicas.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-darkTeal mr-2"></div>
                  <span>Automatización de procesos de negocio</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-darkTeal mr-2"></div>
                  <span>Agentes de toma de decisiones</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-darkTeal mr-2"></div>
                  <span>Integración con sistemas existentes</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-darkTeal mr-2"></div>
                  <span>Optimización continua del rendimiento</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para innovar con IA?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Agenda una demostración y descubre cómo podemos transformar tu negocio con soluciones de IA para web y móvil
          </p>
          <Button
            size="lg"
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white"
            onClick={() => {
              window.location.href = '/agenda';
            }}
          >
            Agenda una demostración gratuita
          </Button>
        </div>
      </section>
    </>
  );
};

export default IADevelopment;
