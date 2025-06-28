
import React from 'react';
import { ContactWithStage, CrmStage } from '@/types/crm';
import { ContactCard } from './ContactCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KanbanViewProps {
  contacts: ContactWithStage[];
  stages: CrmStage[];
  onContactEdit: (contact: ContactWithStage) => void;
  onContactView: (contact: ContactWithStage) => void;
  onContactDelete: (id: string) => void;
  onContactMove: (contactId: string, stageId: string) => void;
}

export const KanbanView = ({ 
  contacts, 
  stages, 
  onContactEdit, 
  onContactView, 
  onContactDelete,
  onContactMove 
}: KanbanViewProps) => {
  const getContactsForStage = (stageId: string) => {
    return contacts.filter(contact => contact.stage_id === stageId);
  };

  const handleDragStart = (e: React.DragEvent, contactId: string) => {
    e.dataTransfer.setData('text/plain', contactId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    const contactId = e.dataTransfer.getData('text/plain');
    onContactMove(contactId, stageId);
  };

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden lg:flex gap-4 overflow-x-auto pb-4 min-h-[600px]">
        {stages.map((stage) => {
          const stageContacts = getContactsForStage(stage.id);
          
          return (
            <Card 
              key={stage.id} 
              className="min-w-[300px] flex-shrink-0"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="text-sm font-medium">{stage.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stageContacts.length}
                  </Badge>
                </CardTitle>
                {stage.description && (
                  <p className="text-xs text-gray-500">{stage.description}</p>
                )}
              </CardHeader>
              
              <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                {stageContacts.map((contact) => (
                  <div
                    key={contact.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, contact.id)}
                    className="cursor-move"
                  >
                    <ContactCard
                      contact={contact}
                      onEdit={onContactEdit}
                      onView={onContactView}
                      onDelete={onContactDelete}
                    />
                  </div>
                ))}
                
                {stageContacts.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p className="text-sm">No hay contactos en esta etapa</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden space-y-4">
        {stages.map((stage) => {
          const stageContacts = getContactsForStage(stage.id);
          
          return (
            <Card key={stage.id} className="w-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: stage.color }}
                    />
                    <span className="text-sm font-medium">{stage.name}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {stageContacts.length}
                  </Badge>
                </CardTitle>
                {stage.description && (
                  <p className="text-xs text-gray-500 mt-1">{stage.description}</p>
                )}
              </CardHeader>
              
              <CardContent className="space-y-3">
                {stageContacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    onEdit={onContactEdit}
                    onView={onContactView}
                    onDelete={onContactDelete}
                  />
                ))}
                
                {stageContacts.length === 0 && (
                  <div className="text-center py-6 text-gray-400">
                    <p className="text-sm">No hay contactos en esta etapa</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
