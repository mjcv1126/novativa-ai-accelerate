
import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import { ContactWithStage } from '@/types/crm';
import { exportToCSV, contactsCSVHeaders } from '@/utils/exportUtils';

interface ExportContactsButtonProps {
  contacts: ContactWithStage[];
}

export const ExportContactsButton = ({ contacts }: ExportContactsButtonProps) => {
  const handleExportCSV = () => {
    if (contacts.length === 0) {
      alert('No hay contactos para exportar');
      return;
    }

    const exportData = contacts.map(contact => ({
      first_name: contact.first_name,
      last_name: contact.last_name,
      phone: contact.phone,
      email: contact.email || '',
      company: contact.company || '',
      country_name: contact.country_name,
      'stage.name': contact.stage?.name || 'Sin etapa',
      created_at: new Date(contact.created_at).toLocaleDateString('es-ES'),
      last_contact_date: contact.last_contact_date ? 
        new Date(contact.last_contact_date).toLocaleDateString('es-ES') : ''
    }));

    const filename = `contactos_${new Date().toISOString().split('T')[0]}`;
    exportToCSV(exportData, filename, contactsCSVHeaders);
  };

  const handleExportExcel = () => {
    // Para Excel, usaremos el mismo formato CSV pero con extensión .xlsx
    // Los usuarios pueden abrir CSV en Excel directamente
    if (contacts.length === 0) {
      alert('No hay contactos para exportar');
      return;
    }

    const exportData = contacts.map(contact => ({
      first_name: contact.first_name,
      last_name: contact.last_name,
      phone: contact.phone,
      email: contact.email || '',
      company: contact.company || '',
      country_name: contact.country_name,
      'stage.name': contact.stage?.name || 'Sin etapa',
      created_at: new Date(contact.created_at).toLocaleDateString('es-ES'),
      last_contact_date: contact.last_contact_date ? 
        new Date(contact.last_contact_date).toLocaleDateString('es-ES') : '',
      additional_phones: contact.additional_phones?.join('; ') || '',
      notes: contact.notes || ''
    }));

    // Crear headers extendidos para Excel
    const excelHeaders = {
      ...contactsCSVHeaders,
      additional_phones: 'Teléfonos Adicionales',
      notes: 'Notas'
    };

    const filename = `contactos_${new Date().toISOString().split('T')[0]}`;
    exportToCSV(exportData, filename, excelHeaders);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleExportCSV}>
          <FileText className="h-4 w-4 mr-2" />
          Exportar CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportExcel}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Exportar Excel (CSV)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
