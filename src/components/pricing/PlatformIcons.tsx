
import React from 'react';
import { platforms } from '@/config/platformsConfig';

export const PlatformIcons = () => {
  return (
    <div className="flex gap-4 mt-2 items-center justify-center">
      {platforms.map((platform) => (
        <div key={platform.name} className="flex flex-col items-center gap-1">
          <img
            src={platform.icon}
            alt={`${platform.name} icon`}
            className="w-8 h-8 object-contain"
          />
          <span className={`text-xs ${platform.color}`}>{platform.name}</span>
        </div>
      ))}
    </div>
  );
};
