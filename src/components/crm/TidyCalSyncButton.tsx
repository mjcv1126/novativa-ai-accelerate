
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useTidyCalPolling } from '@/hooks/crm/useTidyCalPolling';

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
  const { triggerPolling, loading } = useTidyCalPolling();

  const handleSync = async () => {
    try {
      console.log('🔄 Manual sync triggered from button');
      await triggerPolling();
      onSync(); // Call the parent's onSync to refresh data
    } catch (error) {
      console.error('❌ Manual sync failed:', error);
    }
  };

  const isLoading = isProcessing || loading;

  return (
    <>
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant={isConnected ? "outline" : "default"} 
          onClick={handleSync}
          disabled={isLoading} 
          className="text-xs"
        >
          {isLoading ? (
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
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 max-w-sm mx-4">
            <RefreshCw className="h-12 w-12 animate-spin text-blue-500" />
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Sincronizando Llamadas</h3>
              <p className="text-gray-600">
                Estamos procesando todas las llamadas de TidyCal, incluyendo las canceladas. 
                Este proceso puede tomar unos momentos.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
