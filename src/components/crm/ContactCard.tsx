
import React from 'react';
import { ContactWithStage } from '@/types/crm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Trash, Phone, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ContactCardProps {
  contact: ContactWithStage;
  onEdit: (contact: ContactWithStage) => void;
  onView: (contact: ContactWithStage) => void;
  onDelete: (id: string) => void;
}

export const ContactCard = ({ contact, onEdit, onView, onDelete }: ContactCardProps) => {
  const handleDelete = () => {
    if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      onDelete(contact.id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'inactive':
      case 'inactivo':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
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
              className="font-semibold text-sm leading-tight break-words"
              onClick={() => onView(contact)}
              style={{ 
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                hyphens: 'auto'
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
              <DropdownMenuItem onClick={() => onView(contact)}>
                <Eye className="h-4 w-4 mr-2" />
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(contact)}>
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
          
          {contact.created_at && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span>
                {format(new Date(contact.created_at), 'dd MMM yyyy', { locale: es })}
              </span>
            </div>
          )}
        </div>

        {/* Status Badge */}
        {contact.status && (
          <div className="flex justify-start">
            <Badge 
              variant="secondary" 
              className={`text-xs ${getStatusColor(contact.status)}`}
            >
              {contact.status}
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
