
import React from 'react';

interface NovativaLogoProps {
  variant?: 'default' | 'light' | 'dark';
  size?: 'default' | 'small' | 'large';
}

const NovativaLogo: React.FC<NovativaLogoProps> = ({ 
  variant = 'default',
  size = 'default'
}) => {
  // Logo color based on variant
  const logoSrc = variant === 'light' 
    ? '/lovable-uploads/9cce1d6a-72e1-493f-bb16-901571c7e858.png'  // Use white/light version
    : '/lovable-uploads/9cce1d6a-72e1-493f-bb16-901571c7e858.png'; // Default logo
  
  // Size classes based on size prop
  const sizeClasses = {
    small: 'h-8',
    default: 'h-10',
    large: 'h-14'
  }[size];

  return (
    <div className="flex items-center">
      <img src={logoSrc} alt="Novativa Logo" className={`${sizeClasses} w-auto`} />
    </div>
  );
};

export default NovativaLogo;
