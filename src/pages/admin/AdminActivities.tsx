import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Calendar, Clock, List, Grid3X3, AlertTriangle } from 'lucide-react';
import { ActivitiesCard } from '@/components/admin/activities/ActivitiesCard';
import { ActivitiesListView } from '@/components/admin/activities/ActivitiesListView';
import { ActivitiesFilters } from '@/components/admin/activities/ActivitiesFilters';
import { EditActivityDialog } from '@/components/admin/activities/EditActivityDialog';
import { useActivitiesData } from '@/hooks/crm/useActivitiesData';
import { useActivityOperations } from '@/hooks/crm/useActivityOperations';
import { supabase } from '@/integrations/supabase/client';

const AdminActivities = () => {
  const [activities, setActivities] = useState<{
    all: any[];
    today: any[];
    tomorrow: any[];
    this_week: any[];
    next_week: any[];
    future: any[];
    overdue: any[];
  }>({
    all: [],
    today: [],
    tomorrow: [],
    this_week: [],
    next_week: [],
    future: [],
    overdue: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('pending'); // Por defecto mostrar solo pendientes
  const [sortBy, setSortBy] = useState('scheduled_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Dialog de edición
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { fetchAllUpcomingActivities } = useActivitiesData();
  const { markActivityComplete, cancelActivity } = useActivityOperations();

  const isActivityOverdue = (activity: any) => {
    if (activity.status === 'completed' || activity.status === 'cancelled') return false;
    
    const now = new Date();
    const scheduledDate = new Date(activity.scheduled_date);
    
    if (activity.scheduled_time) {
      const [hours, minutes] = activity.scheduled_time.split(':').map(Number);
      const scheduledDateTime = new Date(scheduledDate);
      scheduledDateTime.setHours(hours, minutes, 0, 0);
      
      return scheduledDateTime < now;
    } else {
      // Si no hay hora, comparar solo fechas (retrasada si la fecha ya pasó completamente)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      scheduledDate.setHours(0, 0, 0, 0);
      
      return scheduledDate < today;
    }
  };

  const isActivityDueSoon = (activity: any) => {
    if (activity.status === 'completed' || activity.status === 'cancelled') return false;
    
    const now = new Date();
    const scheduledDate = new Date(activity.scheduled_date);
    
    if (activity.scheduled_time) {
      const [hours, minutes] = activity.scheduled_time.split(':').map(Number);
      const scheduledDateTime = new Date(scheduledDate);
      scheduledDateTime.setHours(hours, minutes, 0, 0);
      
      // Próxima a vencer si falta menos de 2 horas
      const timeDiff = scheduledDateTime.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);
      
      return hoursDiff > 0 && hoursDiff <= 2;
    } else {
      // Si no hay hora, verificar si es hoy
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      scheduledDate.setHours(0, 0, 0, 0);
      
      return scheduledDate.getTime() === today.getTime();
    }
  };

  const loadActivities = async () => {
    setLoading(true);
    try {
      // Cargar todas las actividades sin filtrar por estado para poder mostrar estadísticas completas
      const { data: allData, error } = await supabase
        .from('contact_activities')
        .select(`
          *,
          contact:contacts(*)
        `)
        .not('scheduled_date', 'is', null)
        .order('scheduled_date', { ascending: true })
        .order('scheduled_time', { ascending: true });

      if (error) throw error;

      // Separar por estado
      const pendingActivities = (allData || []).filter(activity => 
        (activity.status || 'pending') === 'pending'
      );

      // Identificar actividades retrasadas
      const overdueActivities = pendingActivities.filter(activity => isActivityOverdue(activity));
      
      // Agrupar actividades pendientes por timeframe
      const data = await fetchAllUpcomingActivities();
      
      // Crear el array "all" solo con actividades pendientes (no completadas ni canceladas)
      const allPendingActivities = [
        ...data.today,
        ...data.tomorrow,
        ...data.this_week,
        ...data.next_week,
        ...data.future
      ];
      
      setActivities({
        all: allPendingActivities,
        overdue: overdueActivities,
        ...data
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (activityId: string) => {
    try {
      await markActivityComplete(activityId);
      await loadActivities();
    } catch (error) {
      console.error('Error marking activity as complete:', error);
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

  const handleEditActivity = (activity: any) => {
    setEditingActivity(activity);
    setIsEditDialogOpen(true);
  };

  const handleActivityUpdated = () => {
    loadActivities();
  };

  const filterAndSortActivities = (activitiesList: any[]) => {
    let filtered = [...activitiesList];

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${activity.contact.first_name} ${activity.contact.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por tipo de actividad
    if (activityTypeFilter !== 'all') {
      filtered = filtered.filter(activity => activity.activity_type === activityTypeFilter);
    }

    // Filtrar por estado
    if (statusFilter !== 'all') {
      switch (statusFilter) {
        case 'completed':
          filtered = filtered.filter(activity => (activity.status || 'pending') === 'completed');
          break;
        case 'cancelled':
          filtered = filtered.filter(activity => (activity.status || 'pending') === 'cancelled');
          break;
        case 'pending':
          filtered = filtered.filter(activity => (activity.status || 'pending') === 'pending');
          break;
        case 'overdue':
          filtered = filtered.filter(activity => isActivityOverdue(activity));
          break;
      }
    }

    // Ordenar
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'activity_type':
          aValue = a.activity_type;
          bValue = b.activity_type;
          break;
        case 'created_at':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        default: // scheduled_date
          aValue = new Date(a.scheduled_date);
          bValue = new Date(b.scheduled_date);
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  useEffect(() => {
    loadActivities();
  }, []);

  // Set up real-time subscription for activities
  useEffect(() => {
    console.log('Setting up real-time subscription for activities');
    
    const channel = supabase
      .channel('activities-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_activities'
        },
        (payload) => {
          console.log('Activity change detected:', payload);
          loadActivities();
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  const getTabLabel = (key: string, count: number) => {
    const labels = {
      all: 'Todas',
      today: 'Hoy',
      tomorrow: 'Mañana',
      this_week: 'Esta Semana',
      next_week: 'Próxima Semana',
      future: 'Futuro',
      overdue: 'Retrasadas'
    };
    return `${labels[key as keyof typeof labels]} (${count})`;
  };

  const currentActivities = filterAndSortActivities(activities[activeTab as keyof typeof activities] || []);

  return (
    <>
      <Helmet>
        <title>Actividades | Panel Admin Novativa</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Actividades Programadas</h1>
            <p className="text-gray-600">Gestiona las actividades de seguimiento del CRM</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadActivities}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Total Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.all.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-500" />
                Hoy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{activities.today.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                Mañana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{activities.tomorrow.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                Esta Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activities.this_week.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                Retrasadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{activities.overdue.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <ActivitiesFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activityTypeFilter={activityTypeFilter}
          onActivityTypeChange={setActivityTypeFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          activities={currentActivities}
        />

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex items-center gap-2"
            >
              <Grid3X3 className="h-4 w-4" />
              <span>Bloques</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              <span>Lista</span>
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            {loading ? 'Cargando...' : `${currentActivities.length} actividades`}
          </div>
        </div>

        {/* Activities Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            {Object.entries(activities).map(([key, activityList]) => (
              <TabsTrigger key={key} value={key} className="text-xs">
                {getTabLabel(key, activityList.length)}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(activities).map(([key, activityList]) => (
            <TabsContent key={key} value={key} className="mt-6">
              {loading ? (
                <div className="text-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">Cargando actividades...</p>
                </div>
              ) : currentActivities.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">No hay actividades para mostrar</p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {currentActivities.map((activity) => (
                    <ActivitiesCard
                      key={activity.id}
                      activity={activity}
                      onComplete={handleMarkComplete}
                      onCancel={handleCancelActivity}
                      onEdit={handleEditActivity}
                    />
                  ))}
                </div>
              ) : (
                <ActivitiesListView
                  activities={currentActivities}
                  onMarkComplete={handleMarkComplete}
                  onCancelActivity={handleCancelActivity}
                  onEditActivity={handleEditActivity}
                />
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Edit Activity Dialog */}
        <EditActivityDialog
          activity={editingActivity}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditingActivity(null);
          }}
          onActivityUpdated={handleActivityUpdated}
        />
      </div>
    </>
  );
};

export default AdminActivities;
