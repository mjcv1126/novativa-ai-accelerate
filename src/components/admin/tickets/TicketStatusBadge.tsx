import { Badge } from '@/components/ui/badge';
import { TicketStatus } from '@/types/ticket';

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

const statusConfig: Record<TicketStatus, { label: string; className: string }> = {
  nuevo: { label: 'Nuevo', className: 'bg-blue-500' },
  en_revision: { label: 'En Revisión', className: 'bg-yellow-500' },
  en_progreso: { label: 'En Progreso', className: 'bg-purple-500' },
  esperando_informacion: { label: 'Esperando Info', className: 'bg-orange-500' },
  completado: { label: 'Completado', className: 'bg-green-500' },
  cancelado: { label: 'Cancelado', className: 'bg-gray-500' },
};

export const TicketStatusBadge = ({ status }: TicketStatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  );
};
