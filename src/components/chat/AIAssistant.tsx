
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X } from "lucide-react";
import { toast } from 'sonner';

interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "¡Hola! Soy el asistente de Novativa. ¿En qué puedo ayudarte hoy?",
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
              content: "You are an AI assistant helping users with information about Novativa's services."
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
          assistant_id: "asst_0n98mnqxf4SiqOHMDvv5Jbbs",
        }),
      });

      if (!response.ok) {
        throw new Error('Error en la comunicación con el asistente');
      }

      const data = await response.json();
      
      // Add assistant response to chat
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
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-novativa-teal text-white z-50 shadow-lg hover:bg-novativa-lightTeal"
          size="icon"
        >
          <MessageCircle size={24} />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] z-50 flex flex-col shadow-xl animate-fade-in border-novativa-teal">
          <CardHeader className="bg-novativa-teal text-white py-4 flex flex-row items-center justify-between rounded-t-lg">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/9cce1d6a-72e1-493f-bb16-901571c7e858.png" 
                alt="Novativa Logo" 
                className="h-8 w-auto mr-2"
              />
              <h3 className="font-bold">Chat con Novativa</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-novativa-darkTeal/20"
            >
              <X size={18} />
            </Button>
          </CardHeader>
          
          <CardContent className="flex-grow overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
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
              <div ref={messagesEndRef} />
            </div>
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
          </CardContent>
          
          <CardFooter className="p-2 bg-white border-t">
            <form onSubmit={handleSendMessage} className="flex w-full gap-2">
              <Input
                placeholder="Escribe tu mensaje..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || inputValue.trim() === ""}
                className="bg-novativa-teal hover:bg-novativa-lightTeal"
              >
                <Send size={18} />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;
