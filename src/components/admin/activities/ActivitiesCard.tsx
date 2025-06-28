
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Phone, CheckCircle, Circle } from 'lucide-react';

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

interface ActivitiesCardProps {
  activity: Activity;
  onMarkComplete: (id: string) => void;
}

export const ActivitiesCard = ({ activity, onMarkComplete }: ActivitiesCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit'
    });
  };

  const formatTime = (timeString?: string) => {
    if (!timeString) return '';
    return timeString.slice(0, 5); // Format HH:MM
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

  return (
    <Card className={`hover:shadow-md transition-shadow ${activity.is_completed ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getActivityTypeColor(activity.activity_type)}>
                {getActivityTypeLabel(activity.activity_type)}
              </Badge>
              {activity.is_completed ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Circle className="h-4 w-4 text-gray-400" />
              )}
            </div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              {activity.title}
            </CardTitle>
            {activity.description && (
              <p className="text-sm text-gray-600 mt-1">
                {activity.description}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(activity.scheduled_date)}</span>
          </div>
          {activity.scheduled_time && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatTime(activity.scheduled_time)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium">
              {activity.contact.first_name} {activity.contact.last_name}
            </span>
            <Phone className="h-3 w-3 text-gray-400 ml-2" />
            <span className="text-gray-500">{activity.contact.phone}</span>
          </div>

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
      </CardContent>
    </Card>
  );
};
