
import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-start my-4">
      <div className="relative w-16 h-16">
        {/* Outer rotating circle */}
        <div className="absolute inset-0 border-4 border-t-novativa-teal border-r-novativa-orange border-b-novativa-lightTeal border-l-novativa-lightOrange rounded-full animate-[spin_3s_linear_infinite]"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-2 bg-gradient-to-br from-novativa-teal via-novativa-orange to-novativa-lightTeal rounded-full animate-[pulse_2s_ease-in-out_infinite]">
          {/* Neural network dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-[ping_1.5s_ease-in-out_infinite]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center rotate-45">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-[ping_1.5s_ease-in-out_infinite_0.5s]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center -rotate-45">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-[ping_1.5s_ease-in-out_infinite_1s]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
