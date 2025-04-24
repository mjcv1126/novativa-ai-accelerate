
import React from 'react';
import { CardContent } from "@/components/ui/card";
import { Message } from '@/types/chat';
import MessageBubble from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList = ({ messages, isLoading, messagesEndRef }: MessageListProps) => {
  return (
    <CardContent className="flex-grow overflow-y-auto p-4 bg-gray-50">
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
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
  );
};

export default MessageList;
