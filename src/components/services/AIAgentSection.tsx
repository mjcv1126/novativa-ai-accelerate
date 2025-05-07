
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Video, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AIAgentSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-white" id="agente-ia-web">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-novativa-teal">{t('services.aiagents.title')}</h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('services.aiagents.description')}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Bot className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">{t('services.aiagents.feature1')}</h3>
                  <p className="text-gray-600">
                    {t('services.aiagents.feature1.desc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <MessageSquare className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">{t('services.aiagents.feature2')}</h3>
                  <p className="text-gray-600">
                    {t('services.aiagents.feature2.desc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <Video className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">{t('services.aiagents.feature3')}</h3>
                  <p className="text-gray-600">
                    {t('services.aiagents.feature3.desc')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <FileText className="text-novativa-orange" size={20} />
                </div>
                <div className="ml-3">
                  <h3 className="font-bold">{t('services.aiagents.feature4')}</h3>
                  <p className="text-gray-600">
                    {t('services.aiagents.feature4.desc')}
                  </p>
                </div>
              </div>
            </div>
            
            <Button asChild className="bg-novativa-teal hover:bg-novativa-lightTeal">
              <Link to="/contacto">
                {t('services.aiagents.cta')}
              </Link>
            </Button>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-xl bg-white">
            <img 
              alt="AI Agent Animation" 
              src="https://edea.juntadeandalucia.es/bancorecursos/file/41832ff2-cfcb-4923-ac63-5abdf63e5087/1/CDI_1BAC_REA_01_v01.zip/gif_animado_narrador_juvenil.gif" 
              className="w-full h-[400px] object-contain" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAgentSection;
