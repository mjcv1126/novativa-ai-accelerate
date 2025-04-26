
import React from 'react';
import { ArrowRight } from 'lucide-react';

const AnimatedScheduleArrow = () => {
  return (
    <div className="animate-bounce-slow">
      <ArrowRight 
        className="text-white/80 w-5 h-5 animate-pulse-subtle" 
        strokeWidth={2} 
      />
    </div>
  );
};

export default AnimatedScheduleArrow;
