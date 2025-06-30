
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign } from 'lucide-react';

interface LeadValueDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (leadValue: number, currency: string, paymentType: string) => void;
  contactName: string;
}

export const LeadValueDialog = ({ isOpen, onClose, onSave, contactName }: LeadValueDialogProps) => {
  const [leadValue, setLeadValue] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [paymentType, setPaymentType] = useState('');

  const handleSave = () => {
    if (!leadValue || !paymentType) return;
    
    onSave(parseFloat(leadValue), currency, paymentType);
    setLeadValue('');
    setCurrency('USD');
    setPaymentType('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Valor del Lead - {contactName}
          </DialogTitle>
          <DialogDescription>
            Este contacto está siendo movido a "Cerrado Ganado". Por favor ingresa el valor del lead.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lead_value">Valor *</Label>
              <Input
                id="lead_value"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={leadValue}
                onChange={(e) => setLeadValue(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="currency">Moneda *</Label>
              <Select value={currency} onValueChange={setCurrency}>
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
          </div>
          
          <div>
            <Label htmlFor="payment_type">Tipo de Pago *</Label>
            <Select value={paymentType} onValueChange={setPaymentType}>
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

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!leadValue || !paymentType}
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
