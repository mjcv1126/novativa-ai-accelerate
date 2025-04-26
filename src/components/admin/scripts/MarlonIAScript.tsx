
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MarlonIAScript = () => {
  const [script, setScript] = useState(() => {
    return localStorage.getItem('novativa_marlon_ia_script') || '';
  });
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('novativa_marlon_ia_script', script);
    
    // Apply the script
    const scriptEl = document.getElementById('marlon-ia-script');
    if (scriptEl) {
      scriptEl.innerHTML = script;
    }
    
    toast({
      title: "Script guardado",
      description: "El script de Marlon IA ha sido actualizado correctamente",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Script de Marlon IA</CardTitle>
        <CardDescription>
          Ingresa el código del script para el chat con Marlon IA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Pega aquí el código del script..."
          className="min-h-[200px] font-mono"
        />
        <Button 
          onClick={handleSave}
          className="mt-4"
        >
          Guardar Script
        </Button>
      </CardContent>
    </Card>
  );
};

export default MarlonIAScript;
