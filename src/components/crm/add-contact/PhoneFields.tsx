
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
            <Select 
              value={formData.country_code} 
              onValueChange={(value) => onFormDataChange({ country_code: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[280px]">
                {countries.map((country) => (
                  <SelectItem key={`primary-${country.code}-${country.name}`} value={country.code}>
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>+{country.code}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Select 
              value={formData.secondary_country_code} 
              onValueChange={(value) => onFormDataChange({ secondary_country_code: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[280px]">
                {countries.map((country) => (
                  <SelectItem key={`secondary-${country.code}-${country.name}`} value={country.code}>
                    <span className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>+{country.code}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
