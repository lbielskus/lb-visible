'use client';

import React from 'react';
import Layout from '../../components/Layout';
import ServiceBanner from '../../components/ServiceBanner';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../../components/SEOHead';

const HowItWorks = () => {
  const { t, lang } = useTranslation('common');
  return (
    <Layout>
      <SEOHead
        title={
          lang === 'lt'
            ? t('howItWorksPage.title')
            : 'How It Works | LB Websites'
        }
        description={
          lang === 'lt'
            ? t('howItWorksPage.desc')
            : 'Discover how LB Websites builds fast, modern, and mobile-optimized websites—from idea to live product with built-in CMS and support.'
        }
        keywords='website development process, custom websites, web design, CMS, Next.js, mobile optimization, SEO'
        canonicalUrl={
          lang === 'lt' ? '/lt/sub/how-it-works' : '/sub/how-it-works'
        }
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name:
            lang === 'lt'
              ? t('howItWorksPage.title')
              : 'How It Works | LB Websites',
          description:
            lang === 'lt'
              ? t('howItWorksPage.desc')
              : 'Discover how LB Websites builds fast, modern, and mobile-optimized websites—from idea to live product with built-in CMS and support.',
          url: `https://www.lbvisible.com${
            lang === 'lt' ? '/lt/sub/how-it-works' : '/sub/how-it-works'
          }`,
          inLanguage: lang === 'lt' ? 'lt' : 'en',
          step: [
            {
              '@type': 'HowToStep',
              name:
                lang === 'lt'
                  ? t('howItWorksPage.choosePlan')
                  : 'Choose a plan',
              text:
                lang === 'lt'
                  ? t('howItWorksPage.choosePlanDesc')
                  : 'Select a service package (Beginner, Advanced, or Business) that fits your business needs and budget.',
            },
            {
              '@type': 'HowToStep',
              name:
                lang === 'lt'
                  ? t('howItWorksPage.fillDetails')
                  : 'Fill in your details',
              text:
                lang === 'lt'
                  ? t('howItWorksPage.fillDetailsDesc')
                  : "After checkout, we'll collect key project info—your goals, content, brand visuals, and design direction.",
            },
            {
              '@type': 'HowToStep',
              name:
                lang === 'lt'
                  ? t('howItWorksPage.weBuild')
                  : 'We build your site',
              text:
                lang === 'lt'
                  ? t('howItWorksPage.weBuildDesc')
                  : 'Our team starts coding and designing your website using modern tools (Next.js, Firebase, Tailwind) with SEO and mobile in mind.',
            },
            {
              '@type': 'HowToStep',
              name:
                lang === 'lt'
                  ? t('howItWorksPage.reviewApprove')
                  : 'You review & approve',
              text:
                lang === 'lt'
                  ? t('howItWorksPage.reviewApproveDesc')
                  : "You'll receive a live preview link to review the result and request final tweaks.",
            },
            {
              '@type': 'HowToStep',
              name: lang === 'lt' ? t('howItWorksPage.goLive') : 'Go live',
              text:
                lang === 'lt'
                  ? t('howItWorksPage.goLiveDesc')
                  : 'Once approved, we publish your site under your domain with lightning-fast hosting, and optionally connect Stripe or ImageKit if included in your plan.',
            },
            {
              '@type': 'HowToStep',
              name:
                lang === 'lt'
                  ? t('howItWorksPage.manageCMS')
                  : 'Manage with CMS',
              text:
                lang === 'lt'
                  ? t('howItWorksPage.manageCMSDesc')
                  : 'If your plan includes it, log in anytime to update your content—products, blog posts, images—without coding.',
            },
          ],
        }}
      />

      <section className='min-h-0 w-full px-4 sm:px-6 mt-4 py-4  mb-0 text-gray-700 max-w-3xl mx-auto rounded-2xl shadow-md backdrop-blur-md  border border-white/30'>
        <h1 className='text-3xl font-bold text-gray-600 text-center mb-6 mt-4 '>
          {lang === 'lt' ? t('howItWorksPage.title') : 'How It Works'}
        </h1>
        <p className='text-md text-center mb-6 text-gray-600'>
          {lang === 'lt'
            ? t('howItWorksPage.desc')
            : 'Launching a custom website with LB Visible is seamless, fast, and optimized for your success. Here’s how we work from idea to live product.'}
        </p>

        <ol className='space-y-2 list-decimal list-inside text-sm'>
          <li>
            <span className='font-semibold text-primary'>
              {lang === 'lt'
                ? t('howItWorksPage.choosePlan')
                : 'Choose a plan:'}
            </span>{' '}
            {lang === 'lt'
              ? t('howItWorksPage.choosePlanDesc')
              : 'Select a service package (Beginner, Advanced, or Business) that fits your business needs and budget.'}
          </li>
          <li>
            <span className='font-semibold text-primary'>
              {lang === 'lt'
                ? t('howItWorksPage.fillDetails')
                : 'Fill in your details:'}
            </span>{' '}
            {lang === 'lt'
              ? t('howItWorksPage.fillDetailsDesc')
              : 'After checkout, we’ll collect key project info—your goals, content, brand visuals, and design direction.'}
          </li>
          <li>
            <span className='font-semibold text-primary'>
              {lang === 'lt'
                ? t('howItWorksPage.weBuild')
                : 'We build your site:'}
            </span>{' '}
            {lang === 'lt'
              ? t('howItWorksPage.weBuildDesc')
              : 'Our team starts coding and designing your website using modern tools (Next.js, Firebase, Tailwind) with SEO and mobile in mind.'}
          </li>
          <li>
            <span className='font-semibold text-primary'>
              {lang === 'lt'
                ? t('howItWorksPage.reviewApprove')
                : 'You review & approve:'}
            </span>{' '}
            {lang === 'lt'
              ? t('howItWorksPage.reviewApproveDesc')
              : 'You’ll receive a live preview link to review the result and request final tweaks.'}
          </li>
          <li>
            <span className='font-semibold text-primary'>
              {lang === 'lt' ? t('howItWorksPage.goLive') : 'Go live:'}
            </span>{' '}
            {lang === 'lt'
              ? t('howItWorksPage.goLiveDesc')
              : 'Once approved, we publish your site under your domain with lightning-fast hosting, and optionally connect Stripe or ImageKit if included in your plan.'}
          </li>
          <li>
            <span className='font-semibold text-primary'>
              {lang === 'lt'
                ? t('howItWorksPage.manageCMS')
                : 'Manage with CMS:'}
            </span>{' '}
            {lang === 'lt'
              ? t('howItWorksPage.manageCMSDesc')
              : 'If your plan includes it, log in anytime to update your content—products, blog posts, images—without coding.'}
          </li>
          <li>
            <span className='font-semibold text-primary'>
              {lang === 'lt'
                ? t('howItWorksPage.staySupported')
                : 'Stay supported:'}
            </span>{' '}
            {lang === 'lt'
              ? t('howItWorksPage.staySupportedDesc')
              : 'We’re here for updates, scaling, or performance improvements. You get ongoing value, not just a launch.'}
          </li>
        </ol>
      </section>

      <ServiceBanner />
    </Layout>
  );
};

export default HowItWorks;
