import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&h=150",
      name: "Dr. María González",
      specialty: "Cardióloga",
      quote: "Ahora mis pacientes no faltan a los controles y yo no pierdo tiempo confirmando citas.",
      result: "+40% retención"
    },
    {
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=150&h=150",
      name: "Dr. Carlos Rodríguez",
      specialty: "Gastroenterólogo",
      quote: "La IA filtra perfectamente las consultas urgentes. Mis pacientes se sienten mejor atendidos las 24 horas.",
      result: "24/7 disponible"
    },
    {
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&h=150",
      name: "Dra. Ana Martínez",
      specialty: "Pediatra",
      quote: "NovaMedic transformó completamente mi consulta. Los padres están más tranquilos y yo más organizada.",
      result: "+60% satisfacción"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-novativa-teal/5 to-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block p-3 sm:p-4 bg-novativa-orange/10 rounded-full mb-6 border border-novativa-orange/20">
            <Star className="w-8 h-8 sm:w-12 sm:h-12 text-novativa-orange animate-pulse-custom" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 px-2">
            Resultados que Hablan por Sí Solos
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-2">
            Profesionales que ya transformaron su práctica con NovaMedic
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 sm:p-8 bg-white border-2 border-gray-100 hover:border-novativa-teal/30 transition-all duration-300 shadow-lg hover:shadow-xl">
              <CardContent className="p-0 text-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 sm:mb-6 border-4 border-novativa-teal/20" />
                <blockquote className="text-base sm:text-lg italic text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="mb-4">
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-novativa-teal text-sm sm:text-base">{testimonial.specialty}</div>
                </div>
                <div className="bg-novativa-orange/10 px-3 sm:px-4 py-2 rounded-full text-novativa-orange font-semibold border border-novativa-orange/20 text-sm sm:text-base">
                  {testimonial.result}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
