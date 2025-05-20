
import React, { useEffect, useRef } from 'react';

const MARLON_IA_SCRIPT = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiI3NDkyMTE0NTVlYTk0MjFmYTM2OTFmY2Mw%0D%0AZGZkYWU4MCIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3Yz%0D%0ALzc0OTIxMTQ1NWVhOTQyMWZhMzY5MWZjYzBkZmRhZTgwL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0%0D%0ALndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjUx%0D%0ANmZjY2YxNmU2NDQ5NmViMTgxYTdkOGQ4MmU5MjQzIiwidXNlcm5hbWUiOiI5ZGQ1MTFjYzAyMzY0%0D%0AYzRmOTRhNmZlNDAyZTBjZjgwOSJ9&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`
  #heygen-streaming-embed {
    z-index: 9999;
    position: fixed;
    left: 40px;
    bottom: 40px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
    transition: all linear 0.1s;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
  }
  #heygen-streaming-embed.show {
    opacity: 1;
    visibility: visible;
  }
  #heygen-streaming-embed.expand {
    \${clientWidth<540?"height: 266px; width: 96%; left: 50%; transform: translateX(-50%);":"height: 366px; width: calc(366px * 16 / 9);"}
    border: 0;
    border-radius: 8px;
  }
  #heygen-streaming-container {
    width: 100%;
    height: 100%;
  }
  #heygen-streaming-container iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
  \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container);arguments[0].appendChild(wrapDiv)};`;

const MarlonIASection = () => {
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scriptContainerRef.current) {
      // Limpia primero cualquier contenido anterior
      scriptContainerRef.current.innerHTML = "";
      // Crea e inserta el script
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.text = MARLON_IA_SCRIPT + "window && window.document && window.document.currentScript && window.document.currentScript.parentElement && window.document.currentScript.parentElement.parentElement && window.document.currentScript.parentElement.parentElement.contains(window.document.getElementById('heygen-streaming-embed'));";
      scriptContainerRef.current.appendChild(script);
    }

    // Limpieza al desmontar
    return () => {
      if (scriptContainerRef.current) {
        const embed = scriptContainerRef.current.querySelector("#heygen-streaming-embed");
        if (embed) embed.remove();
      }
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
        className="w-full mx-auto mb-6 bg-gray-50 border border-blue-100 rounded-lg flex justify-center items-center min-h-[240px]"
        style={{ minHeight: 240 }}
      />
      <p className="text-center text-sm text-gray-500 mt-4">
        Haz clic en Marlon y comienza a hablarle. Te responderá con su voz.
      </p>
    </div>
  );
};

export default MarlonIASection;
