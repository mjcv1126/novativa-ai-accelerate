import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, HelpCircle, MessageSquare, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Whatsapp,
  Instagram,
  Facebook,
  Telegram
} from 'lucide-react';

type PricingTableProps = {
  billingCycle: 'monthly' | 'annual';
};

const PricingTable: React.FC<PricingTableProps> = ({ billingCycle }) => {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-1/5">Característica</TableHead>
            <TableHead className="text-center">Diamante</TableHead>
            <TableHead className="text-center">Elite</TableHead>
            <TableHead className="text-center">Starter</TableHead>
            <TableHead className="text-center">Demo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Usuarios Activos / Mes</TableCell>
            <TableCell className="text-center">14,000</TableCell>
            <TableCell className="text-center">5,000</TableCell>
            <TableCell className="text-center">3,000</TableCell>
            <TableCell className="text-center">50</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Bots/Flujos Automatizados</TableCell>
            <TableCell className="text-center">20</TableCell>
            <TableCell className="text-center">15</TableCell>
            <TableCell className="text-center">10</TableCell>
            <TableCell className="text-center">5</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Creación de Formularios y Bloques</TableCell>
            <TableCell className="text-center">Ilimitados</TableCell>
            <TableCell className="text-center">Ilimitados</TableCell>
            <TableCell className="text-center">Ilimitados</TableCell>
            <TableCell className="text-center">Ilimitados</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">NovaChannel: OmniChannel LiveChat</TableCell>
            <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
            <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
            <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
            <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Webhooks y API's Disponible</TableCell>
            <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
            <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
            <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
            <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Agentes para LiveChat</TableCell>
            <TableCell className="text-center">5</TableCell>
            <TableCell className="text-center">3</TableCell>
            <TableCell className="text-center">2</TableCell>
            <TableCell className="text-center">N/A</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Usuarios Administradores</TableCell>
            <TableCell className="text-center">3</TableCell>
            <TableCell className="text-center">2</TableCell>
            <TableCell className="text-center">1</TableCell>
            <TableCell className="text-center">N/A</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Historial de Chat</TableCell>
            <TableCell className="text-center">65 días</TableCell>
            <TableCell className="text-center">65 días</TableCell>
            <TableCell className="text-center">65 días</TableCell>
            <TableCell className="text-center">15 días</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Onboarding de Implementación</TableCell>
            <TableCell className="text-center">1 hora</TableCell>
            <TableCell className="text-center">1 hora</TableCell>
            <TableCell className="text-center">N/A</TableCell>
            <TableCell className="text-center">N/A</TableCell>
          </TableRow>
          
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
              <div className="flex gap-2 mt-2 text-gray-500">
                <Whatsapp size={16} />
                <Telegram size={16} />
                <Instagram size={16} />
                <Facebook size={16} />
                <Globe size={16} />
                <MessageSquare size={16} title="SMS" />
              </div>
            </TableCell>
            <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
            <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
            <TableCell className="text-center text-green-500"><Check className="mx-auto" size={18} /></TableCell>
            <TableCell className="text-center text-red-500"><X className="mx-auto" size={18} /></TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">Precio Mensual</TableCell>
            <TableCell className="text-center font-bold">
              {billingCycle === 'monthly' ? '$99.00' : '$84.15'}
            </TableCell>
            <TableCell className="text-center font-bold">
              {billingCycle === 'monthly' ? '$60.00' : '$51.00'}
            </TableCell>
            <TableCell className="text-center font-bold">
              {billingCycle === 'monthly' ? '$49.00' : '$41.65'}
            </TableCell>
            <TableCell className="text-center font-bold">Gratis</TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium"></TableCell>
            <TableCell className="text-center">
              <Button 
                asChild
                className="bg-novativa-teal hover:bg-novativa-lightTeal w-full"
              >
                <Link to="/contacto?plan=diamante">
                  Seleccionar
                </Link>
              </Button>
            </TableCell>
            <TableCell className="text-center">
              <Button 
                asChild
                className="bg-novativa-teal hover:bg-novativa-lightTeal w-full"
              >
                <Link to="/contacto?plan=elite">
                  Seleccionar
                </Link>
              </Button>
            </TableCell>
            <TableCell className="text-center">
              <Button 
                asChild
                className="bg-novativa-orange hover:bg-novativa-lightOrange w-full"
              >
                <Link to="/contacto?plan=starter">
                  Seleccionar
                </Link>
              </Button>
            </TableCell>
            <TableCell className="text-center">
              <Button 
                asChild
                variant="outline"
                className="border-novativa-teal text-novativa-teal hover:bg-novativa-teal/10 w-full"
              >
                <Link to="/contacto?plan=demo">
                  Probar
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PricingTable;
