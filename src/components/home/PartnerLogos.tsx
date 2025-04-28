
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
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-gray-500 text-lg mb-8">Empresas que confían en nosotros</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;
