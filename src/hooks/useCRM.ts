
import { useState, useEffect, useCallback } from 'react';
import { ContactWithStage, CrmStage, CrmFilters } from '@/types/crm';
import { useContactOperations } from './crm/useContactOperations';
import { useStageOperations } from './crm/useStageOperations';
import { useActivityOperations } from './crm/useActivityOperations';

const CLOSED_WON_STAGE_ID = 'b30755e0-8993-4491-b7c8-d96fe4181221';
const CLOSED_LOST_STAGE_ID = '7af3eb42-610b-4861-9429-85119b1d2693';

export const useCRM = () => {
  const [contacts, setContacts] = useState<ContactWithStage[]>([]);
  const [stages, setStages] = useState<CrmStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CrmFilters>({ search: '' });
  
  // Estados para los diálogos
  const [showLeadValueDialog, setShowLeadValueDialog] = useState(false);
  const [showLossReasonDialog, setShowLossReasonDialog] = useState(false);
  const [pendingContactMove, setPendingContactMove] = useState<{
    contactId: string;
    stageId: string;
    contact: ContactWithStage;
  } | null>(null);

  const { fetchContacts, updateContact, moveContactToStage, deleteContact } = useContactOperations();
  const { fetchStages, createStage, updateStage, deleteStage } = useStageOperations();
  const { fetchContactActivities, createActivity } = useActivityOperations();

  const loadStages = useCallback(async () => {
    const stagesData = await fetchStages();
    setStages(stagesData);
  }, [fetchStages]);

  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);
      const contactsData = await fetchContacts(filters);
      setContacts(contactsData);
    } finally {
      setLoading(false);
    }
  }, [fetchContacts, filters]);

  const handleCreateStage = useCallback(async (stageData: Omit<CrmStage, 'id' | 'created_at' | 'updated_at'>) => {
    const result = await createStage(stageData);
    if (result) {
      await loadStages();
    }
    return result;
  }, [createStage, loadStages]);

  const handleUpdateStage = useCallback(async (id: string, updates: Partial<CrmStage>) => {
    await updateStage(id, updates);
    await loadStages();
  }, [updateStage, loadStages]);

  const handleDeleteStage = useCallback(async (id: string) => {
    await deleteStage(id);
    await loadStages();
    await loadContacts();
  }, [deleteStage, loadStages, loadContacts]);

  const handleUpdateContact = useCallback(async (id: string, updates: Partial<ContactWithStage>) => {
    await updateContact(id, updates);
    await loadContacts();
  }, [updateContact, loadContacts]);

  const handleMoveContactToStage = useCallback(async (contactId: string, stageId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    // Verificar si es etapa de Cerrado Ganado y no tiene valor
    if (stageId === CLOSED_WON_STAGE_ID && !contact.lead_value) {
      setPendingContactMove({ contactId, stageId, contact });
      setShowLeadValueDialog(true);
      return;
    }

    // Verificar si es etapa de Cerrado Perdido
    if (stageId === CLOSED_LOST_STAGE_ID) {
      setPendingContactMove({ contactId, stageId, contact });
      setShowLossReasonDialog(true);
      return;
    }

    // Mover directamente si no requiere información adicional
    await moveContactToStage(contactId, stageId);
    await loadContacts();
  }, [contacts, moveContactToStage, loadContacts]);

  const handleSaveLeadValue = useCallback(async (leadValue: number, currency: string, paymentType: string) => {
    if (!pendingContactMove) return;

    try {
      // Actualizar el contacto con el valor del lead
      await updateContact(pendingContactMove.contactId, {
        lead_value: leadValue,
        lead_value_currency: currency,
        payment_type: paymentType as 'one_time' | 'recurring'
      });

      // Mover a la etapa
      await moveContactToStage(pendingContactMove.contactId, pendingContactMove.stageId);
      
      await loadContacts();
    } finally {
      setPendingContactMove(null);
    }
  }, [pendingContactMove, updateContact, moveContactToStage, loadContacts]);

  const handleSaveLossReason = useCallback(async (reason: string) => {
    if (!pendingContactMove) return;

    try {
      // Actualizar el contacto con el motivo de pérdida
      await updateContact(pendingContactMove.contactId, {
        loss_reason: reason
      });

      // Mover a la etapa
      await moveContactToStage(pendingContactMove.contactId, pendingContactMove.stageId);
      
      await loadContacts();
    } finally {
      setPendingContactMove(null);
    }
  }, [pendingContactMove, updateContact, moveContactToStage, loadContacts]);

  const handleDeleteContact = useCallback(async (id: string) => {
    await deleteContact(id);
    await loadContacts();
  }, [deleteContact, loadContacts]);

  const handleCreateActivity = useCallback(async (activityData: any) => {
    try {
      const result = await createActivity(activityData);
      console.log('Activity created in CRM hook:', result);
      return result;
    } catch (error) {
      console.error('Error creating activity in CRM hook:', error);
      throw error;
    }
  }, [createActivity]);

  useEffect(() => {
    loadStages();
  }, [loadStages]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return {
    contacts,
    stages,
    loading,
    filters,
    setFilters,
    fetchContacts: loadContacts,
    fetchContactActivities,
    createStage: handleCreateStage,
    updateStage: handleUpdateStage,
    deleteStage: handleDeleteStage,
    updateContact: handleUpdateContact,
    moveContactToStage: handleMoveContactToStage,
    createActivity: handleCreateActivity,
    deleteContact: handleDeleteContact,
    // Diálogos
    showLeadValueDialog,
    setShowLeadValueDialog,
    showLossReasonDialog,
    setShowLossReasonDialog,
    pendingContactMove,
    handleSaveLeadValue,
    handleSaveLossReason,
  };
};
