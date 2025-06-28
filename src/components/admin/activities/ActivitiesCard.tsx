
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContactActivity } from '@/types/crm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Clock, 
  Phone, 
  Mail, 
  Users, 
  StickyNote, 
  Bell, 
  ArrowUpDown,
  CheckCircle,
  Edit
} from 'lucide-react';

interface ActivitiesCardProps {
  activity: ContactActivity;
  onComplete: (id: string) => void;
  onEdit: (activity: ContactActivity) => void;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'call':
      return <Phone className="h-4 w-4" />;
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'meeting':
      return <Users className="h-4 w-4" />;
    case 'note':
      return <StickyNote className="h-4 w-4" />;
    case 'reminder':
      return <Bell className="h-4 w-4" />;
    case 'status_change':
      return <ArrowUpDown className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getActivityTypeColor = (type: string) => {
  switch (type) {
    case 'call':
      return 'bg-blue-100 text-blue-800';
    case 'email':
      return 'bg-green-100 text-green-800';
    case 'meeting':
      return 'bg-purple-100 text-purple-800';
    case 'note':
      return 'bg-yellow-100 text-yellow-800';
    case 'reminder':
      return 'bg-orange-100 text-orange-800';
    case 'status_change':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getActivityTypeLabel = (type: string) => {
  switch (type) {
    case 'call':
      return 'Llamada';
    case 'email':
      return 'Email';
    case 'meeting':
      return 'Reunión';
    case 'note':
      return 'Nota';
    case 'reminder':
      return 'Recordatorio';
    case 'status_change':
      return 'Cambio de Estado';
    default:
      return 'Actividad';
  }
};

export const ActivitiesCard: React.FC<ActivitiesCardProps> = ({
  activity,
  onComplete,
  onEdit,
}) => {
  const getScheduledDateTime = () => {
    if (activity.scheduled_date && activity.scheduled_time) {
      const dateTime = new Date(`${activity.scheduled_date}T${activity.scheduled_time}`);
      return format(dateTime, 'dd MMM yyyy - HH:mm', { locale: es });
    }
    return null;
  };

  const getDueDate = () => {
    if (activity.due_date) {
      return format(new Date(activity.due_date), 'dd MMM yyyy', { locale: es });
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with type badge and actions */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {getActivityIcon(activity.activity_type)}
              <Badge 
                variant="secondary" 
                className={`${getActivityTypeColor(activity.activity_type)} text-xs px-2 py-1 flex-shrink-0`}
              >
                {getActivityTypeLabel(activity.activity_type)}
              </Badge>
              {activity.is_completed && (
                <Badge variant="outline" className="text-green-600 border-green-200 text-xs flex-shrink-0">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Completada
                </Badge>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {!activity.is_completed && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onComplete(activity.id)}
                  className="h-8 w-8 p-0"
                  title="Completar"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(activity)}
                className="h-8 w-8 p-0"
                title="Editar"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <h4 className="font-medium text-sm leading-tight break-words">
              {activity.title}
            </h4>
            
            {/* Description */}
            {activity.description && (
              <p className="text-xs text-gray-600 break-words line-clamp-2">
                {activity.description}
              </p>
            )}
          </div>

          {/* Dates and times */}
          <div className="space-y-1 text-xs text-gray-500">
            {getScheduledDateTime() && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 flex-shrink-0" />
                <span className="break-words">Programada: {getScheduledDateTime()}</span>
              </div>
            )}
            
            {getDueDate() && (
              <div className="flex items-center gap-1">
                <Bell className="h-3 w-3 flex-shrink-0" />
                <span className="break-words">Vence: {getDueDate()}</span>
              </div>
            )}

            {activity.completed_at && (
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 flex-shrink-0" />
                <span className="break-words">
                  Completada: {format(new Date(activity.completed_at), 'dd MMM yyyy - HH:mm', { locale: es })}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <span className="break-words">
                Creada: {format(new Date(activity.created_at), 'dd MMM yyyy', { locale: es })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
