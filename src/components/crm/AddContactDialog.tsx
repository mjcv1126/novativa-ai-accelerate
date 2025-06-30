
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CrmStage, ContactWithStage } from '@/types/crm';
import { ExistingContactDialog } from './ExistingContactDialog';
import { ContactFormFields } from './add-contact/ContactFormFields';
import { EmailFields } from './add-contact/EmailFields';
import { PhoneFields } from './add-contact/PhoneFields';
import { StageAndNotesFields } from './add-contact/StageAndNotesFields';
import { LeadValueFields } from './add-contact/LeadValueFields';
import { useAddContactForm } from './add-contact/useAddContactForm';
import { toast } from '@/hooks/use-toast';

interface AddContactDialogProps {
  stages: CrmStage[];
  onContactAdded: () => void;
}

export const AddContactDialog = ({ stages, onContactAdded }: AddContactDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    formData,
    isLoading,
    existingContact,
    showExistingContactDialog,
    selectedCountry,
    selectedSecondaryCountry,
    updateFormData,
    handleSubmit,
    setShowExistingContactDialog
  } = useAddContactForm(() => {
    setIsOpen(false);
    onContactAdded();
  });

  const handleEditExistingContact = (contact: ContactWithStage) => {
    toast({
      title: "Información",
      description: "Funcionalidad de edición en desarrollo",
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Agregar Contacto
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Contacto</DialogTitle>
            <DialogDescription>
              Completa la información del contacto. Los campos marcados son obligatorios.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <ContactFormFields
              formData={formData}
              onFormDataChange={updateFormData}
              selectedCountry={selectedCountry}
            />

            <EmailFields
              formData={formData}
              onFormDataChange={updateFormData}
            />

            <PhoneFields
              formData={formData}
              onFormDataChange={updateFormData}
              selectedCountry={selectedCountry}
              selectedSecondaryCountry={selectedSecondaryCountry}
            />

            <LeadValueFields
              formData={formData}
              onFormDataChange={updateFormData}
            />

            <StageAndNotesFields
              formData={formData}
              onFormDataChange={updateFormData}
              stages={stages}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creando...' : 'Crear Contacto'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ExistingContactDialog 
        contact={existingContact}
        isOpen={showExistingContactDialog}
        onClose={() => setShowExistingContactDialog(false)}
        onEdit={handleEditExistingContact}
      />
    </>
  );
};
