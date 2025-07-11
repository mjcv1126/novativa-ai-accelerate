import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Filter, FileText, Eye, Edit, Ban, Settings, Copy, CheckCircle } from 'lucide-react';
import { invoiceService } from '@/services/invoiceService';
import { formatDate } from '@/utils/dateUtils';
import type { Invoice, InvoiceFilters } from '@/types/invoice';
import { useToast } from '@/hooks/use-toast';

const AdminInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<InvoiceFilters>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadInvoices();
  }, [filters]);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const data = await invoiceService.getInvoices(filters);
      setInvoices(data);
    } catch (error) {
      console.error('Error loading invoices:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las facturas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelInvoice = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres anular esta factura?')) return;
    
    try {
      await invoiceService.updateInvoiceStatus(id, 'cancelled');
      setInvoices(invoices.map(inv => 
        inv.id === id ? { ...inv, status: 'cancelled' } : inv
      ));
      toast({
        title: "Éxito",
        description: "Factura anulada correctamente",
      });
    } catch (error) {
      console.error('Error cancelling invoice:', error);
      toast({
        title: "Error",
        description: "No se pudo anular la factura",
        variant: "destructive",
      });
    }
  };

  const handleDuplicateInvoice = async (id: string) => {
    if (!confirm('¿Deseas duplicar esta factura?')) return;
    
    try {
      const duplicatedInvoice = await invoiceService.duplicateInvoice(id);
      await loadInvoices(); // Recargar la lista para mostrar la nueva factura
      toast({
        title: "Éxito",
        description: "Factura duplicada correctamente",
      });
      // Navegar a la nueva factura duplicada
      navigate(`/admin/invoices/${duplicatedInvoice.id}/edit`);
    } catch (error) {
      console.error('Error duplicating invoice:', error);
      toast({
        title: "Error",
        description: "No se pudo duplicar la factura",
        variant: "destructive",
      });
    }
  };

  const handleMarkAsPaid = async (id: string) => {
    if (!confirm('¿Marcar esta factura como pagada?')) return;
    
    try {
      await invoiceService.updateInvoiceStatus(id, 'paid');
      setInvoices(invoices.map(inv => 
        inv.id === id ? { ...inv, status: 'paid' } : inv
      ));
      toast({
        title: "Éxito",
        description: "Factura marcada como pagada",
      });
    } catch (error) {
      console.error('Error marking invoice as paid:', error);
      toast({
        title: "Error",
        description: "No se pudo marcar la factura como pagada",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Borrador', variant: 'secondary' as const },
      pending: { label: 'Pendiente', variant: 'outline' as const },
      paid: { label: 'Pagada', variant: 'default' as const },
      overdue: { label: 'Vencida', variant: 'destructive' as const },
      cancelled: { label: 'Cancelada', variant: 'secondary' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: string) => {
    return type === 'proforma' ? 
      <Badge variant="outline">Proforma</Badge> : 
      <Badge variant="default">Factura</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-novativa-teal mx-auto mb-4"></div>
          <p>Cargando facturas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Facturación</h1>
          <p className="text-gray-600">Gestiona facturas y proformas integradas con el CRM</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/invoices/settings')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
          <Button onClick={() => navigate('/admin/invoices/create')} className="bg-novativa-teal hover:bg-novativa-lightTeal">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Factura
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Buscar por cliente..."
                value={filters.contact_name || ''}
                onChange={(e) => setFilters({...filters, contact_name: e.target.value})}
              />
            </div>
            <div>
              <Input
                placeholder="Número de factura..."
                value={filters.invoice_number || ''}
                onChange={(e) => setFilters({...filters, invoice_number: e.target.value})}
              />
            </div>
            <div>
              <Select 
                value={filters.status || 'all'} 
                onValueChange={(value) => setFilters({...filters, status: value === 'all' ? undefined : value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="paid">Pagada</SelectItem>
                  <SelectItem value="overdue">Vencida</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select 
                value={filters.type || 'all'} 
                onValueChange={(value) => setFilters({...filters, type: value === 'all' ? undefined : value as 'invoice' | 'proforma'})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="invoice">Facturas</SelectItem>
                  <SelectItem value="proforma">Proformas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Facturas */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                  <TableCell>{getTypeBadge(invoice.invoice_type)}</TableCell>
                  <TableCell>{invoice.contact_name}</TableCell>
                  <TableCell>{formatDate(invoice.invoice_date)}</TableCell>
                  <TableCell>{invoice.currency} {invoice.total.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/invoices/${invoice.id}/view`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/invoices/${invoice.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDuplicateInvoice(invoice.id)}
                        title="Duplicar factura"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      {invoice.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsPaid(invoice.id)}
                          title="Marcar como pagada"
                          className="text-green-600 border-green-600 hover:bg-green-50"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {invoice.status !== 'cancelled' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelInvoice(invoice.id)}
                          title="Anular factura"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {invoices.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No hay facturas para mostrar</p>
              <Button 
                className="mt-4 bg-novativa-teal hover:bg-novativa-lightTeal"
                onClick={() => navigate('/admin/invoices/create')}
              >
                Crear primera factura
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInvoices;