
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContactActivity } from '@/types/crm';
import { 
  Clock, 
  Phone, 
  Mail, 
  Users, 
  StickyNote, 
  Bell, 
  ArrowUpDown,
  CheckCircle,
  Edit,
  X,
  Calendar
} from 'lucide-react';
import { formatActivityDate, formatActivityDateTime, isActivityOverdue, isActivityDueSoon } from '@/utils/dateUtils';

interface ActivitiesCardProps {
  activity: ContactActivity;
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
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
  onCancel,
  onEdit,
}) => {
  const isOverdue = isActivityOverdue(activity);
  const isDueSoon = isActivityDueSoon(activity);

  return (
    <Card className={`w-full ${isOverdue ? 'border-red-500 bg-red-50' : isDueSoon ? 'border-orange-500 bg-orange-50' : ''}`}>
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
              {activity.status === 'cancelled' && (
                <Badge variant="outline" className="text-red-600 border-red-200 text-xs flex-shrink-0">
                  <X className="h-3 w-3 mr-1" />
                  Cancelada
                </Badge>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {!activity.is_completed && activity.status !== 'cancelled' && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onComplete(activity.id)}
                    className="h-8 w-8 p-0"
                    title="Completar"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onCancel(activity.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:border-red-300"
                    title="Cancelar"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
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
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span className="break-words">Fecha límite: {formatActivityDate(activity)}</span>
            </div>

            {activity.scheduled_time && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 flex-shrink-0" />
                <span className="break-words">Hora: {activity.scheduled_time.slice(0, 5)}</span>
              </div>
            )}

            {activity.completed_at && (
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 flex-shrink-0" />
                <span className="break-words">
                  Completada: {formatActivityDateTime({ ...activity, scheduled_date: activity.completed_at })}
                </span>
              </div>
            )}

            {(activity as any).tidycal_booking_id && (
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="text-xs">
                  TidyCal #{(activity as any).tidycal_booking_id}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
