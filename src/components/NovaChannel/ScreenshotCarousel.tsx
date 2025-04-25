
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useInterval } from "@/hooks/useInterval";

const screenshots = [
  "/lovable-uploads/0badf3e6-586c-4660-86d6-0e50a6ffb597.png",
  "/lovable-uploads/bb515735-f62d-4e6a-9820-1802c67cab23.png",
  "/lovable-uploads/a3722601-7c29-4740-8c43-cef8f215270b.png",
  "/lovable-uploads/a0c26d06-b57f-45ed-aa8d-9f9dd707c35b.png",
  "/lovable-uploads/273936d8-3c22-47ef-901d-331672932695.png"
];

const ScreenshotCarousel = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [api, setApi] = useState<any>();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use our custom interval hook to advance the slides
  useInterval(() => {
    if (api && api.scrollNext) {
      api.scrollNext();
    }
  }, 3000);

  // Update index when the API changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setCurrentIndex(selectedIndex);
    };

    // Add event listeners
    api.on('select', onSelect);

    // Cleanup
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <>
      <Carousel className="relative w-full" setApi={setApi}>
        <CarouselContent>
          {screenshots.map((src, index) => (
            <CarouselItem key={index}>
              <div 
                className="overflow-hidden rounded-xl shadow-xl cursor-pointer"
                onClick={() => setSelectedImage(src)}
              >
                <img
                  src={src}
                  alt={`NovaChannel Screenshot ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2" />
        <CarouselNext className="absolute right-4 top-1/2" />
      </Carousel>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogTitle className="sr-only">Imagen ampliada</DialogTitle>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Imagen ampliada"
              className="w-full h-auto"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ScreenshotCarousel;
