import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import { MessageSquare, User } from 'lucide-react';

const CommentsSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the comment to a backend
    toast.success('Comentario enviado con éxito. Será revisado antes de publicarse.', {
      duration: 5000,
    });
    setName('');
    setEmail('');
    setComment('');
  };
  
  // Sample comments for visual design
  const sampleComments = [
    {
      id: 1,
      name: 'María López',
      date: '26/04/2025',
      content: 'Este artículo me pareció muy interesante y útil para comprender mejor cómo la IA está transformando los negocios.'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      date: '25/04/2025',
      content: 'Excelente explicación sobre las aplicaciones prácticas. Me gustaría saber más sobre implementaciones específicas en pequeñas empresas.'
    }
  ];
  
  return (
    <div className="space-y-8">
      {/* Existing comments */}
      <div className="space-y-6">
        {sampleComments.map(comment => (
          <div key={comment.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-novativa-teal">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-gray-200 rounded-full p-2 mr-3">
                  <User size={18} className="text-gray-500" />
                </div>
                <span className="font-medium">{comment.name}</span>
              </div>
              <span className="text-sm text-gray-500">{comment.date}</span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
      
      {/* Comment form */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center mb-6">
          <MessageSquare className="text-novativa-teal mr-3" size={24} />
          <h3 className="text-xl font-medium">Deja tu comentario</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                required
                className="border-gray-300 focus:border-novativa-teal focus:ring focus:ring-novativa-teal/20"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email"
                required
                className="border-gray-300 focus:border-novativa-teal focus:ring focus:ring-novativa-teal/20"
              />
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Comentario
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comparte tus pensamientos..."
              rows={4}
              required
              className="border-gray-300 focus:border-novativa-teal focus:ring focus:ring-novativa-teal/20"
            />
          </div>
          <Button 
            type="submit" 
            className="bg-novativa-teal hover:bg-novativa-darkTeal text-white transition-colors"
          >
            Enviar Comentario
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CommentsSection;
