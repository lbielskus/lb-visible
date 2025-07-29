'use client';

import React from 'react';
import Layout from '../../components/Layout';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../../components/SEOHead';

const Support = () => {
  const { t, lang } = useTranslation('common');

  return (
    <Layout>
      <SEOHead
        title={lang === 'lt' ? t('support.pageTitle') : 'Support | LB Websites'}
        description={
          lang === 'lt'
            ? t('support.description')
            : 'Learn how LB Websites provides ongoing customer support after purchase. Contact options, emergency access, and guaranteed response times.'
        }
        keywords='website support, technical assistance, maintenance, customer service, help desk, LB Websites support'
        canonicalUrl={lang === 'lt' ? '/lt/sub/support' : '/sub/support'}
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name:
            lang === 'lt' ? t('support.pageTitle') : 'Support | LB Websites',
          description:
            lang === 'lt'
              ? t('support.description')
              : 'Learn how LB Websites provides ongoing customer support after purchase. Contact options, emergency access, and guaranteed response times.',
          url: `https://www.lbvisible.com${
            lang === 'lt' ? '/lt/sub/support' : '/sub/support'
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
          {lang === 'lt' ? t('support.heading') : 'Support'}
        </h1>

        <p className='text-sm text-gray-300 mb-6 text-center'>
          {lang === 'lt'
            ? t('support.subtitle')
            : "Our commitment doesn't end at launch. We provide ongoing support to ensure your website continues performing at its best—and you feel confident every step of the way."}
        </p>

        <ul className='list-disc pl-6 space-y-4 text-sm text-gray-300'>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('support.contact.title')
                : 'Dedicated support:'}
            </span>{' '}
            {lang === 'lt'
              ? t('support.contact.desc')
              : 'Reach out anytime for technical assistance or questions related to your service.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt' ? t('support.faq.title') : 'Response guarantee:'}
            </span>{' '}
            {lang === 'lt'
              ? t('support.faq.desc')
              : 'We respond to support requests within 2–3 business days, depending on workload.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('support.documentation.title')
                : 'Priority access:'}
            </span>{' '}
            {lang === 'lt'
              ? t('support.documentation.desc')
              : 'Customers with an active plan receive emergency contact info (SMS or direct line) for urgent website issues.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('support.community.title')
                : 'Performance help:'}
            </span>{' '}
            {lang === 'lt'
              ? t('support.community.desc')
              : "If your site needs updates, optimizations, or new features—we're ready to scale with your growth."}
          </li>
        </ul>

        <p className='mt-8 text-sm text-gray-400 text-right'>
          {lang === 'lt'
            ? 'Reikia pagalbos dabar? Naudokite kontaktų mygtuką.'
            : 'Need help now? Use the contact button.'}
        </p>
      </section>
    </Layout>
  );
};

export default Support;
