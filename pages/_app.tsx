// pages/_app.tsx
import '../styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ScrollToTopButton } from '../components/ScrollToTopButton';
import { CartContextProvider } from '../lib/CartContext';
import { AuthProvider, useAuth } from '../lib/AuthContext';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import ContactButton from '../components/ContactButton';
import LayeredBackground from '../components/LayeredBackground';
import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import * as gtag from '../lib/gtag';
import Head from 'next/head';

const CookieConsentBanner = dynamic(
  () => import('../components/CookieConsentBanner'),
  { ssr: false }
);

const protectedPaths = ['/cart', '/profile'];

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const isProtected = protectedPaths.some((path) =>
      router.pathname.startsWith(path)
    );

    if (!loading) {
      if (!user && isProtected) {
        router.replace('/login');
      } else if (user && !user.emailVerified && isProtected) {
        router.replace('/verify-email');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className='text-center py-20 text-xl'>Loading...</div>;
  }

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [hasConsent, setHasConsent] = useState(false);
  const [showBlur, setShowBlur] = useState(true);
  const blurRef = useRef<HTMLDivElement>(null);

  const showNavbar = !['/login', '/signup', '/forgot-password'].includes(
    router.pathname
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookieConsent');
      if (consent === 'true') {
        setHasConsent(true);
        setShowBlur(false);
      }
    }
  }, []);

  // Remove blur when required cookies are accepted
  const handleRequiredConsent = (accepted: boolean) => {
    if (accepted) {
      setShowBlur(false);
      localStorage.setItem('cookieConsent', 'true');
    }
  };

  useEffect(() => {
    if (!hasConsent) return;
    const handleRouteChange = (url: string) => gtag.pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [hasConsent, router.events]);

  return (
    <AuthProvider>
      <CartContextProvider>
        <Head>
          <title>LB Visible | Web Development & SEO</title>
          <meta
            name='description'
            content='Custom websites with CMS, SEO, and growth tools. Built with Next.js, powered by Firebase.'
          />
          <meta property='fb:app_id' content='1223293146253930' />
          <meta property='og:title' content='LB Visible' />
          <meta
            property='og:description'
            content='Websites for your niche with custom CMS, SEO & Marketing tools.'
          />
          <meta property='og:url' content='https://www.lbvisible.com' />
          <meta property='og:type' content='website' />
          <meta
            property='og:image'
            content='https://www.lbvisible.com/ogbanners/ogbanner.png'
          />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />

          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='LB Visible' />
          <meta
            name='twitter:description'
            content='Websites for your niche with custom CMS, SEO & Marketing tools.'
          />
          <meta
            name='twitter:image'
            content='https://www.lbvisible.com/ogbanners/ogbanner.png'
          />
        </Head>

        <div className='relative min-h-screen'>
          <div className='absolute inset-0 -z-10'>
            <LayeredBackground />
          </div>

          <div className='relative z-10'>
            {showNavbar && <Header />}
            <Toaster position='top-center' />
            <main className='min-h-screen max-w-screen-2xl mx-auto sm:px-6 relative'>
              {/* Blurred overlay only on main content */}
              {showBlur && (
                <div
                  ref={blurRef}
                  className='absolute inset-0 z-30 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-500 pointer-events-auto rounded-xl'
                  aria-hidden='true'
                />
              )}
              <AuthGate>
                <Component {...pageProps} />
              </AuthGate>
            </main>
            {showNavbar && <Footer />}
            {showNavbar && <ContactButton />}
            <CookieConsentBanner onRequiredConsent={handleRequiredConsent} />
          </div>

          <ScrollToTopButton />
        </div>

        {hasConsent && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
              strategy='afterInteractive'
            />
            <Script
              id='gtag-init'
              strategy='afterInteractive'
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
                `,
              }}
            />
          </>
        )}
      </CartContextProvider>
    </AuthProvider>
  );
}
