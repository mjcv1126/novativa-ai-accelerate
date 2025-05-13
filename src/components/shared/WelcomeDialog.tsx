
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const WelcomeDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();

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
      title: language === 'es' ? "¡Excelente decisión!" : "Excellent decision!",
      description: language === 'es' ? "Te ayudaremos a potenciar tu negocio con IA." : "We'll help you boost your business with AI.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-novativa-teal to-novativa-orange bg-clip-text text-transparent">
            {language === 'es' ? '¡Bienvenido a Novativa! 🚀' : 'Welcome to Novativa! 🚀'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-lg">
            {language === 'es' 
              ? 'Descubre cómo la Inteligencia Artificial puede transformar tu negocio.'
              : 'Discover how Artificial Intelligence can transform your business.'
            }
          </p>
          <div className="p-4 bg-gradient-to-r from-novativa-teal/10 to-novativa-orange/10 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Video className="h-5 w-5 text-novativa-teal" />
              {language === 'es' ? 'Demo Personalizada Gratis' : 'Free Personalized Demo'}
            </h3>
            <p className="text-sm text-gray-600">
              {language === 'es'
                ? 'Agenda una videollamada de 30 minutos y te mostraremos cómo aumentar tus ventas con IA.'
                : 'Schedule a 30-minute video call and we\'ll show you how to increase your sales with AI.'
              }
            </p>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleScheduleDemo}
              className="bg-novativa-teal hover:bg-novativa-darkTeal text-white"
              size="lg"
            >
              <Calendar className="mr-2 h-5 w-5" />
              {language === 'es' ? 'Agendar Demo Gratis' : 'Schedule Free Demo'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
