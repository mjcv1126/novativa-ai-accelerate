
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

interface ScheduleDialogProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const ScheduleDialog = ({ children, variant, size, className }: ScheduleDialogProps) => {
  useEffect(() => {
    const loadTidyCal = () => {
      const script = document.createElement('script');
      script.src = 'https://asset-tidycal.b-cdn.net/js/embed.js';
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    };

    return loadTidyCal();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div className="tidycal-embed" data-path="novativa"></div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
