
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { ContactWithStage, CrmStage } from '@/types/crm';
import { ContactCard } from './ContactCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface KanbanViewProps {
  contacts: ContactWithStage[];
  stages: CrmStage[];
  onMoveContact: (contactId: string, stageId: string) => void;
  onEditContact: (contact: ContactWithStage) => void;
  onDeleteContact: (contactId: string) => void;
}

export const KanbanView = ({ 
  contacts, 
  stages, 
  onMoveContact, 
  onEditContact, 
  onDeleteContact 
}: KanbanViewProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const activeStages = stages
    .filter(stage => stage.is_active)
    .sort((a, b) => a.position - b.position);

  const getContactsByStage = (stageId: string) => {
    return contacts.filter(contact => contact.stage_id === stageId);
  };

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
    
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const contactId = draggableId;
    const newStageId = destination.droppableId;

    onMoveContact(contactId, newStageId);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  return (
    <div className="overflow-x-auto">
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <div className="flex gap-4 min-w-max pb-4">
          {activeStages.map((stage) => {
            const stageContacts = getContactsByStage(stage.id);
            
            return (
              <div key={stage.id} className="w-80 flex-shrink-0">
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle 
                        className="text-sm font-medium"
                        style={{ color: stage.color }}
                      >
                        {stage.name}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {stageContacts.length}
                      </Badge>
                    </div>
                    {stage.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {stage.description}
                      </p>
                    )}
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <Droppable droppableId={stage.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`space-y-3 min-h-[200px] p-2 rounded-lg transition-colors ${
                            snapshot.isDraggedOver 
                              ? 'bg-blue-50 border-2 border-blue-200 border-dashed' 
                              : 'bg-gray-50'
                          }`}
                        >
                          {stageContacts.map((contact, index) => (
                            <Draggable
                              key={contact.id}
                              draggableId={contact.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`transition-transform ${
                                    snapshot.isDragging 
                                      ? 'rotate-3 shadow-lg' 
                                      : 'hover:shadow-md'
                                  }`}
                                >
                                  <ContactCard
                                    contact={contact}
                                    stages={stages}
                                    onMoveContact={onMoveContact}
                                    onEditContact={onEditContact}
                                    onDeleteContact={onDeleteContact}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          
                          {stageContacts.length === 0 && !isDragging && (
                            <div className="text-center py-8 text-gray-400 text-sm">
                              Sin contactos en esta etapa
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};
