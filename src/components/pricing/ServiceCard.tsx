
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ServiceCardProps = {
  title: string;
  tooltip: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  buttonVariant?: 'default' | 'orange';
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  tooltip,
  features,
  buttonText,
  buttonLink,
  buttonVariant = 'default'
}) => {
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
        <span>{title}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <HelpCircle className="h-4 w-4" />
                <span className="sr-only">Información</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="text-novativa-teal mr-2 mt-1 flex-shrink-0" size={16} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="text-center mt-6">
        <Button 
          asChild
          className={buttonVariant === 'orange' 
            ? "bg-novativa-orange hover:bg-novativa-lightOrange w-full" 
            : "bg-novativa-teal hover:bg-novativa-lightTeal w-full"
          }
        >
          <Link to={buttonLink}>
            {buttonText}
          </Link>
        </Button>
      </div>
    </div>
  );
};
