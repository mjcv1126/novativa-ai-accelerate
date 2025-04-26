
export interface Platform {
  name: string;
  icon: string;
  color: string;
}

export const platforms: Platform[] = [
  {
    name: 'WhatsApp',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png',
    color: 'text-green-500'
  },
  {
    name: 'Telegram',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png',
    color: 'text-blue-500'
  },
  {
    name: 'Instagram',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png',
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
