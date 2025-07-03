import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save, ArrowLeft, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { invoiceService } from '@/services/invoiceService';
import { useToast } from '@/hooks/use-toast';
import type { InvoiceSettings } from '@/types/invoice';

const AdminInvoiceSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Partial<InvoiceSettings>>({
    company_name: 'Novativa',
    company_rtn: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    company_logo_url: '',
    isv_rate: 0.15,
    default_currency: 'HNL',
    default_country: 'Honduras',
    invoice_prefix: 'INV',
    proforma_prefix: 'PRF',
    next_invoice_number: 1,
    next_proforma_number: 1
  });

  // Campos específicos para Honduras/SAR
  const [sarSettings, setSarSettings] = useState({
    cai: '',
    fecha_limite_emision: '',
    rango_autorizado_inicio: '',
    rango_autorizado_fin: '',
    punto_emision: '',
    establecimiento: ''
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await invoiceService.getSettings();
      setSettings(data);
      
      // Cargar configuraciones SAR desde company_settings si existen
      if (data.company_settings) {
        const companySettings = typeof data.company_settings === 'string' 
          ? JSON.parse(data.company_settings) 
          : data.company_settings;
        
        setSarSettings({
          cai: companySettings.cai || '',
          fecha_limite_emision: companySettings.fecha_limite_emision || '',
          rango_autorizado_inicio: companySettings.rango_autorizado_inicio || '',
          rango_autorizado_fin: companySettings.rango_autorizado_fin || '',
          punto_emision: companySettings.punto_emision || '',
          establecimiento: companySettings.establecimiento || ''
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las configuraciones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Combinar configuraciones básicas con SAR
      const updatedSettings = {
        ...settings,
        company_settings: {
          ...sarSettings,
          // Información adicional de la empresa
          cai: sarSettings.cai,
          fecha_limite_emision: sarSettings.fecha_limite_emision,
          rango_autorizado: `${sarSettings.rango_autorizado_inicio} - ${sarSettings.rango_autorizado_fin}`,
          punto_emision: sarSettings.punto_emision,
          establecimiento: sarSettings.establecimiento
        }
      };

      await invoiceService.updateSettings(updatedSettings);
      
      toast({
        title: "Éxito",
        description: "Configuraciones guardadas correctamente",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "No se pudieron guardar las configuraciones",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/admin/invoices')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Facturas
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Configuración de Facturación</h1>
            <p className="text-gray-600">Configure los datos de su empresa y parámetros fiscales</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-novativa-teal hover:bg-novativa-lightTeal">
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Guardando...' : 'Guardar Configuración'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información de la Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Información de la Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="company_name">Nombre de la Empresa *</Label>
              <Input
                id="company_name"
                value={settings.company_name || ''}
                onChange={(e) => setSettings({...settings, company_name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="company_rtn">RTN de la Empresa *</Label>
              <Input
                id="company_rtn"
                value={settings.company_rtn || ''}
                onChange={(e) => setSettings({...settings, company_rtn: e.target.value})}
                placeholder="Ej: 05121996012974"
                required
              />
            </div>

            <div>
              <Label htmlFor="company_address">Dirección *</Label>
              <Textarea
                id="company_address"
                value={settings.company_address || ''}
                onChange={(e) => setSettings({...settings, company_address: e.target.value})}
                placeholder="Dirección completa de la empresa"
                required
              />
            </div>

            <div>
              <Label htmlFor="company_phone">Teléfono *</Label>
              <Input
                id="company_phone"
                value={settings.company_phone || ''}
                onChange={(e) => setSettings({...settings, company_phone: e.target.value})}
                placeholder="Ej: +504 96472774"
                required
              />
            </div>

            <div>
              <Label htmlFor="company_email">Email *</Label>
              <Input
                id="company_email"
                type="email"
                value={settings.company_email || ''}
                onChange={(e) => setSettings({...settings, company_email: e.target.value})}
                placeholder="Ej: soporte@novativa.org"
                required
              />
            </div>

            <div>
              <Label htmlFor="company_logo_url">URL del Logo</Label>
              <Input
                id="company_logo_url"
                value={settings.company_logo_url || ''}
                onChange={(e) => setSettings({...settings, company_logo_url: e.target.value})}
                placeholder="URL del logo de la empresa"
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración Fiscal SAR (Honduras) */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración Fiscal SAR</CardTitle>
            <p className="text-sm text-gray-600">Configuración específica para Honduras</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cai">CAI (Código de Autorización de Impresión) *</Label>
              <Input
                id="cai"
                value={sarSettings.cai}
                onChange={(e) => setSarSettings({...sarSettings, cai: e.target.value})}
                placeholder="Ej: 26D174-BF2409-E904E0-63BE03-0909C5-B3"
                required
              />
            </div>

            <div>
              <Label htmlFor="fecha_limite_emision">Fecha Límite de Emisión *</Label>
              <Input
                id="fecha_limite_emision"
                type="date"
                value={sarSettings.fecha_limite_emision}
                onChange={(e) => setSarSettings({...sarSettings, fecha_limite_emision: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rango_inicio">Rango Autorizado - Inicio *</Label>
                <Input
                  id="rango_inicio"
                  value={sarSettings.rango_autorizado_inicio}
                  onChange={(e) => setSarSettings({...sarSettings, rango_autorizado_inicio: e.target.value})}
                  placeholder="000-002-01-00002001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="rango_fin">Rango Autorizado - Fin *</Label>
                <Input
                  id="rango_fin"
                  value={sarSettings.rango_autorizado_fin}
                  onChange={(e) => setSarSettings({...sarSettings, rango_autorizado_fin: e.target.value})}
                  placeholder="000-002-01-00002055"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="punto_emision">Punto de Emisión</Label>
              <Input
                id="punto_emision"
                value={sarSettings.punto_emision}
                onChange={(e) => setSarSettings({...sarSettings, punto_emision: e.target.value})}
                placeholder="001"
              />
            </div>

            <div>
              <Label htmlFor="establecimiento">Establecimiento</Label>
              <Input
                id="establecimiento"
                value={sarSettings.establecimiento}
                onChange={(e) => setSarSettings({...sarSettings, establecimiento: e.target.value})}
                placeholder="002"
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuración de Numeración */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración de Numeración</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoice_prefix">Prefijo Facturas</Label>
                <Input
                  id="invoice_prefix"
                  value={settings.invoice_prefix || ''}
                  onChange={(e) => setSettings({...settings, invoice_prefix: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="proforma_prefix">Prefijo Proformas</Label>
                <Input
                  id="proforma_prefix"
                  value={settings.proforma_prefix || ''}
                  onChange={(e) => setSettings({...settings, proforma_prefix: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="next_invoice_number">Próximo Número de Factura</Label>
                <Input
                  id="next_invoice_number"
                  type="number"
                  value={settings.next_invoice_number || 1}
                  onChange={(e) => setSettings({...settings, next_invoice_number: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="next_proforma_number">Próximo Número de Proforma</Label>
                <Input
                  id="next_proforma_number"
                  type="number"
                  value={settings.next_proforma_number || 1}
                  onChange={(e) => setSettings({...settings, next_proforma_number: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configuración Fiscal */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración Fiscal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="isv_rate">Tasa de ISV (%)</Label>
              <Input
                id="isv_rate"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={settings.isv_rate || 0.15}
                onChange={(e) => setSettings({...settings, isv_rate: parseFloat(e.target.value)})}
              />
              <p className="text-sm text-gray-500 mt-1">Valor entre 0 y 1 (ej: 0.15 para 15%)</p>
            </div>

            <div>
              <Label htmlFor="default_currency">Moneda por Defecto</Label>
              <Input
                id="default_currency"
                value={settings.default_currency || ''}
                onChange={(e) => setSettings({...settings, default_currency: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="default_country">País por Defecto</Label>
              <Input
                id="default_country"
                value={settings.default_country || ''}
                onChange={(e) => setSettings({...settings, default_country: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminInvoiceSettings;