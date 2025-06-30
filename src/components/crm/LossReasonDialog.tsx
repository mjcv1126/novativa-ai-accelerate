
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';

interface LossReasonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reason: string) => void;
  contactName: string;
}

export const LossReasonDialog = ({ isOpen, onClose, onSave, contactName }: LossReasonDialogProps) => {
  const [reason, setReason] = useState('');

  const handleSave = () => {
    if (!reason.trim()) return;
    
    onSave(reason.trim());
    setReason('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Motivo de Pérdida - {contactName}
          </DialogTitle>
          <DialogDescription>
            Este contacto está siendo movido a "Cerrado Perdido". Por favor ingresa el motivo de la pérdida.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="loss_reason">Motivo de Pérdida *</Label>
            <Textarea
              id="loss_reason"
              placeholder="Describe el motivo por el cual se perdió este lead..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!reason.trim()}
          >
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
