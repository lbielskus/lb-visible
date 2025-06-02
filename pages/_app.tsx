// pages/_app.tsx
import '../styles/globals.css';
import { Inter } from 'next/font/google';
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
import { useEffect, useState } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import * as gtag from '../lib/gtag';

const CookieConsentBanner = dynamic(
  () => import('../components/CookieConsentBanner'),
  { ssr: false }
);

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

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
  }, [user, loading, router.pathname]);

  if (loading) {
    return <div className='text-center py-20 text-xl'>Loading...</div>;
  }

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [hasConsent, setHasConsent] = useState(false);

  const showNavbar = !['/login', '/signup', '/forgot-password'].includes(
    router.pathname
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookieConsent');
      if (consent === 'true') {
        setHasConsent(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!hasConsent) return;
    const handleRouteChange = (url: string) => gtag.pageview(url);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [hasConsent]);

  return (
    <AuthProvider>
      <CartContextProvider>
        <div className='relative min-h-screen'>
          <div className='absolute inset-0 -z-10'>
            <LayeredBackground />
          </div>

          <div className={`${inter.className} relative z-10`}>
            {showNavbar && <Header />}
            <Toaster position='top-center' />
            <main className='min-h-screen max-w-screen-2xl mx-auto sm:px-6'>
              <AuthGate>
                <Component {...pageProps} />
              </AuthGate>
            </main>
            {showNavbar && <Footer />}
            {showNavbar && <ContactButton />}
            <CookieConsentBanner />
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
