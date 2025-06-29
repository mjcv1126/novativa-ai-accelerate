import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Contact, ContactWithStage, CrmFilters } from '@/types/crm';
import { toast } from '@/components/ui/use-toast';

export const useContactOperations = () => {
  const getCurrentUserEmail = () => {
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
  };

  const fetchContacts = useCallback(async (filters: CrmFilters): Promise<ContactWithStage[]> => {
    try {
      let query = supabase
        .from('contacts')
        .select(`
          *,
          stage:crm_stages(*)
        `)
        .order('created_at', { ascending: false });

      // Apply search filters
      if (filters.search && filters.search.trim()) {
        const searchTerm = filters.search.trim();
        const cleanSearchTerm = searchTerm.replace(/[\s\-\(\)\+]/g, '');
        
        console.log('Searching for:', searchTerm, 'Clean term:', cleanSearchTerm);
        
        // Use a more flexible approach with individual queries
        const searchPromises = [];
        
        // Search by name
        searchPromises.push(
          supabase
            .from('contacts')
            .select(`*, stage:crm_stages(*)`)
            .or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`)
        );
        
        // Search by email (both main and additional emails)
        if (searchTerm.includes('@') || searchTerm.length >= 3) {
          searchPromises.push(
            supabase
              .from('contacts')
              .select(`*, stage:crm_stages(*)`)
              .or(`email.ilike.%${searchTerm}%,additional_emails.cs.{${searchTerm}}`)
          );
        }
        
        // Search by phone (clean version) - both main and additional phones
        if (cleanSearchTerm.length >= 3) {
          searchPromises.push(
            supabase
              .from('contacts')
              .select(`*, stage:crm_stages(*)`)
              .or(`phone.ilike.%${cleanSearchTerm}%,phone.ilike.%${searchTerm}%,additional_phones.cs.{${cleanSearchTerm}},additional_phones.cs.{${searchTerm}}`)
          );
        }
        
        // Search by company, country, notes
        searchPromises.push(
          supabase
            .from('contacts')
            .select(`*, stage:crm_stages(*)`)
            .or(`company.ilike.%${searchTerm}%,country_name.ilike.%${searchTerm}%,country_code.ilike.%${searchTerm}%,notes.ilike.%${searchTerm}%,service_of_interest.ilike.%${searchTerm}%`)
        );
        
        // Search by ID if it looks like a UUID
        if (searchTerm.length >= 8) {
          searchPromises.push(
            supabase
              .from('contacts')
              .select(`*, stage:crm_stages(*)`)
              .ilike('id', `${searchTerm}%`)
          );
        }
        
        // Execute all searches in parallel
        const results = await Promise.all(searchPromises);
        
        // Combine and deduplicate results
        const allContacts = new Map();
        results.forEach(({ data }) => {
          if (data) {
            data.forEach((contact: any) => {
              allContacts.set(contact.id, contact);
            });
          }
        });
        
        const uniqueContacts = Array.from(allContacts.values());
        console.log('Search results found:', uniqueContacts.length, 'contacts');
        
        // Apply other filters if they exist
        let filteredContacts = uniqueContacts;
        
        if (filters.stage_id) {
          filteredContacts = filteredContacts.filter((contact: any) => contact.stage_id === filters.stage_id);
        }
        
        if (filters.country) {
          filteredContacts = filteredContacts.filter((contact: any) => contact.country_name === filters.country);
        }
        
        if (filters.service_of_interest) {
          filteredContacts = filteredContacts.filter((contact: any) => contact.service_of_interest === filters.service_of_interest);
        }
        
        if (filters.date_range?.from) {
          filteredContacts = filteredContacts.filter((contact: any) => new Date(contact.created_at) >= new Date(filters.date_range!.from!));
        }
        
        if (filters.date_range?.to) {
          filteredContacts = filteredContacts.filter((contact: any) => new Date(contact.created_at) <= new Date(filters.date_range!.to!));
        }
        
        // Get assignments for each contact
        const contactsWithAssignments = await Promise.all(
          filteredContacts.map(async (contact: any) => {
            const { data: assignment } = await supabase
              .from('lead_assignments')
              .select('*')
              .eq('contact_id', contact.id)
              .order('assigned_at', { ascending: false })
              .limit(1)
              .single();

            return {
              ...contact,
              assignment: assignment || null
            };
          })
        );
        
        // Sort by relevance
        return contactsWithAssignments.sort((a, b) => {
          const scoreA = calculateRelevanceScore(a, searchTerm);
          const scoreB = calculateRelevanceScore(b, searchTerm);
          return scoreB - scoreA;
        });
      }

      // No search term, apply other filters normally
      if (filters.stage_id) {
        query = query.eq('stage_id', filters.stage_id);
      }

      if (filters.country) {
        query = query.eq('country_name', filters.country);
      }

      if (filters.service_of_interest) {
        query = query.eq('service_of_interest', filters.service_of_interest);
      }

      if (filters.date_range?.from) {
        query = query.gte('created_at', filters.date_range.from);
      }

      if (filters.date_range?.to) {
        query = query.lte('created_at', filters.date_range.to);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error in query:', error);
        throw error;
      }

      console.log('Results without search:', data?.length || 0, 'contacts found');

      // Get assignments for each contact
      const contactsWithAssignments = await Promise.all(
        (data || []).map(async (contact) => {
          const { data: assignment } = await supabase
            .from('lead_assignments')
            .select('*')
            .eq('contact_id', contact.id)
            .order('assigned_at', { ascending: false })
            .limit(1)
            .single();

          return {
            ...contact,
            assignment: assignment || null
          };
        })
      );

      return contactsWithAssignments;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los contactos",
        variant: "destructive",
      });
      return [];
    }
  }, []);

  // Función para calcular puntuación de relevancia
  const calculateRelevanceScore = (contact: ContactWithStage, searchTerm: string): number => {
    let score = 0;
    const term = searchTerm.toLowerCase();
    const cleanTerm = term.replace(/[\s\-\(\)\+]/g, '');
    const cleanPhone = contact.phone?.replace(/[\s\-\(\)\+]/g, '') || '';
    
    // Coincidencias exactas (máxima puntuación)
    if (contact.first_name?.toLowerCase() === term) score += 100;
    if (contact.last_name?.toLowerCase() === term) score += 100;
    if (contact.email?.toLowerCase() === term) score += 100;
    if (cleanPhone === cleanTerm) score += 95;
    if (contact.company?.toLowerCase() === term) score += 80;
    
    // Coincidencias al inicio (alta puntuación)
    if (contact.first_name?.toLowerCase().startsWith(term)) score += 70;
    if (contact.last_name?.toLowerCase().startsWith(term)) score += 70;
    if (contact.email?.toLowerCase().startsWith(term)) score += 60;
    if (cleanPhone.startsWith(cleanTerm)) score += 85;
    if (contact.company?.toLowerCase().startsWith(term)) score += 50;
    
    // Coincidencias parciales (puntuación media)
    if (contact.first_name?.toLowerCase().includes(term)) score += 40;
    if (contact.last_name?.toLowerCase().includes(term)) score += 40;
    if (contact.email?.toLowerCase().includes(term)) score += 30;
    if (cleanPhone.includes(cleanTerm)) score += 60;
    if (contact.company?.toLowerCase().includes(term)) score += 25;
    if (contact.country_name?.toLowerCase().includes(term)) score += 20;
    if (contact.notes?.toLowerCase().includes(term)) score += 15;
    if (contact.service_of_interest?.toLowerCase().includes(term)) score += 20;
    
    // Búsqueda en correos adicionales
    if (contact.additional_emails) {
      contact.additional_emails.forEach(email => {
        if (email.toLowerCase() === term) score += 90;
        if (email.toLowerCase().startsWith(term)) score += 55;
        if (email.toLowerCase().includes(term)) score += 25;
      });
    }
    
    // Búsqueda en teléfonos adicionales
    if (contact.additional_phones) {
      contact.additional_phones.forEach(phone => {
        const cleanAdditionalPhone = phone.replace(/[\s\-\(\)\+]/g, '');
        if (cleanAdditionalPhone === cleanTerm) score += 90;
        if (cleanAdditionalPhone.startsWith(cleanTerm)) score += 80;
        if (cleanAdditionalPhone.includes(cleanTerm)) score += 55;
      });
    }
    
    // Búsqueda por ID
    if (contact.id.toLowerCase().startsWith(term)) score += 50;
    if (contact.id.toLowerCase().includes(term)) score += 25;
    
    return score;
  };

  const updateContact = useCallback(async (id: string, updates: Partial<Contact>) => {
    try {
      const currentUserEmail = getCurrentUserEmail();
      
      // Limpiar campos de arrays vacíos
      const cleanUpdates = {
        ...updates,
        additional_phones: updates.additional_phones?.filter(phone => phone && phone.trim()) || null,
        additional_emails: updates.additional_emails?.filter(email => email && email.trim()) || null
      };
      
      // Primero actualizar el contacto
      const { error } = await supabase
        .from('contacts')
        .update(cleanUpdates)
        .eq('id', id);

      if (error) throw error;

      // Luego crear una nueva asignación para el usuario que modificó
      await supabase
        .from('lead_assignments')
        .insert([{
          contact_id: id,
          assigned_user_email: currentUserEmail,
          assigned_by_email: currentUserEmail,
          notes: 'Reasignado al modificar el lead'
        }]);

      toast({
        title: "Éxito",
        description: "Contacto actualizado correctamente",
      });
    } catch (error) {
      console.error('Error updating contact:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el contacto",
        variant: "destructive",
      });
    }
  }, []);

  const moveContactToStage = useCallback(async (contactId: string, stageId: string) => {
    try {
      const currentUserEmail = getCurrentUserEmail();
      
      // Actualizar el contacto
      const { error } = await supabase
        .from('contacts')
        .update({ stage_id: stageId, last_contact_date: new Date().toISOString() })
        .eq('id', contactId);

      if (error) throw error;

      // Crear nueva asignación
      await supabase
        .from('lead_assignments')
        .insert([{
          contact_id: contactId,
          assigned_user_email: currentUserEmail,
          assigned_by_email: currentUserEmail,
          notes: 'Reasignado al cambiar de etapa'
        }]);

      // Create activity for stage change
      await supabase
        .from('contact_activities')
        .insert([{
          contact_id: contactId,
          activity_type: 'status_change',
          title: 'Cambio de etapa',
          description: `Contacto movido a nueva etapa`,
        }]);
    } catch (error) {
      console.error('Error moving contact:', error);
      toast({
        title: "Error",
        description: "No se pudo mover el contacto",
        variant: "destructive",
      });
    }
  }, []);

  const deleteContact = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Éxito",
        description: "Contacto eliminado correctamente",
      });
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el contacto",
        variant: "destructive",
      });
    }
  }, []);

  return {
    fetchContacts,
    updateContact,
    moveContactToStage,
    deleteContact,
  };
};
