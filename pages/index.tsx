// ✅ FILE: pages/index.tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import BannerHero from '../components/BannerHero';
import AuditForm from '../components/AuditForm';
import Products from '../components/Products';
import ContactDiv from '../components/ContactDiv';
import BlogSlide from '../components/BlogSlide';
import PricingPlans from '../components/PricingPlans';
import Banner from '../components/Banner';
import WhatMakesUsDifferent from '../components/WhatMakesUsDifferent';
import HomeHowItWorksBanner from '../components/HomeHowItWorksBanner';
import { db } from '../lib/firebaseAdmin';
import { Product, BlogPost } from '../types';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';

interface Props {
  newProducts: Product[];
  blogPosts: BlogPost[];
  pricingProducts: Product[];
}

function serializeFirestore(data: any): any {
  if (data._seconds) return new Date(data._seconds * 1000).toISOString();
  if (Array.isArray(data)) return data.map(serializeFirestore);
  if (typeof data === 'object' && data !== null) {
    const result: any = {};
    for (const key in data) {
      result[key] = serializeFirestore(data[key]);
    }
    return result;
  }
  return data;
}

export default function Home({
  newProducts,
  blogPosts,
  pricingProducts,
}: Props) {
  const ogImageUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/ogbanner.png`;
  const { t } = useTranslation('common');

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LB Visible',
    url: 'https://www.lbvisible.com',
    description: t('home.description'),
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.lbvisible.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    sameAs: [
      'https://www.facebook.com/lbvisible',
      'https://www.instagram.com/lbvisible',
      'https://www.linkedin.com/company/lbvisible',
    ],
  };

  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LB Visible',
    url: 'https://www.lbvisible.com',
    logo: 'https://www.lbvisible.com/logo.png',
    description: t('home.description'),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LT',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Lithuanian'],
    },
  };

  // Enhanced structured data for AI indexing
  const localBusinessStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: "Let's Be Visible Lietuva",
    alternateName: 'LB Visible',
    description:
      'Professional web development, mobile app development, and graphic design services in Lithuania. We create effective digital solutions for Lithuanian businesses, from idea to full implementation.',
    url: 'https://www.lbvisible.com',
    telephone: '+37065059050',
    email: 'info@lbvisible.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'LT',
      addressRegion: 'Vilnius',
      addressLocality: 'Vilnius',
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 54.6872,
        longitude: 25.2797,
      },
      geoRadius: '50000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Website Development',
            description:
              'Professional custom websites built with Next.js and React for businesses worldwide and Lithuanian market',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Services',
            description:
              'Search engine optimization services for global markets, local businesses, and Lithuanian SEO',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development',
            description:
              'Cross-platform mobile applications for businesses and startups worldwide and Lithuania',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Marketing',
            description:
              'Comprehensive digital marketing solutions for companies globally and Lithuanian businesses',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-commerce Solutions',
            description:
              'Online stores and payment systems for businesses worldwide and Lithuanian e-commerce',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CMS Development',
            description:
              'Custom content management systems for businesses globally and Lithuanian companies',
          },
        },
      ],
    },
    openingHours: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    priceRange: '€€',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    currenciesAccepted: 'EUR',
    languages: ['English', 'Lithuanian'],
    foundingDate: '2024',
    knowsAbout: [
      'Web Development',
      'Web Development Lithuania',
      'Svetainių programavimas',
      'Svetainių kūrimas',
      'Svetainių dizainas',
      'Svetainių optimizavimas',
      'SEO',
      'SEO Lithuania',
      'Paieškos variklių optimizacija',
      'Digital Marketing',
      'Digital Marketing Lithuania',
      'Skaitmeninis marketingas',
      'Next.js Development',
      'React Development',
      'Firebase',
      'E-commerce',
      'E-commerce Lithuania',
      'E. parduotuvių programavimas',
      'E. parduotuvių kūrimas',
      'E. parduotuvių dizainas',
      'CMS Development',
      'Turinio valdymo sistemos',
      'Mobile App Development',
      'Mobile App Development Lithuania',
      'Mobilių programėlių kūrimas',
      'Mobilių aplikacijų programavimas',
      'Graphic Design',
      'Graphic Design Lithuania',
      'Grafinis dizainas',
      'Reklaminiai baneriai',
      'Logotipų kūrimas',
      'Logotipų dizainas',
      'Programavimas',
      'Dizainas',
      'Reklama',
      'Marketingas',
      'Reklaminis dizainas',
      'Prekės ženklų kūrimas',
      'Prekės ženklų dizainas',
      'Svetainių administravimas',
      'Svetainių palaikymas',
      'Svetainių techninis aptarnavimas',
      'Svetainių atnaujinimas',
      'Svetainių modernizavimas',
      'Svetainių saugumas',
      'Svetainių greičio optimizavimas',
      'Svetainių testavimas',
      'Svetainių konsultacija',
      'Svetainių planavimas',
      'Svetainių strategija',
      'Svetainių analitika',
      'Svetainių atsiliepimai',
      'Svetainių dizaino konsultacija',
      'Svetainių programavimo konsultacija',
      'Svetainių SEO konsultacija',
      'Svetainių marketingo konsultacija',
      'Global Business Solutions',
      'Lithuanian Business Solutions',
      'International Web Development',
      'Vilnius Web Development',
      'Kaunas Digital Services',
      'Cross-border Digital Services',
    ],
    knowsLanguage: ['en', 'lt'],
    areaServed: [
      {
        '@type': 'Country',
        name: 'Lithuania',
      },
      {
        '@type': 'City',
        name: 'Vilnius',
      },
      {
        '@type': 'City',
        name: 'Kaunas',
      },
      {
        '@type': 'City',
        name: 'Klaipėda',
      },
      {
        '@type': 'City',
        name: 'Šiauliai',
      },
      {
        '@type': 'City',
        name: 'Panevėžys',
      },
    ],
  };

  // FAQ Schema for AI models
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does LB Visible offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LB Visible offers custom website development, mobile app development, SEO services, graphic design, and digital marketing solutions for Lithuanian businesses.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is LB Visible located?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LB Visible is located in Lithuania, serving clients throughout the country including Vilnius, Kaunas, and Klaipėda.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies does LB Visible use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'LB Visible uses modern technologies including Next.js, React, Firebase, and other cutting-edge tools for web development and digital solutions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does LB Visible provide ongoing support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, LB Visible provides ongoing technical support and maintenance to ensure the success of your digital operations.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{t('home.title')}</title>
        <meta name='description' content={t('home.description')} />
        <meta
          name='keywords'
          content='website development, web design, SEO, digital marketing, Lithuania, custom websites, e-commerce, CMS, Next.js, React'
        />
        <meta name='author' content='LB Visible' />
        <meta
          name='robots'
          content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        />
        <meta name='googlebot' content='index, follow' />
        <meta name='bingbot' content='index, follow' />

        {/* Open Graph */}
        <meta property='og:title' content={t('home.title')} />
        <meta property='og:description' content={t('home.description')} />
        <meta property='og:url' content='https://www.lbvisible.com' />
        <meta property='og:image' content={ogImageUrl} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='LB Visible' />
        <meta property='og:locale' content='en_US' />
        <meta property='og:locale:alternate' content='lt_LT' />

        {/* Twitter Card */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@lbvisible' />
        <meta name='twitter:creator' content='@lbvisible' />
        <meta name='twitter:title' content={t('home.title')} />
        <meta name='twitter:description' content={t('home.description')} />
        <meta name='twitter:image' content={ogImageUrl} />

        {/* Additional SEO */}
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#1f2937' />
        <meta name='msapplication-TileColor' content='#1f2937' />
        <link rel='canonical' href='https://www.lbvisible.com' />
        <link rel='alternate' hrefLang='en' href='https://www.lbvisible.com' />
        <link
          rel='alternate'
          hrefLang='lt'
          href='https://www.lbvisible.com/lt'
        />
        <link
          rel='alternate'
          hrefLang='x-default'
          href='https://www.lbvisible.com'
        />

        {/* Structured Data */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessStructuredData),
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
      </Head>

      <DefaultSeo
        title={t('home.title')}
        description={t('home.description')}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://lbvisible.com',
          site_name: 'LB Visible',
          title: t('home.title'),
          description: t('home.description'),
          images: [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: t('home.ogImageAlt'),
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
            content:
              'website development, web design, SEO, digital marketing, Lithuania, custom websites, e-commerce, CMS, Next.js, React',
          },
          {
            name: 'author',
            content: 'LB Visible',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'canonical',
            href: 'https://www.lbvisible.com',
          },
          {
            rel: 'alternate',
            hrefLang: 'en',
            href: 'https://www.lbvisible.com',
          },
          {
            rel: 'alternate',
            hrefLang: 'lt',
            href: 'https://www.lbvisible.com/lt',
          },
          {
            rel: 'alternate',
            hrefLang: 'x-default',
            href: 'https://www.lbvisible.com',
          },
        ]}
      />

      <main className='h-full p-4'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
        >
          <Products products={newProducts} />
        </motion.div>

        <hr className='my-3 h-px border-0 bg-gray-200' />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <BannerHero />
        </motion.div>
        <hr className='my-10 h-px border-0 bg-gray-200 hidden sm:block' />
        {/* Home How It Works Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
        >
          <HomeHowItWorksBanner />
        </motion.div>
        <hr className='my-3 h-px border-0 bg-gray-200 hidden sm:block' />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <PricingPlans products={pricingProducts} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        >
          <BlogSlide posts={blogPosts} />
        </motion.div>
        <hr className='my-3 h-px border-0 bg-gray-200 mt-6 mb-6' />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
        >
          <AuditForm />
        </motion.div>
        <hr className='my-3 h-px border-0 bg-gray-200 mb-10 mt-10' />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
        >
          <Banner />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
        >
          <ContactDiv />
        </motion.div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;

  const productSnapshot = await db
    .collection('clients')
    .doc(clientId)
    .collection('products')
    .orderBy('createdAt', 'desc')
    .limit(2)
    .get();
  const newProducts = productSnapshot.docs.map((doc) =>
    serializeFirestore({ id: doc.id, ...doc.data() })
  );

  const blogSnapshot = await db
    .collection('clients')
    .doc(clientId)
    .collection('blogPosts')
    .orderBy('createdAt', 'desc')
    .limit(5)
    .get();
  const blogPosts = blogSnapshot.docs.map((doc) =>
    serializeFirestore({ id: doc.id, ...doc.data() })
  );

  const pricingSnapshot = await db
    .collection('clients')
    .doc(clientId)
    .collection('products')
    .orderBy('createdAt', 'desc')
    .limit(4)
    .get();
  const pricingProducts = pricingSnapshot.docs.map((doc) =>
    serializeFirestore({ id: doc.id, ...doc.data() })
  );

  return {
    props: {
      newProducts,
      blogPosts,
      pricingProducts,
    },
  };
};
