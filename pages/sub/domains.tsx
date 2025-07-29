'use client';

import Layout from '../../components/Layout';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../../components/SEOHead';

const Domains = () => {
  const { t, lang } = useTranslation('common');

  return (
    <Layout>
      <SEOHead
        title={lang === 'lt' ? t('domains.pageTitle') : 'Domains | LB Websites'}
        description={
          lang === 'lt'
            ? t('domains.description')
            : 'Learn how LB Websites handles domain registration and transfers for your online business.'
        }
        keywords='domain registration, domain management, domain services, website domains, domain setup'
        canonicalUrl={lang === 'lt' ? '/lt/sub/domains' : '/sub/domains'}
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name:
            lang === 'lt' ? t('domains.pageTitle') : 'Domains | LB Websites',
          description:
            lang === 'lt'
              ? t('domains.description')
              : 'Learn how LB Websites handles domain registration and transfers for your online business.',
          url: `https://www.lbvisible.com${
            lang === 'lt' ? '/lt/sub/domains' : '/sub/domains'
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
          {lang === 'lt' ? t('domains.heading') : 'Domains'}
        </h1>
        <p className='text-md text-center mb-10 text-gray-300'>
          {lang === 'lt'
            ? t('domains.subtitle')
            : 'Your domain name is your digital address. We make it easy to register or migrate your domain as part of your website launch.'}
        </p>

        <ol className='list-decimal pl-6 space-y-5 text-sm sm:text-sm text-gray-300'>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('domains.services.registration.title')
                : 'Register a new domain:'}
            </span>{' '}
            {lang === 'lt'
              ? t('domains.services.registration.desc')
              : "Choose your brand name and we'll help you secure it through trusted registrars like GoDaddy, Namecheap, or Google Domains."}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('domains.services.management.title')
                : 'Already own a domain?'}
            </span>{' '}
            {lang === 'lt'
              ? t('domains.services.management.desc')
              : "We'll connect it to your new website and handle DNS setup professionally."}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('domains.services.transfer.title')
                : 'Need to transfer your domain?'}
            </span>{' '}
            {lang === 'lt'
              ? t('domains.services.transfer.desc')
              : 'We guide you through the transfer process, including unlocks and authorization codes, to ensure a smooth handover.'}
          </li>
        </ol>
      </section>
    </Layout>
  );
};

export default Domains;
