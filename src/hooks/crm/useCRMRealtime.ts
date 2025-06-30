
import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ContactWithStage } from '@/types/crm';

interface UseCRMRealtimeProps {
  onContactUpdate: () => void;
  onActivityUpdate: () => void;
}

export const useCRMRealtime = ({ onContactUpdate, onActivityUpdate }: UseCRMRealtimeProps) => {
  const subscribeToRealtime = useCallback(() => {
    // Suscribirse a cambios en contactos
    const contactsChannel = supabase
      .channel('contacts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contacts'
        },
        (payload) => {
          console.log('Contact change detected:', payload);
          onContactUpdate();
        }
      )
      .subscribe();

    // Suscribirse a cambios en actividades
    const activitiesChannel = supabase
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
          onActivityUpdate();
        }
      )
      .subscribe();

    // Suscribirse a cambios en etapas
    const stagesChannel = supabase
      .channel('stages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'crm_stages'
        },
        (payload) => {
          console.log('Stage change detected:', payload);
          onContactUpdate();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(contactsChannel);
      supabase.removeChannel(activitiesChannel);
      supabase.removeChannel(stagesChannel);
    };
  }, [onContactUpdate, onActivityUpdate]);

  useEffect(() => {
    const unsubscribe = subscribeToRealtime();
    return unsubscribe;
  }, [subscribeToRealtime]);
};
