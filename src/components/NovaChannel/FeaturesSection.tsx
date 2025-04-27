
import React from 'react';
import { Bot, Globe, Zap } from 'lucide-react';

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
    <div className="bg-novativa-teal/10 p-4 rounded-full w-fit mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
          Características Innovadoras 🎯
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Bot className="text-novativa-teal h-8 w-8" />}
            title="Chatbots IA Avanzados"
            description="Automatiza respuestas inteligentes 24/7 con IA que entiende el contexto 🤖"
          />
          <FeatureCard
            icon={<Globe className="text-novativa-orange h-8 w-8" />}
            title="Omnicanalidad Total"
            description="WhatsApp, Facebook, Instagram y más, todo en un solo lugar 🌐"
          />
          <FeatureCard
            icon={<Zap className="text-novativa-teal h-8 w-8" />}
            title="Automatización Smart"
            description="Flujos de trabajo personalizados que optimizan tu tiempo ⚡"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
