
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const screenshots = [
  "/lovable-uploads/0badf3e6-586c-4660-86d6-0e50a6ffb597.png",
  "/lovable-uploads/bb515735-f62d-4e6a-9820-1802c67cab23.png",
  "/lovable-uploads/a3722601-7c29-4740-8c43-cef8f215270b.png",
  "/lovable-uploads/a0c26d06-b57f-45ed-aa8d-9f9dd707c35b.png",
  "/lovable-uploads/273936d8-3c22-47ef-901d-331672932695.png"
];

const ScreenshotCarousel = () => {
  return (
    <Carousel className="relative w-full">
      <CarouselContent>
        {screenshots.map((src, index) => (
          <CarouselItem key={index}>
            <div className="overflow-hidden rounded-xl shadow-xl">
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
  );
};

export default ScreenshotCarousel;
