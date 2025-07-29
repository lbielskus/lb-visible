'use client';

import Layout from '../../components/Layout';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../../components/SEOHead';

const Hosting = () => {
  const { t, lang } = useTranslation('common');

  return (
    <Layout>
      <SEOHead
        title={lang === 'lt' ? t('hosting.pageTitle') : 'Hosting | LB Websites'}
        description={
          lang === 'lt'
            ? t('hosting.description')
            : 'Fast, reliable hosting for your custom website — we handle the tech so you can focus on business.'
        }
        keywords='web hosting, website hosting, fast hosting, reliable hosting, uptime guarantee, hosting services'
        canonicalUrl={lang === 'lt' ? '/lt/sub/hosting' : '/sub/hosting'}
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name:
            lang === 'lt' ? t('hosting.pageTitle') : 'Hosting | LB Websites',
          description:
            lang === 'lt'
              ? t('hosting.description')
              : 'Fast, reliable hosting for your custom website — we handle the tech so you can focus on business.',
          url: `https://www.lbvisible.com${
            lang === 'lt' ? '/lt/sub/hosting' : '/sub/hosting'
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
          {lang === 'lt' ? t('hosting.heading') : 'Hosting'}
        </h1>
        <p className='text-md text-center mb-10 text-gray-300'>
          {lang === 'lt'
            ? t('hosting.subtitle')
            : 'Every website we build comes with premium hosting included — optimized for speed, reliability, and zero maintenance on your side.'}
        </p>

        <ul className='list-disc pl-6 space-y-5 text-sm sm:text-sm text-gray-300'>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('hosting.features.speed.title')
                : 'Fast global delivery:'}
            </span>{' '}
            {lang === 'lt'
              ? t('hosting.features.speed.desc')
              : "Your site is hosted on Vercel's edge network, ensuring fast load times from any location."}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('hosting.features.security.title')
                : 'No setup or maintenance:'}
            </span>{' '}
            {lang === 'lt'
              ? t('hosting.features.security.desc')
              : 'We handle all the deployment, domains, SSL certificates, and uptime monitoring for you.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('hosting.features.reliability.title')
                : 'Secure & backed up:'}
            </span>{' '}
            {lang === 'lt'
              ? t('hosting.features.reliability.desc')
              : 'Regular backups and modern security practices keep your site safe and stable.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('hosting.features.support.title')
                : 'Included with your plan:'}
            </span>{' '}
            {lang === 'lt'
              ? t('hosting.features.support.desc')
              : 'Hosting is included in every website package — no extra cost or hosting headaches.'}
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Hosting;
