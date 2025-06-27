
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useCRM } from '@/hooks/useCRM';
import { CRMFilters } from '@/components/crm/CRMFilters';
import { ListView } from '@/components/crm/ListView';
import { KanbanView } from '@/components/crm/KanbanView';
import { ContactDetailDialog } from '@/components/crm/ContactDetailDialog';
import { StageManagement } from '@/components/crm/StageManagement';
import { Button } from '@/components/ui/button';
import { ViewMode, ContactWithStage } from '@/types/crm';
import { List, Kanban, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminCRM = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [selectedContact, setSelectedContact] = useState<ContactWithStage | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  const {
    contacts,
    stages,
    loading,
    filters,
    setFilters,
    fetchContacts,
    fetchContactActivities,
    createStage,
    updateStage,
    deleteStage,
    updateContact,
    moveContactToStage,
    createActivity,
    deleteContact,
  } = useCRM();

  const handleContactView = (contact: ContactWithStage) => {
    setSelectedContact(contact);
    setIsDetailDialogOpen(true);
  };

  const handleContactEdit = (contact: ContactWithStage) => {
    setSelectedContact(contact);
    setIsDetailDialogOpen(true);
  };

  const handleContactDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este contacto?')) {
      await deleteContact(id);
    }
  };

  const handleContactUpdate = (id: string, updates: Partial<ContactWithStage>) => {
    updateContact(id, updates);
  };

  const handleCloseDetailDialog = () => {
    setIsDetailDialogOpen(false);
    setSelectedContact(null);
  };

  // Stats
  const totalContacts = contacts.length;
  const contactsByStage = stages.map(stage => ({
    ...stage,
    count: contacts.filter(contact => contact.stage_id === stage.id).length
  }));

  return (
    <>
      <Helmet>
        <title>CRM | Panel Admin Novativa</title>
      </Helmet>
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">CRM - Gestión de Contactos</h1>
            <p className="text-gray-600">Administra tus contactos y embudo de ventas</p>
          </div>
          
          <div className="flex items-center gap-2">
            <StageManagement
              stages={stages}
              onCreateStage={createStage}
              onUpdateStage={updateStage}
              onDeleteStage={deleteStage}
            />
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchContacts()}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Contactos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalContacts}</div>
            </CardContent>
          </Card>
          
          {contactsByStage.slice(0, 3).map((stage) => (
            <Card key={stage.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: stage.color }}
                  />
                  {stage.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stage.count}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <CRMFilters
          filters={filters}
          onFiltersChange={setFilters}
          stages={stages}
        />

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              Lista
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className="flex items-center gap-2"
            >
              <Kanban className="h-4 w-4" />
              Kanban
            </Button>
          </div>

          <div className="text-sm text-gray-500">
            {loading ? 'Cargando...' : `${contacts.length} contactos`}
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Cargando contactos...</p>
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
              <ListView
                contacts={contacts}
                onContactEdit={handleContactEdit}
                onContactView={handleContactView}
                onContactDelete={handleContactDelete}
              />
            ) : (
              <KanbanView
                contacts={contacts}
                stages={stages}
                onContactEdit={handleContactEdit}
                onContactView={handleContactView}
                onContactDelete={handleContactDelete}
                onContactMove={moveContactToStage}
              />
            )}
          </>
        )}

        {/* Contact Detail Dialog */}
        <ContactDetailDialog
          contact={selectedContact}
          isOpen={isDetailDialogOpen}
          onClose={handleCloseDetailDialog}
          stages={stages}
          onUpdate={handleContactUpdate}
          onCreateActivity={createActivity}
          fetchActivities={fetchContactActivities}
        />
      </div>
    </>
  );
};

export default AdminCRM;
