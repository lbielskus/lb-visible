'use client';

import CookieConsent, { Cookies } from 'react-cookie-consent';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

const CookieConsentBanner = () => {
  const [gaAllowed, setGaAllowed] = useState(false);

  useEffect(() => {
    const accepted = Cookies.get('userCookieConsent');
    if (accepted === 'true') setGaAllowed(true);
  }, []);

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

      <CookieConsent
        location='bottom'
        cookieName='userCookieConsent'
        buttonText='Accept All'
        declineButtonText='Decline'
        enableDeclineButton
        disableStyles={true}
        onAccept={() => setGaAllowed(true)}
        onDecline={() => console.log('User declined cookies')}
        containerClasses='fixed bottom-4 left-2 right-2 max-w-4xl mx-auto z-50 bg-[rgba(15,23,42,0.8)] backdrop-blur-md border border-white/10 text-white rounded-xl shadow-xl px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4'
        contentClasses='text-sm leading-5 text-center sm:text-left'
        buttonWrapperClasses='flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center sm:justify-start'
        buttonClasses='bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium px-5 py-2 rounded-xl transition'
        declineButtonClasses='bg-red-800/50 hover:bg-red-800/80 text-white text-sm font-medium px-5 py-2 rounded-xl transition border border-white/10'
      >
        We use cookies to improve your experience.
        <Link
          href='/privacy-policy'
          className='underline text-sm text-gray-300 ml-1 hover:text-gray-200'
        >
          Learn more
        </Link>
      </CookieConsent>
    </>
  );
};

export default CookieConsentBanner;
