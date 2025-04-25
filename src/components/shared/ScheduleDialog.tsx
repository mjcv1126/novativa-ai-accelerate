
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleClick = () => {
    // Track the click event with Facebook Pixel
    fbTrack('ScheduleButtonClick');
    
    if (toPricing) {
      navigate('/precios');
    } else {
      navigate('/agenda');
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
