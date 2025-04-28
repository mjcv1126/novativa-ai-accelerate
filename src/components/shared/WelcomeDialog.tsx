
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WelcomeDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenDialog = localStorage.getItem('hasSeenWelcomeDialog');
    if (!hasSeenDialog) {
      setOpen(true);
      localStorage.setItem('hasSeenWelcomeDialog', 'true');
    }
  }, []);

  const handleScheduleDemo = () => {
    window.open('https://tidycal.com/novativa/demo-gratis', '_blank');
    setOpen(false);
    toast({
      title: "¡Excelente decisión!",
      description: "Te ayudaremos a potenciar tu negocio con IA.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
            ¡Bienvenido a Novativa! 🚀
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-lg">
            Descubre cómo la Inteligencia Artificial puede transformar tu negocio.
          </p>
          <div className="p-4 bg-gradient-to-r from-novativa-teal/10 to-novativa-orange/10 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Video className="h-5 w-5 text-novativa-teal" />
              Demo Personalizada Gratis
            </h3>
            <p className="text-sm text-gray-600">
              Agenda una videollamada de 30 minutos y te mostraremos cómo aumentar tus ventas con IA.
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleScheduleDemo}
              className="bg-novativa-teal hover:bg-novativa-darkTeal text-white"
              size="lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Demo Gratis
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
