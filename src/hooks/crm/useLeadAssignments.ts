import { useCallback } from 'react';

export const useLeadAssignments = () => {
  // Hook temporalmente deshabilitado para resolver errores de tipos
  const getCurrentUserEmail = useCallback(() => {
    return 'soporte@novativa.org';
  }, []);

  const getContactAssignment = useCallback(async (contactId: string) => {
    console.log('Lead assignment temporalmente deshabilitado');
    return null;
  }, []);

  const assignLead = useCallback(async (contactId: string, assignedUserEmail: string, notes?: string) => {
    console.log('Lead assignment temporalmente deshabilitado');
    return true;
  }, []);

  const getAvailableUsers = useCallback(() => {
    return [
      { email: 'soporte@novativa.org', name: 'Soporte Técnico' }
    ];
  }, []);

  return {
    getCurrentUserEmail,
    getContactAssignment,
    assignLead,
    getAvailableUsers,
  };
};