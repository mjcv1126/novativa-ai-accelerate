
import React from 'react';
import { ContactWithStage } from '@/types/crm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Eye, Edit, Trash, MoreVertical, Phone, Mail, Building, User, Calendar } from 'lucide-react';

interface ContactCardProps {
  contact: ContactWithStage;
  onEdit: (contact: ContactWithStage) => void;
  onView: (contact: ContactWithStage) => void;
  onDelete: (id: string) => void;
}

export const ContactCard = ({ contact, onEdit, onView, onDelete }: ContactCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatPhone = (phone: string) => {
    // Simple phone formatting
    if (phone.startsWith('+')) return phone;
    return `+${phone}`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900">
              {contact.first_name} {contact.last_name}
            </CardTitle>
            {contact.company && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <Building className="h-3 w-3" />
                {contact.company}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {contact.stage && (
              <Badge 
                variant="secondary" 
                className="text-xs"
                style={{ 
                  backgroundColor: `${contact.stage.color}20`,
                  color: contact.stage.color,
                  borderColor: contact.stage.color
                }}
              >
                {contact.stage.name}
              </Badge>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView(contact)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver detalles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(contact)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(contact.id)}
                  className="text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="h-3 w-3" />
          <span>{formatPhone(contact.phone)}</span>
          <span className="text-xs text-gray-400">({contact.country_name})</span>
        </div>
        
        {contact.email && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-3 w-3" />
            <span className="truncate">{contact.email}</span>
          </div>
        )}

        {contact.assignment && (
          <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-md border-l-4 border-blue-500">
            <User className="h-4 w-4" />
            <span className="font-medium">
              Lead asignado a: {contact.assignment.assigned_user_email.split('@')[0]}
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t">
          <Calendar className="h-3 w-3" />
          <span>Creado: {formatDate(contact.created_at)}</span>
        </div>
        
        {contact.last_contact_date && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>Último contacto: {formatDate(contact.last_contact_date)}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
