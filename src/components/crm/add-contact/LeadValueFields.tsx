
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LeadValueFieldsProps {
  formData: {
    lead_value: string;
    lead_value_currency: string;
    payment_type: string;
  };
  onFormDataChange: (updates: Partial<LeadValueFieldsProps['formData']>) => void;
}

export const LeadValueFields = ({ formData, onFormDataChange }: LeadValueFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="lead_value">Valor del Lead</Label>
        <Input
          id="lead_value"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={formData.lead_value}
          onChange={(e) => onFormDataChange({ lead_value: e.target.value })}
        />
      </div>
      
      <div>
        <Label htmlFor="lead_value_currency">Moneda</Label>
        <Select 
          value={formData.lead_value_currency} 
          onValueChange={(value) => onFormDataChange({ lead_value_currency: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD ($)</SelectItem>
            <SelectItem value="EUR">EUR (€)</SelectItem>
            <SelectItem value="CRC">CRC (₡)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="payment_type">Tipo de Pago</Label>
        <Select 
          value={formData.payment_type} 
          onValueChange={(value) => onFormDataChange({ payment_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="one_time">Pago Único</SelectItem>
            <SelectItem value="recurring">Pago Recurrente</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
