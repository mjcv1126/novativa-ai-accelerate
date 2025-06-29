
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface EmailFieldsProps {
  formData: {
    email: string;
    secondary_email: string;
  };
  onFormDataChange: (updates: Partial<EmailFieldsProps['formData']>) => void;
}

export const EmailFields = ({ formData, onFormDataChange }: EmailFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="email">Email Principal</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onFormDataChange({ email: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="secondary_email">Email Secundario</Label>
        <Input
          id="secondary_email"
          type="email"
          value={formData.secondary_email}
          onChange={(e) => onFormDataChange({ secondary_email: e.target.value })}
        />
      </div>
    </div>
  );
};
