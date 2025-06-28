
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Phone, CheckCircle, Circle, AlertTriangle, Edit } from 'lucide-react';

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
}

interface ActivitiesListViewProps {
  activities: Activity[];
  onMarkComplete: (id: string) => void;
  onEditActivity: (activity: Activity) => void;
}

export const ActivitiesListView = ({ activities, onMarkComplete, onEditActivity }: ActivitiesListViewProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    return timeString.slice(0, 5);
  };

  const getActivityTypeColor = (type: string) => {
    const colors = {
      call: 'bg-blue-100 text-blue-800',
      email: 'bg-green-100 text-green-800',
      meeting: 'bg-purple-100 text-purple-800',
      reminder: 'bg-yellow-100 text-yellow-800',
      note: 'bg-gray-100 text-gray-800',
      status_change: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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

  const isOverdue = (activity: Activity) => {
    if (activity.is_completed) return false;
    const today = new Date();
    const scheduledDate = new Date(activity.scheduled_date);
    return scheduledDate < today;
  };

  return (
    <div className="bg-white rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Estado</TableHead>
            <TableHead>Actividad</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => (
            <TableRow key={activity.id} className={isOverdue(activity) ? 'bg-red-50' : ''}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {isOverdue(activity) && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                  {activity.is_completed ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </TableCell>
              
              <TableCell>
                <div>
                  <div className="font-medium">{activity.title}</div>
                  {activity.description && (
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {activity.description}
                    </div>
                  )}
                </div>
              </TableCell>
              
              <TableCell>
                <Badge className={`${getActivityTypeColor(activity.activity_type)} text-xs`}>
                  {getActivityTypeLabel(activity.activity_type)}
                </Badge>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-sm">
                    {activity.contact.first_name} {activity.contact.last_name}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {activity.contact.phone}
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {formatDate(activity.scheduled_date)}
                </div>
              </TableCell>
              
              <TableCell>
                {activity.scheduled_time && (
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {formatTime(activity.scheduled_time)}
                  </div>
                )}
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditActivity(activity)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {!activity.is_completed && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onMarkComplete(activity.id)}
                      className="text-green-600 hover:text-green-700 hover:border-green-300"
                    >
                      Completar
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
