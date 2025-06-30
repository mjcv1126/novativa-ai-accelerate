
import React, { useState, useMemo } from 'react';
import { ContactWithStage, CrmStage } from '@/types/crm';
import { ContactCard } from './ContactCard';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface ListViewProps {
  contacts: ContactWithStage[];
  stages: CrmStage[];
  onMoveContact: (contactId: string, stageId: string) => void;
  onEditContact: (contact: ContactWithStage) => void;
  onDeleteContact: (contactId: string) => void;
}

type SortField = 'name' | 'email' | 'phone' | 'company' | 'country' | 'stage' | 'created' | 'lead_value';
type SortDirection = 'asc' | 'desc';

export const ListView = ({ 
  contacts, 
  stages, 
  onMoveContact, 
  onEditContact, 
  onDeleteContact 
}: ListViewProps) => {
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

  return (
    <div className="space-y-4">
      {/* Header con controles de ordenamiento */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={sortField === 'name' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleSort('name')}
            className="flex items-center gap-2"
          >
            Nombre
            {getSortIcon('name')}
          </Button>
          
          <Button
            variant={sortField === 'email' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleSort('email')}
            className="flex items-center gap-2"
          >
            Email
            {getSortIcon('email')}
          </Button>
          
          <Button
            variant={sortField === 'phone' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleSort('phone')}
            className="flex items-center gap-2"
          >
            Teléfono
            {getSortIcon('phone')}
          </Button>
          
          <Button
            variant={sortField === 'company' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleSort('company')}
            className="flex items-center gap-2"
          >
            Empresa
            {getSortIcon('company')}
          </Button>
          
          <Button
            variant={sortField === 'country' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleSort('country')}
            className="flex items-center gap-2"
          >
            País
            {getSortIcon('country')}
          </Button>
          
          <Button
            variant={sortField === 'stage' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleSort('stage')}
            className="flex items-center gap-2"
          >
            Etapa
            {getSortIcon('stage')}
          </Button>
          
          <Button
            variant={sortField === 'lead_value' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleSort('lead_value')}
            className="flex items-center gap-2"
          >
            Valor
            {getSortIcon('lead_value')}
          </Button>
          
          <Button
            variant={sortField === 'created' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleSort('created')}
            className="flex items-center gap-2"
          >
            Fecha
            {getSortIcon('created')}
          </Button>
        </div>
      </div>

      {/* Lista de contactos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            stages={stages}
            onMoveContact={onMoveContact}
            onEditContact={onEditContact}
            onDeleteContact={onDeleteContact}
          />
        ))}
      </div>

      {sortedContacts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron contactos
        </div>
      )}
    </div>
  );
};
