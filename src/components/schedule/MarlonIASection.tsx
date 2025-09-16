
import React from 'react';

const MarlonIASection = () => {
  return (
    <div className="bg-card/80 backdrop-blur-lg rounded-xl shadow-lg p-8 mb-12 border border-border">
      <h2 className="text-2xl font-semibold mb-6 text-foreground text-center flex items-center justify-center gap-2">
        <div className="h-6 w-1 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
        Te invito a que nos mantengamos conectados
      </h2>
      <div className="flex justify-center">
        <blockquote 
          className="tiktok-embed" 
          cite="https://www.tiktok.com/@novativa.ai" 
          data-unique-id="novativa.ai" 
          data-embed-type="creator"
          style={{ maxWidth: '780px', minWidth: '288px' }}
        >
          <section>
            <a target="_blank" href="https://www.tiktok.com/@novativa.ai?refer=creator_embed">
              @novativa.ai
            </a>
          </section>
        </blockquote>
        <script async src="https://www.tiktok.com/embed.js"></script>
      </div>
    </div>
  );
};

export default MarlonIASection;
