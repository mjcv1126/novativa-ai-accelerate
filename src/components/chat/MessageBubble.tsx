
import React from 'react';
import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const convertLinksToAnchors = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {part}
          </a>
        );
      }
      // Add spacing between sentences
      return part.split('. ').map((sentence, i) => (
        <React.Fragment key={i}>
          {i > 0 && '. '}
          {sentence}
        </React.Fragment>
      ));
    });
  };

  return (
    <div className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl p-3",
          message.role === "user"
            ? "bg-novativa-teal text-white"
            : "bg-gray-100 text-gray-800"
        )}
      >
        <div className="text-sm">{convertLinksToAnchors(message.content)}</div>
        <p className="text-[10px] mt-1 opacity-70">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
