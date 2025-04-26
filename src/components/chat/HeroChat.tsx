import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft, Menu, Paperclip, Mic, Calendar } from "lucide-react";
import MessageList from './MessageList';
import { useChat } from '@/hooks/useChat';
import { useNavigate } from 'react-router-dom';

const HeroChat = () => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { messages, isLoading, sendMessage } = useChat();
  const [isChatbotActive, setIsChatbotActive] = useState(false);

  const handleSchedule = () => {
    navigate('/agenda');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Enviar mensaje al chat normal
    await sendMessage(input);
    
    // Activar el widget de Chatbot y enviarle el mensaje
    if (!isChatbotActive) {
      const chatbotWidget = document.querySelector('#louisebotwidget') as HTMLIFrameElement;
      if (chatbotWidget) {
        chatbotWidget.contentWindow?.postMessage({ type: 'OPEN_WIDGET' }, '*');
        setIsChatbotActive(true);
      }

      // Pequeño delay para asegurar que el widget está abierto
      setTimeout(() => {
        const chatbotWidget = document.querySelector('#louisebotwidget') as HTMLIFrameElement;
        if (chatbotWidget) {
          chatbotWidget.contentWindow?.postMessage(
            { type: 'SEND_MESSAGE', message: input },
            '*'
          );
        }
      }, 1000);
    } else {
      // Si ya está activo, solo enviamos el mensaje
      const chatbotWidget = document.querySelector('#louisebotwidget') as HTMLIFrameElement;
      if (chatbotWidget) {
        chatbotWidget.contentWindow?.postMessage(
          { type: 'SEND_MESSAGE', message: input },
          '*'
        );
      }
    }

    setInput('');
    setTimeout(scrollToBottom, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
            className="bg-novativa-orange hover:bg-novativa-lightOrange text-white gap-2 animate-subtle-shake"
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
