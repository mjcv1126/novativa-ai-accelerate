
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { BlogPost } from '@/data/blogPosts';

// Definir los tipos para las categorías
export interface Category {
  id: number;
  name: string;
  postCount: number;
  slug: string;
}

// Definir el tipo para el contexto
interface AdminDataContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: number, name: string) => void;
  deleteCategory: (id: number) => void;
  addPost: (post: Omit<BlogPost, 'id' | 'views'>) => void;
  updatePost: (id: number, post: Omit<BlogPost, 'id' | 'views'>) => void;
  deletePost: (id: number) => void;
}

// Crear el contexto
const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

// Categorías iniciales depuradas (solo las publicadas)
const initialCategories: Category[] = [
  { id: 1, name: "Inteligencia Artificial", postCount: 14, slug: "inteligencia-artificial" },
  { id: 2, name: "Automatización", postCount: 8, slug: "automatizacion" },
  { id: 3, name: "Agentes IA", postCount: 6, slug: "agentes-ia" },
  { id: 4, name: "Marketing Digital", postCount: 5, slug: "marketing-digital" },
  { id: 5, name: "Generación de Contenido", postCount: 4, slug: "generacion-de-contenido" },
  { id: 6, name: "Transformación Digital", postCount: 3, slug: "transformacion-digital" },
  { id: 7, name: "Novachannel", postCount: 10, slug: "novachannel" }
];

// Posts iniciales con el autor corregido
const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: "Cómo la IA está transformando el servicio al cliente en 2025",
    excerpt: "Descubre las últimas tendencias en atención al cliente impulsadas por inteligencia artificial.",
    author: "Marlon Caballero",
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
    author: "Marlon Caballero",
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
    author: "Marlon Caballero",
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
    author: "Marlon Caballero",
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
    author: "Marlon Caballero",
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
    author: "Marlon Caballero",
    date: "20/03/2025",
    category: "Transformación Digital",
    status: "Publicado",
    views: 432,
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2000&auto=format&fit=crop",
  }
];

// Función para generar un slug a partir de un nombre
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const AdminDataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Intenta recuperar datos del localStorage o usa los iniciales
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem('admin_categories');
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  });
  
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const savedPosts = localStorage.getItem('admin_posts');
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });

  // Guardar cambios en localStorage cuando cambian los datos
  useEffect(() => {
    localStorage.setItem('admin_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('admin_posts', JSON.stringify(posts));
  }, [posts]);

  // Funciones para manipular categorías
  const addCategory = (category: Omit<Category, 'id'>) => {
    const newId = categories.length > 0 ? Math.max(...categories.map(cat => cat.id)) + 1 : 1;
    const newCategory = {
      ...category,
      id: newId,
      slug: category.slug || generateSlug(category.name)
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id: number, name: string) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { 
        ...cat, 
        name, 
        slug: generateSlug(name)
      } : cat
    ));

    // Actualizar la categoría en los posts asociados
    setPosts(posts.map(post => 
      post.category === categories.find(c => c.id === id)?.name 
        ? { ...post, category: name } 
        : post
    ));
  };

  const deleteCategory = (id: number) => {
    const categoryToDelete = categories.find(cat => cat.id === id);
    if (!categoryToDelete) return;

    // Eliminar la categoría
    setCategories(categories.filter(cat => cat.id !== id));
    
    // Actualizar posts que usan esta categoría a "Sin categoría"
    setPosts(posts.map(post => 
      post.category === categoryToDelete.name
        ? { ...post, category: "Sin categoría" }
        : post
    ));
  };

  // Funciones para manipular posts
  const addPost = (postData: Omit<BlogPost, 'id' | 'views'>) => {
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const newPost: BlogPost = {
      ...postData,
      id: newId,
      views: 0
    };
    setPosts([...posts, newPost]);
    
    // Actualizar contador de posts en la categoría
    if (postData.category) {
      setCategories(categories.map(cat => 
        cat.name === postData.category 
          ? { ...cat, postCount: cat.postCount + 1 } 
          : cat
      ));
    }
  };

  const updatePost = (id: number, postData: Omit<BlogPost, 'id' | 'views'>) => {
    const oldPost = posts.find(p => p.id === id);
    if (!oldPost) return;

    // Actualizar el post
    setPosts(posts.map(p => p.id === id 
      ? { ...postData, id, views: oldPost.views } 
      : p
    ));

    // Actualizar contadores de categorías si cambió la categoría
    if (oldPost.category !== postData.category) {
      setCategories(categories.map(cat => {
        if (cat.name === oldPost.category) {
          return { ...cat, postCount: Math.max(0, cat.postCount - 1) };
        }
        if (cat.name === postData.category) {
          return { ...cat, postCount: cat.postCount + 1 };
        }
        return cat;
      }));
    }
  };

  const deletePost = (id: number) => {
    const postToDelete = posts.find(p => p.id === id);
    if (!postToDelete) return;

    // Eliminar el post
    setPosts(posts.filter(p => p.id !== id));

    // Actualizar contador de posts en la categoría
    if (postToDelete.category) {
      setCategories(categories.map(cat => 
        cat.name === postToDelete.category 
          ? { ...cat, postCount: Math.max(0, cat.postCount - 1) } 
          : cat
      ));
    }
  };

  return (
    <AdminDataContext.Provider value={{
      categories,
      setCategories,
      posts,
      setPosts,
      addCategory,
      updateCategory,
      deleteCategory,
      addPost,
      updatePost,
      deletePost
    }}>
      {children}
    </AdminDataContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
