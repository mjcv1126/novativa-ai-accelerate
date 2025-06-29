
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        <Select value={formData.stage_id} onValueChange={(value) => onFormDataChange({ stage_id: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar etapa" />
          </SelectTrigger>
          <SelectContent>
            {stages.map((stage) => (
              <SelectItem key={stage.id} value={stage.id}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: stage.color }}
                  />
                  {stage.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
