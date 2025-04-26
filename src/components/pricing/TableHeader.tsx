
import React from 'react';
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50">
        <TableHead className="w-1/5">Característica</TableHead>
        <TableHead className="text-center">Diamante</TableHead>
        <TableHead className="text-center">Elite</TableHead>
        <TableHead className="text-center">Starter</TableHead>
        <TableHead className="text-center">Demo</TableHead>
      </TableRow>
    </TableHeader>
  );
};
