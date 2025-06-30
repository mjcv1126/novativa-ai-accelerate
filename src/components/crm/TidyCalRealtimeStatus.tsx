
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface TidyCalRealtimeStatusProps {
  isConnected: boolean;
  onConnect: () => void;
  isProcessing?: boolean;
}

export const TidyCalRealtimeStatus = ({ 
  isConnected, 
  onConnect, 
  isProcessing = false 
}: TidyCalRealtimeStatusProps) => {
  return (
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
        onClick={onConnect}
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
            {isConnected ? 'Sincronizar' : 'Conectar'}
          </>
        )}
      </Button>
    </div>
  );
};
