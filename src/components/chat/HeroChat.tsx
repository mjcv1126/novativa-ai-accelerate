
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Message } from '@/types/chat';
import { toast } from 'sonner';

const HeroChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "¡Hola! Soy Nova, tu asistente virtual. ¿En qué puedo ayudarte hoy?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "" || isLoading) return;

    const userMessage: Message = {
      content: inputValue.trim(),
      role: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "OpenAI-Beta": "assistants=v1",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Eres Nova, el asistente virtual de Novativa que ayuda a los usuarios con información sobre servicios de IA y automatización."
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: "user",
              content: inputValue.trim()
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la comunicación con el asistente');
      }

      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message) {
        const assistantMessage: Message = {
          content: data.choices[0].message.content,
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      toast.error("Hubo un problema al comunicarse con el asistente. Por favor, inténtalo de nuevo.");
      
      const errorMessage: Message = {
        content: "Lo siento, estoy teniendo problemas para responder en este momento. Por favor, inténtalo de nuevo más tarde.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[500px] rounded-xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
      <div className="bg-novativa-teal p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="text-white" size={24} />
          <span className="text-white font-semibold">Chat con Nova</span>
        </div>
      </div>
      <div className="p-4 h-[400px] bg-gray-50 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === "user"
                  ? "bg-novativa-orange text-white"
                  : "bg-white border text-gray-800 shadow-sm"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-[10px] mt-1 opacity-70">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start my-2">
            <div className="bg-gray-200 rounded-full px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="absolute bottom-0 w-full p-4 bg-white border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje..." 
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-novativa-teal"
            disabled={isLoading}
          />
          <Button 
            type="submit"
            className="bg-novativa-teal hover:bg-novativa-lightTeal"
            disabled={isLoading || inputValue.trim() === ""}
          >
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HeroChat;
