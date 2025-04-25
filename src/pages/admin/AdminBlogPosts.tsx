import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Edit, Eye, Filter, Plus, Search, Trash } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import BlogPostForm from '@/components/admin/BlogPostForm';
import { BlogPost } from '@/data/blogPosts';

const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: "Cómo la IA está transformando el servicio al cliente en 2025",
    excerpt: "Descubre las últimas tendencias en atención al cliente impulsadas por inteligencia artificial.",
    author: "María González",
    date: "15/04/2025",
    category: "Inteligencia Artificial",
    status: "Publicado",
    views: 1245,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2000&auto=format&fit=crop",
    tags: ["IA", "Servicio al Cliente", "Tendencias"]
  },
  {
    id: 2,
    title: "Automatización de procesos: La clave para la eficiencia empresarial",
    excerpt: "Análisis de cómo la automatización puede reducir costos y mejorar la productividad.",
    author: "Carlos Ramírez",
    date: "10/04/2025",
    category: "Automatización",
    status: "Publicado",
    views: 987,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Agentes IA: El futuro de la interacción digital",
    excerpt: "Exploramos cómo los agentes de inteligencia artificial están redefiniendo la interacción digital.",
    author: "Laura Sánchez",
    date: "05/04/2025",
    category: "Agentes IA",
    status: "Publicado",
    views: 756,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Implementando chatbots en tu estrategia de marketing: Guía completa",
    excerpt: "Aprende cómo integrar chatbots en tu estrategia de marketing.",
    author: "Roberto Méndez",
    date: "01/04/2025",
    category: "Marketing Digital",
    status: "Borrador",
    views: 0,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Generación de contenido con IA: ¿El fin de los copywriters?",
    excerpt: "Análisis del impacto de las tecnologías de generación de contenido en la industria creativa.",
    author: "Ana Martínez",
    date: "25/03/2025",
    category: "Generación de Contenido",
    status: "Publicado",
    views: 543,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Clonación de voz: Aplicaciones prácticas para tu negocio",
    excerpt: "Descubre cómo la tecnología de clonación de voz puede mejorar la experiencia de usuario.",
    author: "Diego Flores",
    date: "20/03/2025",
    category: "Tecnología de Voz",
    status: "Publicado",
    views: 432,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2000&auto=format&fit=crop",
  }
];

const AdminBlogPosts = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.author.toLowerCase().includes(query.toLowerCase()) ||
        post.category.toLowerCase().includes(query.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredPosts(filtered);
    }
  };

  const handleCreatePost = (postData: Omit<BlogPost, 'id' | 'views'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Math.max(...posts.map(p => p.id)) + 1,
      views: 0
    };
    setPosts([...posts, newPost]);
    setFilteredPosts([...posts, newPost]);
    setShowForm(false);
  };

  const handleEditPost = (postData: Omit<BlogPost, 'id' | 'views'>) => {
    if (editingPost) {
      const updatedPost: BlogPost = {
        ...postData,
        id: editingPost.id,
        views: editingPost.views
      };
      setPosts(posts.map(p => p.id === editingPost.id ? updatedPost : p));
      setFilteredPosts(filteredPosts.map(p => p.id === editingPost.id ? updatedPost : p));
      setEditingPost(undefined);
      setShowForm(false);
    }
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
    setFilteredPosts(filteredPosts.filter(p => p.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Administrar Posts | Novativa</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-3xl font-bold">Posts del Blog</h1>
          <Button 
            className="bg-novativa-teal hover:bg-novativa-lightTeal"
            onClick={() => setShowForm(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Nuevo Post
          </Button>
        </div>

        {showForm && (
          <BlogPostForm
            post={editingPost}
            onSubmit={editingPost ? handleEditPost : handleCreatePost}
            onCancel={() => {
              setShowForm(false);
              setEditingPost(undefined);
            }}
          />
        )}

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/3 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por título, autor, categoría o tag..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-2 self-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" /> Filtrar
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Todos</DropdownMenuItem>
                <DropdownMenuItem>Publicados</DropdownMenuItem>
                <DropdownMenuItem>Borradores</DropdownMenuItem>
                <DropdownMenuItem>Más vistos</DropdownMenuItem>
                <DropdownMenuItem>Recientes</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Post</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Vistas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="flex gap-3 items-center">
                          <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <div className="font-medium">{post.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {post.excerpt}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {post.tags?.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.date}</TableCell>
                      <TableCell>
                        <Badge variant={post.status === 'Publicado' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{post.views}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingPost(post);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No se encontraron posts
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBlogPosts;
