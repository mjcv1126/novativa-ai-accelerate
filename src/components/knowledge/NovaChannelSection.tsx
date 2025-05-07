
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const NovaChannelSection = () => {
  const { language } = useLanguage();
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">NovaChannel</h2>
      <div className="space-y-4 text-gray-600">
        <p>
          {language === 'es' 
            ? 'NovaChannel es una plataforma omnicanal para atención al cliente que integra IA avanzada con capacidades de atención humana.' 
            : 'NovaChannel is an omnichannel platform for customer service that integrates advanced AI with human care capabilities.'}
        </p>
        <p>{language === 'es' ? 'Características principales:' : 'Main features:'}</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            {language === 'es' 
              ? 'Chatbot IA personalizado que aprende y se adapta a tu negocio' 
              : 'Custom AI chatbot that learns and adapts to your business'}
          </li>
          <li>
            {language === 'es' 
              ? 'Integración completa con WhatsApp Business API' 
              : 'Complete integration with WhatsApp Business API'}
          </li>
          <li>
            {language === 'es' 
              ? 'Panel de control unificado para gestionar conversaciones' 
              : 'Unified dashboard to manage conversations'}
          </li>
          <li>
            {language === 'es' 
              ? 'Sistema de derivación inteligente a agentes humanos' 
              : 'Intelligent routing system to human agents'}
          </li>
          <li>
            {language === 'es' 
              ? 'Análisis de sentimientos y categorización automática' 
              : 'Sentiment analysis and automatic categorization'}
          </li>
          <li>
            {language === 'es' 
              ? 'Reportes detallados de interacciones y satisfacción' 
              : 'Detailed reports on interactions and satisfaction'}
          </li>
          <li>
            {language === 'es' 
              ? 'Capacidad multicanal: chat web, WhatsApp, redes sociales' 
              : 'Multichannel capability: web chat, WhatsApp, social media'}
          </li>
          <li>
            {language === 'es' 
              ? 'Automatización de respuestas frecuentes' 
              : 'Automation of frequent responses'}
          </li>
          <li>
            {language === 'es' 
              ? 'Gestión de tickets y seguimiento de casos' 
              : 'Ticket management and case tracking'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NovaChannelSection;
