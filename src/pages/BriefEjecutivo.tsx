import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Building2, 
  User, 
  FileText, 
  Target, 
  ShoppingBag, 
  Star, 
  Goal, 
  Users, 
  Trophy, 
  Palette, 
  FolderOpen, 
  DollarSign,
  Send,
  Loader2,
  Plus,
  Trash2
} from 'lucide-react';

const BriefEjecutivo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm();

  // Checkbox states for multiple selections
  const [tipoClientes, setTipoClientes] = useState<string[]>([]);
  const [objetivosRedes, setObjetivosRedes] = useState<string[]>([]);
  const [clienteValora, setClienteValora] = useState<string[]>([]);
  const [clientePasaTiempo, setClientePasaTiempo] = useState<string[]>([]);
  const [comoCompran, setComoCompran] = useState<string[]>([]);
  const [tonoMarca, setTonoMarca] = useState<string[]>([]);
  const [pruebas, setPruebas] = useState<string[]>([]);
  const [productos, setProductos] = useState([1, 2, 3]);

  const addProducto = () => {
    setProductos([...productos, productos.length + 1]);
  };

  const removeProducto = (index: number) => {
    if (productos.length > 1) {
      setProductos(productos.filter((_, i) => i !== index));
    }
  };

  const toggleCheckbox = (value: string, state: string[], setState: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (state.includes(value)) {
      setState(state.filter(v => v !== value));
    } else {
      setState([...state, value]);
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Build products array from form data
      const productosArray = productos.map((_, index) => ({
        nombre: data[`producto${index + 1}_nombre`] || '',
        precio: data[`producto${index + 1}_precio`] || '',
        costo: data[`producto${index + 1}_costo`] || '',
        ganancia: data[`producto${index + 1}_ganancia`] || ''
      })).filter(p => p.nombre);

      const briefData = {
        empresa: data.empresa,
        contacto: data.contacto,
        cargo: data.cargo,
        telefono: data.telefono,
        correo: data.correo,
        ubicacion: data.ubicacion,
        horario: data.horario,
        sitio_web: data.sitioWeb,
        instagram: data.instagram,
        facebook: data.facebook,
        tiktok: data.tiktok,
        youtube: data.youtube,
        linkedin: data.linkedin,
        que_hace: data.queHace,
        desde_cuando: data.desdeWhen,
        problema_resuelve: data.problemaResuelve,
        tipo_clientes: tipoClientes,
        propuesta_valor: data.propuestaValor,
        diferenciador_1: data.diferenciador1,
        diferenciador_2: data.diferenciador2,
        diferenciador_3: data.diferenciador3,
        resultado_promesa: data.resultadoPromesa,
        mas_confianza: data.masConfianza,
        objeciones: data.objeciones,
        pruebas: pruebas,
        pruebas_detalle: data.pruebasDetalle,
        productos: productosArray,
        combos: data.combos,
        promociones: data.promociones,
        producto_estrella: data.productoEstrella,
        porque_mas_vendido: data.porqueMasVendido,
        mas_conviene: data.masConviene,
        objetivo_mes: data.objetivoMes,
        objetivos_redes: objetivosRedes,
        objetivo_uno: data.objetivoUno,
        meta_concreta: data.metaConcreta,
        edad_cliente: data.edadCliente,
        genero_cliente: data.generoCliente,
        ubicacion_cliente: data.ubicacionCliente,
        nivel_economico: data.nivelEconomico,
        trabajo_estilo_vida: data.trabajoEstiloVida,
        problema_cliente: data.problemaCliente,
        cliente_valora: clienteValora,
        miedos_dudas: data.miedosDudas,
        cliente_pasa_tiempo: clientePasaTiempo,
        frase_tipica: data.fraseTipica,
        competidor_1: data.competidor1,
        competidor_2: data.competidor2,
        competidor_3: data.competidor3,
        que_gusta_competencia: data.queGustaCompetencia,
        que_mal_competencia: data.queMalCompetencia,
        cuentas_inspiran: data.cuentasInspiran,
        tono_marca: tonoMarca,
        colores_marca: data.coloresMarca,
        tipografias: data.tipografias,
        logo_png: data.logoPNG,
        tono_prohibido: data.tonoProhibido,
        tiene_fotos_videos: data.tieneFotosVideos,
        tiene_grabador: data.tieneGrabador,
        tiene_testimonios: data.tieneTestimonios,
        tiene_catalogo: data.tieneCatalogo,
        drive_link: data.driveLink,
        invertir_pauta: data.invertirPauta,
        presupuesto_mensual: data.presupuestoMensual,
        producto_pautar: data.productoPautar
      };

      // Save to Supabase
      const { error: dbError } = await supabase
        .from('briefs')
        .insert(briefData);

      if (dbError) throw dbError;

      toast({
        title: "Brief enviado exitosamente",
        description: "Nos pondremos en contacto contigo pronto.",
      });

      navigate('/brief-ejecutivo/gracias');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error al enviar",
        description: "Por favor intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const CheckboxGroup = ({ 
    options, 
    state, 
    setState 
  }: { 
    options: string[], 
    state: string[], 
    setState: React.Dispatch<React.SetStateAction<string[]>> 
  }) => (
    <div className="flex flex-wrap gap-3">
      {options.map(option => (
        <label key={option} className="flex items-center gap-2 cursor-pointer">
          <Checkbox 
            checked={state.includes(option)}
            onCheckedChange={() => toggleCheckbox(option, state, setState)}
          />
          <span className="text-sm">{option}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-novativa-darkBlue via-novativa-darkBlue to-novativa-teal/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Brief Ejecutivo
          </h1>
          <p className="text-gray-300 text-lg">
            Completa este formulario para que podamos conocer mejor tu negocio
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Sección 1: Información General */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                1. Información General del Negocio
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="empresa">Nombre de la empresa / marca *</Label>
                  <Input id="empresa" {...register('empresa', { required: true })} placeholder="Ej: Mi Empresa S.A." />
                </div>
                <div>
                  <Label htmlFor="contacto">Nombre del contacto principal *</Label>
                  <Input id="contacto" {...register('contacto', { required: true })} placeholder="Tu nombre completo" />
                </div>
                <div>
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input id="cargo" {...register('cargo')} placeholder="Ej: Gerente General" />
                </div>
                <div>
                  <Label htmlFor="telefono">Teléfono / WhatsApp *</Label>
                  <Input id="telefono" {...register('telefono', { required: true })} placeholder="+504 9999-9999" />
                </div>
                <div>
                  <Label htmlFor="correo">Correo *</Label>
                  <Input id="correo" type="email" {...register('correo', { required: true })} placeholder="correo@empresa.com" />
                </div>
                <div>
                  <Label htmlFor="ubicacion">Ubicación (ciudad y país)</Label>
                  <Input id="ubicacion" {...register('ubicacion')} placeholder="Tegucigalpa, Honduras" />
                </div>
                <div>
                  <Label htmlFor="horario">Horario de atención</Label>
                  <Input id="horario" {...register('horario')} placeholder="Lunes a Viernes 8am - 5pm" />
                </div>
                <div>
                  <Label htmlFor="sitioWeb">Sitio web (si tiene)</Label>
                  <Input id="sitioWeb" {...register('sitioWeb')} placeholder="https://www.tuempresa.com" />
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <Label className="text-base font-semibold mb-3 block">Redes Sociales</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input id="instagram" {...register('instagram')} placeholder="https://instagram.com/tuempresa" />
                  </div>
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input id="facebook" {...register('facebook')} placeholder="https://facebook.com/tuempresa" />
                  </div>
                  <div>
                    <Label htmlFor="tiktok">TikTok</Label>
                    <Input id="tiktok" {...register('tiktok')} placeholder="https://tiktok.com/@tuempresa" />
                  </div>
                  <div>
                    <Label htmlFor="youtube">YouTube</Label>
                    <Input id="youtube" {...register('youtube')} placeholder="https://youtube.com/tuempresa" />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" {...register('linkedin')} placeholder="https://linkedin.com/company/tuempresa" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sección 2: Descripción de la empresa */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                2. Descripción de la Empresa
              </CardTitle>
              <CardDescription className="text-white/80">
                📍 Escribí como si se lo explicaras a alguien que no conoce tu negocio.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label htmlFor="queHace">¿Qué hace tu empresa? *</Label>
                <Textarea id="queHace" {...register('queHace', { required: true })} placeholder="Describí brevemente qué productos o servicios ofreces..." rows={3} />
              </div>
              <div>
                <Label htmlFor="desdeWhen">¿Desde cuándo operan?</Label>
                <Input id="desdeWhen" {...register('desdeWhen')} placeholder="Ej: Desde 2018, 5 años de experiencia" />
              </div>
              <div>
                <Label htmlFor="problemaResuelve">¿Qué problema resuelven para el cliente?</Label>
                <Textarea id="problemaResuelve" {...register('problemaResuelve')} placeholder="El problema principal que tus clientes tienen y que vos solucionás..." rows={3} />
              </div>
              <div>
                <Label className="mb-2 block">¿Qué tipo de clientes atienden hoy?</Label>
                <CheckboxGroup 
                  options={['Personas', 'Empresas', 'Ambos']} 
                  state={tipoClientes} 
                  setState={setTipoClientes} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Sección 3: Propuesta de valor */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                3. Propuesta de Valor
              </CardTitle>
              <CardDescription className="text-white/80">
                ✅ Es una frase clara que responde: "¿Por qué debería comprarte a vos y no a cualquier otro?"
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label htmlFor="propuestaValor">¿Cuál es tu propuesta de valor? (en una frase corta) *</Label>
                <Textarea id="propuestaValor" {...register('propuestaValor', { required: true })} placeholder='Ej: "Entrego pedidos el mismo día y sin complicaciones, con atención directa por WhatsApp."' rows={2} />
              </div>
              <div>
                <Label>¿Qué te hace diferente a tu competencia? (3 puntos máximos)</Label>
                <div className="space-y-2 mt-2">
                  <Input {...register('diferenciador1')} placeholder="1. Primer diferenciador..." />
                  <Input {...register('diferenciador2')} placeholder="2. Segundo diferenciador..." />
                  <Input {...register('diferenciador3')} placeholder="3. Tercer diferenciador..." />
                </div>
              </div>
              <div>
                <Label htmlFor="resultadoPromesa">¿Qué resultado le prometés al cliente? (beneficio real)</Label>
                <Textarea id="resultadoPromesa" {...register('resultadoPromesa')} placeholder='Ej: "Bajar de peso sin pasar hambre", "Más ventas con menos esfuerzo"...' rows={2} />
              </div>
            </CardContent>
          </Card>

          {/* Sección 4: Por qué contratarían tu servicio */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                4. ¿Por qué alguien contrataría tu servicio?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label htmlFor="masConfianza">¿Qué tiene tu servicio que da más confianza o más valor?</Label>
                <Textarea id="masConfianza" {...register('masConfianza')} placeholder="Experiencia, rapidez, garantía, calidad, atención, soporte, ubicación, especialización..." rows={2} />
              </div>
              <div>
                <Label htmlFor="objeciones">¿Qué objeciones te dicen los clientes antes de comprar?</Label>
                <Textarea id="objeciones" {...register('objeciones')} placeholder='Ej: "Está caro", "No confío", "Lo voy a pensar"...' rows={2} />
              </div>
              <div>
                <Label className="mb-2 block">¿Qué pruebas tenés para demostrar que funcionás?</Label>
                <CheckboxGroup 
                  options={['Testimonios', 'Fotos antes/después', 'Casos de éxito', 'Reseñas', 'Certificaciones']} 
                  state={pruebas} 
                  setState={setPruebas} 
                />
                <Textarea {...register('pruebasDetalle')} placeholder="Describe o incluye links de tus pruebas..." className="mt-2" rows={2} />
              </div>
            </CardContent>
          </Card>

          {/* Sección 5: Productos/Servicios */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                5. Lista de Servicios / Productos + Precios
              </CardTitle>
              <CardDescription className="text-white/80">
                📌 Si no sabemos números, no sabemos vender.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {productos.map((num, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gray-50 relative">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-base font-semibold">Servicio/Producto {index + 1}</Label>
                    {productos.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeProducto(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="md:col-span-2">
                      <Label>Nombre del servicio/producto</Label>
                      <Input {...register(`producto${index + 1}_nombre`)} placeholder="Nombre..." />
                    </div>
                    <div>
                      <Label>Precio de venta</Label>
                      <Input 
                        {...register(`producto${index + 1}_precio`)} 
                        placeholder="L. 0.00"
                        onChange={(e) => {
                          setValue(`producto${index + 1}_precio`, e.target.value);
                          const costo = parseFloat(watch(`producto${index + 1}_costo`)?.replace(/[^0-9.-]/g, '') || '0');
                          const precio = parseFloat(e.target.value.replace(/[^0-9.-]/g, '') || '0');
                          if (precio > 0 && costo >= 0) {
                            setValue(`producto${index + 1}_ganancia`, `L. ${(precio - costo).toFixed(2)}`);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label>Costo (lo que te cuesta a vos)</Label>
                      <Input 
                        {...register(`producto${index + 1}_costo`)} 
                        placeholder="L. 0.00"
                        onChange={(e) => {
                          setValue(`producto${index + 1}_costo`, e.target.value);
                          const precio = parseFloat(watch(`producto${index + 1}_precio`)?.replace(/[^0-9.-]/g, '') || '0');
                          const costo = parseFloat(e.target.value.replace(/[^0-9.-]/g, '') || '0');
                          if (precio > 0 && costo >= 0) {
                            setValue(`producto${index + 1}_ganancia`, `L. ${(precio - costo).toFixed(2)}`);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <Label>Ganancia aproximada</Label>
                      <Input 
                        {...register(`producto${index + 1}_ganancia`)} 
                        placeholder="L. 0.00" 
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={addProducto}
                className="w-full border-dashed border-2 hover:border-novativa-teal hover:text-novativa-teal"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar otro producto/servicio
              </Button>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="combos">¿Hay combos o paquetes?</Label>
                  <Textarea id="combos" {...register('combos')} placeholder="Describe tus combos o paquetes..." rows={2} />
                </div>
                <div>
                  <Label htmlFor="promociones">¿Tenés promociones frecuentes?</Label>
                  <Textarea id="promociones" {...register('promociones')} placeholder="Describe tus promociones..." rows={2} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sección 6: Producto estrella */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                6. Producto Estrella / Mayor Demanda
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label htmlFor="productoEstrella">⭐ ¿Cuál es tu producto o servicio más vendido?</Label>
                <Input id="productoEstrella" {...register('productoEstrella')} placeholder="Nombre del producto/servicio más vendido" />
              </div>
              <div>
                <Label htmlFor="porqueMasVendido">¿Por qué es el más vendido?</Label>
                <Textarea id="porqueMasVendido" {...register('porqueMasVendido')} placeholder="Precio, resultado, necesidad, moda, facilidad..." rows={2} />
              </div>
              <div>
                <Label htmlFor="masConviene">🔥 ¿Cuál es el que más te conviene vender?</Label>
                <Input id="masConviene" {...register('masConviene')} placeholder="El de más ganancia o más recurrencia" />
              </div>
              <div>
                <Label htmlFor="objetivoMes">📌 ¿Qué querés vender más este mes? (objetivo de campaña)</Label>
                <Input id="objetivoMes" {...register('objetivoMes')} placeholder="Producto/servicio específico" />
              </div>
            </CardContent>
          </Card>

          {/* Sección 7: Objetivos de redes */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Goal className="h-5 w-5" />
                7. Objetivos del Manejo de Redes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label className="mb-3 block">¿Qué querés lograr con redes sociales en los próximos 30 a 90 días?</Label>
                <CheckboxGroup 
                  options={[
                    'Más mensajes por WhatsApp',
                    'Más ventas directas',
                    'Más visitas al negocio',
                    'Más seguidores',
                    'Posicionamiento y marca',
                    'Lanzar un producto nuevo',
                    'Reclutar equipo'
                  ]} 
                  state={objetivosRedes} 
                  setState={setObjetivosRedes} 
                />
              </div>
              <div>
                <Label htmlFor="objetivoUno">📌 ¿Cuál es el objetivo #1? (solo uno)</Label>
                <Input id="objetivoUno" {...register('objetivoUno')} placeholder="Tu objetivo principal" />
              </div>
              <div>
                <Label htmlFor="metaConcreta">¿Meta concreta?</Label>
                <Input id="metaConcreta" {...register('metaConcreta')} placeholder='Ej: "30 ventas al mes", "100 mensajes", "10 citas semanales"' />
              </div>
            </CardContent>
          </Card>

          {/* Sección 8: Buyer Persona */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                8. Buyer Persona (Cliente Ideal)
              </CardTitle>
              <CardDescription className="text-white/80">
                ✅ No es "todo el mundo". Es: quién es, qué necesita, qué le preocupa y por qué compra.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edadCliente">Edad aproximada</Label>
                  <Input id="edadCliente" {...register('edadCliente')} placeholder="Ej: 25-45 años" />
                </div>
                <div>
                  <Label htmlFor="generoCliente">Género</Label>
                  <Input id="generoCliente" {...register('generoCliente')} placeholder="Ej: Mujeres, Hombres, Ambos" />
                </div>
                <div>
                  <Label htmlFor="ubicacionCliente">Ubicación</Label>
                  <Input id="ubicacionCliente" {...register('ubicacionCliente')} placeholder="Ej: Tegucigalpa y alrededores" />
                </div>
                <div>
                  <Label htmlFor="nivelEconomico">Nivel económico</Label>
                  <RadioGroup className="flex gap-4 mt-2" onValueChange={(v) => setValue('nivelEconomico', v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bajo" id="bajo" />
                      <Label htmlFor="bajo">Bajo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medio" id="medio" />
                      <Label htmlFor="medio">Medio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="alto" id="alto" />
                      <Label htmlFor="alto">Alto</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div>
                <Label htmlFor="trabajoEstiloVida">¿Qué trabajo o estilo de vida tiene?</Label>
                <Input id="trabajoEstiloVida" {...register('trabajoEstiloVida')} placeholder="Ej: Profesionales, Amas de casa, Emprendedores..." />
              </div>
              <div>
                <Label htmlFor="problemaCliente">¿Qué problema tiene que tu negocio le resuelve?</Label>
                <Textarea id="problemaCliente" {...register('problemaCliente')} rows={2} />
              </div>
              <div>
                <Label className="mb-2 block">¿Qué es lo que más valora?</Label>
                <CheckboxGroup 
                  options={['Precio', 'Rapidez', 'Calidad', 'Confianza', 'Resultados', 'Lujo', 'Atención']} 
                  state={clienteValora} 
                  setState={setClienteValora} 
                />
              </div>
              <div>
                <Label htmlFor="miedosDudas">¿Qué lo detiene de comprar? (miedos, dudas)</Label>
                <Textarea id="miedosDudas" {...register('miedosDudas')} rows={2} />
              </div>
              <div>
                <Label className="mb-2 block">¿Dónde pasa más tiempo?</Label>
                <CheckboxGroup 
                  options={['Facebook', 'Instagram', 'TikTok', 'WhatsApp', 'Google']} 
                  state={clientePasaTiempo} 
                  setState={setClientePasaTiempo} 
                />
              </div>
              <div>
                <Label htmlFor="fraseTipica">Frase típica del cliente ideal</Label>
                <Input id="fraseTipica" {...register('fraseTipica')} placeholder='Ej: "Quiero algo bueno pero no tan caro"' />
              </div>
            </CardContent>
          </Card>

          {/* Sección 9: Competencia */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                9. Competencia y Referencia
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label>Top 3 competidores directos (nombres o links)</Label>
                <div className="space-y-2 mt-2">
                  <Input {...register('competidor1')} placeholder="1. Competidor..." />
                  <Input {...register('competidor2')} placeholder="2. Competidor..." />
                  <Input {...register('competidor3')} placeholder="3. Competidor..." />
                </div>
              </div>
              <div>
                <Label htmlFor="queGustaCompetencia">¿Qué te gusta de ellos?</Label>
                <Textarea id="queGustaCompetencia" {...register('queGustaCompetencia')} rows={2} />
              </div>
              <div>
                <Label htmlFor="queMalCompetencia">¿Qué hacen mal o podrías hacer mejor?</Label>
                <Textarea id="queMalCompetencia" {...register('queMalCompetencia')} rows={2} />
              </div>
              <div>
                <Label htmlFor="cuentasInspiran">Cuentas que te inspiran (pueden ser de otro país)</Label>
                <Textarea id="cuentasInspiran" {...register('cuentasInspiran')} placeholder="Links o nombres de cuentas que admiras..." rows={2} />
              </div>
            </CardContent>
          </Card>

          {/* Sección 10: Identidad y estilo */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                10. Identidad y Estilo de Comunicación
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label className="mb-2 block">¿Tu marca habla como…?</Label>
                <CheckboxGroup 
                  options={[
                    'Formal y corporativa',
                    'Juvenil y divertida',
                    'Premium y elegante',
                    'Cercana y barrio',
                    'Educativa y profesional'
                  ]} 
                  state={tonoMarca} 
                  setState={setTonoMarca} 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coloresMarca">Colores de marca</Label>
                  <Input id="coloresMarca" {...register('coloresMarca')} placeholder="Ej: Azul marino, dorado..." />
                </div>
                <div>
                  <Label htmlFor="tipografias">Tipografías (si sabe)</Label>
                  <Input id="tipografias" {...register('tipografias')} placeholder="Ej: Montserrat, Open Sans..." />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logoPNG">¿Logo en PNG?</Label>
                  <RadioGroup className="flex gap-4 mt-2" onValueChange={(v) => setValue('logoPNG', v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="logosi" />
                      <Label htmlFor="logosi">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="logono" />
                      <Label htmlFor="logono">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="tonoProhibido">Tono prohibido (qué NO querés que se diga)</Label>
                  <Input id="tonoProhibido" {...register('tonoProhibido')} placeholder="Ej: No usar jerga, no ser muy serios..." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sección 11: Recursos disponibles */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                11. Recursos Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>¿Tenés fotos y videos propios del negocio?</Label>
                  <RadioGroup className="flex gap-4 mt-2" onValueChange={(v) => setValue('tieneFotosVideos', v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="fvsi" />
                      <Label htmlFor="fvsi">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="fvno" />
                      <Label htmlFor="fvno">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label>¿Tenés alguien que grabe?</Label>
                  <RadioGroup className="flex gap-4 mt-2" onValueChange={(v) => setValue('tieneGrabador', v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="grsi" />
                      <Label htmlFor="grsi">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="grno" />
                      <Label htmlFor="grno">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label>¿Tenés testimonios en video?</Label>
                  <RadioGroup className="flex gap-4 mt-2" onValueChange={(v) => setValue('tieneTestimonios', v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="tesi" />
                      <Label htmlFor="tesi">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="teno" />
                      <Label htmlFor="teno">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label>¿Tenés catálogo / menú / lista de precios?</Label>
                  <RadioGroup className="flex gap-4 mt-2" onValueChange={(v) => setValue('tieneCatalogo', v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="catsi" />
                      <Label htmlFor="catsi">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="catno" />
                      <Label htmlFor="catno">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div>
                <Label htmlFor="driveLink">📌 Drive o carpeta con material (link)</Label>
                <Input id="driveLink" {...register('driveLink')} placeholder="https://drive.google.com/..." />
              </div>
            </CardContent>
          </Card>

          {/* Sección 12: Presupuesto de publicidad */}
          <Card className="border-novativa-teal/30 bg-white/95 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-novativa-teal to-novativa-lightBlue text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                13. Presupuesto de Publicidad
              </CardTitle>
              <CardDescription className="text-white/80">
                Si aplica
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <Label>¿Vas a invertir en pauta?</Label>
                <RadioGroup className="flex gap-4 mt-2" onValueChange={(v) => setValue('invertirPauta', v)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="pautasi" />
                    <Label htmlFor="pautasi">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="pautano" />
                    <Label htmlFor="pautano">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="presupuestoMensual">Presupuesto mensual estimado</Label>
                  <Input id="presupuestoMensual" {...register('presupuestoMensual')} placeholder="L. 0.00" />
                </div>
                <div>
                  <Label htmlFor="productoPautar">Producto que querés pautar primero</Label>
                  <Input id="productoPautar" {...register('productoPautar')} placeholder="Nombre del producto/servicio" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              size="lg"
              className="bg-gradient-to-r from-novativa-orange to-novativa-orange/80 hover:from-novativa-orange/90 hover:to-novativa-orange text-white px-12 py-6 text-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Brief Ejecutivo
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BriefEjecutivo;
