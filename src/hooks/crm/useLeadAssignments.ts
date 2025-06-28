
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LeadAssignment } from '@/types/crm';
import { toast } from '@/components/ui/use-toast';

export const useLeadAssignments = () => {
  const getCurrentUserEmail = useCallback(() => {
    const adminUser = localStorage.getItem('admin_user');
    if (adminUser) {
      try {
        const user = JSON.parse(adminUser);
        return user.email || 'soporte@novativa.org';
      } catch (error) {
        console.error('Error parsing admin user:', error);
      }
    }
    return 'soporte@novativa.org';
  }, []);

  const getContactAssignment = useCallback(async (contactId: string): Promise<LeadAssignment | null> => {
    try {
      console.log('Fetching assignment for contact:', contactId);
      const { data, error } = await supabase
        .from('lead_assignments')
        .select('*')
        .eq('contact_id', contactId)
        .order('assigned_at', { ascending: false })
        .limit(1)
        .maybeSingle(); // Cambiar a maybeSingle para evitar errores cuando no hay datos

      if (error) {
        console.error('Error fetching contact assignment:', error);
        return null;
      }

      console.log('Assignment data received:', data);
      return data;
    } catch (error) {
      console.error('Error fetching contact assignment:', error);
      return null;
    }
  }, []);

  const assignLead = useCallback(async (contactId: string, assignedUserEmail: string, notes?: string) => {
    try {
      const currentUserEmail = getCurrentUserEmail();
      
      console.log('Creating assignment:', {
        contact_id: contactId,
        assigned_user_email: assignedUserEmail,
        assigned_by_email: currentUserEmail,
        notes: notes || 'Asignación manual'
      });

      const { data, error } = await supabase
        .from('lead_assignments')
        .insert([{
          contact_id: contactId,
          assigned_user_email: assignedUserEmail,
          assigned_by_email: currentUserEmail,
          notes: notes || 'Asignación manual'
        }])
        .select()
        .single();

      if (error) {
        console.error('Error assigning lead:', error);
        throw error;
      }

      console.log('Assignment created successfully:', data);

      toast({
        title: "Asignación exitosa",
        description: `Lead asignado a ${assignedUserEmail}`,
      });

      return true;
    } catch (error) {
      console.error('Error assigning lead:', error);
      toast({
        title: "Error",
        description: "No se pudo asignar el lead",
        variant: "destructive",
      });
      return false;
    }
  }, [getCurrentUserEmail]);

  const getAvailableUsers = useCallback(() => {
    // Obtener usuarios disponibles desde localStorage
    const adminUsers = JSON.parse(localStorage.getItem('admin_users') || '[]');
    const defaultUsers = [
      { email: 'soporte@novativa.org', name: 'Soporte Técnico' },
      { email: 'dcuellar@novativa.org', name: 'D. Cuellar' }
    ];
    
    const localUsers = adminUsers.map((user: any) => ({
      email: user.email,
      name: `${user.email.split('@')[0]}`
    }));

    return [...defaultUsers, ...localUsers].filter((user, index, arr) => 
      arr.findIndex(u => u.email === user.email) === index
    );
  }, []);

  return {
    getCurrentUserEmail,
    getContactAssignment,
    assignLead,
    getAvailableUsers,
  };
};
