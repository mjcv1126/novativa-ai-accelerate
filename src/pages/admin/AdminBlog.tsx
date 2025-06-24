
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Pencil, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  featured: boolean;
  views: number;
  category: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los posts',
          variant: 'destructive',
        });
        return;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: 'Error',
        description: 'Error inesperado al cargar los posts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          published: !currentStatus,
          published_at: !currentStatus ? new Date().toISOString() : null
        })
        .eq('id', id);

      if (error) {
        toast({
          title: 'Error',
          description: 'No se pudo actualizar el estado del post',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Éxito',
        description: `Post ${!currentStatus ? 'publicado' : 'despublicado'} correctamente`,
      });

      fetchPosts();
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este post?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) {
        toast({
          title: 'Error',
          description: 'No se pudo eliminar el post',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Éxito',
        description: 'Post eliminado correctamente',
      });

      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Cargando posts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestión del Blog</h1>
          <p className="text-gray-600">Administra los posts de tu blog</p>
        </div>
        <Button 
          onClick={() => window.location.href = '/admin/blog/new'}
          className="bg-novativa-teal hover:bg-novativa-lightTeal"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Post
        </Button>
      </div>

      <div className="grid gap-4">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500">
                <p>No hay posts aún. ¡Crea tu primer post!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {post.excerpt || 'Sin descripción'}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant={post.published ? 'default' : 'secondary'}>
                        {post.published ? 'Publicado' : 'Borrador'}
                      </Badge>
                      {post.featured && (
                        <Badge variant="outline">Destacado</Badge>
                      )}
                      {post.category && (
                        <Badge variant="outline">{post.category}</Badge>
                      )}
                      <span className="text-sm text-gray-500">
                        {post.views} vistas
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePublished(post.id, post.published)}
                    >
                      {post.published ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `/admin/blog/edit/${post.id}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deletePost(post.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>
                    Creado: {format(new Date(post.created_at), 'dd/MM/yyyy', { locale: es })}
                  </span>
                  {post.published_at && (
                    <span>
                      Publicado: {format(new Date(post.published_at), 'dd/MM/yyyy', { locale: es })}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
