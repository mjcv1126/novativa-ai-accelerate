
import React from 'react';

const MarlonIASection = () => {
  return (
    <div className="bg-card/80 backdrop-blur-lg rounded-xl shadow-lg p-8 mb-12 border border-border">
      <h2 className="text-2xl font-semibold mb-6 text-foreground text-center flex items-center justify-center gap-2">
        <div className="h-6 w-1 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
        Te invito a que nos mantengamos conectados
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* TikTok Column */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-medium mb-4 text-foreground">Síguenos en TikTok</h3>
          <blockquote 
            className="tiktok-embed" 
            cite="https://www.tiktok.com/@hackmillonario" 
            data-unique-id="hackmillonario" 
            data-embed-type="creator"
            style={{ maxWidth: '400px', minWidth: '288px', width: '100%' }}
          >
            <section>
              <a target="_blank" href="https://www.tiktok.com/@hackmillonario?refer=creator_embed">
                @hackmillonario
              </a>
            </section>
          </blockquote>
        </div>

        {/* LinkedIn Column */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-medium mb-4 text-foreground">Conecta en LinkedIn</h3>
          <div className="linkedin-profile w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#0077B5]/10 to-[#005582]/10 rounded-lg border border-[#0077B5]/20 flex flex-col items-center justify-center p-8">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-[#0077B5]/20">
              <img 
                src="/marlon-profile.jpg" 
                alt="Marlon Caballero - Perfil profesional" 
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Marlon Caballero</h4>
            <p className="text-muted-foreground text-center mb-6 text-sm">
              Conecta conmigo en LinkedIn para contenido profesional y networking
            </p>
            <a 
              href="https://www.linkedin.com/in/marloncaballero/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#005582] transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Ver Perfil en LinkedIn
            </a>
          </div>
        </div>
      </div>
      <script async src="https://www.tiktok.com/embed.js"></script>
    </div>
  );
};

export default MarlonIASection;
