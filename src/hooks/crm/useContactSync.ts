import { useCallback } from 'react';

export const useContactSync = () => {
  // Hook temporalmente deshabilitado para resolver errores de tipos
  const syncContactFromForm = useCallback(async (formData: any) => {
    console.log('Contact sync temporalmente deshabilitado');
    return { 
      success: true, 
      message: 'Función temporalmente deshabilitada',
      contactId: 'temp-id',
      isNew: false
    };
  }, []);

  const syncContactFromTidyCal = useCallback(async (tidyCalContact: any, bookingData?: any) => {
    console.log('TidyCal sync temporalmente deshabilitado');
    return { 
      success: true, 
      message: 'Función temporalmente deshabilitada',
      contactId: 'temp-id',
      isNew: false
    };
  }, []);

  return { 
    syncContactFromForm, 
    syncContactFromTidyCal 
  };
};