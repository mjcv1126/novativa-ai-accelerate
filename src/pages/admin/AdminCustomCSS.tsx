
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Check } from 'lucide-react';
import { useCustomCSS } from '@/contexts/CustomCSSContext';
import { useToast } from '@/hooks/use-toast';

const AdminCustomCSS = () => {
  const { customCSS, setCustomCSS, applyCustomCSS } = useCustomCSS();
  const [editedCSS, setEditedCSS] = useState(customCSS);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleSaveCSS = () => {
    setCustomCSS(editedCSS);
    applyCustomCSS();
    toast({
      title: "CSS guardado",
      description: "El CSS personalizado ha sido guardado y aplicado correctamente",
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>CSS Personalizado | Admin Novativa</title>
      </Helmet>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">CSS Personalizado</h1>

        <Card>
          <CardHeader>
            <CardTitle>Editor de CSS</CardTitle>
            <CardDescription>
              Agrega CSS personalizado que se aplicará a todo el sitio web. Este CSS tiene prioridad sobre los estilos predeterminados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              value={editedCSS} 
              onChange={(e) => setEditedCSS(e.target.value)}
              placeholder="/* Escribe tu CSS personalizado aquí */\n\n/* Ejemplo: */\n.header {\n  background-color: #ff0000;\n}" 
              className="min-h-[400px] font-mono text-sm"
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-gray-500">
              El CSS se aplicará inmediatamente después de guardarlo.
            </div>
            <Button 
              onClick={handleSaveCSS} 
              className="bg-novativa-teal hover:bg-novativa-lightTeal flex gap-2"
            >
              {isSaved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {isSaved ? 'Guardado' : 'Guardar CSS'}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consejos para CSS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-bold">Selectores específicos</h3>
              <p className="text-sm text-gray-600">
                Para asegurarte de que tus estilos tengan prioridad, utiliza selectores específicos o 
                agrega "!important" a las propiedades.
              </p>
              <div className="bg-gray-100 p-2 rounded mt-1 font-mono text-xs">
                .header .logo {'{'}color: #ff0000 !important;{'}'}
              </div>
            </div>

            <div>
              <h3 className="font-bold">Media Queries</h3>
              <p className="text-sm text-gray-600">
                Puedes usar media queries para aplicar estilos responsivos:
              </p>
              <div className="bg-gray-100 p-2 rounded mt-1 font-mono text-xs">
                @media (max-width: 768px) {'{'}<br />
                &nbsp;&nbsp;.header {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;padding: 10px;<br />
                &nbsp;&nbsp;{'}'}<br />
                {'}'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminCustomCSS;
