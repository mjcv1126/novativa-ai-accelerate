
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useInterval } from "@/hooks/useInterval";
import { CarouselImage } from '@/components/NovaChannel/carousel/CarouselImage';
import { ImageDialog } from '@/components/NovaChannel/carousel/ImageDialog';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const novamedicScreenshots = [
  "/lovable-uploads/11ed757e-fba1-459c-b7c2-b00756c96542.png",
  "/lovable-uploads/18b3896e-5858-4c87-a886-2b269d2f5d6c.png",
  "/lovable-uploads/6b64699f-215e-4586-8974-56e18dec6e92.png",
  "/lovable-uploads/9fab3699-a4b5-4bb3-8439-fd59c0246387.png",
  "/lovable-uploads/e20110e6-a413-4002-a0e4-12830a3d3b40.png"
];

const screenDescriptions = [
  "Dashboard del Paciente - Vista completa de próximas citas, medicamentos y estado de salud",
  "Gestión de Pacientes - Administra la información completa de todos tus pacientes",
  "Gestión de Consultas - Organiza consultas médicas y formularios personalizados",
  "CRM Inteligente - Seguimiento automático del embudo de conversión de pacientes",
  "Expedientes Médicos - Registros médicos digitales completos y organizados"
];

const NovaMedicCarousel = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [api, setApi] = useState<any>();

  useInterval(() => {
    if (api && api.scrollNext) {
      api.scrollNext();
    }
  }, 4000);

  const handleCTAClick = () => {
    window.location.href = '/formulario';
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel 
        className="relative w-full" 
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {novamedicScreenshots.map((src, index) => (
            <CarouselImage
              key={index}
              src={src}
              index={index}
              onImageClick={setSelectedImage}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 bg-white/90 hover:bg-white border-novativa-teal/20" />
        <CarouselNext className="absolute right-4 top-1/2 bg-white/90 hover:bg-white border-novativa-teal/20" />
      </Carousel>

      {/* Descripción de la imagen actual */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm italic max-w-2xl mx-auto">
          {screenDescriptions[api?.selectedScrollSnap?.() || 0]}
        </p>
      </div>

      {/* CTA pequeño */}
      <div className="mt-8 text-center">
        <Button 
          onClick={handleCTAClick}
          className="bg-novativa-teal hover:bg-novativa-teal/90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Calendar className="w-4 h-4 mr-2" />
          Agenda tu Demo de NovaMedic
        </Button>
        <p className="text-gray-500 text-sm mt-2">
          Descubre cómo NovaMedic puede transformar tu práctica médica
        </p>
      </div>

      <ImageDialog 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};

export default NovaMedicCarousel;
