
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';
import { CrmFilters, CrmStage, ContactWithStage } from '@/types/crm';

interface CRMFiltersProps {
  filters: CrmFilters;
  onFiltersChange: (filters: CrmFilters) => void;
  stages: CrmStage[];
  contacts: ContactWithStage[];
}

export const CRMFilters = ({ filters, onFiltersChange, stages, contacts }: CRMFiltersProps) => {
  // Get unique countries and services from contacts
  const uniqueCountries = React.useMemo(() => {
    const countries = contacts
      .map(contact => contact.country_name)
      .filter(Boolean)
      .filter((country, index, arr) => arr.indexOf(country) === index)
      .sort();
    return countries;
  }, [contacts]);

  const uniqueServices = React.useMemo(() => {
    const services = contacts
      .map(contact => contact.service_of_interest)
      .filter(Boolean)
      .filter((service, index, arr) => arr.indexOf(service) === index)
      .sort();
    return services;
  }, [contacts]);

  const handleFilterChange = (key: keyof CrmFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? '' : value
    });
  };

  const handleDateRangeChange = (type: 'from' | 'to', value: string) => {
    const currentDateRange = filters.date_range || {};
    onFiltersChange({
      ...filters,
      date_range: {
        ...currentDateRange,
        [type]: value || undefined
      }
    });
  };

  const clearFilter = (key: keyof CrmFilters) => {
    onFiltersChange({
      ...filters,
      [key]: ''
    });
  };

  const clearDateRange = () => {
    onFiltersChange({
      ...filters,
      date_range: undefined
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      stage_id: '',
      country: '',
      service_of_interest: '',
      date_range: undefined
    });
  };

  const hasActiveFilters = filters.search || 
    filters.stage_id || 
    filters.country || 
    filters.service_of_interest || 
    (filters.date_range?.from || filters.date_range?.to);

  return (
    <div className="space-y-4 w-full max-w-full">
      {/* Search and Clear Filters */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="flex-1 min-w-0">
          <Input
            placeholder="Buscar contactos..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full"
          />
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="flex items-center gap-2 flex-shrink-0"
          >
            <X className="h-4 w-4" />
            <span className="hidden sm:inline">Limpiar filtros</span>
            <span className="sm:hidden">Limpiar</span>
          </Button>
        )}
      </div>

      {/* Filter Selects - Responsive Grid */}
      <div className="w-full overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-full">
          {/* Stage Filter */}
          <div className="space-y-1 min-w-0">
            <label className="text-xs font-medium text-gray-600">Etapa</label>
            <Select
              value={filters.stage_id || 'all'}
              onValueChange={(value) => handleFilterChange('stage_id', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las etapas</SelectItem>
                {stages.map((stage) => (
                  <SelectItem key={stage.id} value={stage.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: stage.color }}
                      />
                      <span className="truncate">{stage.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Country Filter */}
          <div className="space-y-1 min-w-0">
            <label className="text-xs font-medium text-gray-600">País</label>
            <Select
              value={filters.country || 'all'}
              onValueChange={(value) => handleFilterChange('country', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los países</SelectItem>
                {uniqueCountries.map((country) => (
                  <SelectItem key={country} value={country}>
                    <span className="truncate">{country}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service Filter */}
          <div className="space-y-1 min-w-0">
            <label className="text-xs font-medium text-gray-600">Servicio</label>
            <Select
              value={filters.service_of_interest || 'all'}
              onValueChange={(value) => handleFilterChange('service_of_interest', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los servicios</SelectItem>
                {uniqueServices.map((service) => (
                  <SelectItem key={service} value={service}>
                    <span className="truncate">{service}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range - Stacks on mobile */}
          <div className="space-y-1 min-w-0">
            <label className="text-xs font-medium text-gray-600">Fecha</label>
            <div className="flex gap-1">
              <Input
                type="date"
                value={filters.date_range?.from || ''}
                onChange={(e) => handleDateRangeChange('from', e.target.value)}
                className="text-xs flex-1 min-w-0"
                placeholder="Desde"
              />
              <Input
                type="date"
                value={filters.date_range?.to || ''}
                onChange={(e) => handleDateRangeChange('to', e.target.value)}
                className="text-xs flex-1 min-w-0"
                placeholder="Hasta"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 max-w-full">
          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1 max-w-full">
              <Filter className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">Búsqueda: {filters.search}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearFilter('search')}
                className="h-4 w-4 p-0 hover:bg-transparent flex-shrink-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {filters.stage_id && (
            <Badge variant="secondary" className="flex items-center gap-1 max-w-full">
              <Filter className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">Etapa: {stages.find(s => s.id === filters.stage_id)?.name || 'Desconocida'}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearFilter('stage_id')}
                className="h-4 w-4 p-0 hover:bg-transparent flex-shrink-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {filters.country && (
            <Badge variant="secondary" className="flex items-center gap-1 max-w-full">
              <Filter className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">País: {filters.country}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearFilter('country')}
                className="h-4 w-4 p-0 hover:bg-transparent flex-shrink-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {filters.service_of_interest && (
            <Badge variant="secondary" className="flex items-center gap-1 max-w-full">
              <Filter className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">Servicio: {filters.service_of_interest}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => clearFilter('service_of_interest')}
                className="h-4 w-4 p-0 hover:bg-transparent flex-shrink-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {(filters.date_range?.from || filters.date_range?.to) && (
            <Badge variant="secondary" className="flex items-center gap-1 max-w-full">
              <Filter className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">Fecha: {filters.date_range?.from || '...'} - {filters.date_range?.to || '...'}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearDateRange}
                className="h-4 w-4 p-0 hover:bg-transparent flex-shrink-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
