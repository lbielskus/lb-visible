'use client';

import CookieConsent, { Cookies } from 'react-cookie-consent';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

interface CookieConsentBannerProps {
  onRequiredConsent: (accepted: boolean) => void;
}

const CookieConsentBanner = ({
  onRequiredConsent,
}: CookieConsentBannerProps) => {
  const [gaAllowed, setGaAllowed] = useState(false);
  const [requiredAccepted, setRequiredAccepted] = useState(false);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(false);

  useEffect(() => {
    const accepted = Cookies.get('userCookieConsentRequired');
    const analytics = Cookies.get('userCookieConsentAnalytics');
    if (accepted === 'true') {
      setRequiredAccepted(true);
      onRequiredConsent(true);
    }
    if (analytics === 'true') setGaAllowed(true);
  }, [onRequiredConsent]);

  useEffect(() => {
    if (requiredAccepted) {
      Cookies.set('userCookieConsentRequired', 'true', { expires: 365 });
      onRequiredConsent(true);
    }
    if (analyticsOptIn) {
      Cookies.set('userCookieConsentAnalytics', 'true', { expires: 365 });
      setGaAllowed(true);
    } else {
      Cookies.set('userCookieConsentAnalytics', 'false', { expires: 365 });
      setGaAllowed(false);
    }
  }, [requiredAccepted, analyticsOptIn, onRequiredConsent]);

  return (
    <>
      {gaAllowed && GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy='afterInteractive'
          />
          <Script id='ga-init' strategy='afterInteractive'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {!requiredAccepted && (
        <div className='fixed bottom-4 left-1/2 -translate-x-1/2 w-[95vw] max-w-xl bg-white/90 shadow-xl rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 border border-gray-200 z-50 backdrop-blur-md'>
          <div className='flex-1 text-gray-700 text-sm text-center sm:text-left font-normal'>
            We use cookies to improve your experience. Required cookies are
            necessary for the website to function. You can also opt in to
            analytics cookies.
            <Link
              href='/privacy-policy'
              className='underline text-purple-600 hover:text-purple-700 ml-1 transition-colors duration-150'
            >
              Learn more
            </Link>
          </div>
          <div className='flex flex-col items-center gap-3 w-full sm:w-auto'>
            <button
              className='px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 w-full sm:w-auto text-base'
              onClick={() => setRequiredAccepted(true)}
            >
              Accept Required
            </button>
            <div className='flex items-center gap-3 mt-1'>
              <Switch
                checked={analyticsOptIn}
                onChange={setAnalyticsOptIn}
                className={`${
                  analyticsOptIn ? 'bg-purple-600' : 'bg-gray-300'
                } relative inline-flex h-7 w-14 items-center rounded-full transition-colors`}
              >
                <span className='sr-only'>Enable analytics cookies</span>
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    analyticsOptIn ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </Switch>
              <span className='text-sm text-gray-600'>
                Enable analytics cookies
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentBanner;
