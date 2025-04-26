
import React from 'react';
import { HelpCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlatformIcons } from './PlatformIcons';

export const PlatformIntegrations: React.FC = () => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          Integrable con plataformas
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Información</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Integra tu agente IA con múltiples plataformas de mensajería
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <PlatformIcons />
      </TableCell>
      {[...Array(4)].map((_, i) => (
        <TableCell key={i} className="text-center text-green-500">
          <Check className="mx-auto" size={18} />
        </TableCell>
      ))}
    </TableRow>
  );
};
