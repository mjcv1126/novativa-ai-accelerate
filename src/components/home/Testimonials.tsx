
import React from 'react';

const TestimonialCard = ({ rating, text, image, name, position }) => (
  <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
    <div className="flex items-center mb-4">
      {[...Array(rating)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-novativa-orange" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
    </div>
    <p className="text-gray-600 mb-4">{text}</p>
    <div className="flex items-center">
      <div className="mr-4 w-12 h-12 overflow-hidden rounded-full">
        <img 
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-gray-500">{position}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      rating: 5,
      text: "\"Implementamos el chatbot de Novativa y nos ayudó a aumentar las conversiones en un 35%. La IA responde preguntas de forma precisa y natural.\"",
      image: "/lovable-uploads/55c23136-5363-4c7b-ac4c-01885275003c.png",
      name: "Ricardo Morales",
      position: "Director de Marketing, TechSoluciones"
    },
    {
      rating: 5,
      text: "\"La automatización de procesos de Novativa redujo nuestros tiempos operativos en un 60%. Su equipo fue muy profesional durante todo el proceso.\"",
      image: "/lovable-uploads/02884ca4-d39e-4795-ba4f-4b86ae9f8861.png",
      name: "Laura González",
      position: "COO, Distribuidora Nacional"
    },
    {
      rating: 5,
      text: "\"El sistema de generación de contenido nos permite crear artículos de calidad en minutos. Ha transformado nuestra estrategia de marketing digital.\"",
      image: "/lovable-uploads/de2f2e10-b891-4730-8f92-9a0b82f33dc8.png",
      name: "Carlos Jiménez",
      position: "Director de Contenido, MediaGlobal"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Empresas que ya confían en nuestras soluciones de inteligencia artificial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
