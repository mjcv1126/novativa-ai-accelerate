
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Phone, CheckCircle, Circle, AlertTriangle, Edit, X, RotateCcw } from 'lucide-react';
import { formatActivityDate, formatActivityDateTime, isActivityOverdue, isActivityDueSoon } from '@/utils/dateUtils';
import { ActivityWithContact } from '@/hooks/crm/useActivityOperations';

interface ActivitiesListViewProps {
  activities: ActivityWithContact[];
  onEditActivity: (activity: ActivityWithContact) => void;
  onCompleteActivity: (id: string) => void;
  onCancelActivity: (id: string) => void;
  onUncompleteActivity?: (id: string) => void;
}

export const ActivitiesListView = ({ 
  activities, 
  onEditActivity,
  onCompleteActivity, 
  onCancelActivity,
  onUncompleteActivity
}: ActivitiesListViewProps) => {
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

  // Función para determinar si una actividad tiene fecha límite
  const hasDeadline = (activity: ActivityWithContact) => {
    return !!(activity.due_date || activity.scheduled_date);
  };

  // Función para determinar si una actividad puede ser accionada (solo las que tienen fecha límite)
  const canBeActioned = (activity: ActivityWithContact) => {
    return hasDeadline(activity);
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
            <TableHead>Fecha Límite</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>TidyCal</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity) => {
            const isOverdue = isActivityOverdue(activity);
            const isDueSoon = isActivityDueSoon(activity);
            const isActionable = canBeActioned(activity);
            const hasDeadlineDate = hasDeadline(activity);
            
            return (
              <TableRow 
                key={activity.id} 
                className={
                  isOverdue ? 'bg-red-50' : 
                  isDueSoon ? 'bg-orange-50' : ''
                }
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {isOverdue && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    {activity.is_completed ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : activity.status === 'cancelled' ? (
                      <X className="h-4 w-4 text-red-600" />
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
                  {hasDeadlineDate ? (
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {formatActivityDate(activity)}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Sin fecha límite</span>
                  )}
                </TableCell>
                
                <TableCell>
                  {activity.scheduled_time && (
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {activity.scheduled_time.slice(0, 5)}
                    </div>
                  )}
                </TableCell>

                <TableCell>
                  {activity.tidycal_booking_id && (
                    <Badge variant="outline" className="text-xs">
                      #{activity.tidycal_booking_id}
                    </Badge>
                  )}
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    {/* Botón de editar siempre disponible para actividades programadas */}
                    {hasDeadlineDate && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditActivity(activity)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {/* Botones de acción solo para actividades con fecha límite */}
                    {isActionable && (
                      <>
                        {activity.is_completed ? (
                          // Si está completada, mostrar botón para desmarcar
                          onUncompleteActivity && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onUncompleteActivity(activity.id)}
                              className="text-blue-600 hover:text-blue-700 hover:border-blue-300"
                            >
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Reabrir
                            </Button>
                          )
                        ) : activity.status !== 'cancelled' ? (
                          // Si está pendiente, mostrar botones de completar y cancelar
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onCompleteActivity(activity.id)}
                              className="text-green-600 hover:text-green-700 hover:border-green-300"
                            >
                              Completar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onCancelActivity(activity.id)}
                              className="text-red-600 hover:text-red-700 hover:border-red-300"
                            >
                              Cancelar
                            </Button>
                          </>
                        ) : null}
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
