
import React from 'react';
import { Label } from '@/components/ui/label';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { Textarea } from '@/components/ui/textarea';
import { CrmStage } from '@/types/crm';

interface StageAndNotesFieldsProps {
  formData: {
    stage_id: string;
    notes: string;
  };
  onFormDataChange: (updates: Partial<StageAndNotesFieldsProps['formData']>) => void;
  stages: CrmStage[];
}

export const StageAndNotesFields = ({ formData, onFormDataChange, stages }: StageAndNotesFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="stage_id">Etapa</Label>
        <SearchableSelect
          options={stages.map((stage) => ({
            value: stage.id,
            label: stage.name,
          }))}
          value={formData.stage_id}
          onValueChange={(value) => onFormDataChange({ stage_id: value })}
          placeholder="Seleccionar etapa"
          emptyText="No se encontraron etapas"
        />
      </div>

      <div>
        <Label htmlFor="notes">Notas</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => onFormDataChange({ notes: e.target.value })}
          rows={3}
        />
      </div>
    </>
  );
};
