
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, AlertCircle, Phone, Mail, MessageSquare, FileText, Users, X } from 'lucide-react';
import { useActivityOperations, ActivityWithContact } from '@/hooks/crm/useActivityOperations';
import { ActivitiesFilters } from '@/components/admin/activities/ActivitiesFilters';
import { ActivitiesListView } from '@/components/admin/activities/ActivitiesListView';
import { EditActivityDialog } from '@/components/admin/activities/EditActivityDialog';
import { ContactActivity } from '@/types/crm';
import { toast } from '@/hooks/use-toast';

export default function AdminActivities() {
  const [activities, setActivities] = useState<ActivityWithContact[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityWithContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<ActivityWithContact | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [filters, setFilters] = useState({
    status: 'pending', // Filtro automático para solo mostrar pendientes
    activityType: 'all',
    dateRange: { from: null, to: null }
  });

  const { 
    fetchAllActivities, 
    updateActivity, 
    markActivityComplete, 
    cancelActivity 
  } = useActivityOperations();

  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await fetchAllActivities();
      
      // Filtrar solo actividades con deadline (que tienen due_date o scheduled_date)
      // Y excluir actividades completadas y canceladas
      const activitiesWithDeadline = data.filter(activity => 
        (activity.due_date || activity.scheduled_date) &&
        activity.status === 'pending' &&
        !activity.is_completed
      );
      
      setActivities(activitiesWithDeadline);
      setFilteredActivities(activitiesWithDeadline);
    } catch (error) {
      console.error('Error loading activities:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las actividades",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...activities];

    // El filtro de estado ahora es fijo en 'pending', pero mantenemos la lógica por compatibilidad
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(activity => activity.status === filters.status);
    }

    if (filters.activityType && filters.activityType !== 'all') {
      filtered = filtered.filter(activity => activity.activity_type === filters.activityType);
    }

    if (filters.dateRange?.from) {
      filtered = filtered.filter(activity => 
        new Date(activity.due_date || activity.created_at) >= new Date(filters.dateRange.from!)
      );
    }

    if (filters.dateRange?.to) {
      filtered = filtered.filter(activity => 
        new Date(activity.due_date || activity.created_at) <= new Date(filters.dateRange.to!)
      );
    }

    setFilteredActivities(filtered);
  }, [activities, filters]);

  const handleEditActivity = (activity: ActivityWithContact) => {
    setSelectedActivity(activity);
    setShowEditDialog(true);
  };

  const handleSaveActivity = async (activityData: Partial<ContactActivity>) => {
    if (!selectedActivity) return;

    try {
      await updateActivity(selectedActivity.id, activityData);
      await loadActivities();
      setShowEditDialog(false);
      setSelectedActivity(null);
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const handleCompleteActivity = async (activityId: string) => {
    try {
      await markActivityComplete(activityId);
      await loadActivities();
      toast({
        title: "Éxito",
        description: "Actividad marcada como completada",
      });
    } catch (error) {
      console.error('Error completing activity:', error);
    }
  };

  const handleCancelActivity = async (activityId: string) => {
    try {
      await cancelActivity(activityId);
      await loadActivities();
      toast({
        title: "Éxito",
        description: "Actividad cancelada",
      });
    } catch (error) {
      console.error('Error cancelling activity:', error);
    }
  };

  const handleUncompleteActivity = async (activityId: string) => {
    try {
      await updateActivity(activityId, { 
        is_completed: false,
        status: 'pending',
        completed_at: null 
      });
      await loadActivities();
      toast({
        title: "Éxito",
        description: "Actividad reabierta",
      });
    } catch (error) {
      console.error('Error uncompleting activity:', error);
      toast({
        title: "Error",
        description: "No se pudo reabrir la actividad",
        variant: "destructive",
      });
    }
  };

  // Statistics - solo contar actividades pendientes con deadline
  const totalActivities = activities.length;
  const pendingActivities = activities.filter(a => a.status === 'pending').length;
  const overdueActivities = activities.filter(a => 
    a.status === 'pending' && 
    a.due_date && 
    new Date(a.due_date) < new Date()
  ).length;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Actividades Pendientes</h1>
        <p className="text-gray-600">Gestiona actividades pendientes con fecha límite</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pendientes</p>
                <p className="text-2xl font-bold">{totalActivities}</p>
              </div>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Por Vencer</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingActivities}</p>
              </div>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vencidas</p>
                <p className="text-2xl font-bold text-red-600">{overdueActivities}</p>
              </div>
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <ActivitiesFilters 
        filters={filters}
        onFiltersChange={setFilters}
        activities={filteredActivities}
      />

      {/* Activities List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Actividades Pendientes ({filteredActivities.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando actividades...</p>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No se encontraron actividades pendientes</p>
            </div>
          ) : (
            <ActivitiesListView
              activities={filteredActivities}
              onEditActivity={handleEditActivity}
              onCompleteActivity={handleCompleteActivity}
              onCancelActivity={handleCancelActivity}
              onUncompleteActivity={handleUncompleteActivity}
            />
          )}
        </CardContent>
      </Card>

      {/* Edit Activity Dialog */}
      <EditActivityDialog
        activity={selectedActivity}
        isOpen={showEditDialog}
        onClose={() => {
          setShowEditDialog(false);
          setSelectedActivity(null);
        }}
        onSave={handleSaveActivity}
      />
    </div>
  );
}
