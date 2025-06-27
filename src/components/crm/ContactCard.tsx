
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContactWithStage } from '@/types/crm';
import { Phone, Mail, Building, MapPin, Calendar, MoreVertical, Eye, Edit, Trash } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ContactCardProps {
  contact: ContactWithStage;
  onEdit: (contact: ContactWithStage) => void;
  onView: (contact: ContactWithStage) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
  dragProps?: any;
}

export const ContactCard = ({ 
  contact, 
  onEdit, 
  onView, 
  onDelete, 
  isDragging = false,
  dragProps 
}: ContactCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fullName = `${contact.first_name} ${contact.last_name}`;
  const createdDate = format(new Date(contact.created_at), 'dd MMM yyyy', { locale: es });

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-md ${isDragging ? 'opacity-50 rotate-2' : ''}`}
      {...dragProps}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{fullName}</h3>
            {contact.company && (
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <Building className="h-3 w-3" />
                {contact.company}
              </p>
            )}
          </div>
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
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
              <DropdownMenuItem 
                onClick={() => onDelete(contact.id)}
                className="text-red-600"
              >
                <Trash className="h-4 w-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="h-4 w-4" />
          <span>{contact.phone}</span>
        </div>
        
        {contact.email && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>{contact.email}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{contact.country_name}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Creado {createdDate}</span>
        </div>

        {contact.stage && (
          <Badge 
            variant="secondary" 
            className="mt-2"
            style={{ 
              backgroundColor: `${contact.stage.color}20`,
              color: contact.stage.color,
              border: `1px solid ${contact.stage.color}40`
            }}
          >
            {contact.stage.name}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
