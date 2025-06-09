
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Bot, MessageSquare, Users, Zap, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ContactForm from '@/components/agents-ai-course/ContactForm';

const AgentsAICourse = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center pt-10 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content Column */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-novativa-teal via-blue-500 to-novativa-orange bg-clip-text text-transparent leading-tight">
                    Crea o Vende Agentes IA y Automatiza tu Negocio
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                    Crea tu Agente de IA para WhatsApp, Redes Sociales y teléfono <span className="text-novativa-teal font-semibold">Sin Programación</span>
                  </p>
                  <p className="text-lg text-gray-400">
                    ¿Quieres automatizar la atención al cliente, generar leads y aumentar ventas en WhatsApp, Instagram, Facebook y otras redes sociales con Inteligencia Artificial? Este curso te enseña, sin necesidad de programar, cómo desarrollar un asistente virtual inteligente que trabaje las 24 horas para tu negocio o el de tus clientes.
                  </p>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                    <div className="text-3xl font-bold text-novativa-teal mb-1">24/7</div>
                    <div className="text-sm text-gray-300">Atención continua</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                    <div className="text-3xl font-bold text-novativa-orange mb-1">70%</div>
                    <div className="text-sm text-gray-300">Reducción de carga</div>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                    <div className="text-3xl font-bold text-novativa-teal mb-1">3X</div>
                    <div className="text-sm text-gray-300">Más conversiones</div>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-r from-novativa-teal/20 to-novativa-orange/20 rounded-lg p-6 border border-novativa-teal/30">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">$4.99 USD</div>
                    <div className="text-lg text-gray-300">Inversión única - Acceso completo</div>
                  </div>
                </div>
              </div>

              {/* Video Column */}
              <div className="space-y-6">
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

      {/* What You'll Learn Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
              ¿Qué aprenderás?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-teal/50 transition-colors">
                <Bot className="w-12 h-12 text-novativa-teal mb-4" />
                <h3 className="text-xl font-bold mb-3">Crear un chatbot de IA avanzado</h3>
                <p className="text-gray-400">Crear un chatbot de IA avanzado para WhatsApp y redes sociales utilizando plataformas intuitivas (sin código).</p>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-orange/50 transition-colors">
                <MessageSquare className="w-12 h-12 text-novativa-orange mb-4" />
                <h3 className="text-xl font-bold mb-3">Configurar respuestas automáticas</h3>
                <p className="text-gray-400">Configurar respuestas automáticas y personalizadas que entiendan consultas y resuelvan dudas de clientes.</p>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-teal/50 transition-colors">
                <Zap className="w-12 h-12 text-novativa-teal mb-4" />
                <h3 className="text-xl font-bold mb-3">Integrar tu agente de IA</h3>
                <p className="text-gray-400">Integrar tu agente de IA con WhatsApp Business, Meta (Facebook/Instagram) y más, para gestionar mensajes y captar leads.</p>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-orange/50 transition-colors">
                <CheckCircle className="w-12 h-12 text-novativa-orange mb-4" />
                <h3 className="text-xl font-bold mb-3">Optimizar interacciones con IA</h3>
                <p className="text-gray-400">Optimizar interacciones con IA para reconocer intenciones de compra, preguntas frecuentes y derivar conversaciones clave.</p>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-teal/50 transition-colors">
                <Users className="w-12 h-12 text-novativa-teal mb-4" />
                <h3 className="text-xl font-bold mb-3">Implementar soluciones profesionales</h3>
                <p className="text-gray-400">Implementar soluciones profesionales para agencias, freelancers o consultores que gestionan múltiples clientes.</p>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-novativa-orange/50 transition-colors">
                <Calendar className="w-12 h-12 text-novativa-orange mb-4" />
                <h3 className="text-xl font-bold mb-3">Sin programación</h3>
                <p className="text-gray-400">Plataformas accesibles y configuración paso a paso con enfoque práctico y ejemplos reales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
              ¡Transforma mensajes en oportunidades con IA!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Inscríbete y domina las herramientas que están revolucionando la comunicación empresarial.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 text-white text-xl px-12 py-6 animate-pulse"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Bot className="mr-3 h-6 w-6" />
              Completa el Formulario
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentsAICourse;
