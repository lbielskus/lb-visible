'use client';

import React from 'react';
import Layout from '../../components/Layout';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../../components/SEOHead';

const FAQ = () => {
  const { t, lang } = useTranslation('common');

  return (
    <Layout>
      <SEOHead
        title={lang === 'lt' ? t('faq.pageTitle') : 'FAQ | LB Websites'}
        description={
          lang === 'lt'
            ? t('faq.description')
            : 'Frequently asked questions about LB Websites. Learn more about pricing, launch time, and content delivery.'
        }
        keywords='FAQ, frequently asked questions, website development, pricing, support, LB Websites'
        canonicalUrl={lang === 'lt' ? '/lt/sub/faq' : '/sub/faq'}
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name:
                lang === 'lt'
                  ? t('faq.questions.q1.question')
                  : 'How long does website development take?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  lang === 'lt'
                    ? t('faq.questions.q1.answer')
                    : 'Development time varies by project complexity, typically 1-3 weeks for most websites.',
              },
            },
            {
              '@type': 'Question',
              name:
                lang === 'lt'
                  ? t('faq.questions.q2.question')
                  : "What's included in the website packages?",
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  lang === 'lt'
                    ? t('faq.questions.q2.answer')
                    : 'All packages include custom design, responsive layout, SEO optimization, and hosting setup.',
              },
            },
          ],
        }}
      />

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-xl font-bold text-center text-gray-200 mb-6'>
          {lang === 'lt' ? t('faq.heading') : 'Frequently Asked Questions:'}
        </h1>

        <div className='space-y-8 text-sm sm:text-md text-gray-300'>
          <div>
            <h2 className='font-semibold text-white'>
              {lang === 'lt'
                ? t('faq.questions.pricing.question')
                : 'How long does it take to launch my website?'}
            </h2>
            <p className='mt-1'>
              {lang === 'lt'
                ? t('faq.questions.pricing.answer')
                : 'Most websites are delivered within 5–10 business days after we receive your completed project brief. If your plan includes more features (e.g., CMS, Stripe), it may take slightly longer.'}
            </p>
          </div>

          <div>
            <h2 className='font-semibold text-white'>
              {lang === 'lt'
                ? t('faq.questions.timeline.question')
                : 'Do I need to provide all the content?'}
            </h2>
            <p className='mt-1'>
              {lang === 'lt'
                ? t('faq.questions.timeline.answer')
                : 'You provide the basics—like company info, services, and any branding assets. We help you structure everything and offer copy guidance if needed.'}
            </p>
          </div>

          <div>
            <h2 className='font-semibold text-white'>
              {lang === 'lt'
                ? t('faq.questions.cms.question')
                : 'What happens after the website is live?'}
            </h2>
            <p className='mt-1'>
              {lang === 'lt'
                ? t('faq.questions.cms.answer')
                : 'After launch, you can log in anytime to manage content through the CMS (if included). We also provide support for updates, improvements, or scaling your site as you grow.'}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
