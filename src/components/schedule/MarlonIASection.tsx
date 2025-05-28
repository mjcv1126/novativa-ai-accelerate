
import React, { useEffect, useRef } from 'react';

const MARLON_IA_SCRIPT = `!function(window){
  const host="https://labs.heygen.com",
    url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiI3NDkyMTE0NTVlYTk0MjFmYTM2OTFmY2MwZGZkYWU4MCIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzc0OTIxMTQ1NWVhOTQyMWZhMzY5MWZjYzBkZmRhZTgwL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0LndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjUxNmZjY2YxNmU2NDQ5NmViMTgxYTdkOGQ4MmU5MjQzIiwidXNlcm5hbWUiOiI5ZGQ1MTFjYzAyMzY0YzRmOTRhNmZlNDAyZTBjZjgwOSJ9&inIFrame=1";
  const parentDiv = document.getElementById("mi-espacio-embed");
  if (!parentDiv) { console.error("No existe el contenedor #mi-espacio-embed"); return; }

  // Limpia el contenedor antes de insertar
  parentDiv.innerHTML = "";

  // Crea el contenedor para el iframe
  const container = document.createElement("div");
  container.id = "heygen-streaming-container";
  container.style.width = "100%";
  container.style.height = "100%";

  // Aplica CSS al iframe
  const stylesheet = document.createElement("style");
  stylesheet.innerHTML = \`
    #heygen-streaming-container {
      width: 100%;
      height: 100%;
    }
    #heygen-streaming-container iframe {
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: 0;
    }
  \`;

  // Crea el iframe
  const iframe = document.createElement("iframe");
  iframe.allowFullscreen = false;
  iframe.title = "Streaming Embed";
  iframe.role = "dialog";
  iframe.allow = "microphone";
  iframe.src = url;

  // Inserta
  container.appendChild(iframe);
  parentDiv.appendChild(stylesheet);
  parentDiv.appendChild(container);

  // Eventos de show/hide no son relevantes aquí, pero puedes agregarlos si tu embed los requiere
}(globalThis);`;

const MarlonIASection = () => {
  const scriptContainerRef = useRef<HTMLDivElement>(null);
  const scriptExecutedRef = useRef(false);

  useEffect(() => {
    if (scriptContainerRef.current && !scriptExecutedRef.current) {
      console.log('Iniciando carga del nuevo script de HeyGen...');
      
      // Asigna el ID requerido por el script
      scriptContainerRef.current.id = "mi-espacio-embed";
      
      // Ejecuta el script después de un pequeño delay
      setTimeout(() => {
        try {
          console.log('Ejecutando nuevo script de HeyGen...');
          
          // Ejecuta el script directamente
          const scriptFunction = new Function(MARLON_IA_SCRIPT);
          scriptFunction();
          
          console.log('Nuevo script de HeyGen ejecutado exitosamente');
          scriptExecutedRef.current = true;
          
          // Verifica si el embed se creó correctamente
          setTimeout(() => {
            const container = document.getElementById('heygen-streaming-container');
            if (container) {
              console.log('Contenedor de HeyGen encontrado y visible');
            } else {
              console.error('No se pudo encontrar el contenedor de HeyGen');
            }
          }, 1000);
          
        } catch (error) {
          console.error('Error ejecutando el nuevo script de HeyGen:', error);
        }
      }, 500);
    }

    // Limpieza al desmontar
    return () => {
      if (scriptContainerRef.current) {
        scriptContainerRef.current.innerHTML = "";
      }
      scriptExecutedRef.current = false;
    };
  }, []);

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-8 mb-12 border border-blue-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
        ¿Para qué esperar? Conversa un poco con Marlon IA ahorita:
      </h2>
      <div
        ref={scriptContainerRef}
        className="w-full mx-auto mb-6 rounded-xl overflow-hidden"
        style={{ 
          width: '100%', 
          height: '400px', 
          maxWidth: '600px', 
          margin: 'auto', 
          borderRadius: '12px', 
          overflow: 'hidden', 
          boxShadow: '0 2px 12px rgba(0,0,0,0.12)'
        }}
      />
      <p className="text-center text-sm text-gray-500 mt-4">
        Haz clic en Marlon y comienza a hablarle. Te responderá con su voz.
      </p>
    </div>
  );
};

export default MarlonIASection;
