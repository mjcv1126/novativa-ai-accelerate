
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { countries } from '@/components/schedule/countryData';

interface PhoneFieldsProps {
  formData: {
    phone: string;
    country_code: string;
    secondary_phone: string;
    secondary_country_code: string;
  };
  onFormDataChange: (updates: Partial<PhoneFieldsProps['formData']>) => void;
  selectedCountry?: { minLength: number };
  selectedSecondaryCountry?: { minLength: number };
}

export const PhoneFields = ({ 
  formData, 
  onFormDataChange, 
  selectedCountry, 
  selectedSecondaryCountry 
}: PhoneFieldsProps) => {
  return (
    <>
      {/* Teléfono Principal */}
      <div>
        <Label>Teléfono Principal *</Label>
        <div className="flex gap-2">
          <div className="w-[140px]">
            <SearchableSelect
              options={countries.map((country) => ({
                value: country.code,
                label: `${country.flag} +${country.code}`,
              }))}
              value={formData.country_code}
              onValueChange={(value) => onFormDataChange({ country_code: value })}
              placeholder="Código"
              emptyText="No encontrado"
            />
          </div>
          <div className="flex-1">
            <Input
              type="tel"
              placeholder={`Número (${selectedCountry?.minLength} dígitos)`}
              value={formData.phone}
              onChange={(e) => onFormDataChange({ phone: e.target.value })}
              required
            />
          </div>
        </div>
      </div>

      {/* Teléfono Secundario */}
      <div>
        <Label>Teléfono Secundario</Label>
        <div className="flex gap-2">
          <div className="w-[140px]">
            <SearchableSelect
              options={countries.map((country) => ({
                value: country.code,
                label: `${country.flag} +${country.code}`,
              }))}
              value={formData.secondary_country_code}
              onValueChange={(value) => onFormDataChange({ secondary_country_code: value })}
              placeholder="Código"
              emptyText="No encontrado"
            />
          </div>
          <div className="flex-1">
            <Input
              type="tel"
              placeholder={`Número opcional (${selectedSecondaryCountry?.minLength} dígitos)`}
              value={formData.secondary_phone}
              onChange={(e) => onFormDataChange({ secondary_phone: e.target.value })}
            />
          </div>
        </div>
      </div>
    </>
  );
};
