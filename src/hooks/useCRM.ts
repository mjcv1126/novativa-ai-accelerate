
import { useState, useEffect, useCallback } from 'react';
import { ContactWithStage, CrmStage, CrmFilters } from '@/types/crm';
import { useContactOperations } from './crm/useContactOperations';
import { useStageOperations } from './crm/useStageOperations';
import { useActivityOperations } from './crm/useActivityOperations';

export const useCRM = () => {
  const [contacts, setContacts] = useState<ContactWithStage[]>([]);
  const [stages, setStages] = useState<CrmStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CrmFilters>({ search: '' });

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
    await moveContactToStage(contactId, stageId);
    await loadContacts();
  }, [moveContactToStage, loadContacts]);

  const handleDeleteContact = useCallback(async (id: string) => {
    await deleteContact(id);
    await loadContacts();
  }, [deleteContact, loadContacts]);

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
    createActivity,
    deleteContact: handleDeleteContact,
  };
};
