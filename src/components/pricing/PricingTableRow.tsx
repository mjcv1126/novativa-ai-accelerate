
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";
import { Check } from 'lucide-react';

type PricingTableRowProps = {
  feature: string;
  values: (string | boolean | number)[];
};

export const PricingTableRow: React.FC<PricingTableRowProps> = ({ feature, values }) => {
  const renderValue = (value: string | boolean | number) => {
    if (typeof value === 'boolean') {
      return value ? <Check className="mx-auto text-green-500" size={18} /> : null;
    }
    return value;
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{feature}</TableCell>
      {values.map((value, index) => (
        <TableCell key={index} className="text-center">
          {renderValue(value)}
        </TableCell>
      ))}
    </TableRow>
  );
};
