'use client';

import Layout from '../../components/Layout';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../../components/SEOHead';

const Services = () => {
  const { t, lang } = useTranslation('common');

  return (
    <Layout>
      <SEOHead
        title={
          lang === 'lt' ? t('services.pageTitle') : 'Services | LB Websites'
        }
        description={
          lang === 'lt'
            ? t('services.description')
            : 'Explore LB Websites services — custom websites, SEO, design, hosting, and full CMS included.'
        }
        keywords='website development, web design, SEO, CMS, custom websites, digital services, LB Websites services'
        canonicalUrl={lang === 'lt' ? '/lt/sub/services' : '/sub/services'}
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name:
            lang === 'lt' ? t('services.pageTitle') : 'Services | LB Websites',
          description:
            lang === 'lt'
              ? t('services.description')
              : 'Explore LB Websites services — custom websites, SEO, design, hosting, and full CMS included.',
          url: `https://www.lbvisible.com${
            lang === 'lt' ? '/lt/sub/services' : '/sub/services'
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
          {lang === 'lt' ? t('services.heading') : 'Services'}
        </h1>
        <p className='text-md text-center mb-10 text-gray-300'>
          {lang === 'lt'
            ? t('services.subtitle')
            : 'We deliver full-stack website solutions with everything your business needs — from development to launch, and beyond.'}
        </p>

        <ul className='list-disc pl-6 space-y-5 text-sm sm:text-sm text-gray-300'>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('services.webDevelopment.title')
                : 'Custom website development:'}
            </span>{' '}
            {lang === 'lt'
              ? t('services.webDevelopment.desc')
              : 'Fast, scalable sites using Next.js, Firebase, and modern tech.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt' ? t('services.seo.title') : 'SEO optimization:'}
            </span>{' '}
            {lang === 'lt'
              ? t('services.seo.desc')
              : 'Your website is built to rank on Google from day one.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt' ? t('services.cms.title') : 'Graphic & UI design:'}
            </span>{' '}
            {lang === 'lt'
              ? t('services.cms.desc')
              : 'Elegant, professional visuals tailored to your brand.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('services.hosting.title')
                : 'Mobile-first approach:'}
            </span>{' '}
            {lang === 'lt'
              ? t('services.hosting.desc')
              : 'Responsive layouts that work beautifully on any screen.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('services.maintenance.title')
                : 'Hosting & domain setup:'}
            </span>{' '}
            {lang === 'lt'
              ? t('services.maintenance.desc')
              : 'We take care of everything — hosting, SSL, and domain management.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? 'TVS ir administravimo įrankiai:'
                : 'CMS & admin tools:'}
            </span>{' '}
            {lang === 'lt'
              ? 'Lengvai atnaujinkite savo svetainę su mūsų įtrauktu turinio valdytoju.'
              : 'Easily update your site with our included content manager.'}
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Services;
