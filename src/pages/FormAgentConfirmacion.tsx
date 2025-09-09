import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import NovativaLogo from '@/components/shared/NovativaLogo';

const FormAgentConfirmacion = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-2xl border-0 bg-card/95 backdrop-blur">
        <CardContent className="p-8 text-center">
          {/* Logo */}
          <div className="mb-8">
            <NovativaLogo />
          </div>

          {/* Success Icon */}
          <div className="inline-block mb-6 rounded-full p-6 bg-green-100 dark:bg-green-900/30">
            <Check className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold mb-4 text-foreground">
            ¡Muchas gracias por tu interés!
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Tu información ha sido enviada y en unos minutos uno de nuestros agentes virtuales estará contactándote para brindarte más información y explicarte el siguiente paso.
          </p>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Mientras tanto, puedes explorar nuestros servicios en{' '}
              <a href="/" className="text-primary hover:underline font-medium">
                novativa.ai
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormAgentConfirmacion;