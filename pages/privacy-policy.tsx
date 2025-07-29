'use client';

import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../components/SEOHead';

export default function PrivacyPolicy() {
  const { t, lang } = useTranslation('common');

  return (
    <Layout>
      <SEOHead
        title={
          lang === 'lt'
            ? t('privacyPolicy.pageTitle')
            : 'Privacy Policy | LB Websites'
        }
        description={
          lang === 'lt'
            ? t('privacyPolicy.description')
            : 'Learn how LB Websites handles your data and cookie preferences in compliance with GDPR regulations.'
        }
        keywords='privacy policy, GDPR, cookies, data protection, LB Websites, Lithuania'
        canonicalUrl={lang === 'lt' ? '/lt/privacy-policy' : '/privacy-policy'}
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name:
            lang === 'lt'
              ? t('privacyPolicy.pageTitle')
              : 'Privacy Policy | LB Websites',
          description:
            lang === 'lt'
              ? t('privacyPolicy.description')
              : 'Learn how LB Websites handles your data and cookie preferences in compliance with GDPR regulations.',
          url: `https://www.lbvisible.com${
            lang === 'lt' ? '/lt/privacy-policy' : '/privacy-policy'
          }`,
          inLanguage: lang === 'lt' ? 'lt' : 'en',
          isPartOf: {
            '@type': 'WebSite',
            name: 'LB Visible',
            url: 'https://www.lbvisible.com',
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className='max-w-3xl mx-auto px-4 py-12 bg-white/30 backdrop-blur-md border border-white/30 shadow-md rounded-2xl'
      >
        <h1 className='text-xl font-bold text-center text-gray-500 mb-6'>
          {lang === 'lt' ? t('privacyPolicy.title') : 'Privacy & Cookie Policy'}
        </h1>

        <p className='text-sm text-gray-400 mb-6'>
          {lang === 'lt'
            ? t('privacyPolicy.intro')
            : 'At LB Websites, we respect your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data—especially in relation to cookie usage and GDPR compliance.'}
        </p>

        <h2 className='text-lg font-semibold text-gray-500 mb-3'>
          {lang === 'lt'
            ? t('privacyPolicy.whatAreCookies.title')
            : 'What Are Cookies?'}
        </h2>
        <p className='text-sm text-gray-400 mb-6'>
          {lang === 'lt'
            ? t('privacyPolicy.whatAreCookies.desc')
            : 'Cookies are small text files stored on your device. They help us improve your experience by remembering preferences and providing usage analytics.'}
        </p>

        <h2 className='text-lg font-semibold text-gray-500 mb-3'>
          {lang === 'lt'
            ? t('privacyPolicy.typesOfCookies.title')
            : 'Types of Cookies We Use'}
        </h2>
        <ul className='list-disc pl-6 space-y-3 text-sm text-gray-400 mb-6'>
          <li>
            <strong className='text-gray-400'>
              {lang === 'lt'
                ? t('privacyPolicy.typesOfCookies.essential.title')
                : 'Essential Cookies:'}
            </strong>{' '}
            {lang === 'lt'
              ? t('privacyPolicy.typesOfCookies.essential.desc')
              : 'Required for basic site functionality and authentication.'}
          </li>
          <li>
            <strong className='text-gray-400'>
              {lang === 'lt'
                ? t('privacyPolicy.typesOfCookies.preference.title')
                : 'Preference Cookies:'}
            </strong>{' '}
            {lang === 'lt'
              ? t('privacyPolicy.typesOfCookies.preference.desc')
              : 'Remember your language and layout preferences.'}
          </li>
          <li>
            <strong className='text-gray-400'>
              {lang === 'lt'
                ? t('privacyPolicy.typesOfCookies.analytics.title')
                : 'Analytics Cookies:'}
            </strong>{' '}
            {lang === 'lt'
              ? t('privacyPolicy.typesOfCookies.analytics.desc')
              : 'Help us understand how users interact with our website (Google Analytics, if accepted).'}
          </li>
        </ul>

        <h2 className='text-lg font-semibold text-gray-500 mb-3'>
          {lang === 'lt'
            ? t('privacyPolicy.manageCookies.title')
            : 'How You Can Manage Cookies'}
        </h2>
        <p className='text-sm text-gray-400 mb-6'>
          {lang === 'lt'
            ? t('privacyPolicy.manageCookies.desc')
            : 'You can manage or withdraw your cookie consent anytime using our cookie banner or your browser settings. Refusing cookies may limit some functionality.'}
        </p>

        <p className='mt-8 text-sm text-gray-400 text-right'>
          {lang === 'lt' ? t('privacyPolicy.lastUpdated') : 'Last updated:'}{' '}
          {new Date().toLocaleDateString()}
        </p>
      </motion.div>
    </Layout>
  );
}
