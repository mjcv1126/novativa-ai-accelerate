
import React from 'react';

const PartnerLogos = () => {
  const logos = [{
    src: '/lovable-uploads/b9aa957e-08c9-4897-9b8d-153e6c596fd5.png',
    alt: 'Partner 1'
  }, {
    src: '/lovable-uploads/a3722601-7c29-4740-8c43-cef8f215270b.png',
    alt: 'Partner 2'
  }, {
    src: '/lovable-uploads/bb515735-f62d-4e6a-9820-1802c67cab23.png',
    alt: 'Partner 3'
  }, {
    src: '/lovable-uploads/d9c08571-214e-4163-bee5-427cb5806051.png',
    alt: 'Partner 4'
  }, {
    src: '/lovable-uploads/273936d8-3c22-47ef-901d-331672932695.png',
    alt: 'Partner 5'
  }];
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {logos.map((logo, index) => (
            <div key={index} className="w-24 md:w-32 opacity-70 hover:opacity-100 transition-opacity">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
