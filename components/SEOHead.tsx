import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: any;
  noIndex?: boolean;
  lang?: string;
}

export default function SEOHead({
  title,
  description,
  keywords = 'website development, web design, SEO, digital marketing, Lithuania, custom websites, e-commerce, CMS, Next.js, React',
  canonicalUrl,
  ogImage = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/ogbanner.png`,
  structuredData,
  noIndex = false,
  lang = 'en',
}: SEOHeadProps) {
  const { t } = useTranslation('common');
  const baseUrl = 'https://www.lbvisible.com';
  const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
  const isLithuanian = lang === 'lt';

  // Default structured data for web pages
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    url: fullCanonicalUrl,
    inLanguage: isLithuanian ? 'lt' : 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'LB Visible',
      url: baseUrl,
    },
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content='LB Visible' />
        <meta
          name='robots'
          content={
            noIndex
              ? 'noindex, nofollow'
              : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          }
        />
        <meta
          name='googlebot'
          content={noIndex ? 'noindex, nofollow' : 'index, follow'}
        />
        <meta
          name='bingbot'
          content={noIndex ? 'noindex, nofollow' : 'index, follow'}
        />

        {/* Open Graph */}
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:url' content={fullCanonicalUrl} />
        <meta property='og:image' content={ogImage} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='LB Visible' />
        <meta property='og:locale' content={isLithuanian ? 'lt_LT' : 'en_US'} />
        <meta
          property='og:locale:alternate'
          content={isLithuanian ? 'en_US' : 'lt_LT'}
        />

        {/* Twitter Card */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@lbvisible' />
        <meta name='twitter:creator' content='@lbvisible' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={ogImage} />

        {/* Additional SEO */}
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#1f2937' />
        <meta name='msapplication-TileColor' content='#1f2937' />
        <link rel='canonical' href={fullCanonicalUrl} />

        {/* Language alternates */}
        {canonicalUrl && (
          <>
            <link
              rel='alternate'
              hrefLang={isLithuanian ? 'lt' : 'en'}
              href={fullCanonicalUrl}
            />
            <link
              rel='alternate'
              hrefLang={isLithuanian ? 'en' : 'lt'}
              href={`${baseUrl}${
                isLithuanian
                  ? canonicalUrl.replace('/lt', '')
                  : `/lt${canonicalUrl}`
              }`}
            />
            <link
              rel='alternate'
              hrefLang='x-default'
              href={`${baseUrl}${canonicalUrl.replace('/lt', '')}`}
            />
          </>
        )}

        {/* Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(finalStructuredData),
          }}
        />
      </Head>

      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          locale: isLithuanian ? 'lt_LT' : 'en_US',
          url: fullCanonicalUrl,
          site_name: 'LB Visible',
          title: title,
          description: description,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@lbvisible',
          site: '@lbvisible',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: keywords,
          },
          {
            name: 'author',
            content: 'LB Visible',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'canonical',
            href: fullCanonicalUrl,
          },
        ]}
      />
    </>
  );
}
