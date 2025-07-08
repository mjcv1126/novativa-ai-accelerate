
import React from 'react';
import { ContactWithStage, CrmStage } from '@/types/crm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Trash, Phone, Mail, Calendar, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ContactCardProps {
  contact: ContactWithStage;
  stages: CrmStage[];
  onMoveContact: (contactId: string, stageId: string) => void;
  onEditContact: (contact: ContactWithStage) => void;
  onDeleteContact: (id: string) => void;
}

export const ContactCard = ({ contact, stages, onMoveContact, onEditContact, onDeleteContact }: ContactCardProps) => {
  const handleDelete = () => {
    if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      onDeleteContact(contact.id);
    }
  };

  const getStatusColor = (stageName: string) => {
    switch (stageName?.toLowerCase()) {
      case 'contactado':
        return 'bg-green-100 text-green-800';
      case 'no contesta':
        return 'bg-gray-100 text-gray-800';
      case 'llamada programada':
        return 'bg-yellow-100 text-yellow-800';
      case 'cerrado ganado':
        return 'bg-green-100 text-green-800';
      case 'cerrado perdido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 
              className="font-semibold text-sm leading-tight mb-1"
              onClick={() => onEditContact(contact)}
              style={{ 
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto',
                whiteSpace: 'normal'
              }}
            >
              {contact.first_name} {contact.last_name}
            </h3>
            {contact.company && (
              <p className="text-xs text-gray-500 mt-1 break-words">
                {contact.company}
              </p>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditContact(contact)}>
                <Eye className="h-4 w-4 mr-2" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEditContact(contact)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                <Trash className="h-4 w-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {/* Contact Info */}
        <div className="space-y-2">
          {contact.email && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Mail className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{contact.email}</span>
            </div>
          )}
          
          {contact.phone && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{contact.phone}</span>
            </div>
          )}

          {/* Mostrar teléfonos adicionales si existen */}
          {contact.additional_phones && contact.additional_phones.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Phone className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">+{contact.additional_phones.length} tel. adicional(es)</span>
            </div>
           )}

           {/* RTN */}
           {contact.rtn && (
             <div className="flex items-center gap-2 text-xs text-gray-600">
               <span className="font-medium">RTN:</span>
               <span className="truncate">{contact.rtn}</span>
             </div>
           )}

           {/* Lead Value */}
          {contact.lead_value && contact.lead_value > 0 && (
            <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
              <DollarSign className="h-3 w-3 flex-shrink-0" />
              <span>
                ${contact.lead_value.toFixed(2)} {contact.lead_value_currency || 'USD'}
                {contact.payment_type && (
                  <span className="text-gray-500 ml-1">
                    ({contact.payment_type === 'recurring' ? 'Recurrente' : 'Único'})
                  </span>
                )}
              </span>
            </div>
          )}
          
          {contact.created_at && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span>
                {format(new Date(contact.created_at), 'dd MMM yyyy', { locale: es })}
              </span>
            </div>
          )}
        </div>

        {/* Stage Badge */}
        {contact.stage && (
          <div className="flex justify-start">
            <Badge 
              variant="secondary" 
              className={`text-xs ${getStatusColor(contact.stage.name)}`}
            >
              {contact.stage.name}
            </Badge>
          </div>
        )}

        {/* Notes Preview */}
        {contact.notes && (
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            <p className="line-clamp-2">{contact.notes}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
