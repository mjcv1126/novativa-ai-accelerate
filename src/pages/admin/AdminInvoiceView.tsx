import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Download, Edit, Printer } from 'lucide-react';
import { invoiceService } from '@/services/invoiceService';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@/utils/dateUtils';
import type { Invoice } from '@/types/invoice';

const AdminInvoiceView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadInvoice();
    }
  }, [id]);

  const loadInvoice = async () => {
    try {
      setLoading(true);
      const data = await invoiceService.getInvoice(id!);
      setInvoice(data);
    } catch (error) {
      console.error('Error loading invoice:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar la factura",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
          <p>Cargando factura...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p>Factura no encontrada</p>
          <Button onClick={() => navigate('/admin/invoices')} className="mt-4">
            Volver a Facturas
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/admin/invoices')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Visualizar {invoice.invoice_type === 'proforma' ? 'Proforma' : 'Factura'}</h1>
            <p className="text-gray-600">{invoice.invoice_number}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/admin/invoices/${invoice.id}/edit`)}>
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Descargar PDF
          </Button>
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
        </div>
      </div>

      {/* Vista Previa Estilo SAR */}
      <div className="bg-white p-8 border rounded-lg shadow-sm">
        {/* Header con Logo y Datos de la Empresa */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-novativa-teal">Novativa</div>
            <div className="text-sm">
              <div className="font-medium">{invoice.company_settings?.company_name || 'Novativa'}</div>
              <div>RTN: {invoice.company_settings?.company_rtn || '05121996012974'}</div>
              <div>{invoice.company_settings?.company_address || 'Bo. Guadalupe, 20 calle, 4 calle 10 y 11 ave. San Pedro Sula, Cortés'}</div>
              <div>{invoice.company_settings?.company_phone || '+504 96472774'} | {invoice.company_settings?.company_email || 'soporte@novativa.org'}</div>
            </div>
          </div>
          <div className="bg-red-600 text-white px-4 py-2 rounded text-center">
            <div className="font-bold">{invoice.invoice_type === 'proforma' ? 'PROFORMA' : 'FACTURA'}</div>
            <div className="text-sm">{invoice.invoice_number}</div>
          </div>
        </div>

        {/* Fechas y Total */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <div className="font-semibold">Fecha de Emisión</div>
            <div>{formatDate(invoice.invoice_date)}</div>
          </div>
          <div>
            <div className="font-semibold">Fecha de Vencimiento</div>
            <div>{invoice.due_date ? formatDate(invoice.due_date) : 'N/A'}</div>
          </div>
          <div className="text-right">
            <div className="bg-teal-700 text-white px-4 py-2 rounded">
              <div className="text-sm">TOTAL A PAGAR</div>
              <div className="text-xl font-bold">{invoice.currency} {invoice.total.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Información del Cliente */}
        <div className="mb-8">
          <div className="font-bold text-lg mb-2">FACTURAR A:</div>
          <div className="border-l-4 border-gray-300 pl-4">
            <div className="font-semibold">{invoice.contact_name}</div>
            {invoice.contact_rtn && <div>RTN: {invoice.contact_rtn}</div>}
            {invoice.contact_email && <div>Email: {invoice.contact_email}</div>}
            {invoice.contact_address && <div>Dirección: {invoice.contact_address}</div>}
          </div>
        </div>

        {/* Tabla de Items */}
        <div className="mb-8">
          <table className="w-full border border-gray-300">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">DESCRIPCIÓN</th>
                <th className="border border-gray-300 px-4 py-2 text-center">CANT.</th>
                <th className="border border-gray-300 px-4 py-2 text-right">PRECIO UNIT.</th>
                <th className="border border-gray-300 px-4 py-2 text-center">ISV</th>
                <th className="border border-gray-300 px-4 py-2 text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items?.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="font-medium">{item.product_name}</div>
                    {item.description && <div className="text-sm text-gray-600">{item.description}</div>}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{invoice.currency} {item.unit_price.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{item.has_isv ? '15%' : '0%'}</td>
                  <td className="border border-gray-300 px-4 py-2 text-right">{invoice.currency} {item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Comentarios */}
        {invoice.notes && (
          <div className="mb-8">
            <div className="font-bold mb-2">COMENTARIOS ADICIONALES:</div>
            <div className="text-gray-700">{invoice.notes}</div>
          </div>
        )}

        {/* Totales */}
        <div className="flex justify-end mb-8">
          <div className="w-80">
            <div className="flex justify-between py-2">
              <span>Subtotal:</span>
              <span>{invoice.currency} {invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>ISV (15%):</span>
              <span>{invoice.currency} {invoice.isv_amount.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between py-2 bg-red-600 text-white px-4 rounded font-bold">
              <span>TOTAL:</span>
              <span>{invoice.currency} {invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Información Fiscal */}
        <div className="text-sm text-gray-600">
          <div>CAI: {invoice.company_settings?.cai || '26D174-BF2409-E904E0-63BE03-0909C5-B3'}</div>
          <div>Fecha Límite de Emisión: {invoice.company_settings?.fecha_limite_emision || '13/11/2025'}</div>
          <div>Rango Autorizado: {invoice.company_settings?.rango_autorizado || '000-002-01-00002001 - 000-002-01-00002055'}</div>
        </div>
      </div>

      {/* Información del Estado */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Documento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-600">Tipo</div>
              <div>{getTypeBadge(invoice.invoice_type)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Estado</div>
              <div>{getStatusBadge(invoice.status)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Creado</div>
              <div>{formatDate(invoice.created_at)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Actualizado</div>
              <div>{formatDate(invoice.updated_at)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminInvoiceView;