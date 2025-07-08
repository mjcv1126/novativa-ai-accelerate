
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { countries } from '@/components/schedule/countryData';

interface ContactFormFieldsProps {
  formData: {
    first_name: string;
    last_name: string;
    company: string;
    country_name: string;
    rtn: string;
    address: string;
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
          <SearchableSelect
            options={countries.map((country) => ({
              value: country.name,
              label: `${country.flag} ${country.name}`,
            }))}
            value={formData.country_name}
            onValueChange={(value) => onFormDataChange({ country_name: value })}
            placeholder="Selecciona un país"
            emptyText="No se encontraron países"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rtn">RTN (Opcional)</Label>
          <Input
            id="rtn"
            value={formData.rtn}
            onChange={(e) => onFormDataChange({ rtn: e.target.value })}
            placeholder="Ej: 08011988123456"
          />
        </div>
        <div>
          <Label htmlFor="address">Dirección</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => onFormDataChange({ address: e.target.value })}
            placeholder="Dirección completa"
          />
        </div>
      </div>
    </>
  );
};
