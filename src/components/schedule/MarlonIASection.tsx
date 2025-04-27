
import React, { useEffect } from 'react';

const MarlonIAScript = `!function(window){const host="https://labs.heygen.com",url=host+"/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJUaGFkZGV1c19DaGFpcl9TaXR0aW5nX3B1%0D%0AYmxpYyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzLzVh%0D%0AZjhhMzNjODhkMDQ0ZWNiN2YyOWMyNDRkODc5ZTk3XzU1NDQwL3ByZXZpZXdfdGFyZ2V0LndlYnAi%0D%0ALCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjUxNmZjY2Yx%0D%0ANmU2NDQ5NmViMTgxYTdkOGQ4MmU5MjQzIiwidXNlcm5hbWUiOiI5ZGQ1MTFjYzAyMzY0YzRmOTRh%0D%0ANmZlNDAyZTBjZjgwOSJ9&inIFrame=1",clientWidth=document.body.clientWidth,wrapDiv=document.createElement("div");wrapDiv.id="heygen-streaming-embed";const container=document.createElement("div");container.id="heygen-streaming-container";const stylesheet=document.createElement("style");stylesheet.innerHTML=\`\n  #heygen-streaming-embed {\n    z-index: 9999;\n    position: fixed;\n    left: 40px;\n    bottom: 40px;\n    width: 200px;\n    height: 200px;\n    border-radius: 50%;\n    border: 2px solid #fff;\n    box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);\n    transition: all linear 0.1s;\n    overflow: hidden;\n\n    opacity: 0;\n    visibility: hidden;\n  }\n  #heygen-streaming-embed.show {\n    opacity: 1;\n    visibility: visible;\n  }\n  #heygen-streaming-embed.expand {\n    \${clientWidth<540?"height: 266px; width: 96%; left: 50%; transform: translateX(-50%);":"height: 366px; width: calc(366px * 16 / 9);"}\n    border: 0;\n    border-radius: 8px;\n  }\n  #heygen-streaming-container {\n    width: 100%;\n    height: 100%;\n  }\n  #heygen-streaming-container iframe {\n    width: 100%;\n    height: 100%;\n    border: 0;\n  }\n  \`;const iframe=document.createElement("iframe");iframe.allowFullscreen=!1,iframe.title="Streaming Embed",iframe.role="dialog",iframe.allow="microphone",iframe.src=url;let visible=!1,initial=!1;window.addEventListener("message",(e=>{e.origin===host&&e.data&&e.data.type&&"streaming-embed"===e.data.type&&("init"===e.data.action?(initial=!0,wrapDiv.classList.toggle("show",initial)):"show"===e.data.action?(visible=!0,wrapDiv.classList.toggle("expand",visible)):"hide"===e.data.action&&(visible=!1,wrapDiv.classList.toggle("expand",visible)))})),container.appendChild(iframe),wrapDiv.appendChild(stylesheet),wrapDiv.appendChild(container),document.body.appendChild(wrapDiv)}(globalThis);`;

const MarlonIASection = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = MarlonIAScript;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      const embedDiv = document.getElementById('heygen-streaming-embed');
      if (embedDiv) {
        document.body.removeChild(embedDiv);
      }
    };
  }, []);

  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-lg p-8 mb-12 border border-blue-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
        ¿Para qué esperar? Conversa un poco con Marlon IA ahorita:
      </h2>
      <div id="marlon-ia-script" className="w-full min-h-[400px] rounded-lg">
        {/* The Heygen embed will be injected here by the script */}
      </div>
    </div>
  );
};

export default MarlonIASection;

