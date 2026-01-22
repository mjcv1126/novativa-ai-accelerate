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
  RefreshCw,
  Download
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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

  const handleDownloadPDF = (brief: Brief) => {
    const doc = new jsPDF();
    let yPos = 20;

    // Helper function to add section
    const addSection = (title: string, data: [string, any][]) => {
      const filteredData = data.filter(([_, value]) => value && (Array.isArray(value) ? value.length > 0 : true));
      if (filteredData.length === 0) return;

      autoTable(doc, {
        startY: yPos,
        head: [[{ content: title, colSpan: 2, styles: { fillColor: [20, 184, 166], textColor: 255, fontStyle: 'bold' } }]],
        body: filteredData.map(([label, value]) => [
          label,
          Array.isArray(value) ? value.join(', ') : String(value)
        ]),
        theme: 'striped',
        headStyles: { fontSize: 11 },
        bodyStyles: { fontSize: 9 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 }, 1: { cellWidth: 'auto' } },
        margin: { left: 14, right: 14 },
      });
      yPos = (doc as any).lastAutoTable.finalY + 8;
    };

    // Title
    doc.setFontSize(22);
    doc.setTextColor(20, 184, 166);
    doc.text('Brief Ejecutivo', 105, yPos, { align: 'center' });
    yPos += 10;

    // Company name
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(brief.empresa || 'Sin nombre de empresa', 105, yPos, { align: 'center' });
    yPos += 8;

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado: ${format(new Date(), "d 'de' MMMM, yyyy", { locale: es })}`, 105, yPos, { align: 'center' });
    yPos += 12;

    // Sections
    addSection('Información General', [
      ['Empresa', brief.empresa],
      ['Contacto', brief.contacto],
      ['Cargo', brief.cargo],
      ['Teléfono', brief.telefono],
      ['Correo', brief.correo],
      ['Ubicación', brief.ubicacion],
      ['Horario', brief.horario],
      ['Sitio Web', brief.sitio_web],
      ['Instagram', brief.instagram],
      ['Facebook', brief.facebook],
      ['TikTok', brief.tiktok],
      ['YouTube', brief.youtube],
      ['LinkedIn', brief.linkedin],
    ]);

    addSection('Descripción de la Empresa', [
      ['¿Qué hace?', brief.que_hace],
      ['Desde cuándo', brief.desde_cuando],
      ['Problema que resuelve', brief.problema_resuelve],
      ['Tipo de clientes', brief.tipo_clientes],
    ]);

    addSection('Propuesta de Valor', [
      ['Propuesta de valor', brief.propuesta_valor],
      ['Diferenciador 1', brief.diferenciador_1],
      ['Diferenciador 2', brief.diferenciador_2],
      ['Diferenciador 3', brief.diferenciador_3],
      ['Resultado que promete', brief.resultado_promesa],
    ]);

    addSection('Confianza y Pruebas', [
      ['¿Qué da confianza?', brief.mas_confianza],
      ['Objeciones comunes', brief.objeciones],
      ['Pruebas', brief.pruebas],
      ['Detalle de pruebas', brief.pruebas_detalle],
    ]);

    // Products section with special handling
    if (brief.productos && Array.isArray(brief.productos) && brief.productos.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [[{ content: 'Productos/Servicios', colSpan: 4, styles: { fillColor: [20, 184, 166], textColor: 255, fontStyle: 'bold' } }]],
        body: [
          [{ content: 'Nombre', styles: { fontStyle: 'bold' } }, { content: 'Precio', styles: { fontStyle: 'bold' } }, { content: 'Costo', styles: { fontStyle: 'bold' } }, { content: 'Ganancia', styles: { fontStyle: 'bold' } }],
          ...brief.productos.map((prod: any) => [prod.nombre || '', prod.precio || '', prod.costo || '', prod.ganancia || ''])
        ],
        theme: 'striped',
        headStyles: { fontSize: 11 },
        bodyStyles: { fontSize: 9 },
        margin: { left: 14, right: 14 },
      });
      yPos = (doc as any).lastAutoTable.finalY + 8;
    }

    addSection('Productos Adicionales', [
      ['Combos/Paquetes', brief.combos],
      ['Promociones', brief.promociones],
    ]);

    addSection('Producto Estrella', [
      ['Producto estrella', brief.producto_estrella],
      ['Por qué es el más vendido', brief.porque_mas_vendido],
      ['Más conviene vender', brief.mas_conviene],
      ['Objetivo del mes', brief.objetivo_mes],
    ]);

    addSection('Objetivos de Redes', [
      ['Objetivos', brief.objetivos_redes],
      ['Objetivo #1', brief.objetivo_uno],
      ['Meta concreta', brief.meta_concreta],
    ]);

    addSection('Buyer Persona', [
      ['Edad', brief.edad_cliente],
      ['Género', brief.genero_cliente],
      ['Ubicación', brief.ubicacion_cliente],
      ['Nivel económico', brief.nivel_economico],
      ['Trabajo/Estilo de vida', brief.trabajo_estilo_vida],
      ['Problema del cliente', brief.problema_cliente],
      ['¿Qué valora?', brief.cliente_valora],
      ['Miedos/Dudas', brief.miedos_dudas],
      ['¿Dónde pasa tiempo?', brief.cliente_pasa_tiempo],
      ['Frase típica', brief.frase_tipica],
    ]);

    addSection('Competencia', [
      ['Competidor 1', brief.competidor_1],
      ['Competidor 2', brief.competidor_2],
      ['Competidor 3', brief.competidor_3],
      ['¿Qué gusta de ellos?', brief.que_gusta_competencia],
      ['¿Qué hacen mal?', brief.que_mal_competencia],
      ['Cuentas que inspiran', brief.cuentas_inspiran],
    ]);

    addSection('Identidad y Estilo', [
      ['Tono de marca', brief.tono_marca],
      ['Colores', brief.colores_marca],
      ['Tipografías', brief.tipografias],
      ['Logo PNG', brief.logo_png],
      ['Tono prohibido', brief.tono_prohibido],
    ]);

    addSection('Recursos Disponibles', [
      ['Fotos/Videos propios', brief.tiene_fotos_videos],
      ['Alguien que grabe', brief.tiene_grabador],
      ['Testimonios en video', brief.tiene_testimonios],
      ['Catálogo/Menú', brief.tiene_catalogo],
      ['Link Drive/Carpeta', brief.drive_link],
    ]);

    addSection('Presupuesto de Publicidad', [
      ['¿Invertirá en pauta?', brief.invertir_pauta],
      ['Presupuesto mensual', brief.presupuesto_mensual],
      ['Producto a pautar', brief.producto_pautar],
    ]);

    // Footer with page numbers
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
    }

    // Save PDF
    const fileName = `brief-${(brief.empresa || 'ejecutivo').toLowerCase().replace(/\s+/g, '-')}-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    doc.save(fileName);

    toast({
      title: "PDF Descargado",
      description: `Brief de ${brief.empresa || 'empresa'} descargado correctamente`,
    });
  };

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
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadPDF(brief)}
                      className="text-novativa-teal hover:text-novativa-teal hover:bg-novativa-teal/10"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
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
