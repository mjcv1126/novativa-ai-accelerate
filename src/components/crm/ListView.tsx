
import React from 'react';
import { ContactWithStage } from '@/types/crm';
import { ContactCard } from './ContactCard';

interface ListViewProps {
  contacts: ContactWithStage[];
  onContactEdit: (contact: ContactWithStage) => void;
  onContactView: (contact: ContactWithStage) => void;
  onContactDelete: (id: string) => void;
}

export const ListView = ({ 
  contacts, 
  onContactEdit, 
  onContactView, 
  onContactDelete 
}: ListViewProps) => {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontraron contactos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onContactEdit}
          onView={onContactView}
          onDelete={onContactDelete}
        />
      ))}
    </div>
  );
};
