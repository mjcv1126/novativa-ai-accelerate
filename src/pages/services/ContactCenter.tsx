import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, Phone, MessageSquare, BarChart, Shield, Clock, HeadphonesIcon, MailOpen } from 'lucide-react';

const ContactCenter = () => {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-r from-[#1A1F2C] to-[#2C3E50] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white bg-clip-text">
              Contact Center Humano
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in">
              La perfecta combinación de atención humana personalizada con la eficiencia de la IA
            </p>
          </div>
          <div className="flex justify-center">
            <Button asChild size="lg" className="bg-white text-[#1A1F2C] hover:bg-gray-100 animate-fade-in">
              <Link to="/contacto">Solicitar Información</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#1A1F2C] to-[#2C3E50] bg-clip-text text-transparent">
              Servicio al Cliente de Calidad Superior
            </h2>
            <p className="text-lg text-gray-600">
              Combinamos la calidez del trato humano con la eficiencia de la tecnología para ofrecer una experiencia de atención al cliente excepcional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#1A1F2C]/10 rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-[#1A1F2C]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Atención Telefónica</h3>
              <p className="text-gray-600">
                Agentes capacitados para manejar llamadas de servicio al cliente, ventas y soporte técnico.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#1A1F2C]/10 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="text-[#1A1F2C]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat en Vivo</h3>
              <p className="text-gray-600">
                Soporte en tiempo real a través de chat con agentes expertos en servicio al cliente.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#1A1F2C]/10 rounded-lg flex items-center justify-center mb-4">
                <HeadphonesIcon className="text-[#1A1F2C]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soporte 24/7</h3>
              <p className="text-gray-600">
                Atención continua los 365 días del año con personal altamente capacitado.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#1A1F2C]/10 rounded-lg flex items-center justify-center mb-4">
                <MailOpen className="text-[#1A1F2C]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600">
                Gestión profesional de correos electrónicos con tiempos de respuesta garantizados.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Servicios Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Servicio al Cliente</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Atención de consultas y reclamos</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Seguimiento de casos</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Soporte post-venta</p>
                </li>
              </ul>

              <h3 className="text-xl font-semibold pt-4">Telemarketing</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Campañas de ventas salientes</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Generación de leads</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Encuestas de satisfacción</p>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Gestión de Cobros</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Recordatorio de pagos</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Negociación de pagos</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Seguimiento de acuerdos</p>
                </li>
              </ul>

              <h3 className="text-xl font-semibold pt-4">Investigación de Mercado</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Estudios de mercado</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Análisis de competencia</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-[#1A1F2C] rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600">Feedback de clientes</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Beneficios de Nuestro Contact Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1A1F2C]/10 rounded-full flex items-center justify-center">
                <Shield className="text-[#1A1F2C]" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reducción de Costos</h3>
              <p className="text-gray-600">
                Elimina gastos de infraestructura y reduce el pasivo laboral al tercerizar tu servicio al cliente.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1A1F2C]/10 rounded-full flex items-center justify-center">
                <BarChart className="text-[#1A1F2C]" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Métricas en Tiempo Real</h3>
              <p className="text-gray-600">
                Monitoreo constante del desempeño y satisfacción del cliente con reportes detallados.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1A1F2C]/10 rounded-full flex items-center justify-center">
                <Clock className="text-[#1A1F2C]" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Disponibilidad 24/7</h3>
              <p className="text-gray-600">
                Atención continua adaptada a tus necesidades y zona horaria.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#1A1F2C] to-[#2C3E50] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl font-bold mb-6 text-white">¿Listo para mejorar tu servicio al cliente?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Contáctanos hoy mismo para una consulta personalizada y descubre cómo podemos ayudarte.
          </p>
          <Button asChild size="lg" className="bg-white text-[#1A1F2C] hover:bg-gray-100">
            <Link to="/contacto">Solicitar Información</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ContactCenter;
