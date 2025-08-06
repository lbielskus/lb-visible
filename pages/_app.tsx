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
import appWithI18n from 'next-translate/appWithI18n';
import i18nConfig from '../i18n.json';
import GoogleAnalytics from '../components/GoogleAnalytics';

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

function App(props: any) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [hasConsent, setHasConsent] = useState(false);
  const [showBlur, setShowBlur] = useState(true);
  const blurRef = useRef<HTMLDivElement>(null);

  const showNavbar = !['/login', '/signup', '/forgot-password'].includes(
    router.pathname
  );

  // Get current URL and locale
  const currentUrl = `https://www.lbvisible.com${router.asPath}`;
  const isLithuanian = router.locale === 'lt' || router.asPath.startsWith('/lt');
  const baseUrl = 'https://www.lbvisible.com';

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
          
          {/* Canonical URL */}
          <link rel='canonical' href={currentUrl} />
          
          {/* Hreflang tags for multilingual SEO */}
          <link rel='alternate' hrefLang='en' href={currentUrl.replace('/lt', '')} />
          <link rel='alternate' hrefLang='lt' href={currentUrl.includes('/lt') ? currentUrl : currentUrl.replace('/', '/lt/')} />
          <link rel='alternate' hrefLang='x-default' href={currentUrl.replace('/lt', '')} />
          
          {/* Open Graph */}
          <meta property='fb:app_id' content='1223293146253930' />
          <meta property='og:title' content='LB Visible' />
          <meta
            property='og:description'
            content='Websites for your niche with custom CMS, SEO & Marketing tools.'
          />
          <meta property='og:url' content={currentUrl} />
          <meta property='og:type' content='website' />
          <meta
            property='og:image'
            content='https://www.lbvisible.com/ogbanners/ogbanner.png'
          />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />
          <meta property='og:locale' content={isLithuanian ? 'lt_LT' : 'en_US'} />
          <meta property='og:locale:alternate' content={isLithuanian ? 'en_US' : 'lt_LT'} />

          {/* Twitter Card */}
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
          
          {/* Additional SEO */}
          <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
          <meta name='googlebot' content='index, follow' />
          <meta name='bingbot' content='index, follow' />
        </Head>

        <div className='relative min-h-screen'>
          <div 
            className='fixed inset-0 z-0'
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
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
          <GoogleAnalytics
            measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
            measurementIdLt={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID_LT}
          />
        )}
      </CartContextProvider>
    </AuthProvider>
  );
}

export default appWithI18n(App, i18nConfig);
