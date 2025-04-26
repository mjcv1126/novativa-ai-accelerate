
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from '@/contexts/AdminDataContext';

interface CategorySelectProps {
  category: string;
  categories: Category[];
  setCategory: (value: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ category, categories, setCategory }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Categoría</label>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar categoría" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.name}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelect;
