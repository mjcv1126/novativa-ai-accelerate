
import React, { useState, useEffect } from 'react';
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
import { ChevronDown, ChevronUp, Edit, Eye, Filter, Plus, Search, Trash } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import BlogPostForm from '@/components/admin/BlogPostForm';
import { Link } from 'react-router-dom';
import { useAdminData } from '@/contexts/AdminDataContext';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const AdminBlogPosts = () => {
  const { posts, categories, addPost, updatePost, deletePost } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<typeof posts[0] | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'date',
    direction: 'desc',
  });
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filter and sort posts
  useEffect(() => {
    let result = [...posts];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      result = result.filter(post => post.status === filterStatus);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortConfig.key === 'date') {
        // Convert DD/MM/YYYY to Date objects for comparison
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
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [posts, searchQuery, sortConfig, filterStatus]);
  
  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCreatePost = (postData: Omit<typeof posts[0], 'id' | 'views'>) => {
    addPost(postData);
    setShowForm(false);
  };

  const handleEditPost = (postData: Omit<typeof posts[0], 'id' | 'views'>) => {
    if (editingPost) {
      updatePost(editingPost.id, postData);
      setEditingPost(undefined);
      setShowForm(false);
    }
  };

  const handleDeletePost = (id: number) => {
    deletePost(id);
  };
  
  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };
  
  // Helper function to render pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      
      // Show ellipsis if current page is far from start
      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis-1" />);
      }
      
      // Pages around current page
      const startVisible = Math.max(2, currentPage - 1);
      const endVisible = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startVisible; i <= endVisible; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      
      // Show ellipsis if current page is far from end
      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis-2" />);
      }
      
      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
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
                <DropdownMenuItem onClick={() => setFilterStatus('all')}>
                  Todos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('Publicado')}>
                  Publicados
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('Borrador')}>
                  Borradores
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <select
              className="border border-gray-300 rounded p-2 text-sm bg-white"
              value={postsPerPage}
              onChange={(e) => setPostsPerPage(Number(e.target.value))}
            >
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={20}>20 por página</option>
              <option value={50}>50 por página</option>
            </select>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="w-[400px] cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    Post
                    {sortConfig.key === 'title' && (
                      sortConfig.direction === 'asc' 
                        ? <ChevronUp className="inline ml-1 h-4 w-4" /> 
                        : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    Fecha
                    {sortConfig.key === 'date' && (
                      sortConfig.direction === 'asc' 
                        ? <ChevronUp className="inline ml-1 h-4 w-4" /> 
                        : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead 
                    className="text-right cursor-pointer"
                    onClick={() => handleSort('views')}
                  >
                    Vistas
                    {sortConfig.key === 'views' && (
                      sortConfig.direction === 'asc' 
                        ? <ChevronUp className="inline ml-1 h-4 w-4" /> 
                        : <ChevronDown className="inline ml-1 h-4 w-4" />
                    )}
                  </TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPosts.length > 0 ? (
                  currentPosts.map((post) => (
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
                          <Link
                            to={`/blog/${post.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
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
        
        {/* Pagination */}
        {filteredPosts.length > postsPerPage && (
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Mostrando {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} de {filteredPosts.length} posts
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {renderPaginationItems()}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminBlogPosts;
