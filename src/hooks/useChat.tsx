
import { useState } from 'react';
import { Message } from '@/types/chat';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const { toast } = useToast();

  // Initial greeting message
  useState(() => {
    setMessages([
      {
        content: "¡Hola! 👋 Me encantaría mostrarte cómo podemos potenciar tu negocio con IA. ¿Te gustaría agendar una demostración gratuita de 15 minutos? Haz clic en el botón de abajo para programar una llamada 1:1 donde discutiremos estrategias personalizadas para tu empresa.",
        role: 'assistant',
        timestamp: new Date(),
      }
    ]);
  });

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
      const { data, error } = await supabase.functions.invoke('assistant-chat', {
        body: {
          message: input,
          threadId: threadId,
          assistantId: 'asst_0n98mnqxf4SiqOHMDvv5Jbbs'
        }
      });

      if (error) throw error;

      if (data.threadId) {
        setThreadId(data.threadId);
        console.log("Thread ID saved:", data.threadId);
      }

      const assistantMessage: Message = {
        content: data.message,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
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
  };
};
