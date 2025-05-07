
import React from 'react';
import { Link } from 'react-router-dom';
import ScheduleDialog from '@/components/shared/ScheduleDialog';
import { Code, BrainCircuit } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const DevelopmentSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="bg-novativa-teal/10 p-3 rounded-full w-fit mb-6">
              <Code className="text-novativa-teal" size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Desarrollo con IA</h2>
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
            <ScheduleDialog className="bg-novativa-teal hover:bg-novativa-lightTeal">
              <Link to="/iacoding">Solicitar información</Link>
            </ScheduleDialog>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="bg-novativa-orange/10 p-3 rounded-full w-fit mb-6">
              <BrainCircuit className="text-novativa-orange" size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Agentes Autónomos</h2>
            <p className="text-gray-600 mb-6">
              Desarrollo de agentes de IA para automatización de procesos complejos que actúan de forma autónoma para resolver tareas específicas.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                <span>Automatización de procesos de negocio</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                <span>Agentes de toma de decisiones</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                <span>Integración con sistemas existentes</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                <span>Optimización continua del rendimiento</span>
              </li>
            </ul>
            <ScheduleDialog className="bg-novativa-orange hover:bg-novativa-lightOrange">
              Solicitar información
            </ScheduleDialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentSection;
