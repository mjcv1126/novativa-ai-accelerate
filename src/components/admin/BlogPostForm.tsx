
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BlogPost } from '@/data/blogPosts';
import { useAdminData } from '@/contexts/AdminDataContext';
import CategorySelect from './blog/CategorySelect';
import StatusSelect from './blog/StatusSelect';
import TagInput from './blog/TagInput';

interface BlogPostFormProps {
  post?: BlogPost;
  onSubmit: (postData: Omit<BlogPost, 'id' | 'views'>) => void;
  onCancel: () => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, onSubmit, onCancel }) => {
  const { categories } = useAdminData();
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [author, setAuthor] = useState(post?.author || 'Marlon Caballero');
  const [date, setDate] = useState(post?.date || new Date().toLocaleDateString());
  const [category, setCategory] = useState(post?.category || '');
  const [status, setStatus] = useState<'Publicado' | 'Borrador'>(post?.status as 'Publicado' | 'Borrador' || 'Borrador');
  const [image, setImage] = useState(post?.image || '');
  const [seoDescription, setSeoDescription] = useState(post?.seoDescription || '');
  const [tags, setTags] = useState<string[]>(post?.tags || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      excerpt,
      author,
      date,
      category,
      status,
      image,
      seoDescription,
      tags,
    });
  };

  // Validar que las categorías disponibles incluyan la categoría actual
  useEffect(() => {
    if (category && categories.length > 0 && !categories.some(c => c.name === category)) {
      // Si la categoría actual no está en la lista, seleccionar la primera categoría
      setCategory(categories[0].name);
    }
  }, [category, categories]);

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Título</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Extracto</label>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Autor</label>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fecha</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-4">
            <CategorySelect 
              category={category} 
              categories={categories} 
              setCategory={setCategory} 
            />
            
            <StatusSelect 
              status={status} 
              setStatus={setStatus} 
            />
            
            <div>
              <label className="block text-sm font-medium mb-1">URL de la imagen</label>
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Descripción SEO</label>
              <Textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        <TagInput tags={tags} setTags={setTags} />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-novativa-teal hover:bg-novativa-lightTeal">
            {post ? 'Actualizar Post' : 'Crear Post'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BlogPostForm;
