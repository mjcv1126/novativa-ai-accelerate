
import React from 'react';

const platforms = [
  {
    name: 'WhatsApp',
    icon: '/icons/whatsapp.png',
    color: 'text-green-500'
  },
  {
    name: 'Telegram',
    icon: '/icons/telegram.png',
    color: 'text-blue-500'
  },
  {
    name: 'Instagram',
    icon: '/icons/instagram.png',
    color: 'text-pink-500'
  },
  {
    name: 'Facebook',
    icon: '/icons/facebook.png',
    color: 'text-blue-700'
  },
  {
    name: 'Web',
    icon: '/icons/web.png',
    color: 'text-gray-500'
  },
  {
    name: 'SMS',
    icon: '/icons/sms.png',
    color: 'text-gray-600'
  }
];

export const PlatformIcons = () => {
  return (
    <div className="flex gap-4 mt-2 items-center">
      {platforms.map((platform) => (
        <div key={platform.name} className="flex flex-col items-center gap-1">
          <img
            src={platform.icon}
            alt={`${platform.name} icon`}
            className="w-6 h-6 object-contain"
          />
          <span className={`text-xs ${platform.color}`}>{platform.name}</span>
        </div>
      ))}
    </div>
  );
};

