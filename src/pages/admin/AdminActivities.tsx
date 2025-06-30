
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, AlertCircle, Phone, Mail, MessageSquare, FileText, Users, X } from 'lucide-react';
import { useActivityOperations } from '@/hooks/crm/useActivityOperations';
import { ActivitiesFilters } from '@/components/admin/activities/ActivitiesFilters';
import { ActivitiesListView } from '@/components/admin/activities/ActivitiesListView';
import { EditActivityDialog } from '@/components/admin/activities/EditActivityDialog';
import { ContactActivity } from '@/types/crm';
import { toast } from '@/hooks/use-toast';

export default function AdminActivities() {
  const [activities, setActivities] = useState<ContactActivity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ContactActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<ContactActivity | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    activityType: '',
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
      setActivities(data);
      setFilteredActivities(data);
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

    if (filters.status) {
      filtered = filtered.filter(activity => activity.status === filters.status);
    }

    if (filters.activityType) {
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

  const handleEditActivity = (activity: ContactActivity) => {
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
    } catch (error) {
      console.error('Error completing activity:', error);
    }
  };

  const handleCancelActivity = async (activityId: string) => {
    try {
      await cancelActivity(activityId);
      await loadActivities();
    } catch (error) {
      console.error('Error cancelling activity:', error);
    }
  };

  // Statistics
  const totalActivities = activities.length;
  const pendingActivities = activities.filter(a => a.status === 'pending').length;
  const completedActivities = activities.filter(a => a.status === 'completed').length;
  const overdueActivities = activities.filter(a => 
    a.status === 'pending' && 
    a.due_date && 
    new Date(a.due_date) < new Date()
  ).length;

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Actividades</h1>
        <p className="text-gray-600">Gestiona todas las actividades programadas</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
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
                <p className="text-sm text-muted-foreground">Pendientes</p>
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
                <p className="text-sm text-muted-foreground">Completadas</p>
                <p className="text-2xl font-bold text-green-600">{completedActivities}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
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
        activities={activities}
      />

      {/* Activities List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Actividades ({filteredActivities.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Cargando actividades...</p>
            </div>
          ) : (
            <ActivitiesListView
              activities={filteredActivities}
              onEditActivity={handleEditActivity}
              onCompleteActivity={handleCompleteActivity}
              onCancelActivity={handleCancelActivity}
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
