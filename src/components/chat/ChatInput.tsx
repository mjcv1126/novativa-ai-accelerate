
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardFooter } from "@/components/ui/card";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ChatInput = ({ value, onChange, onSubmit, isLoading }: ChatInputProps) => {
  return (
    <CardFooter className="p-2 bg-white border-t">
      <form onSubmit={onSubmit} className="flex w-full gap-2">
        <Input
          placeholder="Escribe tu mensaje..."
          value={value}
          onChange={onChange}
          className="flex-grow"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={isLoading || value.trim() === ""}
          className="bg-novativa-teal hover:bg-novativa-lightTeal"
        >
          <Send size={18} />
        </Button>
      </form>
    </CardFooter>
  );
};

export default ChatInput;
