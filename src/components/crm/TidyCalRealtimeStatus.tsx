
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface TidyCalRealtimeStatusProps {
  isConnected: boolean;
  onConnect: () => void;
}

export const TidyCalRealtimeStatus = ({ isConnected, onConnect }: TidyCalRealtimeStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      <Badge variant={isConnected ? "default" : "secondary"} className="flex items-center gap-1">
        {isConnected ? (
          <Wifi className="h-3 w-3 text-green-500" />
        ) : (
          <WifiOff className="h-3 w-3 text-red-500" />
        )}
        {isConnected ? 'Conectado' : 'Desconectado'}
      </Badge>
      
      {!isConnected && (
        <Button
          variant="outline"
          size="sm"
          onClick={onConnect}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Conectar
        </Button>
      )}
    </div>
  );
};
