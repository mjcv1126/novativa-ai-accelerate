
import React from 'react';
import { Bot, Globe, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { language } = useLanguage();
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
          {language === 'es' ? 'Características Innovadoras 🎯' : 'Innovative Features 🎯'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Bot className="text-novativa-teal h-8 w-8" />}
            title={language === 'es' ? 'Chatbots IA Avanzados' : 'Advanced AI Chatbots'}
            description={language === 'es' 
              ? 'Automatiza respuestas inteligentes 24/7 con IA que entiende el contexto 🤖'
              : 'Automate intelligent responses 24/7 with AI that understands context 🤖'
            }
          />
          <FeatureCard
            icon={<Globe className="text-novativa-orange h-8 w-8" />}
            title={language === 'es' ? 'Omnicanalidad Total' : 'Total Omnichannel'}
            description={language === 'es'
              ? 'WhatsApp, Facebook, Instagram y más, todo en un solo lugar 🌐'
              : 'WhatsApp, Facebook, Instagram and more, all in one place 🌐'
            }
          />
          <FeatureCard
            icon={<Zap className="text-novativa-teal h-8 w-8" />}
            title={language === 'es' ? 'Automatización Smart' : 'Smart Automation'}
            description={language === 'es'
              ? 'Flujos de trabajo personalizados que optimizan tu tiempo ⚡'
              : 'Custom workflows that optimize your time ⚡'
            }
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
