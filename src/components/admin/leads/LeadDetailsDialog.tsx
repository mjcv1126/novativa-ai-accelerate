import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Mail, Phone, MapPin, DollarSign, Briefcase, UserPlus } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_code: string;
  country_name: string;
  services_of_interest: string;
  investment_budget: string;
  submission_datetime: string;
}

interface LeadDetailsDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProspect: (lead: Lead) => void;
}

export const LeadDetailsDialog = ({ lead, open, onOpenChange, onCreateProspect }: LeadDetailsDialogProps) => {
  if (!lead) return null;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM, yyyy 'a las' HH:mm", { locale: es });
    } catch {
      return dateString;
    }
  };

  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}`;
  };

  const getBudgetBadgeVariant = (budget: string) => {
    if (budget.includes('$500') || budget.includes('pago inicial')) return 'default';
    if (budget.includes('$100')) return 'secondary';
    if (budget.includes('$49')) return 'outline';
    if (budget.includes('No cuento')) return 'destructive';
    return 'default';
  };

  const services = lead.services_of_interest.split(', ').filter(Boolean);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="font-semibold text-primary">
                {lead.first_name.charAt(0)}{lead.last_name.charAt(0)}
              </span>
            </div>
            {lead.first_name} {lead.last_name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información de Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Información de Contacto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
                      {lead.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <a 
                      href={getWhatsAppLink(lead.phone)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      {lead.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">País</p>
                    <p className="font-medium">{lead.country_name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de registro</p>
                    <p className="font-medium">{formatDate(lead.submission_datetime)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Servicios de Interés */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Servicios de Interés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {services.map((service, index) => (
                  <Badge key={index} variant="secondary">
                    {service.trim()}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Presupuesto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Información de Inversión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={getBudgetBadgeVariant(lead.investment_budget)} className="text-sm">
                {lead.investment_budget}
              </Badge>
            </CardContent>
          </Card>

          <Separator />

          {/* Acciones */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cerrar
            </Button>
            <Button onClick={() => onCreateProspect(lead)} className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Crear Prospecto
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};