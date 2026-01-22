import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Search, 
  Eye, 
  Trash2, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  Globe, 
  Target,
  ShoppingBag,
  Star,
  Users,
  Trophy,
  Palette,
  FolderOpen,
  DollarSign,
  Calendar,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Brief {
  id: string;
  created_at: string;
  empresa: string | null;
  contacto: string;
  telefono: string;
  correo: string;
  ubicacion: string | null;
  que_hace: string | null;
  propuesta_valor: string | null;
  productos: any;
  objetivo_uno: string | null;
  presupuesto_mensual: string | null;
  [key: string]: any;
}

const AdminBriefs = () => {
  const { toast } = useToast();
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const fetchBriefs = async () => {
    setLoading(true);
    try {
      await supabase.rpc('set_session_email', { email_value: 'soporte@novativa.org' });
      
      const { data, error } = await supabase
        .from('briefs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBriefs(data || []);
    } catch (error: any) {
      console.error('Error fetching briefs:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los briefs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBriefs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este brief?')) return;
    
    try {
      await supabase.rpc('set_session_email', { email_value: 'soporte@novativa.org' });
      
      const { error } = await supabase
        .from('briefs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBriefs(briefs.filter(b => b.id !== id));
      toast({
        title: "Eliminado",
        description: "Brief eliminado correctamente",
      });
    } catch (error: any) {
      console.error('Error deleting brief:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el brief",
        variant: "destructive"
      });
    }
  };

  const filteredBriefs = briefs.filter(brief => {
    const search = searchTerm.toLowerCase();
    return (
      brief.empresa?.toLowerCase().includes(search) ||
      brief.contacto?.toLowerCase().includes(search) ||
      brief.correo?.toLowerCase().includes(search)
    );
  });

  const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-5 w-5 text-novativa-teal" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="pl-7 space-y-2">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value }: { label: string; value: any }) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    
    return (
      <div className="flex flex-col sm:flex-row sm:gap-2">
        <span className="text-muted-foreground text-sm min-w-[180px]">{label}:</span>
        <span className="font-medium text-sm">
          {Array.isArray(value) ? value.join(', ') : value}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Briefs Ejecutivos</h1>
          <p className="text-muted-foreground">Gestiona los briefs recibidos de clientes</p>
        </div>
        <Button variant="outline" onClick={fetchBriefs} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por empresa, contacto o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-novativa-teal/10">
                <FileText className="h-6 w-6 text-novativa-teal" />
              </div>
              <div>
                <p className="text-2xl font-bold">{briefs.length}</p>
                <p className="text-muted-foreground text-sm">Briefs totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {briefs.filter(b => b.invertir_pauta === 'si').length}
                </p>
                <p className="text-muted-foreground text-sm">Con presupuesto de pauta</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {briefs.filter(b => {
                    const date = new Date(b.created_at);
                    const now = new Date();
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                  }).length}
                </p>
                <p className="text-muted-foreground text-sm">Este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Briefs List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-novativa-teal" />
        </div>
      ) : filteredBriefs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No hay briefs registrados</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredBriefs.map((brief) => (
            <Card key={brief.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-novativa-teal to-novativa-lightBlue">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {brief.empresa || 'Sin nombre de empresa'}
                        </h3>
                        <p className="text-muted-foreground text-sm flex items-center gap-2">
                          <User className="h-3 w-3" />
                          {brief.contacto}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {brief.correo}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {brief.telefono}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(brief.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                      </span>
                    </div>
                    {brief.objetivo_uno && (
                      <Badge variant="secondary" className="mt-2">
                        Objetivo: {brief.objetivo_uno}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedBrief(brief);
                        setShowDialog(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(brief.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-novativa-teal" />
              {selectedBrief?.empresa || 'Brief Ejecutivo'}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            {selectedBrief && (
              <div className="space-y-4">
                <Section title="Información General" icon={Building2}>
                  <Field label="Empresa" value={selectedBrief.empresa} />
                  <Field label="Contacto" value={selectedBrief.contacto} />
                  <Field label="Cargo" value={selectedBrief.cargo} />
                  <Field label="Teléfono" value={selectedBrief.telefono} />
                  <Field label="Correo" value={selectedBrief.correo} />
                  <Field label="Ubicación" value={selectedBrief.ubicacion} />
                  <Field label="Horario" value={selectedBrief.horario} />
                  <Field label="Sitio Web" value={selectedBrief.sitio_web} />
                  <Field label="Instagram" value={selectedBrief.instagram} />
                  <Field label="Facebook" value={selectedBrief.facebook} />
                  <Field label="TikTok" value={selectedBrief.tiktok} />
                  <Field label="YouTube" value={selectedBrief.youtube} />
                  <Field label="LinkedIn" value={selectedBrief.linkedin} />
                </Section>
                <Separator />
                
                <Section title="Descripción de la Empresa" icon={FileText}>
                  <Field label="¿Qué hace?" value={selectedBrief.que_hace} />
                  <Field label="Desde cuándo" value={selectedBrief.desde_cuando} />
                  <Field label="Problema que resuelve" value={selectedBrief.problema_resuelve} />
                  <Field label="Tipo de clientes" value={selectedBrief.tipo_clientes} />
                </Section>
                <Separator />
                
                <Section title="Propuesta de Valor" icon={Target}>
                  <Field label="Propuesta de valor" value={selectedBrief.propuesta_valor} />
                  <Field label="Diferenciador 1" value={selectedBrief.diferenciador_1} />
                  <Field label="Diferenciador 2" value={selectedBrief.diferenciador_2} />
                  <Field label="Diferenciador 3" value={selectedBrief.diferenciador_3} />
                  <Field label="Resultado que promete" value={selectedBrief.resultado_promesa} />
                </Section>
                <Separator />
                
                <Section title="Confianza y Pruebas" icon={Trophy}>
                  <Field label="¿Qué da confianza?" value={selectedBrief.mas_confianza} />
                  <Field label="Objeciones comunes" value={selectedBrief.objeciones} />
                  <Field label="Pruebas" value={selectedBrief.pruebas} />
                  <Field label="Detalle de pruebas" value={selectedBrief.pruebas_detalle} />
                </Section>
                <Separator />
                
                <Section title="Productos/Servicios" icon={ShoppingBag}>
                  {selectedBrief.productos && Array.isArray(selectedBrief.productos) && selectedBrief.productos.length > 0 ? (
                    <div className="space-y-3">
                      {selectedBrief.productos.map((prod: any, idx: number) => (
                        <div key={idx} className="p-3 bg-muted rounded-lg">
                          <p className="font-medium">{prod.nombre || `Producto ${idx + 1}`}</p>
                          <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                            <div><span className="text-muted-foreground">Precio:</span> {prod.precio}</div>
                            <div><span className="text-muted-foreground">Costo:</span> {prod.costo}</div>
                            <div><span className="text-muted-foreground">Ganancia:</span> {prod.ganancia}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">Sin productos registrados</p>
                  )}
                  <Field label="Combos/Paquetes" value={selectedBrief.combos} />
                  <Field label="Promociones" value={selectedBrief.promociones} />
                </Section>
                <Separator />
                
                <Section title="Producto Estrella" icon={Star}>
                  <Field label="Producto estrella" value={selectedBrief.producto_estrella} />
                  <Field label="Por qué es el más vendido" value={selectedBrief.porque_mas_vendido} />
                  <Field label="Más conviene vender" value={selectedBrief.mas_conviene} />
                  <Field label="Objetivo del mes" value={selectedBrief.objetivo_mes} />
                </Section>
                <Separator />
                
                <Section title="Objetivos de Redes" icon={Globe}>
                  <Field label="Objetivos" value={selectedBrief.objetivos_redes} />
                  <Field label="Objetivo #1" value={selectedBrief.objetivo_uno} />
                  <Field label="Meta concreta" value={selectedBrief.meta_concreta} />
                </Section>
                <Separator />
                
                <Section title="Buyer Persona" icon={Users}>
                  <Field label="Edad" value={selectedBrief.edad_cliente} />
                  <Field label="Género" value={selectedBrief.genero_cliente} />
                  <Field label="Ubicación" value={selectedBrief.ubicacion_cliente} />
                  <Field label="Nivel económico" value={selectedBrief.nivel_economico} />
                  <Field label="Trabajo/Estilo de vida" value={selectedBrief.trabajo_estilo_vida} />
                  <Field label="Problema del cliente" value={selectedBrief.problema_cliente} />
                  <Field label="¿Qué valora?" value={selectedBrief.cliente_valora} />
                  <Field label="Miedos/Dudas" value={selectedBrief.miedos_dudas} />
                  <Field label="¿Dónde pasa tiempo?" value={selectedBrief.cliente_pasa_tiempo} />
                  <Field label="Frase típica" value={selectedBrief.frase_tipica} />
                </Section>
                <Separator />
                
                <Section title="Competencia" icon={Trophy}>
                  <Field label="Competidor 1" value={selectedBrief.competidor_1} />
                  <Field label="Competidor 2" value={selectedBrief.competidor_2} />
                  <Field label="Competidor 3" value={selectedBrief.competidor_3} />
                  <Field label="¿Qué gusta de ellos?" value={selectedBrief.que_gusta_competencia} />
                  <Field label="¿Qué hacen mal?" value={selectedBrief.que_mal_competencia} />
                  <Field label="Cuentas que inspiran" value={selectedBrief.cuentas_inspiran} />
                </Section>
                <Separator />
                
                <Section title="Identidad y Estilo" icon={Palette}>
                  <Field label="Tono de marca" value={selectedBrief.tono_marca} />
                  <Field label="Colores" value={selectedBrief.colores_marca} />
                  <Field label="Tipografías" value={selectedBrief.tipografias} />
                  <Field label="Logo PNG" value={selectedBrief.logo_png} />
                  <Field label="Tono prohibido" value={selectedBrief.tono_prohibido} />
                </Section>
                <Separator />
                
                <Section title="Recursos Disponibles" icon={FolderOpen}>
                  <Field label="Fotos/Videos propios" value={selectedBrief.tiene_fotos_videos} />
                  <Field label="Alguien que grabe" value={selectedBrief.tiene_grabador} />
                  <Field label="Testimonios en video" value={selectedBrief.tiene_testimonios} />
                  <Field label="Catálogo/Menú" value={selectedBrief.tiene_catalogo} />
                  <Field label="Link Drive/Carpeta" value={selectedBrief.drive_link} />
                </Section>
                <Separator />
                
                <Section title="Presupuesto de Publicidad" icon={DollarSign}>
                  <Field label="¿Invertirá en pauta?" value={selectedBrief.invertir_pauta} />
                  <Field label="Presupuesto mensual" value={selectedBrief.presupuesto_mensual} />
                  <Field label="Producto a pautar" value={selectedBrief.producto_pautar} />
                </Section>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBriefs;
