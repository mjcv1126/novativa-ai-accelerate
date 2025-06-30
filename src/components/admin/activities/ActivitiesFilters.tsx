
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Calendar, Filter, X } from 'lucide-react';
import { ActivityWithContact } from '@/hooks/crm/useActivityOperations';

interface ActivitiesFiltersProps {
  filters: {
    status: string;
    activityType: string;
    dateRange: { from: Date | null; to: Date | null };
  };
  onFiltersChange: (filters: any) => void;
  activities: ActivityWithContact[];
}

export const ActivitiesFilters = ({ filters, onFiltersChange, activities }: ActivitiesFiltersProps) => {
  const clearFilters = () => {
    onFiltersChange({
      status: '',
      activityType: '',
      dateRange: { from: null, to: null }
    });
  };

  const hasActiveFilters = filters.status || filters.activityType || filters.dateRange?.from || filters.dateRange?.to;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filtros:</span>
          </div>

          <Select
            value={filters.status}
            onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
              <SelectItem value="completed">Completada</SelectItem>
              <SelectItem value="cancelled">Cancelada</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.activityType}
            onValueChange={(value) => onFiltersChange({ ...filters, activityType: value })}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="call">Llamada</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="meeting">Reunión</SelectItem>
              <SelectItem value="reminder">Recordatorio</SelectItem>
              <SelectItem value="note">Nota</SelectItem>
              <SelectItem value="status_change">Cambio de Estado</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <DatePickerWithRange
              from={filters.dateRange?.from}
              to={filters.dateRange?.to}
              onSelect={(range) => onFiltersChange({ 
                ...filters, 
                dateRange: { from: range?.from || null, to: range?.to || null }
              })}
            />
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4 mr-1" />
              Limpiar filtros
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
