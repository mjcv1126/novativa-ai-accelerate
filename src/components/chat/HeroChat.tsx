
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft, Menu, Paperclip, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Message } from '@/types/chat';
import MessageList from './MessageList';

// Using a fallback mechanism since the API key may not be valid
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "DEMO_KEY";

const HeroChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [apiAvailable, setApiAvailable] = useState(true);

  useEffect(() => {
    setMessages([
      {
        content: "¡Hola! 👋 Soy Marlon, tu asistente virtual en Novativa. 🚀 ¿Te gustaría conocer cómo podemos potenciar tu negocio con IA? 💡 Agenda una llamada de 15 minutos aquí: https://tidycal.com/novativa/15-minute-meeting",
        role: 'assistant',
        timestamp: new Date(),
      }
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Predefined responses to use when API is unavailable
  const fallbackResponses = [
    "¡Gracias por tu mensaje! 🙌 En Novativa podemos ayudarte a implementar soluciones de IA para tu negocio. Me encantaría que agendaras una llamada para hablar más sobre tus necesidades: https://tidycal.com/novativa/15-minute-meeting",
    "Entiendo. La inteligencia artificial puede transformar tu negocio de muchas maneras. 🚀 ¿Te interesa conocer más sobre alguno de nuestros servicios específicos? Podemos hablar mejor en una llamada: https://tidycal.com/novativa/15-minute-meeting",
    "Excelente pregunta. 💡 En Novativa nos especializamos en chatbots, automatización y desarrollo con IA. ¿Te gustaría agendar una llamada para discutir tu caso específico? https://tidycal.com/novativa/15-minute-meeting",
    "¡Claro que sí! Trabajamos con empresas de todos los tamaños implementando soluciones de IA. 🤖 Para darte información personalizada, lo mejor es agendar una llamada: https://tidycal.com/novativa/15-minute-meeting"
  ];

  const getRandomFallbackResponse = () => {
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
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
      if (!apiAvailable || OPENAI_API_KEY === "DEMO_KEY") {
        // Using fallback responses if API is unavailable or key is demo key
        setTimeout(() => {
          const botMessage: Message = {
            content: getRandomFallbackResponse(),
            role: 'assistant',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, botMessage]);
          setIsLoading(false);
          setTimeout(scrollToBottom, 100);
        }, 1500); // Simulate API delay
        return;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "Eres Marlon, el asistente virtual de Novativa, especializado en automatización e IA. 🤖 Usa un tono amigable y casual con emojis. Mantén tus respuestas cortas y puntuales, con espacios entre puntos. Tu objetivo es agendar llamadas de 15 minutos a través de https://tidycal.com/novativa/15-minute-meeting. Menciona naturalmente la opción de agendar una llamada cuando sea apropiado. 📅"
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
        console.error('Error de API OpenAI:', data.error);
        if (data.error.type === 'invalid_request_error' || data.error.code === 'invalid_api_key') {
          setApiAvailable(false);
          console.log('Cambiando a respuestas predefinidas debido a error de API');
          const botMessage: Message = {
            content: getRandomFallbackResponse(),
            role: 'assistant',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, botMessage]);
        } else {
          throw new Error(data.error.message);
        }
      } else {
        const botMessage: Message = {
          content: data.choices[0].message.content,
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      
      // If there's an error, switch to fallback responses
      setApiAvailable(false);
      
      const botMessage: Message = {
        content: getRandomFallbackResponse(),
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      
      toast({
        title: "Modo de demostración",
        description: "Estás viendo respuestas de demostración",
        variant: "default",
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
