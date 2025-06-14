
import React from 'react';
import { Button } from "@/components/ui/button";
import { fbTrack } from '@/utils/fbPixel';

interface ScheduleDialogProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  toPricing?: boolean;
}

const ScheduleDialog = ({ children, variant, size, className, toPricing }: ScheduleDialogProps) => {
  const handleClick = () => {
    // Track the click event with Facebook Pixel
    fbTrack('ScheduleButtonClick');
    
    if (toPricing) {
      // Navigate to pricing page
      window.location.href = '/precios';
    } else {
      // Navigate to formulario page instead of TidyCal
      window.location.href = '/formulario';
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default ScheduleDialog;
