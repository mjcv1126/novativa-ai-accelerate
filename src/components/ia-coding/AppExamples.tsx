
import React from 'react';
import { Button } from '@/components/ui/button';
import { Maximize } from 'lucide-react';

const appExamples = [
  {
    title: "EduConnect Pro",
    description: "Sistema completo de gestión escolar con calificaciones en tiempo real, comunicación padres-maestros y seguimiento de asistencia",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000",
    features: ["Gestión de calificaciones", "Chat en tiempo real", "Control de asistencia", "Portal para padres"]
  },
  {
    title: "NovaPOS",
    description: "Sistema de punto de venta e inventario con inteligencia artificial para pronósticos y optimización de stock",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000",
    features: ["Control de inventario", "Punto de venta", "Reportes financieros", "Pronósticos IA"]
  },
  {
    title: "SmartStore AI",
    description: "Plataforma de ecommerce con asistentes IA que mejoran la experiencia de compra y aumentan las ventas",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000",
    features: ["Agentes IA de ventas", "Recomendaciones personalizadas", "Análisis predictivo", "Chat en vivo"]
  },
  {
    title: "DeliverPro",
    description: "Sistema de delivery con tracking en tiempo real, gestión de pedidos y notificaciones automáticas",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000",
    features: ["GPS en tiempo real", "Gestión de pedidos", "Panel de control", "Analytics avanzado"]
  },
  {
    title: "TourBooking",
    description: "Plataforma de reservas turísticas con calendario dinámico y pagos integrados",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1000",
    features: ["Reservas online", "Pagos seguros", "Sistema de reseñas", "Panel admin"]
  },
  {
    title: "MediCare Hub",
    description: "Sistema de gestión de pacientes para clínicas y consultorios médicos",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&q=80&w=1000",
    features: ["Historial médico", "Citas online", "Recetas digitales", "Telemedicina"]
  }
];

const AppExamples = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Apps Creadas con IA
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {appExamples.map((app, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-1 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-novativa-teal/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-novativa-teal/20 to-novativa-orange/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 h-full flex flex-col">
                <div className="h-48 mb-6 overflow-hidden rounded-lg relative">
                  <img 
                    src={app.image} 
                    alt={app.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-novativa-teal/80 p-2 rounded-full text-white">
                      <Maximize className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
                  {app.title}
                </h3>
                <p className="text-gray-300 mb-4 flex-grow">
                  {app.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {app.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center transform transition-transform duration-200 hover:translate-x-2 hover:text-novativa-teal"
                    >
                      <div className="w-2 h-2 rounded-full bg-novativa-teal mr-2"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-auto bg-gradient-to-r from-novativa-teal to-novativa-orange hover:opacity-90 transition-all duration-300 group"
                  onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Crear App Similar
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppExamples;

