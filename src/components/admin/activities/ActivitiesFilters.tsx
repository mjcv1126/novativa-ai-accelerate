
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
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
  const uniqueStatuses = [...new Set(activities.map(a => a.status).filter(Boolean))];
  const uniqueTypes = [...new Set(activities.map(a => a.activity_type).filter(Boolean))];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Estado</label>
            <Select
              value={filters.status}
              onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {uniqueStatuses.map((status) => (
                  <SelectItem key={status} value={status || 'unknown'}>
                    {status === 'pending' ? 'Pendiente' : 
                     status === 'completed' ? 'Completada' : 
                     status === 'cancelled' ? 'Cancelada' : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Tipo</label>
            <Select
              value={filters.activityType}
              onValueChange={(value) => onFiltersChange({ ...filters, activityType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type || 'unknown'}>
                    {type === 'call' ? 'Llamada' :
                     type === 'email' ? 'Email' :
                     type === 'meeting' ? 'Reunión' :
                     type === 'reminder' ? 'Recordatorio' : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Rango de Fechas</label>
            <DatePickerWithRange
              from={filters.dateRange.from}
              to={filters.dateRange.to}
              onSelect={(range) => onFiltersChange({ ...filters, dateRange: range || { from: null, to: null } })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
