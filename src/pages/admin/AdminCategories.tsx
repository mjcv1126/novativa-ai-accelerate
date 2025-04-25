
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Check, Edit, Plus, Save, Trash, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Sample data (replace with Supabase data in production)
const initialCategories = [
  { id: 1, name: "Inteligencia Artificial", postCount: 14, slug: "inteligencia-artificial" },
  { id: 2, name: "Automatización", postCount: 8, slug: "automatizacion" },
  { id: 3, name: "Agentes IA", postCount: 6, slug: "agentes-ia" },
  { id: 4, name: "Marketing Digital", postCount: 5, slug: "marketing-digital" },
  { id: 5, name: "Generación de Contenido", postCount: 4, slug: "generacion-de-contenido" },
  { id: 6, name: "Tecnología de Voz", postCount: 3, slug: "tecnologia-de-voz" },
  { id: 7, name: "Desarrollo Web", postCount: 2, slug: "desarrollo-web" },
  { id: 8, name: "Análisis de Datos", postCount: 1, slug: "analisis-de-datos" },
];

const AdminCategories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);

  const handleEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditName(name);
  };

  const handleSave = (id: number) => {
    if (editName.trim() !== '') {
      setCategories(categories.map(cat => 
        cat.id === id ? { ...cat, name: editName, slug: editName.toLowerCase().replace(/\s+/g, '-') } : cat
      ));
      setEditingId(null);
      setEditName('');
    }
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      const newId = Math.max(...categories.map(cat => cat.id)) + 1;
      setCategories([...categories, {
        id: newId,
        name: newCategory,
        postCount: 0,
        slug: newCategory.toLowerCase().replace(/\s+/g, '-')
      }]);
      setNewCategory('');
      setShowNewForm(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Administrar Categorías | Novativa</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold">Categorías</h1>
          <Button 
            className="bg-novativa-teal hover:bg-novativa-lightTeal"
            onClick={() => setShowNewForm(!showNewForm)}
          >
            <Plus className="mr-2 h-4 w-4" /> Nueva Categoría
          </Button>
        </div>

        {showNewForm && (
          <Card className="border-dashed border-2 border-novativa-teal/30">
            <CardHeader>
              <CardTitle>Nueva Categoría</CardTitle>
              <CardDescription>Crea una nueva categoría para tu blog</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Nombre de la categoría"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowNewForm(false);
                  setNewCategory('');
                }}
              >
                Cancelar
              </Button>
              <Button 
                className="bg-novativa-teal hover:bg-novativa-lightTeal"
                onClick={handleAddCategory}
              >
                Guardar
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="pb-2">
                {editingId === category.id ? (
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <CardTitle>{category.name}</CardTitle>
                )}
                <CardDescription className="flex items-center">
                  <span>Slug: {category.slug}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">
                  {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
                </Badge>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {editingId === category.id ? (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleSave(category.id)}
                      className="text-green-600"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(category.id, category.name)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(category.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminCategories;
