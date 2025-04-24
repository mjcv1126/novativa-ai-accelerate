import React from 'react';
import TypingAnimation from '@/components/shared/TypingAnimation';
import { Bot, Settings, BarChart3, PenTool, CheckCircle2, Zap } from 'lucide-react';

const Home = () => {
  const typingPhrases = [
    "Automatización de procesos.",
    "Chatbots inteligentes.",
    "Análisis de datos con IA.",
    "Desarrollo con inteligencia artificial.",
    "Generación de contenido automático."
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Shape */}
        <div 
          className="absolute inset-0 bg-gradient-radial from-novativa-teal/10 to-transparent -z-10"
          aria-hidden="true"
        ></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Acelera Tu Negocio Con <span className="text-novativa-teal">Inteligencia Artificial</span>
              </h1>
              <div className="text-xl md:text-2xl text-gray-600 mb-8 h-10">
                <TypingAnimation phrases={typingPhrases} className="inline-block" />
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000&auto=format&fit=crop"
                  alt="Tecnología IA" 
                  className="rounded-xl shadow-2xl"
                />
              </div>
              <div 
                className="absolute top-12 -left-12 -z-0 w-64 h-64 bg-novativa-orange/20 rounded-full blur-3xl"
                aria-hidden="true"
              ></div>
              <div 
                className="absolute bottom-0 right-0 -z-0 w-40 h-40 bg-novativa-teal/20 rounded-full blur-2xl"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegir <span className="text-novativa-teal">Novativa</span>?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Potenciamos tu negocio con soluciones de inteligencia artificial y automatización personalizadas para tus necesidades.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-novativa-teal/10 p-3 rounded-full w-fit mb-6">
                <Bot className="text-novativa-teal" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Agentes IA Avanzados</h3>
              <p className="text-gray-600 mb-4">
                Chatbots y asistentes virtuales que responden consultas de forma natural y eficiente.
              </p>
              <Link 
                to="/servicios" 
                className="text-novativa-teal hover:text-novativa-lightTeal flex items-center font-medium"
              >
                Conocer más <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-novativa-orange/10 p-3 rounded-full w-fit mb-6">
                <Zap className="text-novativa-orange" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Automatización de Procesos</h3>
              <p className="text-gray-600 mb-4">
                Optimiza tus flujos de trabajo y reduce costos con nuestras soluciones de automatización.
              </p>
              <Link 
                to="/servicios" 
                className="text-novativa-teal hover:text-novativa-lightTeal flex items-center font-medium"
              >
                Conocer más <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-novativa-teal/10 p-3 rounded-full w-fit mb-6">
                <PenTool className="text-novativa-teal" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Generación de Contenido</h3>
              <p className="text-gray-600 mb-4">
                Crea contenido de alta calidad automáticamente para tu sitio web y redes sociales.
              </p>
              <Link 
                to="/servicios" 
                className="text-novativa-teal hover:text-novativa-lightTeal flex items-center font-medium"
              >
                Conocer más <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-novativa-orange/10 p-3 rounded-full w-fit mb-6">
                <Settings className="text-novativa-orange" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Desarrollo IA Personalizado</h3>
              <p className="text-gray-600 mb-4">
                Aplicaciones web y móviles con inteligencia artificial integrada para tu negocio.
              </p>
              <Link 
                to="/servicios" 
                className="text-novativa-teal hover:text-novativa-lightTeal flex items-center font-medium"
              >
                Conocer más <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-novativa-teal/10 p-3 rounded-full w-fit mb-6">
                <BarChart3 className="text-novativa-teal" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Análisis Inteligente de Datos</h3>
              <p className="text-gray-600 mb-4">
                Extrae información valiosa de tus datos para tomar decisiones estratégicas.
              </p>
              <Link 
                to="/servicios" 
                className="text-novativa-teal hover:text-novativa-lightTeal flex items-center font-medium"
              >
                Conocer más <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="bg-novativa-orange/10 p-3 rounded-full w-fit mb-6">
                <CheckCircle2 className="text-novativa-orange" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Soporte Prioritario</h3>
              <p className="text-gray-600 mb-4">
                Atención personalizada y soporte técnico para todas nuestras soluciones.
              </p>
              <Link 
                to="/servicios" 
                className="text-novativa-teal hover:text-novativa-lightTeal flex items-center font-medium"
              >
                Conocer más <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para transformar tu negocio?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Impulsa tu empresa con nuestras soluciones de inteligencia artificial y automatización.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                asChild
                className="bg-novativa-orange hover:bg-novativa-lightOrange px-6 py-6 text-white"
                size="lg"
              >
                <Link to="/contacto">
                  Solicita una demostración gratuita
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-novativa-teal px-6 py-6"
                size="lg"
              >
                <Link to="/precios">
                  Ver planes y precios
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Empresas que ya confían en nuestras soluciones de inteligencia artificial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
              <p className="text-gray-600 mb-4">
                "Implementamos el chatbot de Novativa y nos ayudó a aumentar las conversiones en un 35%. La IA responde preguntas de forma precisa y natural."
              </p>
              <div className="flex items-center">
                <div className="mr-4 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                  RM
                </div>
                <div>
                  <h4 className="font-bold">Ricardo Morales</h4>
                  <p className="text-sm text-gray-500">Director de Marketing, TechSoluciones</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
              <p className="text-gray-600 mb-4">
                "La automatización de procesos de Novativa redujo nuestros tiempos operativos en un 60%. Su equipo fue muy profesional durante todo el proceso."
              </p>
              <div className="flex items-center">
                <div className="mr-4 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                  LG
                </div>
                <div>
                  <h4 className="font-bold">Laura González</h4>
                  <p className="text-sm text-gray-500">COO, Distribuidora Nacional</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <svg className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
              <p className="text-gray-600 mb-4">
                "El sistema de generación de contenido nos permite crear artículos de calidad en minutos. Ha transformado nuestra estrategia de marketing digital."
              </p>
              <div className="flex items-center">
                <div className="mr-4 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                  CJ
                </div>
                <div>
                  <h4 className="font-bold">Carlos Jiménez</h4>
                  <p className="text-sm text-gray-500">Director de Contenido, MediaGlobal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
