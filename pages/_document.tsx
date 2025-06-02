// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* ✅ Google Fonts preconnect */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
          rel='stylesheet'
        />

        {/* ✅ Static Open Graph Meta Tags */}
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

        {/* ✅ Twitter Card Meta Tags */}
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
