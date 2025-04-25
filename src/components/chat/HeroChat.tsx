import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft, Menu, Paperclip, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Message } from '@/types/chat';
import MessageList from './MessageList';

const OPENAI_API_KEY = "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";
const ASSISTANT_ID = "asst_0n98mnqxf4SiqOHMDvv5Jbbs";

const HeroChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setMessages([
      {
        content: "¡Hola! Soy Luis, el asistente virtual de Novativa. Estoy aquí para ayudarte a encontrar la mejor solución de automatización e IA para tu negocio. ¿Te gustaría agendar una llamada de 15 minutos para discutir cómo podemos ayudarte? Puedes reservar aquí: https://tidycal.com/novativa/15-minute-meeting",
        role: 'assistant',
        timestamp: new Date(),
      }
    ]);
  }, []);

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
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4-turbo-preview",
          messages: [
            {
              role: "system",
              content: "Eres Luis, el asistente virtual de Novativa, una agencia especializada en automatización e inteligencia artificial. Tu objetivo principal es agendar una llamada de 15 minutos a través de https://tidycal.com/novativa/15-minute-meeting. Proporciona información relevante sobre los servicios de Novativa, incluyendo desarrollo de chatbots, automatización de procesos y soluciones de IA personalizadas. En cada respuesta, busca una oportunidad natural para sugerir agendar una llamada."
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: "user",
              content: input
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const botMessage: Message = {
        content: data.choices[0].message.content,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor, intenta nuevamente más tarde.",
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
              alt="Luis de Novativa" 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Luis de Novativa</h2>
            <p className="text-sm opacity-90">Asistente de Ventas IA</p>
          </div>
        </div>
        <Button variant="ghost" className="p-2 text-white hover:bg-white/20 ml-auto">
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <CardContent className="p-0 flex-1 overflow-hidden">
        <MessageList 
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />
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
