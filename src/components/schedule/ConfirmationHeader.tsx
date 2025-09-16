
import React from 'react';
import { Star, MessageCircle, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ConfirmationHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="flex flex-col items-center mb-6">
        <div className="mb-4 w-48 h-auto relative">
          <img 
            src="/lovable-uploads/d9c08571-214e-4163-bee5-427cb5806051.png" 
            alt="Novativa Logo" 
            className="w-full animate-pulse-subtle"
          />
          <div className="absolute -top-4 -right-4">
            <Star className="h-8 w-8 text-purple-500 animate-bounce-slow" />
          </div>
          <div className="absolute -bottom-2 -left-2">
            <Star className="h-6 w-6 text-indigo-400 animate-subtle-shake" />
          </div>
        </div>
        <div className="inline-block p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full">
          <Star className="h-12 w-12 text-white animate-pulse-subtle" />
        </div>
      </div>
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 text-transparent bg-clip-text">
        {t('schedule.seeYou')}
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
        Descubre cómo implementar 
        <span className="font-bold text-blue-600"> inteligencia artificial</span> y 
        <span className="font-bold text-purple-600"> automatización</span> para revolucionar el 
        <span className="font-bold text-green-600"> marketing en tu empresa</span> y aumentar tus ventas
      </p>
      <div className="flex justify-center gap-3 mb-8">
        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2 animate-bounce-slow">
          <MessageCircle size={18} /> {t('schedule.chatbot')}
        </span>
        <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full flex items-center gap-2 animate-subtle-shake">
          <Check size={18} /> {t('schedule.automation2')}
        </span>
      </div>
    </div>
  );
};

export default ConfirmationHeader;
