
import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CardHeader } from "@/components/ui/card";

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
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
        onClick={onClose}
        className="text-white hover:bg-novativa-darkTeal/20"
      >
        <X size={18} />
      </Button>
    </CardHeader>
  );
};

export default ChatHeader;
