
interface CustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  [key: string]: any;
}

declare global {
  interface Window {
    fbq: any;
  }
}

export const fbTrack = (eventName: string, customData?: CustomData) => {
  if (window.fbq) {
    window.fbq('track', eventName, customData);
  }
};
