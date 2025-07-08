import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, Save, ArrowLeft, Trash2, Search, CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { invoiceService } from '@/services/invoiceService';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { InvoiceFormData, InvoiceProduct } from '@/types/invoice';
import type { Contact } from '@/types/crm';

const AdminCreateInvoice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [products, setProducts] = useState<InvoiceProduct[]>([]);
  const [formData, setFormData] = useState<InvoiceFormData>({
    contact_name: '',
    invoice_date: new Date().toISOString().split('T')[0],
    invoice_type: 'invoice',
    currency: 'HNL',
    country: 'Honduras',
    items: [
      {
        product_name: '',
        quantity: 1,
        unit_price: 0,
        has_isv: true
      }
    ]
  });

  useEffect(() => {
    loadInitialData();
    if (isEditing) {
      loadInvoiceData();
    }
  }, [id]);

  const loadInitialData = async () => {
    try {
      const [contactsData, productsData] = await Promise.all([
        supabase.from('contacts').select('*').order('first_name'),
        invoiceService.getProducts()
      ]);
      
      if (contactsData.data) setContacts(contactsData.data as Contact[]);
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const loadInvoiceData = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const invoice = await invoiceService.getInvoice(id);
      
      setFormData({
        contact_id: invoice.contact_id,
        contact_name: invoice.contact_name,
        contact_rtn: invoice.contact_rtn,
        contact_email: invoice.contact_email,
        contact_phone: invoice.contact_phone,
        contact_address: invoice.contact_address,
        invoice_date: invoice.invoice_date,
        due_date: invoice.due_date,
        invoice_type: invoice.invoice_type,
        currency: invoice.currency,
        country: invoice.country,
        notes: invoice.notes,
        items: invoice.items?.map(item => ({
          product_id: item.product_id,
          product_name: item.product_name,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          has_isv: item.has_isv
        })) || []
      });
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

  const handleContactSelect = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (contact) {
      setFormData({
        ...formData,
        contact_id: contactId,
        contact_name: `${contact.first_name} ${contact.last_name}`,
        contact_rtn: contact.rtn,
        contact_email: contact.email,
        contact_phone: contact.phone,
        contact_address: contact.address || contact.country_name
      });
    }
  };

  const handleProductSelect = (index: number, productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const newItems = [...formData.items];
      newItems[index] = {
        ...newItems[index],
        product_id: productId,
        product_name: product.name,
        description: product.description,
        unit_price: product.price,
        has_isv: product.has_isv
      };
      setFormData({ ...formData, items: newItems });
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          product_name: '',
          quantity: 1,
          unit_price: 0,
          has_isv: true
        }
      ]
    });
  };

  const removeItem = (index: number) => {
    if (formData.items.length === 1) return;
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const calculateItemTotal = (item: any) => {
    const subtotal = item.quantity * item.unit_price;
    const isv = item.has_isv ? subtotal * 0.15 : 0;
    return subtotal + isv;
  };

  const calculateTotals = () => {
    let subtotal = 0;
    let isv = 0;

    formData.items.forEach(item => {
      const itemSubtotal = item.quantity * item.unit_price;
      subtotal += itemSubtotal;
      if (item.has_isv) {
        isv += itemSubtotal * 0.15;
      }
    });

    return { subtotal, isv, total: subtotal + isv };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.items.length === 0 || !formData.contact_name) {
      toast({
        title: "Error",
        description: "Debe agregar al menos un item y seleccionar un cliente",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      if (isEditing) {
        await invoiceService.updateInvoice(id!, formData);
        toast({
          title: "Éxito",
          description: "Factura actualizada correctamente",
        });
      } else {
        await invoiceService.createInvoice(formData);
        toast({
          title: "Éxito",
          description: `${formData.invoice_type === 'proforma' ? 'Proforma' : 'Factura'} creada correctamente`,
        });
      }
      
      navigate('/admin/invoices');
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar la factura",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totals = calculateTotals();

  // Componente DatePicker personalizado
  const DatePicker = ({ date, onDateChange, placeholder, required = false }: {
    date?: Date;
    onDateChange: (date: Date | undefined) => void;
    placeholder: string;
    required?: boolean;
  }) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd/MM/yyyy", { locale: es }) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
            className="p-3 pointer-events-auto"
            locale={es}
          />
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/admin/invoices')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {isEditing ? 'Editar' : 'Crear'} Factura
            </h1>
            <p className="text-gray-600">
              {isEditing ? 'Modifica los datos de la factura' : 'Crea una nueva factura o proforma'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData({...formData, invoice_type: 'proforma'})}
            className={formData.invoice_type === 'proforma' ? 'bg-blue-50 border-blue-300' : ''}
          >
            Proforma
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData({...formData, invoice_type: 'invoice'})}
            className={formData.invoice_type === 'invoice' ? 'bg-green-50 border-green-300' : ''}
          >
            Factura
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact">Cliente del CRM</Label>
                <SearchableSelect
                  options={contacts.map((contact) => ({
                    value: contact.id,
                    label: `${contact.first_name} ${contact.last_name} - ${contact.phone}`,
                  }))}
                  onValueChange={handleContactSelect}
                  placeholder="Seleccionar cliente del CRM"
                  emptyText="No se encontraron clientes"
                />
              </div>
              <div>
                <Label htmlFor="contact_name">Nombre del Cliente *</Label>
                <Input
                  id="contact_name"
                  value={formData.contact_name}
                  onChange={(e) => setFormData({...formData, contact_name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact_rtn">RTN</Label>
                <Input
                  id="contact_rtn"
                  value={formData.contact_rtn || ''}
                  onChange={(e) => setFormData({...formData, contact_rtn: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contact_email">Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email || ''}
                  onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contact_phone">Teléfono</Label>
                <Input
                  id="contact_phone"
                  value={formData.contact_phone || ''}
                  onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contact_address">Dirección</Label>
                <Input
                  id="contact_address"
                  value={formData.contact_address || ''}
                  onChange={(e) => setFormData({...formData, contact_address: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalles de la Factura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="invoice_date">Fecha *</Label>
                <DatePicker
                  date={formData.invoice_date ? new Date(formData.invoice_date) : new Date()}
                  onDateChange={(date) => setFormData({...formData, invoice_date: date ? date.toISOString().split('T')[0] : ''})}
                  placeholder="Seleccionar fecha"
                  required
                />
              </div>
              <div>
                <Label htmlFor="due_date">Fecha de Vencimiento</Label>
                <DatePicker
                  date={formData.due_date ? new Date(formData.due_date) : undefined}
                  onDateChange={(date) => setFormData({...formData, due_date: date ? date.toISOString().split('T')[0] : ''})}
                  placeholder="Seleccionar fecha de vencimiento"
                />
              </div>
              <div>
                <Label htmlFor="currency">Moneda</Label>
                <SearchableSelect
                  options={[
                    { value: "HNL", label: "HNL (Lempiras)" },
                    { value: "USD", label: "USD (Dólares)" }
                  ]}
                  value={formData.currency}
                  onValueChange={(value) => setFormData({...formData, currency: value})}
                  placeholder="Seleccionar moneda"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Notas adicionales..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Items de la Factura
              <Button type="button" onClick={addItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Item
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={index} className="border rounded p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Item #{index + 1}</h4>
                    {formData.items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                      <Label>Producto/Servicio</Label>
                      <SearchableSelect
                        options={products.map((product) => ({
                          value: product.id,
                          label: `${product.name} - ${product.type === 'service' ? 'Servicio' : 'Producto'}`,
                        }))}
                        onValueChange={(value) => handleProductSelect(index, value)}
                        placeholder="Seleccionar producto"
                        emptyText="No se encontraron productos"
                      />
                      <Input
                        className="mt-2"
                        placeholder="Nombre del producto/servicio"
                        value={item.product_name}
                        onChange={(e) => updateItem(index, 'product_name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Cantidad</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label>Precio Unitario</Label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.unit_price}
                        onChange={(e) => updateItem(index, 'unit_price', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Descripción</Label>
                      <Textarea
                        placeholder="Descripción adicional..."
                        value={item.description || ''}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`has_isv_${index}`}
                          checked={item.has_isv}
                          onChange={(e) => updateItem(index, 'has_isv', e.target.checked)}
                        />
                        <Label htmlFor={`has_isv_${index}`}>Incluir ISV (15%)</Label>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>Subtotal: {formData.currency} {(item.quantity * item.unit_price).toFixed(2)}</div>
                        <div>ISV: {formData.currency} {item.has_isv ? (item.quantity * item.unit_price * 0.15).toFixed(2) : '0.00'}</div>
                        <div className="font-medium">Total: {formData.currency} {calculateItemTotal(item).toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumen de Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-w-sm ml-auto">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formData.currency} {totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>ISV (15%):</span>
                <span>{formData.currency} {totals.isv.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formData.currency} {totals.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/invoices')}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading} className="bg-novativa-teal hover:bg-novativa-lightTeal">
            {loading ? 'Guardando...' : 'Guardar ' + (formData.invoice_type === 'proforma' ? 'Proforma' : 'Factura')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateInvoice;