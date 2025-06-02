// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Track pageviews
export const pageview = (url: string) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track specific events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  if (!GA_TRACKING_ID || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
