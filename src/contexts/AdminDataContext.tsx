
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the type for the context
interface AdminDataContextType {
  posts: any[]; // Keep a generic array type for future use
  setPosts: React.Dispatch<React.SetStateAction<any[]>>;
  addPost: (post: any) => void;
  updatePost: (id: number, post: any) => void;
  deletePost: (id: number) => void;
}

// Create the context
const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

// Initial posts with empty array
const initialPosts: any[] = [];

export const AdminDataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [posts, setPosts] = useState<any[]>(() => {
    const savedPosts = localStorage.getItem('admin_posts');
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });

  useEffect(() => {
    localStorage.setItem('admin_posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (postData: any) => {
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const newPost = {
      ...postData,
      id: newId,
      views: 0
    };
    setPosts([...posts, newPost]);
  };

  const updatePost = (id: number, postData: any) => {
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

// Custom hook to access the context
export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
