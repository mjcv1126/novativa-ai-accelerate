
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, SortAsc, SortDesc, Download } from 'lucide-react';
import { exportToCSV, activitiesCSVHeaders } from '@/utils/exportUtils';

interface Activity {
  id: string;
  title: string;
  description?: string;
  activity_type: string;
  scheduled_date: string;
  scheduled_time?: string;
  is_completed: boolean;
  contact: {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    email?: string;
  };
  created_at: string;
}

interface ActivitiesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activityTypeFilter: string;
  onActivityTypeChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: () => void;
  activities: Activity[];
}

export const ActivitiesFilters = ({
  searchTerm,
  onSearchChange,
  activityTypeFilter,
  onActivityTypeChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  activities,
}: ActivitiesFiltersProps) => {
  const handleExportCSV = () => {
    const dataToExport = activities.map(activity => ({
      ...activity,
      activity_type: getActivityTypeLabel(activity.activity_type),
      is_completed: activity.is_completed ? 'Sí' : 'No',
      created_at: new Date(activity.created_at).toLocaleDateString('es-ES')
    }));
    
    exportToCSV(dataToExport, 'actividades', activitiesCSVHeaders);
  };

  const getActivityTypeLabel = (type: string) => {
    const labels = {
      call: 'Llamada',
      email: 'Email',
      meeting: 'Reunión',
      reminder: 'Recordatorio',
      note: 'Nota',
      status_change: 'Cambio de Estado'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="bg-white p-4 rounded-lg border space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar actividades..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={handleExportCSV}
          className="flex items-center gap-2"
          disabled={activities.length === 0}
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select value={activityTypeFilter} onValueChange={onActivityTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de actividad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los tipos</SelectItem>
            <SelectItem value="call">Llamada</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="meeting">Reunión</SelectItem>
            <SelectItem value="reminder">Recordatorio</SelectItem>
            <SelectItem value="note">Nota</SelectItem>
            <SelectItem value="status_change">Cambio de Estado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="completed">Completadas</SelectItem>
            <SelectItem value="overdue">Retrasadas</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled_date">Fecha</SelectItem>
              <SelectItem value="title">Título</SelectItem>
              <SelectItem value="activity_type">Tipo</SelectItem>
              <SelectItem value="created_at">Creado</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onSortOrderChange}
            className="px-3"
          >
            {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
