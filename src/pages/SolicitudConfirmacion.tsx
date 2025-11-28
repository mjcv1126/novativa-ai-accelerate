import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Home, FileText } from 'lucide-react';

const SolicitudConfirmacion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    ticketNumber: string;
    applicantName: string;
    requestType: string;
    company: string;
  } | null;

  // Redirect if no state data
  React.useEffect(() => {
    if (!state?.ticketNumber) {
      navigate('/solicitud');
    }
  }, [state, navigate]);

  if (!state) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center py-12 px-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold">
            ¡Tu ticket ha sido enviado!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Número de Ticket</p>
                <p className="text-2xl font-bold text-primary">{state.ticketNumber}</p>
              </div>
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Solicitante</p>
                <p className="font-medium">{state.applicantName}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Empresa</p>
                <p className="font-medium">{state.company}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Solicitud</p>
                <p className="font-medium capitalize">{state.requestType}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2">¿Qué sigue?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Hemos recibido tu solicitud y ya está siendo revisada por nuestro equipo</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Recibirás un correo electrónico de confirmación con los detalles de tu ticket</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Nos pondremos en contacto contigo pronto para coordinar los siguientes pasos</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1"
            >
              <Home className="h-4 w-4 mr-2" />
              Ir al Inicio
            </Button>
            <Button
              onClick={() => navigate('/solicitud')}
              className="flex-1"
            >
              <FileText className="h-4 w-4 mr-2" />
              Nueva Solicitud
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground pt-4">
            Si tienes alguna pregunta, no dudes en contactarnos en{' '}
            <a href="mailto:soporte@novativa.org" className="text-primary hover:underline">
              soporte@novativa.org
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolicitudConfirmacion;
