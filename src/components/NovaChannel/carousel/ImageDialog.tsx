
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageDialogProps {
  image: string | null;
  onClose: () => void;
}

export const ImageDialog = ({ image, onClose }: ImageDialogProps) => {
  return (
    <Dialog open={!!image} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogTitle className="sr-only">Imagen ampliada</DialogTitle>
        {image && (
          <img
            src={image}
            alt="Imagen ampliada"
            className="w-full h-auto"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
