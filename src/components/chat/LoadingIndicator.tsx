
import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start my-4">
      <div className="px-4 py-2 bg-gradient-to-r from-novativa-teal/10 to-novativa-orange/10 rounded-lg">
        <div className="flex flex-col items-start gap-1">
          <div className="text-sm text-novativa-teal font-medium opacity-0 animate-[fade-in_0.5s_ease-out_forwards]">
            Pensando
          </div>
          <div className="flex items-center gap-1 text-xs text-novativa-orange">
            <span className="opacity-0 animate-[fade-in_0.5s_0.5s_ease-out_forwards]">
              Automatizando
            </span>
            <span className="opacity-0 animate-[fade-in_0.5s_1s_ease-out_forwards]">
              •
            </span>
            <span className="opacity-0 animate-[fade-in_0.5s_1.5s_ease-out_forwards]">
              Innovando
            </span>
            <span className="opacity-0 animate-[fade-in_0.5s_2s_ease-out_forwards]">
              •
            </span>
            <span className="opacity-0 animate-[fade-in_0.5s_2.5s_ease-out_forwards]">
              Creciendo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;

