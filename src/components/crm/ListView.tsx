
import React from 'react';
import { ContactWithStage } from '@/types/crm';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Phone, Mail, Building, Calendar, Edit, Eye, Trash2 } from 'lucide-react';

interface ListViewProps {
  contacts: ContactWithStage[];
  onContactEdit: (contact: ContactWithStage) => void;
  onContactView: (contact: ContactWithStage) => void;
  onContactDelete: (id: string) => void;
}

export const ListView = ({ 
  contacts, 
  onContactEdit, 
  onContactView, 
  onContactDelete 
}: ListViewProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontraron contactos</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>País</TableHead>
            <TableHead>Etapa</TableHead>
            <TableHead>Último Contacto</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="text-xs text-gray-400 font-mono">
                  {contact.id.slice(0, 8)}...
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">
                    {contact.first_name} {contact.last_name}
                  </span>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <span>{contact.phone}</span>
                    {contact.additional_phones && contact.additional_phones.length > 0 && (
                      <div className="text-xs text-gray-500">
                        +{contact.additional_phones.length} adicional(es)
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                {contact.email ? (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="truncate max-w-xs">{contact.email}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              
              <TableCell>
                {contact.company ? (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span className="truncate max-w-xs">{contact.company}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              
              <TableCell>
                <span>{contact.country_name}</span>
              </TableCell>
              
              <TableCell>
                {contact.stage ? (
                  <Badge 
                    className="text-xs"
                    style={{ 
                      backgroundColor: contact.stage.color + '20',
                      color: contact.stage.color,
                      border: `1px solid ${contact.stage.color}40`
                    }}
                  >
                    {contact.stage.name}
                  </Badge>
                ) : (
                  <span className="text-gray-400">Sin etapa</span>
                )}
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {formatDate(contact.last_contact_date)}
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onContactView(contact)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onContactEdit(contact)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onContactDelete(contact.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
