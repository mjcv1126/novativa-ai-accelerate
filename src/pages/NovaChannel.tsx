import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bot, MessageSquare, Users, Clock, BrainCircuit } from 'lucide-react';
import ScreenshotCarousel from '@/components/NovaChannel/ScreenshotCarousel';
import LouisebotWidget from '@/components/shared/LouisebotWidget';

const NovaChannel = () => {
  return (
    <>
      <LouisebotWidget />
      <section className="pt-32 pb-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              NovaChannel
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Plataforma integral de comunicación multicanal potenciada por IA para optimizar la interacción con tus clientes
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-novativa-teal">
                Todo en una sola plataforma
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-novativa-orange/10 p-3 rounded-lg">
                    <Bot className="text-novativa-orange h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Chatbots Inteligentes</h3>
                    <p className="text-gray-600">
                      Automatiza las conversaciones con tus clientes usando IA avanzada que entiende el contexto y proporciona respuestas precisas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-novativa-teal/10 p-3 rounded-lg">
                    <MessageSquare className="text-novativa-teal h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Omnicanalidad</h3>
                    <p className="text-gray-600">
                      Gestiona todas tus conversaciones desde una única plataforma: WhatsApp, Facebook, Instagram, correo electrónico y más.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-novativa-orange/10 p-3 rounded-lg">
                    <BrainCircuit className="text-novativa-orange h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Automatización Inteligente</h3>
                    <p className="text-gray-600">
                      Crea flujos de trabajo personalizados que se adaptan a tus necesidades y optimizan la experiencia del cliente.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="bg-novativa-orange hover:bg-novativa-lightOrange"
                >
                  <a href="https://tidycal.com/novativa" target="_blank" rel="noopener noreferrer">
                    Agenda una demostración
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <ScreenshotCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">¿Por qué elegir NovaChannel?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <Users className="h-8 w-8 text-novativa-teal mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Gestión Centralizada</h3>
                <p className="text-gray-600">
                  Administra todos tus canales de comunicación desde un solo lugar, mejorando la eficiencia de tu equipo.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm">
                <Clock className="h-8 w-8 text-novativa-orange mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Atención 24/7</h3>
                <p className="text-gray-600">
                  Ofrece soporte ininterrumpido gracias a nuestros chatbots inteligentes que nunca duermen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-novativa-teal to-novativa-darkTeal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Comienza con NovaChannel hoy mismo</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Descubre cómo NovaChannel puede transformar la comunicación con tus clientes
          </p>
          <Button
            asChild
            size="lg"
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white"
          >
            <Link to="/agenda">
              Agenda una demostración gratuita
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default NovaChannel;
