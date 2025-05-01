
import React, { useEffect } from 'react';

const MarlonIAScript = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJUaGFkZGV1c19DaGFpcl9TaXR0aW5nX3B1%0D%0AYmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzVh%0D%0AZjhhMzNjODhkMDQ0ZWNiN2YyOWMyNDRkODc5ZTk3XzU1NDQwL3ByZXZpZXdfdGFyZ2V0LndlYnAi%0D%0ALCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjUxNmZjY2Yx%0D%0ANmU2NDQ5NmViMTgxYTdkOGQ4MmU5MjQzIiwidXNlcm5hbWUiOiI5ZGQ1MTFjYzAyMzY0YzRmOTRh%0D%0ANmZlNDAyZTBjZjgwOSJ9&inIFrame=1",wrapDiv=document.getElementById("marlon-ia-script");if(wrapDiv){const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`
  #heygen-streaming-container {
    width: 400px;
    height: 400px;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 auto;
    border: 2px solid #fff;
    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
  }
  #heygen-streaming-container iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
\`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!0,initial=!0;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action||(visible="show"===e.data.action))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container)}}(window);`;

const MarlonIASection = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = MarlonIAScript;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      const container = document.getElementById('heygen-streaming-container');
      if (container) {
        container.remove();
      }
    };
  }, []);

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-8 mb-12 border border-blue-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
        ¿Para qué esperar? Conversa un poco con Marlon IA ahorita:
      </h2>
      <div id="marlon-ia-script" className="w-full flex justify-center rounded-lg">
        {/* The Heygen embed will be injected here by the script */}
      </div>
    </div>
  );
};

export default MarlonIASection;
