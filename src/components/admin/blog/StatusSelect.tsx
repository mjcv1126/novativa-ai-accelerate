
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusSelectProps {
  status: 'Publicado' | 'Borrador';
  setStatus: (value: 'Publicado' | 'Borrador') => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ status, setStatus }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Estado</label>
      <Select value={status} onValueChange={(value: 'Publicado' | 'Borrador') => setStatus(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Publicado">Publicado</SelectItem>
          <SelectItem value="Borrador">Borrador</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusSelect;
