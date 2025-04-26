
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

interface NewTagFormProps {
  tagName: string;
  tagCode: string;
  onTagNameChange: (value: string) => void;
  onTagCodeChange: (value: string) => void;
  onAddTag: () => void;
}

const NewTagForm = ({
  tagName,
  tagCode,
  onTagNameChange,
  onTagCodeChange,
  onAddTag
}: NewTagFormProps) => {
  return (
    <>
      <CardHeader className="border-t pt-6 mt-4">
        <CardTitle>Agregar Nuevo Tag</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Nombre del Tag</label>
          <Input 
            value={tagName}
            onChange={(e) => onTagNameChange(e.target.value)}
            placeholder="Ej: LinkedIn Pixel"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Código</label>
          <Textarea 
            value={tagCode}
            onChange={(e) => onTagCodeChange(e.target.value)}
            placeholder="Pega aquí el código del tag..."
            className="min-h-[150px] font-mono"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onAddTag}
          className="bg-novativa-teal hover:bg-novativa-lightTeal"
          disabled={!tagName || !tagCode}
        >
          Agregar Tag
        </Button>
      </CardFooter>
    </>
  );
};

export default NewTagForm;
