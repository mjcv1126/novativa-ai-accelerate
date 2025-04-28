import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { BlogPost } from '@/data/blogPosts';

// Definir el tipo para el contexto
interface AdminDataContextType {
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  addPost: (post: Omit<BlogPost, 'id' | 'views'>) => void;
  updatePost: (id: number, post: Omit<BlogPost, 'id' | 'views'>) => void;
  deletePost: (id: number) => void;
}

// Crear el contexto
const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

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
    tags: []
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
    tags: []
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
    tags: []
  }
];

export const AdminDataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const savedPosts = localStorage.getItem('admin_posts');
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });

  useEffect(() => {
    localStorage.setItem('admin_posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (postData: Omit<BlogPost, 'id' | 'views'>) => {
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const newPost: BlogPost = {
      ...postData,
      id: newId,
      views: 0
    };
    setPosts([...posts, newPost]);
  };

  const updatePost = (id: number, postData: Omit<BlogPost, 'id' | 'views'>) => {
    const oldPost = posts.find(p => p.id === id);
    if (!oldPost) return;

    setPosts(posts.map(p => p.id === id
      ? { ...postData, id, views: oldPost.views }
      : p
    ));
  };

  const deletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <AdminDataContext.Provider value={{
      posts,
      setPosts,
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
