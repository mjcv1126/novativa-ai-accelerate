import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import BlogPostForm from '@/components/admin/BlogPostForm';
import { useAdminData } from '@/contexts/AdminDataContext';
import BlogPostsTable from '@/components/admin/blog/BlogPostsTable';
import BlogPostsSearch from '@/components/admin/blog/BlogPostsSearch';
import BlogPostsPagination from '@/components/admin/blog/BlogPostsPagination';
import { BlogPost } from '@/data/blogPosts';

const AdminBlogPosts = () => {
  const { posts, addPost, updatePost, deletePost } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'date',
    direction: 'desc',
  });
  const [filterStatus, setFilterStatus] = useState('all');
  
  useEffect(() => {
    let result = [...posts];
    
    if (searchQuery.trim() !== '') {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (filterStatus !== 'all') {
      result = result.filter(post => post.status === filterStatus);
    }
    
    result.sort((a, b) => {
      if (sortConfig.key === 'date') {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        
        return sortConfig.direction === 'asc' 
          ? dateA.getTime() - dateB.getTime() 
          : dateB.getTime() - dateA.getTime();
      } else if (sortConfig.key === 'views') {
        return sortConfig.direction === 'asc' 
          ? a.views - b.views 
          : b.views - a.views;
      } else if (sortConfig.key === 'title') {
        return sortConfig.direction === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      }
      return 0;
    });
    
    setFilteredPosts(result);
    setCurrentPage(1);
  }, [posts, searchQuery, sortConfig, filterStatus]);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreatePost = (postData: Omit<BlogPost, 'id' | 'views'>) => {
    addPost(postData);
    setShowForm(false);
  };

  const handleEditPost = (postData: Omit<BlogPost, 'id' | 'views'>) => {
    if (editingPost) {
      updatePost(editingPost.id, postData);
      setEditingPost(undefined);
      setShowForm(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Administrar Posts | Novativa</title>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
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

        <BlogPostsSearch
          searchQuery={searchQuery}
          onSearchChange={handleSearch}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          postsPerPage={postsPerPage}
          setPostsPerPage={setPostsPerPage}
        />
        
        <BlogPostsTable
          currentPosts={currentPosts}
          onEdit={setEditingPost}
          onDelete={deletePost}
          sortConfig={sortConfig}
          handleSort={handleSort}
        />
        
        {filteredPosts.length > postsPerPage && (
          <BlogPostsPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            indexOfFirstPost={indexOfFirstPost}
            indexOfLastPost={indexOfLastPost}
            totalPosts={filteredPosts.length}
          />
        )}
      </div>
    </>
  );
};

export default AdminBlogPosts;
