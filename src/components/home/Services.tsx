
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Services = () => {
  const { language } = useLanguage();

  const serviceCategories = [
    {
      title: language === 'es' ? 'Asistentes Virtuales' : 'Virtual Assistants',
      description: language === 'es' 
        ? 'Chatbots inteligentes para atender consultas de clientes 24/7' 
        : 'Intelligent chatbots to handle customer inquiries 24/7',
      features: language === 'es' 
        ? [
            'Respuestas en tiempo real',
            'Integración con WhatsApp y Redes Sociales',
            'Transferencia a agentes humanos'
          ]
        : [
            'Real-time responses',
            'Integration with WhatsApp and Social Media',
            'Transfer to human agents'
          ],
      link: '/servicios/agentes-ia'
    },
    {
      title: language === 'es' ? 'Automatización de Procesos' : 'Process Automation',
      description: language === 'es' 
        ? 'Optimice sus operaciones empresariales con flujos automatizados' 
        : 'Optimize your business operations with automated workflows',
      features: language === 'es' 
        ? [
            'Reducción de tareas manuales',
            'Integración con sistemas existentes',
            'Análisis y reportes automáticos'
          ]
        : [
            'Reduction of manual tasks',
            'Integration with existing systems',
            'Automated analysis and reports'
          ],
      link: '/servicios/contenido'
    },
    {
      title: language === 'es' ? 'Desarrollo de Aplicaciones' : 'Application Development',
      description: language === 'es' 
        ? 'Soluciones personalizadas con IA integrada para necesidades específicas' 
        : 'Custom solutions with integrated AI for specific needs',
      features: language === 'es' 
        ? [
            'Aplicaciones web y móviles',
            'Paneles de control y analítica',
            'Integración con APIs de terceros'
          ]
        : [
            'Web and mobile applications',
            'Dashboards and analytics',
            'Integration with third-party APIs'
          ],
      link: '/iacoding'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'es' ? 'Nuestros Servicios' : 'Our Services'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Ofrecemos soluciones completas para integrar inteligencia artificial en su negocio'
              : 'We offer complete solutions to integrate artificial intelligence into your business'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <ul className="mb-6 space-y-2">
                  {category.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-novativa-teal mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={category.link} 
                  className="text-novativa-teal hover:text-novativa-darkTeal font-medium inline-flex items-center"
                >
                  {language === 'es' ? 'Saber más' : 'Learn more'}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
