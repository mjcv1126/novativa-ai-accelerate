
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save } from 'lucide-react';

interface CustomScriptsProps {
  headerScripts: string;
  bodyStartScripts: string;
  bodyEndScripts: string;
  onHeaderScriptsChange: (value: string) => void;
  onBodyStartScriptsChange: (value: string) => void;
  onBodyEndScriptsChange: (value: string) => void;
  onSaveScripts: (location: string) => void;
}

const CustomScripts = ({
  headerScripts,
  bodyStartScripts,
  bodyEndScripts,
  onHeaderScriptsChange,
  onBodyStartScriptsChange,
  onBodyEndScriptsChange,
  onSaveScripts
}: CustomScriptsProps) => {
  return (
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
            onChange={(e) => onHeaderScriptsChange(e.target.value)}
            placeholder="<!-- Inserta aquí tus scripts para el head -->"
            className="min-h-[150px] font-mono"
          />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => onSaveScripts('header')}
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
            onChange={(e) => onBodyStartScriptsChange(e.target.value)}
            placeholder="<!-- Inserta aquí tus scripts para el inicio del body -->"
            className="min-h-[150px] font-mono"
          />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => onSaveScripts('inicio del body')}
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
            onChange={(e) => onBodyEndScriptsChange(e.target.value)}
            placeholder="<!-- Inserta aquí tus scripts para el final del body -->"
            className="min-h-[150px] font-mono"
          />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => onSaveScripts('final del body')}
            className="bg-novativa-teal hover:bg-novativa-lightTeal flex gap-2"
          >
            <Save className="h-4 w-4" /> Guardar Scripts de Final
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomScripts;
