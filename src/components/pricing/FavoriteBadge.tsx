
import { Badge } from "@/components/ui/badge";
import { star } from "lucide-react";

export const FavoriteBadge = () => {
  return (
    <Badge 
      className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-novativa-orange 
        text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md 
        hover:bg-novativa-orange/90 transition-all z-10"
    >
      Favorito
    </Badge>
  );
};
