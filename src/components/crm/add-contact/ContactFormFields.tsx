
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ContactFormFieldsProps {
  formData: {
    first_name: string;
    last_name: string;
    company: string;
    country_name: string;
  };
  onFormDataChange: (updates: Partial<ContactFormFieldsProps['formData']>) => void;
  selectedCountry?: { name: string };
}

export const ContactFormFields = ({ formData, onFormDataChange, selectedCountry }: ContactFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="first_name">Nombre *</Label>
          <Input
            id="first_name"
            value={formData.first_name}
            onChange={(e) => onFormDataChange({ first_name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="last_name">Apellido *</Label>
          <Input
            id="last_name"
            value={formData.last_name}
            onChange={(e) => onFormDataChange({ last_name: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Empresa</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => onFormDataChange({ company: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="country_name">País *</Label>
          <Input
            id="country_name"
            value={selectedCountry?.name || formData.country_name}
            onChange={(e) => onFormDataChange({ country_name: e.target.value })}
            placeholder="Se llenará automáticamente"
          />
        </div>
      </div>
    </>
  );
};
