
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface TidyCalSyncButtonProps {
  isConnected: boolean;
  isProcessing: boolean;
  onSync: () => void;
}

export const TidyCalSyncButton = ({ 
  isConnected, 
  isProcessing,
  onSync 
}: TidyCalSyncButtonProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Badge 
          variant={isConnected ? "default" : "destructive"}
          className={`flex items-center gap-1 ${isConnected ? 'bg-green-500 hover:bg-green-600' : ''}`}
        >
          {isConnected ? (
            <>
              <Wifi className="h-3 w-3" />
              TidyCal Conectado
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3" />
              TidyCal Desconectado
            </>
          )}
        </Badge>
        
        <Button
          size="sm"
          variant={isConnected ? "outline" : "default"}
          onClick={onSync}
          disabled={isProcessing}
          className="text-xs"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
              Sincronizando...
            </>
          ) : (
            <>
              <RefreshCw className="h-3 w-3 mr-1" />
              Sincronizar Llamadas
            </>
          )}
        </Button>
      </div>

      {/* Full screen loading overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 max-w-sm mx-4">
            <RefreshCw className="h-12 w-12 animate-spin text-blue-500" />
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Sincronizando Llamadas</h3>
              <p className="text-gray-600">
                Estamos sincronizando tus llamadas de TidyCal con el CRM. 
                Este proceso puede tomar unos momentos.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
