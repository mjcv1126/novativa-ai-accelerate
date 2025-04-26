
import React from 'react';
import { Code, Smartphone, Zap, Sparkles, Clock, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TidyCalEmbed from '@/components/schedule/TidyCalEmbed';
import { Helmet } from 'react-helmet-async';

const MobileAppDevelopment = () => {
  return (
    <>
      <Helmet>
        <title>Desarrollo de Apps con IA | Novativa</title>
        <meta name="description" content="Desarrollamos aplicaciones web y móviles potenciadas por IA a una fracción del costo y tiempo tradicional. Ahorra hasta un 70% en costos de desarrollo." />
      </Helmet>
      
      <section className="pt-32 pb-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-white font-medium mb-4 backdrop-blur-sm">
              🚀 Innovación Acelerada
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Desarrollo de Apps <span className="text-novativa-orange">Potenciadas por IA</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Creamos soluciones web y móviles innovadoras a una fracción del tiempo y costo tradicional
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-novativa-orange hover:bg-novativa-lightOrange text-white text-lg"
                onClick={() => {
                  window.open('https://tidycal.com/novativa/desarrollo-ia', '_blank');
                }}
              >
                Agendar Consulta Gratuita
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm text-lg"
                onClick={() => {
                  window.location.href = '/contacto';
                }}
              >
                Conocer más
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-transparent bg-clip-text">
              Desarrollo Acelerado por IA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En Novativa, revolucionamos el desarrollo de aplicaciones utilizando lo último en inteligencia artificial
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Desarrollo Ultra Rápido</h3>
              <p className="text-gray-600 mb-6">
                Nuestro enfoque potenciado por IA reduce el tiempo de desarrollo hasta en un 70%. Lo que tradicionalmente tomaría meses, ahora puede estar listo en semanas o incluso días.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-medium">
                <Clock size={18} />
                <span>Entrega hasta 5x más rápida</span>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 transform transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Coins className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Ahorro Significativo</h3>
              <p className="text-gray-600 mb-6">
                Reducimos costos de desarrollo hasta un 70% comparado con metodologías tradicionales. Un desarrollo que normalmente costaría $15,000-$40,000 puede realizarse por una fracción del precio.
              </p>
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <Sparkles size={18} />
                <span>Ahorro de hasta 70% en costos</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-100 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Tú lo imaginas, nosotros y la IA le damos vida</h3>
                <p className="text-gray-600 mb-6">
                  Nuestro proceso combina tu visión con el poder de la IA y la experiencia de nuestro equipo para crear soluciones elegantes, funcionales y de alto rendimiento en tiempo récord.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Apps móviles nativas (iOS/Android)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Aplicaciones web progresivas (PWA)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Plataformas SaaS con IA integrada</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Soluciones empresariales inteligentes</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-20 rounded-full"></div>
                  <img 
                    src="/lovable-uploads/0c1c88bd-2391-4fa2-b5f0-0e97a595fd49.png" 
                    alt="App Development" 
                    className="relative z-10 rounded-xl h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Soluciones</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desarrollamos todo tipo de aplicaciones web y móviles adaptadas a tus necesidades
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-novativa-teal/10 p-3 rounded-full w-fit mb-6">
                <Code className="text-novativa-teal" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Desarrollo Web con IA</h3>
              <p className="text-gray-600 mb-6">
                Creación de aplicaciones web personalizadas con integración de IA para optimizar procesos y mejorar la experiencia de usuario.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                  <span>Desarrollo con frameworks modernos</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                  <span>Integración con APIs de IA</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                  <span>Optimización con machine learning</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200 transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-novativa-orange/10 p-3 rounded-full w-fit mb-6">
                <Smartphone className="text-novativa-orange" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Apps Móviles con IA</h3>
              <p className="text-gray-600 mb-6">
                Desarrollo de aplicaciones móviles nativas e híbridas con capacidades de inteligencia artificial para iOS y Android.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                  <span>Apps nativas con IA integrada</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                  <span>Desarrollo multiplataforma</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-novativa-orange mr-2"></div>
                  <span>Experiencia móvil optimizada</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200 transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-purple-600/10 p-3 rounded-full w-fit mb-6">
                <Sparkles className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Soluciones Personalizadas</h3>
              <p className="text-gray-600 mb-6">
                Desarrollo a medida para resolver problemas específicos de tu negocio con el poder de la inteligencia artificial.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                  <span>Automatización de procesos</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                  <span>Dashboards inteligentes</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-600 mr-2"></div>
                  <span>Sistemas integrados con IA</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Agenda una consulta gratuita</h2>
              <p className="text-xl text-white/90 mb-8">
                Cuéntanos tu idea y descubre cómo podemos transformarla en realidad con la ayuda de la IA
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl p-8">
              <TidyCalEmbed path="desarrollo-ia" />
            </div>
            
            <div className="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">¿Por qué desarrollar con Novativa?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Desarrollo Ultra Rápido</h4>
                    <p className="text-white/80">Reducimos tiempos de entrega hasta en un 70%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Coins className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Ahorro Significativo</h4>
                    <p className="text-white/80">Costos hasta un 70% menores que métodos tradicionales</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Innovación Constante</h4>
                    <p className="text-white/80">Incorporamos lo último en tecnología e IA</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold">Multiplataforma</h4>
                    <p className="text-white/80">Soluciones para web, iOS y Android</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MobileAppDevelopment;
