
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

  // Apply script on initial load and whenever script changes
  useEffect(() => {
    const applyScript = () => {
      // For admin preview
      const previewScriptEl = document.getElementById('marlon-ia-script-preview');
      if (previewScriptEl) {
        previewScriptEl.innerHTML = script;
      }
      
      // For actual schedule confirmation page
      const scriptEl = document.getElementById('marlon-ia-script');
      if (scriptEl) {
        scriptEl.innerHTML = script;
        
        // Execute any scripts that might be in the HTML
        const scriptTags = scriptEl.querySelectorAll('script');
        scriptTags.forEach(oldScript => {
          const newScript = document.createElement('script');
          
          // Copy all attributes
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          
          // Copy the content
          newScript.textContent = oldScript.textContent;
          
          // Replace the old with the new
          oldScript.parentNode?.replaceChild(newScript, oldScript);
        });
      }
    };
    
    // Apply script on component mount and whenever script changes
    applyScript();
    
    // Add an interval to check and apply the script periodically
    // This helps when script element is loaded conditionally/dynamically
    const interval = setInterval(applyScript, 2000);
    
    return () => clearInterval(interval);
  }, [script]);

  const handleSave = () => {
    localStorage.setItem('novativa_marlon_ia_script', script);
    
    // Apply the script when saved
    const scriptEl = document.getElementById('marlon-ia-script');
    if (scriptEl) {
      scriptEl.innerHTML = script;
      
      // Execute scripts
      const scriptTags = scriptEl.querySelectorAll('script');
      scriptTags.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
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
        
        {/* Preview area */}
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Vista previa:</h4>
          <div 
            id="marlon-ia-script-preview" 
            className="border rounded-md p-4 min-h-[200px] bg-gray-50"
          >
            {/* Script preview will be inserted here */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarlonIAScript;
