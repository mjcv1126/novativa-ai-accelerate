
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContactActivity, ActivityFilters } from '@/types/crm';
import { toast } from '@/components/ui/use-toast';

export const useActivitiesData = () => {
  const getActivityTimeframe = (date: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const thisWeekEnd = new Date(today);
    thisWeekEnd.setDate(today.getDate() + (7 - today.getDay()));
    
    const nextWeekStart = new Date(thisWeekEnd);
    nextWeekStart.setDate(thisWeekEnd.getDate() + 1);
    
    const nextWeekEnd = new Date(nextWeekStart);
    nextWeekEnd.setDate(nextWeekStart.getDate() + 6);
    
    const activityDate = new Date(date);
    activityDate.setHours(0, 0, 0, 0);
    
    if (activityDate.getTime() === today.getTime()) {
      return 'today';
    } else if (activityDate.getTime() === tomorrow.getTime()) {
      return 'tomorrow';
    } else if (activityDate >= today && activityDate <= thisWeekEnd) {
      return 'this_week';
    } else if (activityDate >= nextWeekStart && activityDate <= nextWeekEnd) {
      return 'next_week';
    } else {
      return 'future';
    }
  };

  const fetchActivitiesByTimeframe = useCallback(async (filters: ActivityFilters) => {
    try {
      let query = supabase
        .from('contact_activities')
        .select(`
          *,
          contact:contacts(*)
        `)
        .not('scheduled_date', 'is', null)
        .order('scheduled_date', { ascending: true })
        .order('scheduled_time', { ascending: true });

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const thisWeekEnd = new Date(today);
      thisWeekEnd.setDate(today.getDate() + (7 - today.getDay()));
      
      const nextWeekStart = new Date(thisWeekEnd);
      nextWeekStart.setDate(thisWeekEnd.getDate() + 1);
      
      const nextWeekEnd = new Date(nextWeekStart);
      nextWeekEnd.setDate(nextWeekStart.getDate() + 6);

      switch (filters.timeframe) {
        case 'today':
          query = query.eq('scheduled_date', today.toISOString().split('T')[0]);
          break;
        case 'tomorrow':
          query = query.eq('scheduled_date', tomorrow.toISOString().split('T')[0]);
          break;
        case 'this_week':
          query = query
            .gte('scheduled_date', today.toISOString().split('T')[0])
            .lte('scheduled_date', thisWeekEnd.toISOString().split('T')[0]);
          break;
        case 'next_week':
          query = query
            .gte('scheduled_date', nextWeekStart.toISOString().split('T')[0])
            .lte('scheduled_date', nextWeekEnd.toISOString().split('T')[0]);
          break;
        case 'future':
          const futureDate = new Date(nextWeekEnd);
          futureDate.setDate(futureDate.getDate() + 1);
          query = query.gte('scheduled_date', futureDate.toISOString().split('T')[0]);
          break;
      }

      if (filters.activity_type) {
        query = query.eq('activity_type', filters.activity_type);
      }

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las actividades",
        variant: "destructive",
      });
      return [];
    }
  }, []);

  const fetchAllUpcomingActivities = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('contact_activities')
        .select(`
          *,
          contact:contacts(*)
        `)
        .not('scheduled_date', 'is', null)
        .order('scheduled_date', { ascending: true })
        .order('scheduled_time', { ascending: true });

      if (error) throw error;

      // Filtrar solo actividades pendientes por defecto
      const pendingActivities = (data || []).filter(activity => 
        (activity.status || 'pending') === 'pending'
      );

      const grouped = {
        today: [] as any[],
        tomorrow: [] as any[],
        this_week: [] as any[],
        next_week: [] as any[],
        future: [] as any[]
      };

      pendingActivities.forEach(activity => {
        if (activity.scheduled_date) {
          const timeframe = getActivityTimeframe(activity.scheduled_date);
          grouped[timeframe as keyof typeof grouped].push(activity);
        }
      });

      return grouped;
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las actividades",
        variant: "destructive",
      });
      return {
        today: [],
        tomorrow: [],
        this_week: [],
        next_week: [],
        future: []
      };
    }
  }, []);

  return {
    fetchActivitiesByTimeframe,
    fetchAllUpcomingActivities,
  };
};
