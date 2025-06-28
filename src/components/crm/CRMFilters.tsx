
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CrmFilters, CrmStage, ContactWithStage } from '@/types/crm';

interface CRMFiltersProps {
  filters: CrmFilters;
  onFiltersChange: (filters: CrmFilters) => void;
  stages: CrmStage[];
  contacts: ContactWithStage[];
}

export const CRMFilters = ({ filters, onFiltersChange, stages, contacts }: CRMFiltersProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = React.useState(false);

  // Obtener países únicos de los contactos
  const uniqueCountries = Array.from(
    new Set(contacts.map(contact => contact.country_name).filter(Boolean))
  ).sort();

  // Obtener servicios de interés únicos
  const uniqueServices = Array.from(
    new Set(contacts.map(contact => contact.service_of_interest).filter(Boolean))
  ).sort();

  const handleDateRangeChange = (field: 'from' | 'to', date: Date | undefined) => {
    const newDateRange = {
      ...filters.date_range,
      [field]: date?.toISOString().split('T')[0]
    };
    
    onFiltersChange({
      ...filters,
      date_range: newDateRange
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
      stage_id: undefined,
      country: undefined,
      service_of_interest: undefined,
      date_range: undefined
    });
  };

  const hasActiveFilters = !!(
    filters.search ||
    filters.stage_id ||
    filters.country ||
    filters.service_of_interest ||
    filters.date_range?.from ||
    filters.date_range?.to
  );

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            <X className="h-3 w-3 mr-1" />
            Limpiar filtros
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Búsqueda */}
        <div>
          <Label htmlFor="search" className="text-xs">Buscar</Label>
          <Input
            id="search"
            placeholder="Nombre, email, teléfono..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="h-8 text-sm"
          />
        </div>

        {/* Etapa */}
        <div>
          <Label className="text-xs">Etapa</Label>
          <Select
            value={filters.stage_id || ''}
            onValueChange={(value) => onFiltersChange({
              ...filters,
              stage_id: value || undefined
            })}
          >
            <SelectTrigger className="h-8 text-sm">
              <SelectValue placeholder="Todas las etapas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas las etapas</SelectItem>
              {stages.map((stage) => (
                <SelectItem key={stage.id} value={stage.id}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: stage.color }}
                    />
                    {stage.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* País */}
        <div>
          <Label className="text-xs">País</Label>
          <Select
            value={filters.country || ''}
            onValueChange={(value) => onFiltersChange({
              ...filters,
              country: value || undefined
            })}
          >
            <SelectTrigger className="h-8 text-sm">
              <SelectValue placeholder="Todos los países" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos los países</SelectItem>
              {uniqueCountries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Servicio de Interés */}
        <div>
          <Label className="text-xs">Servicio de Interés</Label>
          <Select
            value={filters.service_of_interest || ''}
            onValueChange={(value) => onFiltersChange({
              ...filters,
              service_of_interest: value || undefined
            })}
          >
            <SelectTrigger className="h-8 text-sm">
              <SelectValue placeholder="Todos los servicios" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos los servicios</SelectItem>
              {uniqueServices.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fecha desde */}
        <div>
          <Label className="text-xs">Fecha desde</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-8 text-sm justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-3 w-3" />
                {filters.date_range?.from ? (
                  format(new Date(filters.date_range.from), 'dd MMM yyyy', { locale: es })
                ) : (
                  <span className="text-muted-foreground">Seleccionar</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.date_range?.from ? new Date(filters.date_range.from) : undefined}
                onSelect={(date) => handleDateRangeChange('from', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Fecha hasta */}
        <div>
          <Label className="text-xs">Fecha hasta</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-8 text-sm justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-3 w-3" />
                {filters.date_range?.to ? (
                  format(new Date(filters.date_range.to), 'dd MMM yyyy', { locale: es })
                ) : (
                  <span className="text-muted-foreground">Seleccionar</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.date_range?.to ? new Date(filters.date_range.to) : undefined}
                onSelect={(date) => handleDateRangeChange('to', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Indicadores de filtros activos */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {filters.search && (
            <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              <span>Búsqueda: "{filters.search}"</span>
              <button
                onClick={() => onFiltersChange({ ...filters, search: '' })}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {filters.stage_id && (
            <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              <span>Etapa: {stages.find(s => s.id === filters.stage_id)?.name}</span>
              <button
                onClick={() => onFiltersChange({ ...filters, stage_id: undefined })}
                className="ml-1 hover:bg-green-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {filters.country && (
            <div className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
              <span>País: {filters.country}</span>
              <button
                onClick={() => onFiltersChange({ ...filters, country: undefined })}
                className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {filters.service_of_interest && (
            <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
              <span>Servicio: {filters.service_of_interest}</span>
              <button
                onClick={() => onFiltersChange({ ...filters, service_of_interest: undefined })}
                className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          
          {(filters.date_range?.from || filters.date_range?.to) && (
            <div className="flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
              <span>
                Fecha: {filters.date_range?.from ? format(new Date(filters.date_range.from), 'dd/MM/yyyy', { locale: es }) : '...'} - {filters.date_range?.to ? format(new Date(filters.date_range.to), 'dd/MM/yyyy', { locale: es }) : '...'}
              </span>
              <button
                onClick={clearDateRange}
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
