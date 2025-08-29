
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Paperclip } from 'lucide-react';

interface ContactAttachmentsProps {
  contactId: string;
}

export const ContactAttachments = ({ contactId }: ContactAttachmentsProps) => {
  // Componente temporalmente deshabilitado hasta que se actualicen los tipos de Supabase
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Paperclip className="h-5 w-5" />
          Adjuntos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-gray-500">
          <p>Funcionalidad de adjuntos temporalmente deshabilitada</p>
          <p className="text-sm mt-2">Se está actualizando para corregir errores de tipos</p>
        </div>
      </CardContent>
    </Card>
  );
};
