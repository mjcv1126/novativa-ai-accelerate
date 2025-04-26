import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Check } from 'lucide-react';
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
import { FavoriteBadge } from './FavoriteBadge';
import { PricingBanner } from './PricingBanner';
import { InstallationNotes } from './InstallationNotes';
import { PricingTableRow } from './PricingTableRow';
import { PlatformIcons } from './PlatformIcons';

type PricingTableProps = {
  billingCycle: 'monthly' | 'annual';
};

const PricingTable: React.FC<PricingTableProps> = ({ billingCycle }) => {
  return (
    <div className="relative">
      <div className="relative overflow-x-auto rounded-lg border">
        <PricingBanner billingCycle={billingCycle} />
        
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-1/5">Característica</TableHead>
              <TableHead className="text-center">Diamante</TableHead>
              <TableHead className="text-center relative">
                <div className="relative">
                  Elite
                  <FavoriteBadge />
                </div>
              </TableHead>
              <TableHead className="text-center">Starter</TableHead>
              <TableHead className="text-center">Demo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          <PricingTableRow 
            feature="Usuarios Activos / Mes"
            values={['14,000', '5,000', '3,000', '50']}
          />
          <PricingTableRow 
            feature="Bots/Flujos Automatizados"
            values={['20', '15', '10', '5']}
          />
          <PricingTableRow 
            feature="Creación de Formularios y Bloques"
            values={['Ilimitados', 'Ilimitados', 'Ilimitados', 'Ilimitados']}
          />
          <PricingTableRow 
            feature="NovaChannel: OmniChannel LiveChat"
            values={[true, true, true, true]}
          />
          <PricingTableRow 
            feature="Webhooks y API's Disponible"
            values={[true, true, true, true]}
          />
          <PricingTableRow 
            feature="Agentes para LiveChat"
            values={['5', '3', '2', 'N/A']}
          />
          <PricingTableRow 
            feature="Usuarios Administradores"
            values={['3', '2', '1', 'N/A']}
          />
          <PricingTableRow 
            feature="Historial de Chat"
            values={['65 días', '65 días', '65 días', '15 días']}
          />
          <PricingTableRow 
            feature="Onboarding de Implementación"
            values={['1 hora', '1 hora', 'N/A', 'N/A']}
          />
          
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
            <TableCell className="text-center text-green-500">
              <Check className="mx-auto" size={18} />
            </TableCell>
            <TableCell className="text-center text-green-500">
              <Check className="mx-auto" size={18} />
            </TableCell>
            <TableCell className="text-center text-green-500">
              <Check className="mx-auto" size={18} />
            </TableCell>
            <TableCell className="text-center text-green-500">
              <Check className="mx-auto" size={18} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Precio Mensual</TableCell>
            <TableCell className="text-center">
              <span className="text-2xl font-bold text-novativa-teal">
                {billingCycle === 'monthly' ? '$99.00' : '$84.15'}
              </span>
              <span className="block text-sm text-gray-500">/mes</span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-2xl font-bold text-novativa-teal">
                {billingCycle === 'monthly' ? '$60.00' : '$51.00'}
              </span>
              <span className="block text-sm text-gray-500">/mes</span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-2xl font-bold text-novativa-orange">
                {billingCycle === 'monthly' ? '$49.00' : '$41.65'}
              </span>
              <span className="block text-sm text-gray-500">/mes</span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-2xl font-bold">Gratis</span>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium"></TableCell>
            <TableCell className="text-center">
              <Button 
                asChild
                className="bg-novativa-teal hover:bg-novativa-lightTeal w-full"
              >
                <Link to="/agenda">
                  Seleccionar
                </Link>
              </Button>
            </TableCell>
            <TableCell className="text-center">
              <Button 
                asChild
                className="bg-novativa-teal hover:bg-novativa-lightTeal w-full"
              >
                <Link to="/agenda">
                  Seleccionar
                </Link>
              </Button>
            </TableCell>
            <TableCell className="text-center">
              <Button 
                asChild
                className="bg-novativa-orange hover:bg-novativa-lightOrange w-full"
              >
                <Link to="/agenda">
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
                <Link to="/agenda">
                  Probar
                </Link>
              </Button>
            </TableCell>
          </TableRow>
          </TableBody>
        </Table>
        
        <InstallationNotes billingCycle={billingCycle} />
      </div>
    </div>
  );
};

export default PricingTable;
