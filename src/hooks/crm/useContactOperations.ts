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

      // Apply intelligent search filters
      if (filters.search && filters.search.trim()) {
        const searchTerm = filters.search.trim();
        
        // Búsqueda muy flexible que incluye:
        // - Coincidencias parciales en cualquier orden
        // - Búsqueda de números sin formato (solo dígitos)
        // - Búsqueda fuzzy en todos los campos de texto
        const cleanSearchTerm = searchTerm.replace(/[\s\-\(\)\+]/g, '');
        
        query = query.or(`
          first_name.ilike.%${searchTerm}%,
          last_name.ilike.%${searchTerm}%,
          email.ilike.%${searchTerm}%,
          phone.ilike.%${cleanSearchTerm}%,
          company.ilike.%${searchTerm}%,
          country_name.ilike.%${searchTerm}%,
          country_code.ilike.%${searchTerm}%,
          notes.ilike.%${searchTerm}%,
          service_of_interest.ilike.%${searchTerm}%,
          id::text.ilike.${searchTerm}%
        `.replace(/\s+/g, ''));
      }

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

      if (error) throw error;

      // Obtener asignaciones para cada contacto
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

      // Si hay un término de búsqueda, hacer búsqueda fuzzy adicional y ordenar por relevancia
      if (filters.search && filters.search.trim()) {
        const searchTerm = filters.search.toLowerCase().trim();
        
        // Realizar búsqueda fuzzy adicional en memoria
        const fuzzyResults = contactsWithAssignments.filter(contact => 
          isFuzzyMatch(contact, searchTerm)
        );
        
        return fuzzyResults.sort((a, b) => {
          const scoreA = calculateAdvancedRelevanceScore(a, searchTerm);
          const scoreB = calculateAdvancedRelevanceScore(b, searchTerm);
          return scoreB - scoreA; // Orden descendente por relevancia
        });
      }

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

  // Función para búsqueda fuzzy más inteligente
  const isFuzzyMatch = (contact: ContactWithStage, searchTerm: string): boolean => {
    const term = searchTerm.toLowerCase();
    const cleanTerm = term.replace(/[\s\-\(\)\+]/g, '');
    
    // Campos de texto para buscar
    const textFields = [
      contact.first_name,
      contact.last_name,
      contact.email,
      contact.company,
      contact.country_name,
      contact.country_code,
      contact.notes,
      contact.service_of_interest
    ].filter(Boolean).map(field => field?.toLowerCase() || '');
    
    // Búsqueda en teléfono (solo números)
    const cleanPhone = contact.phone?.replace(/[\s\-\(\)\+]/g, '') || '';
    
    // Búsqueda por ID (primeros caracteres)
    const contactId = contact.id.toLowerCase();
    
    // 1. Coincidencia exacta en cualquier campo
    if (textFields.some(field => field.includes(term))) return true;
    
    // 2. Coincidencia en teléfono (números limpios)
    if (cleanPhone.includes(cleanTerm)) return true;
    
    // 3. Coincidencia en ID
    if (contactId.includes(term)) return true;
    
    // 4. Búsqueda fuzzy por palabras individuales
    const words = term.split(/\s+/).filter(word => word.length > 1);
    if (words.length > 1) {
      const wordMatches = words.filter(word => 
        textFields.some(field => field.includes(word)) ||
        cleanPhone.includes(word.replace(/[\s\-\(\)\+]/g, '')) ||
        contactId.includes(word)
      );
      if (wordMatches.length >= Math.ceil(words.length * 0.6)) return true; // 60% de las palabras deben coincidir
    }
    
    // 5. Búsqueda por similitud de caracteres (para números de teléfono parciales)
    if (cleanTerm.length >= 4) {
      // Para teléfonos, buscar subsecuencias de al menos 4 dígitos
      if (/^\d+$/.test(cleanTerm) && cleanPhone.includes(cleanTerm)) return true;
      
      // Para otros campos, buscar similitudes de al menos 3 caracteres
      if (textFields.some(field => hasSubsequence(field, term, 3))) return true;
    }
    
    return false;
  };

  // Función para detectar subsecuencias de caracteres
  const hasSubsequence = (text: string, pattern: string, minLength: number): boolean => {
    if (pattern.length < minLength) return false;
    
    let patternIndex = 0;
    for (let i = 0; i < text.length && patternIndex < pattern.length; i++) {
      if (text[i] === pattern[patternIndex]) {
        patternIndex++;
      }
    }
    
    return patternIndex >= Math.min(pattern.length, minLength);
  };

  // Función mejorada para calcular puntuación de relevancia
  const calculateAdvancedRelevanceScore = (contact: ContactWithStage, searchTerm: string): number => {
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
    
    // Búsqueda por ID
    if (contact.id.toLowerCase().startsWith(term)) score += 50;
    if (contact.id.toLowerCase().includes(term)) score += 25;
    
    // Bonus por múltiples coincidencias en el mismo contacto
    const words = term.split(/\s+/).filter(word => word.length > 1);
    if (words.length > 1) {
      const matchingWords = words.filter(word => {
        const cleanWord = word.replace(/[\s\-\(\)\+]/g, '');
        return [
          contact.first_name?.toLowerCase(),
          contact.last_name?.toLowerCase(),
          contact.email?.toLowerCase(),
          contact.company?.toLowerCase()
        ].some(field => field?.includes(word)) ||
        cleanPhone.includes(cleanWord);
      });
      
      score += matchingWords.length * 10; // Bonus por cada palabra que coincide
    }
    
    return score;
  };

  const updateContact = useCallback(async (id: string, updates: Partial<Contact>) => {
    try {
      const currentUserEmail = getCurrentUserEmail();
      
      // Primero actualizar el contacto
      const { error } = await supabase
        .from('contacts')
        .update(updates)
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
