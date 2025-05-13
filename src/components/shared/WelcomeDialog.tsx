
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const WelcomeDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  
  useEffect(() => {
    // Show dialog only on first visit
    const hasVisited = localStorage.getItem('hasVisitedNovativa');
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem('hasVisitedNovativa', 'true');
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {language === 'es' 
              ? '¡Bienvenido a Novativa!' 
              : 'Welcome to Novativa!'}
          </DialogTitle>
          <DialogDescription>
            {language === 'es' 
              ? 'Somos una agencia especializada en Inteligencia Artificial y automatización para negocios.' 
              : 'We are an agency specialized in Artificial Intelligence and business automation.'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-gray-500">
            {language === 'es' 
              ? 'Explora nuestros servicios y descubre cómo podemos ayudarte a potenciar tu negocio con la última tecnología en IA.' 
              : 'Explore our services and discover how we can help you enhance your business with the latest AI technology.'}
          </p>
          <Button onClick={() => setIsOpen(false)} className="w-full">
            {language === 'es' ? 'Comenzar' : 'Get Started'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
