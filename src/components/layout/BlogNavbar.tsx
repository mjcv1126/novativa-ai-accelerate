
import React from 'react';
import { Link } from 'react-router-dom';
import NovativaLogo from '@/components/shared/NovativaLogo';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const BlogNavbar = () => {
  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send?phone=50432142996', '_blank');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <NovativaLogo />
          </Link>

          {/* WhatsApp CTA */}
          <Button
            onClick={handleWhatsAppClick}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Contáctanos
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default BlogNavbar;
