
import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

// Create Supabase client with proper error handling
const createSupabaseClient = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL or Anon Key is missing, using mock client');
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

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

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

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const botMessage: Message = {
        content: "Por el momento no puedo responder en tiempo real. Te invito a agendar una demostración gratuita donde un especialista responderá todas tus preguntas.",
        role: 'assistant',
        timestamp: new Date(),
      };

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseAnonKey) {
        try {
          const { data, error } = await supabase.functions.invoke('assistant-chat', {
            body: {
              message: input,
              threadId: threadId
            }
          });

          if (error) throw error;
          
          if (data.threadId) {
            setThreadId(data.threadId);
            console.log("Thread ID saved:", data.threadId);
          }
          
          botMessage.content = data.message;
        } catch (error) {
          console.error('Error with Supabase function:', error);
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
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    user
  };
};
