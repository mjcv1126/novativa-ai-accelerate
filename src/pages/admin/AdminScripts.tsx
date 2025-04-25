
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';

const AdminScripts = () => {
  const [headerScripts, setHeaderScripts] = useState('');
  const [bodyStartScripts, setBodyStartScripts] = useState('');
  const [bodyEndScripts, setBodyEndScripts] = useState('');
  const [tagName, setTagName] = useState('');
  const [tagCode, setTagCode] = useState('');
  const [tags, setTags] = useState<{ name: string; code: string; active: boolean }[]>([
    { 
      name: 'Google Analytics', 
      code: `<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`,
      active: true
    },
    { 
      name: 'Facebook Pixel', 
      code: `<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'XXXXXXXXXXXXXXXXX');
  fbq('track', 'PageView');
</script>`,
      active: false
    },
    { 
      name: 'HotJar', 
      code: `<!-- Hotjar -->
<script>
  (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:XXXXXX,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`,
      active: false
    },
  ]);
  const { toast } = useToast();

  const handleAddTag = () => {
    if (tagName && tagCode) {
      setTags([...tags, { name: tagName, code: tagCode, active: false }]);
      setTagName('');
      setTagCode('');
      toast({
        title: "Tag agregado",
        description: `Se ha agregado el tag "${tagName}" a la lista`,
      });
    }
  };

  const toggleTagStatus = (index: number) => {
    const newTags = [...tags];
    newTags[index].active = !newTags[index].active;
    setTags(newTags);
    toast({
      title: newTags[index].active ? "Tag activado" : "Tag desactivado",
      description: `El tag "${newTags[index].name}" ha sido ${newTags[index].active ? "activado" : "desactivado"}`,
    });
  };

  const handleSaveScripts = (location: string) => {
    toast({
      title: "Scripts guardados",
      description: `Los scripts para ${location} se han guardado correctamente`,
    });
  };

  return (
    <>
      <Helmet>
        <title>Administrar Scripts | Novativa</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Administrar Scripts</h1>
        
        <Tabs defaultValue="predefined" className="space-y-4">
          <TabsList>
            <TabsTrigger value="predefined">Tags predefinidos</TabsTrigger>
            <TabsTrigger value="custom">Scripts personalizados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="predefined">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tags predefinidos</CardTitle>
                  <CardDescription>
                    Administra tags comunes como Google Analytics, Facebook Pixel, etc.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tags.map((tag, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{tag.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${tag.active ? 'text-green-500' : 'text-red-500'}`}>
                            {tag.active ? 'Activo' : 'Inactivo'}
                          </span>
                          <Button 
                            variant={tag.active ? "outline" : "default"}
                            className={tag.active ? "border-red-500 text-red-500 hover:bg-red-50" : "bg-green-500 hover:bg-green-600"}
                            onClick={() => toggleTagStatus(index)}
                          >
                            {tag.active ? 'Desactivar' : 'Activar'}
                          </Button>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded text-sm font-mono overflow-x-auto">
                        <pre>{tag.code}</pre>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardHeader className="border-t pt-6 mt-4">
                  <CardTitle>Agregar Nuevo Tag</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Nombre del Tag</label>
                    <Input 
                      value={tagName}
                      onChange={(e) => setTagName(e.target.value)}
                      placeholder="Ej: LinkedIn Pixel"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Código</label>
                    <Textarea 
                      value={tagCode}
                      onChange={(e) => setTagCode(e.target.value)}
                      placeholder="Pega aquí el código del tag..."
                      className="min-h-[150px] font-mono"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleAddTag}
                    className="bg-novativa-teal hover:bg-novativa-lightTeal"
                    disabled={!tagName || !tagCode}
                  >
                    Agregar Tag
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="custom">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scripts en Header</CardTitle>
                  <CardDescription>
                    Estos scripts se cargarán en la sección head de tu sitio web
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    value={headerScripts}
                    onChange={(e) => setHeaderScripts(e.target.value)}
                    placeholder="<!-- Inserta aquí tus scripts para el head -->"
                    className="min-h-[150px] font-mono"
                  />
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSaveScripts('header')}
                    className="bg-novativa-teal hover:bg-novativa-lightTeal flex gap-2"
                  >
                    <Save className="h-4 w-4" /> Guardar Scripts de Header
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Scripts al inicio del Body</CardTitle>
                  <CardDescription>
                    Estos scripts se cargarán justo después de la etiqueta body
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    value={bodyStartScripts}
                    onChange={(e) => setBodyStartScripts(e.target.value)}
                    placeholder="<!-- Inserta aquí tus scripts para el inicio del body -->"
                    className="min-h-[150px] font-mono"
                  />
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSaveScripts('inicio del body')}
                    className="bg-novativa-teal hover:bg-novativa-lightTeal flex gap-2"
                  >
                    <Save className="h-4 w-4" /> Guardar Scripts de Inicio
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Scripts al final del Body</CardTitle>
                  <CardDescription>
                    Estos scripts se cargarán justo antes del cierre de la etiqueta body
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    value={bodyEndScripts}
                    onChange={(e) => setBodyEndScripts(e.target.value)}
                    placeholder="<!-- Inserta aquí tus scripts para el final del body -->"
                    className="min-h-[150px] font-mono"
                  />
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSaveScripts('final del body')}
                    className="bg-novativa-teal hover:bg-novativa-lightTeal flex gap-2"
                  >
                    <Save className="h-4 w-4" /> Guardar Scripts de Final
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminScripts;
