'use client';

import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../../components/SEOHead';

const Cookies = () => {
  const { t, lang } = useTranslation('common');

  return (
    <Layout>
      <SEOHead
        title={
          lang === 'lt' ? t('cookiesInfo.pageTitle') : 'Cookies | LB Websites'
        }
        description={
          lang === 'lt'
            ? t('cookiesInfo.description')
            : 'Learn how LB Websites uses cookies to comply with GDPR and improve user experience.'
        }
        keywords='cookies, privacy, GDPR, data protection, website cookies, cookie policy'
        canonicalUrl={
          lang === 'lt' ? '/lt/sub/cookies-info' : '/sub/cookies-info'
        }
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name:
            lang === 'lt'
              ? t('cookiesInfo.pageTitle')
              : 'Cookies | LB Websites',
          description:
            lang === 'lt'
              ? t('cookiesInfo.description')
              : 'Learn how LB Websites uses cookies to comply with GDPR and improve user experience.',
          url: `https://www.lbvisible.com${
            lang === 'lt' ? '/lt/sub/cookies-info' : '/sub/cookies-info'
          }`,
          inLanguage: lang === 'lt' ? 'lt' : 'en',
        }}
      />

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-xl font-bold text-center text-gray-200 mb-6'>
          {lang === 'lt' ? t('cookiesInfo.heading') : 'Cookie Usage'}
        </h1>
        <p className='text-md mb-6 text-gray-300 text-center'>
          {lang === 'lt'
            ? t('cookiesInfo.subtitle')
            : 'Our website uses cookies to ensure functionality, improve your experience, and support optional analytics—only after your consent. This ensures compliance with GDPR and EU ePrivacy standards.'}
        </p>

        <ul className='list-disc pl-6 space-y-4 text-sm text-gray-300'>
          <li>
            <span className='text-white font-semibold'>
              {lang === 'lt'
                ? t('cookiesInfo.types.essential.title')
                : 'Essential Cookies:'}
            </span>{' '}
            {lang === 'lt'
              ? t('cookiesInfo.types.essential.desc')
              : 'Required for site functionality like navigation, forms, and login.'}
          </li>
          <li>
            <span className='text-white font-semibold'>
              {lang === 'lt'
                ? t('cookiesInfo.types.analytics.title')
                : 'Analytics Cookies:'}
            </span>{' '}
            {lang === 'lt'
              ? t('cookiesInfo.types.analytics.desc')
              : 'We use Google Analytics to understand user behavior—but only after consent is given.'}
          </li>
          <li>
            <span className='text-white font-semibold'>
              {lang === 'lt'
                ? t('cookiesInfo.types.preference.title')
                : 'Consent-Based:'}
            </span>{' '}
            {lang === 'lt'
              ? t('cookiesInfo.management.desc')
              : 'Users can accept or decline non-essential cookies through our consent banner. Preferences can be updated by clearing cookies.'}
          </li>
          <li>
            <span className='text-white font-semibold'>
              {lang === 'lt' ? 'Duomenų privatumas:' : 'Data Privacy:'}
            </span>{' '}
            {lang === 'lt'
              ? 'Nesaugome asmeninės informacijos be jūsų sutikimo. Analitikos duomenys yra anoniminiai ir naudojami našumui pagerinti.'
              : 'We do not store personal information without your consent. Analytics data is anonymous and used to improve performance.'}
          </li>
        </ul>

        <p className='text-sm text-gray-400 mt-8 text-center'>
          {lang === 'lt'
            ? 'Toliau naudodami šią svetainę, sutinkate su būtinų slapukų naudojimu. Daugiau informacijos rasite mūsų '
            : 'By continuing to use this website, you agree to essential cookie use. For more details, see our '}
          <Link
            href='/privacy-policy'
            className='underline text-purple-300 hover:text-purple-400'
          >
            {lang === 'lt' ? t('footer.privacyPolicy') : 'Privacy Policy'}
          </Link>
          .
        </p>
      </section>
    </Layout>
  );
};

export default Cookies;
