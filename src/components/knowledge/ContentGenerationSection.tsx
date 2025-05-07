
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContentGenerationSection = () => {
  const { language } = useLanguage();
  
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        {language === 'es' ? 'Generación de Contenido y Clonación' : 'Content Generation and Cloning'}
      </h2>
      <div className="space-y-4 text-gray-600">
        <p>
          {language === 'es'
            ? 'Nuestro servicio de generación de contenido utiliza tecnología de IA avanzada para crear y personalizar contenido multimedia.'
            : 'Our content generation service uses advanced AI technology to create and customize multimedia content.'}
        </p>
        <p>
          {language === 'es' ? 'Servicios específicos:' : 'Specific services:'}
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            {language === 'es' ? 'Clonación de Avatar Digital' : 'Digital Avatar Cloning'}
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>
                {language === 'es'
                  ? 'Creación de avatares realistas basados en personas reales'
                  : 'Creation of realistic avatars based on real people'}
              </li>
              <li>
                {language === 'es'
                  ? 'Personalización de gestos y expresiones'
                  : 'Customization of gestures and expressions'}
              </li>
              <li>
                {language === 'es'
                  ? 'Integración con contenido de marca'
                  : 'Integration with brand content'}
              </li>
              <li>
                {language === 'es'
                  ? 'Múltiples idiomas y acentos disponibles'
                  : 'Multiple languages and accents available'}
              </li>
            </ul>
          </li>
          <li>
            {language === 'es' ? 'Clonación de Voz' : 'Voice Cloning'}
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>
                {language === 'es'
                  ? 'Replica exacta de voces humanas'
                  : 'Exact replica of human voices'}
              </li>
              <li>
                {language === 'es'
                  ? 'Mantiene entonación y características únicas'
                  : 'Maintains unique intonation and characteristics'}
              </li>
              <li>
                {language === 'es'
                  ? 'Ideal para contenido consistente de marca'
                  : 'Ideal for consistent brand content'}
              </li>
              <li>
                {language === 'es'
                  ? 'Soporte multilingüe'
                  : 'Multilingual support'}
              </li>
            </ul>
          </li>
          <li>
            {language === 'es' ? 'Automatización de Contenido' : 'Content Automation'}
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>
                {language === 'es'
                  ? 'Generación automática para redes sociales'
                  : 'Automatic generation for social media'}
              </li>
              <li>
                {language === 'es'
                  ? 'Contenido SEO optimizado'
                  : 'SEO optimized content'}
              </li>
              <li>
                {language === 'es'
                  ? 'Programación y distribución automatizada'
                  : 'Automated scheduling and distribution'}
              </li>
              <li>
                {language === 'es'
                  ? 'Análisis de rendimiento en tiempo real'
                  : 'Real-time performance analysis'}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContentGenerationSection;
