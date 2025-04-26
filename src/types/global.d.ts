
/// <reference types="vite/client" />

declare global {
  interface Window {
    fbq: any;
    gtag: any;
    TidyCal?: {
      init: () => void;
    };
  }
}

export {};
