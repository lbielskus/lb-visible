'use client';

import React from 'react';
import Layout from '../../components/Layout';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../../components/SEOHead';

const MobileResponsive = () => {
  const { t, lang } = useTranslation('common');

  return (
    <Layout>
      <SEOHead
        title={
          lang === 'lt'
            ? t('mobileResponsive.pageTitle')
            : 'Mobile Responsive | LB Websites'
        }
        description={
          lang === 'lt'
            ? t('mobileResponsive.description')
            : 'LB Websites are fully mobile responsive, delivering flawless performance and accessibility on all screen sizes.'
        }
        keywords='mobile responsive design, mobile optimization, responsive websites, mobile-friendly, smartphone optimization, tablet design'
        canonicalUrl={
          lang === 'lt' ? '/lt/sub/mobile-responsive' : '/sub/mobile-responsive'
        }
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name:
            lang === 'lt'
              ? t('mobileResponsive.pageTitle')
              : 'Mobile Responsive | LB Websites',
          description:
            lang === 'lt'
              ? t('mobileResponsive.description')
              : 'LB Websites are fully mobile responsive, delivering flawless performance and accessibility on all screen sizes.',
          url: `https://www.lbvisible.com${
            lang === 'lt'
              ? '/lt/sub/mobile-responsive'
              : '/sub/mobile-responsive'
          }`,
          inLanguage: lang === 'lt' ? 'lt' : 'en',
          provider: {
            '@type': 'Organization',
            name: 'LB Visible',
          },
        }}
      />

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-xl font-bold text-center text-gray-200 mb-6'>
          {lang === 'lt' ? t('mobileResponsive.heading') : 'Mobile Responsive'}
        </h1>
        <p className='text-md text-center mb-10 text-gray-300'>
          {lang === 'lt'
            ? t('mobileResponsive.subtitle')
            : "Today's users browse from phones, tablets, and laptops. We build every website to adapt to any screen, giving your visitors a flawless experience wherever they are."}
        </p>

        <ul className='list-disc pl-6 space-y-5 text-sm sm:text-md text-gray-300'>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('mobileResponsive.benefits.userExperience.title')
                : 'Better user experience:'}
            </span>{' '}
            {lang === 'lt'
              ? t('mobileResponsive.benefits.userExperience.desc')
              : 'Your site remains easy to navigate and visually appealing across all devices.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('mobileResponsive.benefits.seoRankings.title')
                : 'Improved SEO rankings:'}
            </span>{' '}
            {lang === 'lt'
              ? t('mobileResponsive.benefits.seoRankings.desc')
              : 'Google favors mobile-friendly websites in search results.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('mobileResponsive.benefits.accessibility.title')
                : 'Increased accessibility:'}
            </span>{' '}
            {lang === 'lt'
              ? t('mobileResponsive.benefits.accessibility.desc')
              : 'Reach more people, including mobile-first users and those with accessibility needs.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('mobileResponsive.benefits.brandReputation.title')
                : 'Stronger brand reputation:'}
            </span>{' '}
            {lang === 'lt'
              ? t('mobileResponsive.benefits.brandReputation.desc')
              : 'A professional, consistent design builds trust and credibility.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('mobileResponsive.benefits.conversions.title')
                : 'Higher conversions:'}
            </span>{' '}
            {lang === 'lt'
              ? t('mobileResponsive.benefits.conversions.desc')
              : 'Responsive design helps drive more leads, sales, and customer engagement.'}
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default MobileResponsive;
