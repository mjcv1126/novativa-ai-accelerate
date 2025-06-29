
import React from 'react';
import { ContactWithStage } from '@/types/crm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Building, Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ExistingContactDialogProps {
  contact: ContactWithStage | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (contact: ContactWithStage) => void;
}

export const ExistingContactDialog = ({ 
  contact, 
  isOpen, 
  onClose, 
  onEdit 
}: ExistingContactDialogProps) => {
  if (!contact) return null;

  const handleEdit = () => {
    onEdit(contact);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Contacto ya existe
          </DialogTitle>
          <DialogDescription>
            Este contacto ya está registrado en el sistema. Revisa los detalles y decide si necesitas editarlo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Información básica */}
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">
                {contact.first_name} {contact.last_name}
              </h3>
              <p className="text-sm text-gray-500 font-mono">
                ID: {contact.id}
              </p>
            </div>

            {/* Email */}
            {contact.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{contact.email}</span>
              </div>
            )}

            {/* Teléfono principal */}
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <span className="text-sm">{contact.phone}</span>
                {contact.additional_phones && contact.additional_phones.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Teléfonos adicionales: {contact.additional_phones.join(', ')}
                  </div>
                )}
              </div>
            </div>

            {/* Empresa */}
            {contact.company && (
              <div className="flex items-center gap-3">
                <Building className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{contact.company}</span>
              </div>
            )}

            {/* País */}
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{contact.country_name}</span>
            </div>

            {/* Etapa */}
            {contact.stage && (
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: contact.stage.color }}
                />
                <Badge 
                  variant="secondary"
                  style={{ 
                    backgroundColor: contact.stage.color + '20',
                    color: contact.stage.color,
                    border: `1px solid ${contact.stage.color}40`
                  }}
                >
                  {contact.stage.name}
                </Badge>
              </div>
            )}

            {/* Fecha de creación */}
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                Creado: {format(new Date(contact.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}
              </span>
            </div>

            {/* Notas */}
            {contact.notes && (
              <div className="mt-4">
                <h4 className="font-medium text-sm mb-2">Notas:</h4>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  {contact.notes}
                </div>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button onClick={handleEdit}>
              Editar Contacto
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
