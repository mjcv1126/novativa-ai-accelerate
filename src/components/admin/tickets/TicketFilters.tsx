import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { TicketStatus, PriorityLevel, RequestType } from '@/types/ticket';

interface TicketFiltersProps {
  statusFilter: string;
  priorityFilter: string;
  typeFilter: string;
  searchQuery: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export const TicketFilters = ({
  statusFilter,
  priorityFilter,
  typeFilter,
  searchQuery,
  onStatusChange,
  onPriorityChange,
  onTypeChange,
  onSearchChange,
}: TicketFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Input
        placeholder="Buscar por número, nombre o email..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="md:col-span-2"
      />
      
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger>
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          <SelectItem value="nuevo">Nuevo</SelectItem>
          <SelectItem value="en_revision">En Revisión</SelectItem>
          <SelectItem value="en_progreso">En Progreso</SelectItem>
          <SelectItem value="esperando_informacion">Esperando Info</SelectItem>
          <SelectItem value="completado">Completado</SelectItem>
          <SelectItem value="cancelado">Cancelado</SelectItem>
        </SelectContent>
      </Select>

      <Select value={priorityFilter} onValueChange={onPriorityChange}>
        <SelectTrigger>
          <SelectValue placeholder="Prioridad" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las prioridades</SelectItem>
          <SelectItem value="alta">Alta</SelectItem>
          <SelectItem value="media">Media</SelectItem>
          <SelectItem value="baja">Baja</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
