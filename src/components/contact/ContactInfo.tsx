
import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from 'lucide-react';
import { TiktokIcon } from '@/components/shared/TiktokIcon';

const ContactInfo = () => {
  return (
    <div className="bg-gray-50 rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-8">Información de Contacto</h2>
      
      <div className="space-y-8">
        <div className="flex items-start">
          <div className="bg-novativa-teal/10 p-3 rounded-full mr-4">
            <MapPin className="text-novativa-teal" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Dirección</h3>
            <p className="text-gray-600">
              San José, Costa Rica | Miami, Florida | San Pedro Sula, Honduras
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-novativa-teal/10 p-3 rounded-full mr-4">
            <Phone className="text-novativa-teal" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Teléfono</h3>
            <a 
              href="https://api.whatsapp.com/send?phone=50432142996" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-[#7E69AB] transition-colors"
            >
              +504 3214-2996
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-novativa-teal/10 p-3 rounded-full mr-4">
            <Mail className="text-novativa-teal" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Email</h3>
            <p className="text-gray-600">soporte@novativa.org</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-novativa-teal/10 p-3 rounded-full mr-4">
            <Clock className="text-novativa-teal" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-1">Horario de Atención</h3>
            <p className="text-gray-600">Lunes - Viernes: 8:00 AM - 5:00 PM</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="font-bold text-lg mb-4">Síguenos en Redes Sociales</h3>
        <div className="flex space-x-4">
          <a 
            href="https://www.facebook.com/novativa.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-novativa-teal/10 hover:bg-novativa-teal/20 p-3 rounded-full transition-colors"
          >
            <Facebook className="w-5 h-5 text-novativa-teal" />
          </a>
          <a 
            href="https://www.instagram.com/novativa.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-novativa-teal/10 hover:bg-novativa-teal/20 p-3 rounded-full transition-colors"
          >
            <Instagram className="w-5 h-5 text-novativa-teal" />
          </a>
          <a 
            href="https://www.tiktok.com/@novativa.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-novativa-teal/10 hover:bg-novativa-teal/20 p-3 rounded-full transition-colors"
          >
            <TiktokIcon className="w-5 h-5 text-novativa-teal" />
          </a>
          <a 
            href="https://www.youtube.com/@novativa.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-novativa-teal/10 hover:bg-novativa-teal/20 p-3 rounded-full transition-colors"
          >
            <Youtube className="w-5 h-5 text-novativa-teal" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
