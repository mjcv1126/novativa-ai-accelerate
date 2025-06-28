
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Calendar, Clock } from 'lucide-react';
import { ActivitiesCard } from '@/components/admin/activities/ActivitiesCard';
import { useActivitiesData } from '@/hooks/crm/useActivitiesData';
import { useActivityOperations } from '@/hooks/crm/useActivityOperations';
import { supabase } from '@/integrations/supabase/client';

const AdminActivities = () => {
  const [activities, setActivities] = useState<{
    today: any[];
    tomorrow: any[];
    this_week: any[];
    next_week: any[];
    future: any[];
  }>({
    today: [],
    tomorrow: [],
    this_week: [],
    next_week: [],
    future: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today');
  const { fetchAllUpcomingActivities } = useActivitiesData();
  const { markActivityComplete } = useActivityOperations();

  const loadActivities = async () => {
    setLoading(true);
    try {
      const data = await fetchAllUpcomingActivities();
      setActivities(data);
      console.log('Activities loaded:', data);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (activityId: string) => {
    try {
      await markActivityComplete(activityId);
      // Recargar actividades después de marcar como completada
      await loadActivities();
    } catch (error) {
      console.error('Error marking activity as complete:', error);
    }
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
          // Reload activities when any change occurs
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
      today: 'Hoy',
      tomorrow: 'Mañana',
      this_week: 'Esta Semana',
      next_week: 'Próxima Semana',
      future: 'Futuro'
    };
    return `${labels[key as keyof typeof labels]} (${count})`;
  };

  const getTotalActivities = () => {
    return Object.values(activities).reduce((sum: number, arr: any[]) => sum + arr.length, 0);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Total Actividades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getTotalActivities()}</div>
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
        </div>

        {/* Activities Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
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
              ) : activityList.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">No hay actividades programadas para este período</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {activityList.map((activity) => (
                    <ActivitiesCard
                      key={activity.id}
                      activity={activity}
                      onMarkComplete={handleMarkComplete}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default AdminActivities;
