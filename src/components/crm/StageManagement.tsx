
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CrmStage } from '@/types/crm';
import { Plus, Edit, Trash, Settings, GripVertical, Copy } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

interface StageManagementProps {
  stages: CrmStage[];
  onCreateStage: (stage: Omit<CrmStage, 'id' | 'created_at' | 'updated_at'>) => void;
  onUpdateStage: (id: string, updates: Partial<CrmStage>) => void;
  onDeleteStage: (id: string) => void;
}

export const StageManagement = ({ 
  stages, 
  onCreateStage, 
  onUpdateStage, 
  onDeleteStage 
}: StageManagementProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStage, setEditingStage] = useState<CrmStage | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    position: stages.length + 1
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      color: '#3B82F6',
      position: stages.length + 1
    });
    setEditingStage(null);
  };

  const handleOpenDialog = (stage?: CrmStage) => {
    if (stage) {
      setEditingStage(stage);
      setFormData({
        name: stage.name,
        description: stage.description || '',
        color: stage.color,
        position: stage.position
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStage) {
      onUpdateStage(editingStage.id, formData);
    } else {
      onCreateStage({
        ...formData,
        is_active: true
      });
    }
    
    handleCloseDialog();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "ID copiado al portapapeles",
    });
  };

  const colorOptions = [
    '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', 
    '#F97316', '#22C55E', '#EF4444', '#6B7280'
  ];

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Gestionar Etapas
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Gestión de Etapas del Embudo</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4">
            {/* Current Stages */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Etapas Actuales</h3>
                <Button 
                  onClick={() => handleOpenDialog()} 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Nueva Etapa
                </Button>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {stages
                  .sort((a, b) => a.position - b.position)
                  .map((stage) => (
                  <Card key={stage.id} className="p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <GripVertical className="h-4 w-4 text-gray-400 cursor-move mt-1 flex-shrink-0" />
                        <div 
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm mt-1 flex-shrink-0" 
                          style={{ backgroundColor: stage.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{stage.name}</h4>
                            <Badge variant="outline" className="text-xs font-mono px-1">
                              Pos: {stage.position}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-1 mb-2">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono text-gray-600 truncate max-w-[200px]">
                              {stage.id}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard(stage.id)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {stage.description && (
                            <p className="text-xs text-gray-500 line-clamp-2">{stage.description}</p>
                          )}
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDialog(stage)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onDeleteStage(stage.id)}
                            className="text-red-600"
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <h3 className="font-semibold mb-4">
                {editingStage ? 'Editar Etapa' : 'Nueva Etapa'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre de la Etapa</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Nuevo Lead"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Descripción (opcional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe esta etapa del embudo"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="color">Color</Label>
                  <div className="flex gap-2 mt-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`w-8 h-8 rounded-full border-2 ${
                          formData.color === color ? 'border-gray-900' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="position">Posición</Label>
                  <Input
                    id="position"
                    type="number"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: parseInt(e.target.value) }))}
                    min="1"
                    required
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingStage ? 'Actualizar' : 'Crear'} Etapa
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCloseDialog}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
