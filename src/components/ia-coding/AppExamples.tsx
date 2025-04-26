
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Maximize } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const appExamples = [
  {
    title: "EduConnect Pro",
    description: "Sistema completo de gestión escolar con calificaciones en tiempo real, comunicación padres-maestros y seguimiento de asistencia",
    image: "https://img.freepik.com/free-psd/flat-design-education-instagram-stories-template_23-2149375967.jpg",
    features: ["Gestión de calificaciones", "Chat en tiempo real", "Control de asistencia", "Portal para padres"]
  },
  {
    title: "NovaPOS",
    description: "Sistema de punto de venta e inventario con inteligencia artificial para pronósticos y optimización de stock",
    image: "https://cdn.dribbble.com/userupload/35514295/file/original-1d78eb1ed10897ca10e1e82b9a5e402e.png?resize=752x&vertical=center",
    features: ["Control de inventario", "Punto de venta", "Reportes financieros", "Pronósticos IA"]
  },
  {
    title: "SmartStore AI",
    description: "Plataforma de ecommerce con asistentes IA que mejoran la experiencia de compra y aumentan las ventas",
    image: "https://unblast.com/wp-content/uploads/2020/05/E-commerce-App-Redesign-Template-2.jpg",
    features: ["Agentes IA de ventas", "Recomendaciones personalizadas", "Análisis predictivo", "Chat en vivo"]
  },
  {
    title: "DeliverPro",
    description: "Sistema de delivery con tracking en tiempo real, gestión de pedidos y notificaciones automáticas",
    image: "https://unblast.com/wp-content/uploads/2020/05/Food-Delivery-App-Template.jpg",
    features: ["GPS en tiempo real", "Gestión de pedidos", "Panel de control", "Analytics avanzado"]
  },
  {
    title: "TourBooking",
    description: "Plataforma de reservas turísticas con calendario dinámico y pagos integrados",
    image: "https://s3-alpha.figma.com/hub/file/2194155352527571946/21b07483-cb22-4750-87f9-1ef6608ab0ee-cover.png",
    features: ["Reservas online", "Pagos seguros", "Sistema de reseñas", "Panel admin"]
  },
  {
    title: "MediCare Hub",
    description: "Sistema de gestión de pacientes para clínicas y consultorios médicos",
    image: "https://img.freepik.com/free-vector/medical-booking-app-concept_23-2148562986.jpg",
    features: ["Historial médico", "Citas online", "Recetas digitales", "Telemedicina"]
  }
];

const AppExamples = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                <div 
                  className="h-48 mb-6 overflow-hidden rounded-lg relative cursor-pointer"
                  onClick={() => setSelectedImage(app.image)}
                >
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

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl h-auto p-0 border-none bg-transparent">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="App Preview"
              className="w-full h-auto rounded-lg object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AppExamples;
