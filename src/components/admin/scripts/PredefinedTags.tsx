
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TagType {
  id: number;
  name: string;
  code: string;
  active: boolean;
}

interface PredefinedTagsProps {
  tags: TagType[];
  editingTagId: number | null;
  onStartEditing: (id: number) => void;
  onCancelEditing: () => void;
  onSaveTag: (id: number, newCode: string) => void;
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
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      {tags.map((tag) => (
        <div key={tag.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{tag.name}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${tag.active ? 'text-green-500' : 'text-red-500'}`}>
                {tag.active ? 'Activo' : 'Inactivo'}
              </span>
              {editingTagId === tag.id ? (
                <>
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={() => onSaveTag(tag.id, tag.code)}
                    className="h-8 w-8"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={onCancelEditing}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </>
              ) : (
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => onStartEditing(tag.id)}
                  className="h-8 w-8"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
              <Button 
                variant={tag.active ? "outline" : "default"}
                className={tag.active ? "border-red-500 text-red-500 hover:bg-red-50" : "bg-green-500 hover:bg-green-600"}
                onClick={() => onToggleStatus(tag.id)}
              >
                {tag.active ? 'Desactivar' : 'Activar'}
              </Button>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded text-sm font-mono overflow-x-auto">
            {editingTagId === tag.id ? (
              <Textarea
                value={tag.code}
                onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                className="min-h-[150px] font-mono"
              />
            ) : (
              <pre>{tag.code}</pre>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PredefinedTags;
