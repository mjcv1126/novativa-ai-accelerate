
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContactActivity } from '@/types/crm';
import { toast } from '@/components/ui/use-toast';

export const useActivityOperations = () => {
  const fetchContactActivities = useCallback(async (contactId: string): Promise<ContactActivity[]> => {
    try {
      const { data, error } = await supabase
        .from('contact_activities')
        .select('*')
        .eq('contact_id', contactId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our ContactActivity type
      return (data || []).map(activity => ({
        ...activity,
        activity_type: activity.activity_type as ContactActivity['activity_type']
      }));
    } catch (error) {
      console.error('Error fetching contact activities:', error);
      return [];
    }
  }, []);

  const createActivity = useCallback(async (activityData: Omit<ContactActivity, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('contact_activities')
        .insert([activityData]);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Actividad creada correctamente",
      });
    } catch (error) {
      console.error('Error creating activity:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la actividad",
        variant: "destructive",
      });
    }
  }, []);

  return {
    fetchContactActivities,
    createActivity,
  };
};
