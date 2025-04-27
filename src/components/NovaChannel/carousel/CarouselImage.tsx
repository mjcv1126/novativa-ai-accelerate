
import { CarouselItem } from "@/components/ui/carousel";

interface CarouselImageProps {
  src: string;
  index: number;
  onImageClick: (src: string) => void;
}

export const CarouselImage = ({ src, index, onImageClick }: CarouselImageProps) => {
  return (
    <CarouselItem key={index}>
      <div 
        className="overflow-hidden rounded-xl shadow-xl cursor-pointer"
        onClick={() => onImageClick(src)}
      >
        <img
          src={src}
          alt={`NovaChannel Screenshot ${index + 1}`}
          className="w-full h-auto object-cover"
        />
      </div>
    </CarouselItem>
  );
};
