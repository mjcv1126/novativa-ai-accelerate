import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Ticket, TicketStatus } from '@/types/ticket';
import { TicketStatusBadge } from './TicketStatusBadge';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Download, ExternalLink } from 'lucide-react';

interface TicketDetailDialogProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export const TicketDetailDialog = ({ ticket, open, onOpenChange, onUpdate }: TicketDetailDialogProps) => {
  const [status, setStatus] = useState<TicketStatus>(ticket?.status || 'nuevo');
  const [internalNotes, setInternalNotes] = useState(ticket?.internal_notes || '');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!ticket) return null;

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('tickets')
        .update({
          status,
          internal_notes: internalNotes,
        })
        .eq('id', ticket.id);

      if (error) throw error;

      // Agregar al historial
      await supabase.from('ticket_history').insert({
        ticket_id: ticket.id,
        action: 'Estado actualizado',
        field_changed: 'status',
        old_value: ticket.status,
        new_value: status,
        comment: internalNotes !== ticket.internal_notes ? 'Notas internas actualizadas' : null,
      });

      toast.success('Ticket actualizado exitosamente');
      onUpdate();
    } catch (error: any) {
      toast.error('Error al actualizar ticket', {
        description: error.message,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>{ticket.ticket_number}</span>
            <TicketStatusBadge status={ticket.status} />
            <Badge variant={ticket.priority_level === 'alta' ? 'destructive' : 'secondary'}>
              {ticket.priority_level}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información de contacto */}
          <div>
            <h3 className="font-semibold mb-2">Información de Contacto</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Empresa:</span>
                <p className="font-medium">{ticket.company_name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Solicitante:</span>
                <p className="font-medium">{ticket.applicant_name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Rol:</span>
                <p className="font-medium">{ticket.applicant_role}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="font-medium">{ticket.applicant_email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Teléfono:</span>
                <p className="font-medium">{ticket.applicant_phone}</p>
              </div>
            </div>
          </div>

          {/* Detalles de la solicitud */}
          <div>
            <h3 className="font-semibold mb-2">Detalles de la Solicitud</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Tipo:</span>
                <p className="font-medium capitalize">{ticket.request_type}</p>
                {ticket.request_type_other && <p className="text-muted-foreground">{ticket.request_type_other}</p>}
              </div>
              <div>
                <span className="text-muted-foreground">Objetivo del contenido:</span>
                <p className="font-medium">{ticket.content_objective}</p>
              </div>
            </div>
          </div>

          {/* Especificaciones técnicas */}
          {(ticket.dimensions || ticket.delivery_format || ticket.final_use || ticket.delivery_date) && (
            <div>
              <h3 className="font-semibold mb-2">Especificaciones Técnicas</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {ticket.dimensions && (
                  <div>
                    <span className="text-muted-foreground">Dimensiones:</span>
                    <p className="font-medium">{ticket.dimensions}</p>
                  </div>
                )}
                {ticket.delivery_format && (
                  <div>
                    <span className="text-muted-foreground">Formato:</span>
                    <p className="font-medium">{ticket.delivery_format}</p>
                  </div>
                )}
                {ticket.final_use && (
                  <div>
                    <span className="text-muted-foreground">Uso final:</span>
                    <p className="font-medium">{ticket.final_use}</p>
                  </div>
                )}
                {ticket.delivery_date && (
                  <div>
                    <span className="text-muted-foreground">Fecha de entrega:</span>
                    <p className="font-medium">
                      {format(new Date(ticket.delivery_date), 'PPP', { locale: es })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Referencias visuales */}
          <div>
            <h3 className="font-semibold mb-2">Referencias Visuales</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Descripción del concepto:</span>
                <p className="font-medium">{ticket.concept_description}</p>
              </div>
              {ticket.reference_url && (
                <div>
                  <span className="text-muted-foreground">URL de referencia:</span>
                  <a
                    href={ticket.reference_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    {ticket.reference_url}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Feedback de referencia:</span>
                <p className="font-medium">{ticket.reference_feedback}</p>
              </div>
              {ticket.reference_images && ticket.reference_images.length > 0 && (
                <div>
                  <span className="text-muted-foreground">Imágenes de referencia:</span>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {ticket.reference_images.map((img: any, idx: number) => (
                      <div key={idx} className="relative group">
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-24 object-cover rounded"
                        />
                        <a
                          href={img.url}
                          download
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <Download className="h-6 w-6 text-white" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Archivos adjuntos */}
          {ticket.attached_files && ticket.attached_files.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Archivos Adjuntos</h3>
              <div className="space-y-2">
                {ticket.attached_files.map((file: any, idx: number) => (
                  <a
                    key={idx}
                    href={file.url}
                    download
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <Download className="h-4 w-4" />
                    {file.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Gestión del ticket */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Gestión del Ticket</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Estado</label>
                <Select value={status} onValueChange={(value) => setStatus(value as TicketStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nuevo">Nuevo</SelectItem>
                    <SelectItem value="en_revision">En Revisión</SelectItem>
                    <SelectItem value="en_progreso">En Progreso</SelectItem>
                    <SelectItem value="esperando_informacion">Esperando Información</SelectItem>
                    <SelectItem value="completado">Completado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Notas Internas</label>
                <Textarea
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Notas internas del equipo..."
                  rows={4}
                />
              </div>

              <Button onClick={handleUpdate} disabled={isUpdating} className="w-full">
                {isUpdating ? 'Actualizando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </div>

          {/* Metadata */}
          <div className="text-xs text-muted-foreground border-t pt-4">
            <p>Creado: {format(new Date(ticket.created_at), 'PPpp', { locale: es })}</p>
            <p>Actualizado: {format(new Date(ticket.updated_at), 'PPpp', { locale: es })}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
