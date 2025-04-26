import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft, Menu, Paperclip, Mic, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Message } from '@/types/chat';
import MessageList from './MessageList';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// Create Supabase client with proper error handling
const createSupabaseClient = () => {
  // Get Supabase URL and key from environment variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Anon Key is missing, using mock client');
    // Return a mock client that won't make actual network requests
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      functions: {
        invoke: () => Promise.reject(new Error('Supabase client not initialized')),
      }
    };
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
};

const supabase = createSupabaseClient();

const HeroChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user || null);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error("Error with Supabase auth:", error);
    }
  }, []);

  useEffect(() => {
    setMessages([
      {
        content: "¡Hola! 👋 Me encantaría mostrarte cómo podemos potenciar tu negocio con IA. ¿Te gustaría agendar una demostración gratuita de 15 minutos? Haz clic en el botón de abajo para programar una llamada 1:1 donde discutiremos estrategias personalizadas para tu empresa.",
        role: 'assistant',
        timestamp: new Date(),
      }
    ]);
  }, []);

  const handleSchedule = () => {
    navigate('/agenda');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botMessage: Message = {
        content: "Por el momento no puedo responder en tiempo real. Te invito a agendar una demostración gratuita donde un especialista responderá todas tus preguntas.",
        role: 'assistant',
        timestamp: new Date(),
      };

      // Only try to use Supabase if environment variables are available
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseAnonKey) {
        try {
          // Use the assistant-chat function
          const { data, error } = await supabase.functions.invoke('assistant-chat', {
            body: {
              message: input,
              threadId: threadId
            }
          });

          if (error) throw error;
          
          // Save threadId for future messages
          if (data.threadId) {
            setThreadId(data.threadId);
            console.log("Thread ID saved:", data.threadId);
          }
          
          // Update bot message with response from Supabase function
          botMessage.content = data.message;
        } catch (error) {
          console.error('Error with Supabase function:', error);
          // Keep default message in case of error
        }
      }

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="w-full max-w-2xl bg-white shadow-xl border-0 h-[600px] flex flex-col">
      <div className="bg-gradient-to-r from-novativa-teal to-novativa-lightTeal p-4 flex items-center gap-4 text-white rounded-t-lg">
        <Button variant="ghost" className="p-2 text-white hover:bg-white/20">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-1 w-12 h-12 flex items-center justify-center">
            <img 
              src="/lovable-uploads/8d19e3cc-82b2-4101-9c68-c405323f6c52.png" 
              alt="Marlon de Novativa" 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Marlon de Novativa</h2>
            <p className="text-sm opacity-90">Asistente de Ventas IA</p>
          </div>
        </div>
        <Button variant="ghost" className="p-2 text-white hover:bg-white/20 ml-auto">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <CardContent className="p-0 flex-1 overflow-hidden relative">
        <MessageList 
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Button
            onClick={handleSchedule}
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white gap-2"
          >
            <Calendar className="w-5 h-5" />
            Agendar Demo Gratis
          </Button>
        </div>
      </CardContent>

      <CardFooter className="p-4 border-t">
        <div className="flex w-full gap-2 items-end">
          <Button variant="ghost" className="p-2">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </Button>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Escribe tu mensaje aquí..."
            className="min-h-[45px] max-h-[120px] focus-visible:ring-1"
            disabled={isLoading}
          />
          <Button variant="ghost" className="p-2">
            <Mic className="h-5 w-5 text-gray-500" />
          </Button>
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()} 
            className="bg-novativa-teal hover:bg-novativa-darkTeal p-2"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HeroChat;
