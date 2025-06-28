
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Settings, RefreshCw } from 'lucide-react';
import { useTidyCal } from '@/hooks/crm/useTidyCal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const TidyCalSetupButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSetupLoading, setIsSetupLoading] = useState(false);
  const { setupCronJob } = useTidyCal();

  const handleSetupCron = async () => {
    setIsSetupLoading(true);
    try {
      await setupCronJob();
      setIsOpen(false);
    } finally {
      setIsSetupLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configurar Automático
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configurar Sincronización Automática</DialogTitle>
          <DialogDescription>
            Esto configurará un trabajo programado que sincronizará automáticamente las reservas de TidyCal cada 15 minutos.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <h4 className="font-medium mb-2">¿Qué hace esto?</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Consulta la API de TidyCal cada 15 minutos</li>
              <li>Procesa automáticamente nuevas reservas</li>
              <li>Crea contactos en el CRM y asigna actividades</li>
              <li>Mantiene un log de todas las sincronizaciones</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-sm">
            <strong>Nota:</strong> Esta configuración solo necesita hacerse una vez. El trabajo programado continuará ejecutándose automáticamente.
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSetupCron}
              disabled={isSetupLoading}
            >
              {isSetupLoading && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
              Configurar Ahora
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
