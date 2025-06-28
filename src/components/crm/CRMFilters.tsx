
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, Download } from 'lucide-react';
import { CrmFilters, CrmStage, ContactWithStage } from '@/types/crm';
import { exportToCSV, contactsCSVHeaders } from '@/utils/exportUtils';

interface CRMFiltersProps {
  filters: CrmFilters;
  onFiltersChange: (filters: CrmFilters) => void;
  stages: CrmStage[];
  contacts: ContactWithStage[];
}

export const CRMFilters = ({ filters, onFiltersChange, stages, contacts }: CRMFiltersProps) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleStageChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      stage_id: value === 'all' ? undefined : value 
    });
  };

  const clearFilters = () => {
    onFiltersChange({ search: '' });
  };

  const handleExportCSV = () => {
    const dataToExport = contacts.map(contact => ({
      ...contact,
      created_at: contact.created_at ? new Date(contact.created_at).toLocaleDateString('es-ES') : '',
      last_contact_date: contact.last_contact_date ? new Date(contact.last_contact_date).toLocaleDateString('es-ES') : ''
    }));
    
    exportToCSV(dataToExport, 'contactos_crm', contactsCSVHeaders);
  };

  const hasActiveFilters = filters.stage_id || filters.search || filters.country;

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nombre, email..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            className="flex items-center gap-2 w-full sm:w-auto"
            disabled={contacts.length === 0}
          >
            <Download className="h-4 w-4" />
            <span className="sm:hidden">Exportar</span>
            <span className="hidden sm:inline">Exportar CSV</span>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={filters.stage_id || 'all'} onValueChange={handleStageChange}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Todas las etapas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las etapas</SelectItem>
              {stages.map((stage) => (
                <SelectItem key={stage.id} value={stage.id}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: stage.color }}
                    />
                    {stage.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <X className="h-4 w-4" />
              <span className="sm:hidden">Limpiar</span>
              <span className="hidden sm:inline">Limpiar filtros</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
