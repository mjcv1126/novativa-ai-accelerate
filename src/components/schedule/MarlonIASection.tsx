
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
            style={{ maxWidth: '780px', minWidth: '288px' }}
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
      
      {/* WhatsApp Contact Section */}
      <div className="mt-8 pt-6 border-t border-border/50 text-center">
        <p className="text-muted-foreground mb-4">También puedes escribirme directamente vía WhatsApp</p>
        <a 
          href="http://api.whatsapp.com/send?phone=50496472774"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          Contacta a Marlon por WhatsApp
        </a>
      </div>
      
      <script async src="https://www.tiktok.com/embed.js"></script>
    </div>
  );
};

export default MarlonIASection;
