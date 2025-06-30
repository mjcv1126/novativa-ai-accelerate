
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Phone, Mail, Calendar, MessageSquare, CheckCircle, AlertCircle, User } from 'lucide-react';
import { ContactActivity } from '@/types/crm';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ActivityTimelineProps {
  activities: ContactActivity[];
  onEditActivity?: (activity: ContactActivity) => void;
  onCompleteActivity?: (activityId: string) => void;
}

export const ActivityTimeline = ({ activities, onEditActivity, onCompleteActivity }: ActivityTimelineProps) => {
  const getActivityIcon = (type: ContactActivity['activity_type']) => {
    switch (type) {
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'meeting':
        return <Calendar className="h-4 w-4" />;
      case 'note':
        return <MessageSquare className="h-4 w-4" />;
      case 'status_change':
        return <User className="h-4 w-4" />;
      case 'reminder':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: ContactActivity['activity_type']) => {
    switch (type) {
      case 'call':
        return 'bg-green-500';
      case 'email':
        return 'bg-blue-500';
      case 'meeting':
        return 'bg-purple-500';
      case 'note':
        return 'bg-yellow-500';
      case 'status_change':
        return 'bg-gray-500';
      case 'reminder':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusBadge = (status: ContactActivity['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completada</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelada</Badge>;
      case 'pending':
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
    }
  };

  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>Timeline de Actividades</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedActivities.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay actividades registradas</p>
        ) : (
          <div className="space-y-4">
            {sortedActivities.map((activity, index) => (
              <div key={activity.id} className="relative">
                {/* Línea del timeline */}
                {index < sortedActivities.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-full bg-gray-200 -z-10"></div>
                )}
                
                <div className="flex items-start gap-4">
                  {/* Icono de la actividad */}
                  <div className={`${getActivityColor(activity.activity_type)} rounded-full p-2 text-white flex-shrink-0`}>
                    {getActivityIcon(activity.activity_type)}
                  </div>
                  
                  {/* Contenido de la actividad */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{activity.title}</h4>
                        {activity.description && (
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        )}
                        
                        {/* Fecha y hora programada */}
                        {activity.scheduled_date && (
                          <div className="text-xs text-gray-500 mt-2">
                            Programada: {format(new Date(activity.scheduled_date), 'dd MMM yyyy', { locale: es })}
                            {activity.scheduled_time && ` a las ${activity.scheduled_time}`}
                          </div>
                        )}
                        
                        {/* Fecha vencimiento */}
                        {activity.due_date && (
                          <div className="text-xs text-gray-500 mt-1">
                            Vence: {format(new Date(activity.due_date), 'dd MMM yyyy HH:mm', { locale: es })}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {getStatusBadge(activity.status)}
                        {onEditActivity && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onEditActivity(activity)}
                          >
                            Editar
                          </Button>
                        )}
                        {activity.status === 'pending' && onCompleteActivity && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onCompleteActivity(activity.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Timestamp */}
                    <div className="text-xs text-gray-400 mt-2">
                      {format(new Date(activity.created_at), 'dd MMM yyyy HH:mm', { locale: es })}
                      {activity.completed_at && (
                        <span className="ml-2">
                          • Completada: {format(new Date(activity.completed_at), 'dd MMM yyyy HH:mm', { locale: es })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
