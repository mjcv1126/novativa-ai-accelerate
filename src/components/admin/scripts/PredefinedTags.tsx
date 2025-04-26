
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Pencil, Check, X } from "lucide-react";

interface Tag {
  id: number;
  name: string;
  code: string;
  active: boolean;
}

interface PredefinedTagsProps {
  tags: Tag[];
  editingTagId: number | null;
  onStartEditing: (id: number) => void;
  onCancelEditing: () => void;
  onSaveTag: (id: number, code: string) => void;
  onToggleStatus: (id: number) => void;
  onUpdateTag: (id: number, code: string) => void;
}

const PredefinedTags = ({
  tags,
  editingTagId,
  onStartEditing,
  onCancelEditing,
  onSaveTag,
  onToggleStatus,
  onUpdateTag
}: PredefinedTagsProps) => {
  // Store the original code when we start editing
  const [originalCode, setOriginalCode] = useState<string>("");

  const handleStartEditing = (id: number, currentCode: string) => {
    setOriginalCode(currentCode);
    onStartEditing(id);
  };

  const handleCancelEditing = () => {
    // Restore the original code if editing is cancelled
    if (editingTagId !== null) {
      onUpdateTag(editingTagId, originalCode);
    }
    onCancelEditing();
  };

  return (
    <div className="space-y-4">
      {tags.map((tag) => (
        <div key={tag.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium">{tag.name}</div>
            <div className="flex items-center gap-4">
              {/* Don't allow toggle while editing */}
              {editingTagId === tag.id ? (
                <div className="text-sm text-gray-500 italic">
                  Guardando cambios...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={tag.active} 
                    onCheckedChange={() => onToggleStatus(tag.id)} 
                    id={`tag-${tag.id}`} 
                  />
                  <span className="text-sm text-gray-600">
                    {tag.active ? "Activo" : "Inactivo"}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {editingTagId === tag.id ? (
            <>
              <Textarea 
                value={tag.code}
                onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                className="mb-2 h-[120px] font-mono text-sm"
              />
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleCancelEditing}
                  className="flex gap-1"
                >
                  <X className="h-4 w-4" /> Cancelar
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => onSaveTag(tag.id, tag.code)}
                  className="flex gap-1 bg-novativa-teal hover:bg-novativa-lightTeal"
                >
                  <Check className="h-4 w-4" /> Guardar
                </Button>
              </div>
            </>
          ) : (
            <>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-[120px] whitespace-pre-wrap">
                {tag.code}
              </pre>
              <div className="flex justify-end mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleStartEditing(tag.id, tag.code)}
                  className="flex gap-1"
                >
                  <Pencil className="h-4 w-4" /> Editar código
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PredefinedTags;
