
import { Badge } from "@/components/ui/badge";

export const FavoriteBadge = () => {
  return (
    <Badge 
      className="bg-novativa-orange text-white px-3 py-1 rounded-full text-xs font-semibold 
        shadow-md hover:bg-novativa-orange/90 transition-all"
    >
      Favorito
    </Badge>
  );
};

