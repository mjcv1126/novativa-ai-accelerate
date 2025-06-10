import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Bot, MessageSquare, Users, Zap, CheckCircle, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ContactForm from '@/components/agents-ai-course/ContactForm';
import PromotionCountdown from '@/components/agents-ai-course/PromotionCountdown';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useInterval } from '@/hooks/useInterval';

const AgentsAICourse = () => {
  const { toast } = useToast();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "María González",
      role: "Consultora Digital",
      content: "En 2 meses ya tengo 15 clientes pagando $150 mensuales. El curso es súper práctico y fácil de seguir.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Carlos Ruiz",
      role: "Emprendedor Digital",
      content: "Increíble cómo algo tan sencillo puede generar tanto dinero. Ya voy por $8,000 mensuales y creciendo.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ana López",
      role: "Fundadora, AI Solutions",
      content: "Sin conocimientos técnicos, logré crear mi primera agencia de IA. El potencial es infinito.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Roberto Martínez",
      role: "Freelancer Digital",
      content: "Después de 3 meses tengo 25 clientes. Es impresionante cómo puedes escalar sin límites.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sofia Herrera",
      role: "Agencia de Marketing",
      content: "Implementamos esto para nuestros clientes y ahora cobramos $300 por agente. ¡Rentabilidad increíble!",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Diego Fernández",
      role: "Community Manager",
      content: "Lo que más me gusta es que una vez configurado, trabaja solo. Ingresos 100% pasivos.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Lucia Morales",
      role: "Consultora IA",
      content: "En mi primer mes recuperé la inversión. Ahora genero más de $5,000 mensuales sin esfuerzo.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Andrés Castillo",
      role: "Desarrollador NoCode",
      content: "La curva de aprendizaje es súper rápida. En una semana ya tenía mi primer cliente pagando.",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Valentina Silva",
      role: "Especialista en Automatización",
      content: "Nunca pensé que sería tan fácil monetizar la IA. Mis clientes están encantados con los resultados.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Fernando Torres",
      role: "Emprendedor Tech",
      content: "El ROI es impresionante. Con 30 clientes ya supero los $6,000 mensuales en piloto automático.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Gabriela Vega",
      role: "Consultora Digital",
      content: "Mi negocio cambió completamente. Ahora ofrezco servicios de alto valor sin conocimientos técnicos.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Javier Mendoza",
      role: "Agencia de Publicidad",
      content: "Agregamos esto a nuestros servicios y incrementamos facturación en 300%. Clientes súper satisfechos.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Camila Rodriguez",
      role: "Freelancer IA",
      content: "La demanda es altísima. Tengo lista de espera de clientes que quieren agentes de IA.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
    }
  ];

  // Auto-rotate testimonials every 5 seconds
  useInterval(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, 5000);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Logo Header */}
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <img 
              src="/lovable-uploads/c2890f6b-3389-4bdd-bda7-91fb9287a818.png" 
              alt="Novativa - Agencia IA & Automatización que Acelera tu Negocio" 
              className="mx-auto h-16 md:h-20 w-auto"
            />
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center pt-5 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content Column */}
              <div className="space-y-8 order-2 lg:order-1">
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-novativa-teal via-blue-500 to-novativa-orange bg-clip-text text-transparent leading-tight">
                    Crea o Vende Agentes IA y Automatiza tu Negocio
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
                    Crea tu Agente de IA para WhatsApp, Redes Sociales y teléfono <span className="text-novativa-teal font-semibold">Sin Programación</span>
                  </p>
                  
                  {/* Promotion Countdown */}
                  <PromotionCountdown />
                  
                  {/* Mobile Order: Video and Form visible only on mobile */}
                  <div className="lg:hidden space-y-6">
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
                      <div className="relative w-full bg-gradient-to-br from-novativa-teal/5 to-novativa-orange/5 rounded-lg border border-gray-700 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        <video 
                          autoPlay 
                          loop 
                          muted={false}
                          playsInline 
                          controls
                          preload="auto"
                          className="absolute inset-0 w-full h-full rounded-lg object-cover"
                          onError={(e) => {
                            console.error('Error loading video:', e);
                          }}
                        >
                          <source src="https://gktrnjjbhqxkbcvonzxv.supabase.co/storage/v1/object/public/user-uploads/uploads/1749503799696.mp4" type="video/mp4" />
                          Tu navegador no soporta el elemento video.
                        </video>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <ContactForm />
                  </div>

                  <p className="text-base md:text-lg text-gray-400">
                    <span className="text-novativa-orange font-bold">Genera hasta $10,000 mensuales de forma pasiva</span> creando y vendiendo agentes de IA a empresas. Con solo 50 clientes, estarías superando los $10,000 al mes. Todo automatizado, sin necesidad de que estés presente.
                  </p>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800 animate-pulse-subtle">
                    <div className="text-3xl font-bold text-novativa-teal mb-1">$10K</div>
                    <div className="text-sm text-gray-300">Ingresos mensuales</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800 animate-pulse-subtle animation-delay-300">
                    <div className="text-3xl font-bold text-novativa-orange mb-1">100%</div>
                    <div className="text-sm text-gray-300">Pasivo</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800 animate-pulse-subtle animation-delay-600">
                    <div className="text-3xl font-bold text-novativa-teal mb-1">24/7</div>
                    <div className="text-sm text-gray-300">Automatizado</div>
                  </div>
                </div>

                {/* Price - Updated to show urgency */}
                <div className="bg-gradient-to-r from-novativa-teal/20 to-novativa-orange/20 rounded-lg p-6 border border-novativa-teal/30 animate-subtle-shake">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">$4.99 USD</div>
                    <div className="text-lg text-gray-300">Inversión única - Acceso completo</div>
                    <div className="text-sm text-red-400 mt-2 font-bold animate-pulse">
                      ⚡ PRECIO PROMOCIONAL - Tiempo limitado
                    </div>
                    <div className="text-sm text-novativa-orange mt-1">ROI potencial: +200,000%</div>
                  </div>
                </div>
              </div>

              {/* Video and Form Column - Desktop Only */}
              <div className="space-y-6 order-1 lg:order-2 hidden lg:block">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
                  <div className="relative w-full bg-gradient-to-br from-novativa-teal/5 to-novativa-orange/5 rounded-lg border border-gray-700 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <video 
                      autoPlay 
                      loop 
                      muted={false}
                      playsInline 
                      controls
                      preload="auto"
                      className="absolute inset-0 w-full h-full rounded-lg object-cover"
                      onError={(e) => {
                        console.error('Error loading video:', e);
                      }}
                    >
                      <source src="https://gktrnjjbhqxkbcvonzxv.supabase.co/storage/v1/object/public/user-uploads/uploads/1749503799696.mp4" type="video/mp4" />
                      Tu navegador no soporta el elemento video.
                    </video>
                  </div>
                </div>

                {/* Contact Form */}
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Income Potential Table */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
              💰 Potencial de Ingresos Pasivos
            </h2>
            
            <div className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-novativa-teal to-novativa-orange">
                    <tr>
                      <th className="px-3 md:px-6 py-4 text-left text-white font-bold text-sm md:text-base">Clientes</th>
                      <th className="px-3 md:px-6 py-4 text-left text-white font-bold text-sm md:text-base">Precio por Cliente</th>
                      <th className="px-3 md:px-6 py-4 text-left text-white font-bold text-sm md:text-base">Ingresos Mensuales</th>
                      <th className="px-3 md:px-6 py-4 text-left text-white font-bold text-sm md:text-base">Ingresos Anuales</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                      <td className="px-3 md:px-6 py-4 text-xl md:text-2xl font-bold text-novativa-teal">10</td>
                      <td className="px-3 md:px-6 py-4 text-gray-300 text-sm md:text-base">$150</td>
                      <td className="px-3 md:px-6 py-4 text-lg md:text-xl font-bold text-green-400">$1,500</td>
                      <td className="px-3 md:px-6 py-4 text-gray-300 text-sm md:text-base">$18,000</td>
                    </tr>
                    <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                      <td className="px-3 md:px-6 py-4 text-xl md:text-2xl font-bold text-novativa-teal">20</td>
                      <td className="px-3 md:px-6 py-4 text-gray-300 text-sm md:text-base">$150</td>
                      <td className="px-3 md:px-6 py-4 text-lg md:text-xl font-bold text-green-400">$3,000</td>
                      <td className="px-3 md:px-6 py-4 text-gray-300 text-sm md:text-base">$36,000</td>
                    </tr>
                    <tr className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors bg-gradient-to-r from-novativa-teal/10 to-novativa-orange/10">
                      <td className="px-3 md:px-6 py-4 text-2xl md:text-3xl font-bold text-novativa-orange">50</td>
                      <td className="px-3 md:px-6 py-4 text-gray-300 text-sm md:text-base">$200</td>
                      <td className="px-3 md:px-6 py-4 text-xl md:text-2xl font-bold text-novativa-orange animate-pulse">$10,000+</td>
                      <td className="px-3 md:px-6 py-4 text-lg md:text-xl font-bold text-novativa-orange">$120,000+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 md:p-6 bg-gray-800/50 text-center">
                <p className="text-gray-300 mb-2 text-sm md:text-base">
                  <Clock className="inline w-5 h-5 mr-2 text-novativa-teal" />
                  Todo automatizado - Sin presencia requerida
                </p>
                <p className="text-novativa-orange font-bold text-sm md:text-base">
                  Lo creas una vez y generas ingresos de por vida
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Carousel */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
              🌟 Lo que dicen nuestros estudiantes
            </h2>
            
            {/* Mobile: Single testimonial with auto-rotation */}
            <div className="md:hidden">
              <div className="w-full max-w-sm mx-auto">
                <div className="aspect-square bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-teal/50 transition-colors">
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 text-center flex-1 flex items-center justify-center text-sm">
                      "{testimonials[currentTestimonial].content}"
                    </p>
                    <div className="flex items-center justify-center">
                      <img 
                        src={testimonials[currentTestimonial].image} 
                        alt={testimonials[currentTestimonial].name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div className="text-center">
                        <h4 className="font-bold text-white text-sm">{testimonials[currentTestimonial].name}</h4>
                        <p className="text-xs text-gray-400">{testimonials[currentTestimonial].role}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Pagination dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-novativa-teal' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop: Scrolling carousel (keep existing) */}
            <div className="hidden md:block relative overflow-hidden">
              <div className="testimonials-slider flex gap-6 animate-scroll-testimonials">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div key={index} className="min-w-[300px] md:min-w-[350px] bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-teal/50 transition-colors flex-shrink-0">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
              🚀 ¿Qué aprenderás?
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
              Domina las habilidades que te permitirán crear un negocio de $10K+ mensuales
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-teal/50 transition-colors group">
                <Bot className="w-12 h-12 text-novativa-teal mb-4 group-hover:animate-bounce" />
                <h3 className="text-xl font-bold mb-3">Crear un chatbot de IA avanzado</h3>
                <p className="text-gray-400">Crear un chatbot de IA avanzado para WhatsApp y redes sociales utilizando plataformas intuitivas (sin código).</p>
                <div className="mt-4 text-sm text-novativa-orange font-semibold">
                  💰 Valor por cliente: $150-300/mes
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-orange/50 transition-colors group">
                <MessageSquare className="w-12 h-12 text-novativa-orange mb-4 group-hover:animate-bounce" />
                <h3 className="text-xl font-bold mb-3">Configurar respuestas automáticas</h3>
                <p className="text-gray-400">Configurar respuestas automáticas y personalizadas que entiendan consultas y resuelvan dudas de clientes.</p>
                <div className="mt-4 text-sm text-novativa-orange font-semibold">
                  💰 Ahorro empresarial: $2,000+/mes
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-teal/50 transition-colors group">
                <Zap className="w-12 h-12 text-novativa-teal mb-4 group-hover:animate-bounce" />
                <h3 className="text-xl font-bold mb-3">Integrar tu agente de IA</h3>
                <p className="text-gray-400">Integrar tu agente de IA con WhatsApp Business, Meta (Facebook/Instagram) y más, para gestionar mensajes y captar leads.</p>
                <div className="mt-4 text-sm text-novativa-orange font-semibold">
                  💰 ROI cliente: 300%+
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-teal/50 transition-colors group">
                <CheckCircle className="w-12 h-12 text-novativa-orange mb-4 group-hover:animate-bounce" />
                <h3 className="text-xl font-bold mb-3">Optimizar interacciones con IA</h3>
                <p className="text-gray-400">Optimizar interacciones con IA para reconocer intenciones de compra, preguntas frecuentes y derivar conversaciones clave.</p>
                <div className="mt-4 text-sm text-novativa-orange font-semibold">
                  💰 Conversiones: +70%
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-teal/50 transition-colors group">
                <Users className="w-12 h-12 text-novativa-teal mb-4 group-hover:animate-bounce" />
                <h3 className="text-xl font-bold mb-3">Implementar soluciones profesionales</h3>
                <p className="text-gray-400">Implementar soluciones profesionales para agencias, freelancers o consultores que gestionan múltiples clientes.</p>
                <div className="mt-4 text-sm text-novativa-orange font-semibold">
                  💰 Escalabilidad: Ilimitada
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-orange/50 transition-colors group">
                <DollarSign className="w-12 h-12 text-novativa-orange mb-4 group-hover:animate-bounce" />
                <h3 className="text-xl font-bold mb-3">Monetizar tu conocimiento</h3>
                <p className="text-gray-400">Aprende a vender y monetizar agentes de IA, crear paquetes de servicios y generar ingresos recurrentes.</p>
                <div className="mt-4 text-sm text-novativa-orange font-semibold">
                  💰 Ingresos pasivos garantizados
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
              🚀 ¡Comienza tu imperio de IA hoy!
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Únete a los emprendedores que ya están generando $10,000+ mensuales con agentes de IA.
            </p>
            <div className="space-y-4 mb-8">
              <p className="text-base md:text-lg text-novativa-orange font-bold animate-pulse">
                ⏰ Oferta limitada: Solo $4.99 (Precio regular: $497)
              </p>
              <p className="text-sm md:text-base text-gray-400">
                Más de 1,000 estudiantes ya están construyendo sus imperios digitales
              </p>
            </div>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white text-lg md:text-xl px-8 md:px-12 py-4 md:py-6 animate-bounce-slow"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <TrendingUp className="mr-3 h-5 w-5 md:h-6 md:w-6" />
              Acceder Ahora y Comenzar a Ganar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentsAICourse;

</edits_to_apply>
