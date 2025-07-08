
import React, { useState, useMemo } from 'react';
import { ContactWithStage, CrmStage } from '@/types/crm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, ArrowUpDown, ArrowUp, ArrowDown, Eye, Edit, Trash, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TableViewProps {
  contacts: ContactWithStage[];
  stages: CrmStage[];
  onMoveContact: (contactId: string, stageId: string) => Promise<void>;
  onEditContact: (contact: ContactWithStage) => void;
  onDeleteContact: (contactId: string) => void;
}

type SortField = 'name' | 'email' | 'phone' | 'company' | 'country' | 'stage' | 'created' | 'lead_value';
type SortDirection = 'asc' | 'desc';

export const TableView = ({ 
  contacts, 
  stages, 
  onMoveContact, 
  onEditContact, 
  onDeleteContact 
}: TableViewProps) => {
  const [sortField, setSortField] = useState<SortField>('created');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case 'name':
          aValue = `${a.first_name} ${a.last_name}`.toLowerCase();
          bValue = `${b.first_name} ${b.last_name}`.toLowerCase();
          break;
        case 'email':
          aValue = a.email?.toLowerCase() || '';
          bValue = b.email?.toLowerCase() || '';
          break;
        case 'phone':
          aValue = a.phone || '';
          bValue = b.phone || '';
          break;
        case 'company':
          aValue = a.company?.toLowerCase() || '';
          bValue = b.company?.toLowerCase() || '';
          break;
        case 'country':
          aValue = a.country_name?.toLowerCase() || '';
          bValue = b.country_name?.toLowerCase() || '';
          break;
        case 'stage':
          aValue = a.stage?.name?.toLowerCase() || '';
          bValue = b.stage?.name?.toLowerCase() || '';
          break;
        case 'lead_value':
          aValue = a.lead_value || 0;
          bValue = b.lead_value || 0;
          break;
        case 'created':
        default:
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [contacts, sortField, sortDirection]);

  const handleDelete = (contact: ContactWithStage) => {
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
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('name')}
                className="flex items-center gap-2 p-0 h-auto font-medium"
              >
                Nombre
                {getSortIcon('name')}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('email')}
                className="flex items-center gap-2 p-0 h-auto font-medium"
              >
                Email
                {getSortIcon('email')}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('phone')}
                className="flex items-center gap-2 p-0 h-auto font-medium"
              >
                Teléfono
                {getSortIcon('phone')}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('company')}
                className="flex items-center gap-2 p-0 h-auto font-medium"
              >
                Empresa
                {getSortIcon('company')}
              </Button>
            </TableHead>
            <TableHead>RTN</TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('stage')}
                className="flex items-center gap-2 p-0 h-auto font-medium"
              >
                Etapa
                {getSortIcon('stage')}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('lead_value')}
                className="flex items-center gap-2 p-0 h-auto font-medium"
              >
                Valor
                {getSortIcon('lead_value')}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSort('created')}
                className="flex items-center gap-2 p-0 h-auto font-medium"
              >
                Fecha
                {getSortIcon('created')}
              </Button>
            </TableHead>
            <TableHead className="w-[50px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedContacts.map((contact) => (
            <TableRow key={contact.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                <div>
                  <div className="font-semibold">{contact.first_name} {contact.last_name}</div>
                  {contact.country_name && (
                    <div className="text-xs text-gray-500">{contact.country_name}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{contact.email || '-'}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{contact.phone}</div>
                {contact.additional_phones && contact.additional_phones.length > 0 && (
                  <div className="text-xs text-gray-500">+{contact.additional_phones.length} más</div>
                )}
              </TableCell>
               <TableCell>
                 <div className="text-sm">{contact.company || '-'}</div>
               </TableCell>
               <TableCell>
                 <div className="text-sm">{contact.rtn || '-'}</div>
               </TableCell>
              <TableCell>
                {contact.stage && (
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${getStatusColor(contact.stage.name)}`}
                  >
                    {contact.stage.name}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {contact.lead_value && contact.lead_value > 0 ? (
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
                    <DollarSign className="h-3 w-3" />
                    <span>${contact.lead_value.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">{contact.lead_value_currency || 'USD'}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {format(new Date(contact.created_at), 'dd/MM/yy', { locale: es })}
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
                    <DropdownMenuItem onClick={() => handleDelete(contact)} className="text-red-600">
                      <Trash className="h-4 w-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {sortedContacts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron contactos
        </div>
      )}
    </div>
  );
};
