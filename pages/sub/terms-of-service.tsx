'use client';

import Link from 'next/link';
import Layout from '../../components/Layout';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../../components/SEOHead';

const TermsOfService = () => {
  const { t, lang } = useTranslation('common');

  return (
    <Layout>
      <SEOHead
        title={
          lang === 'lt'
            ? t('termsOfService.pageTitle')
            : 'Terms of Service | LB Websites'
        }
        description={
          lang === 'lt'
            ? t('termsOfService.description')
            : 'Review the terms and conditions for using website and CMS services provided by LB Websites.'
        }
        keywords='terms of service, legal, service agreement, payment terms, LB Websites terms'
        canonicalUrl={
          lang === 'lt' ? '/lt/sub/terms-of-service' : '/sub/terms-of-service'
        }
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name:
            lang === 'lt'
              ? t('termsOfService.pageTitle')
              : 'Terms of Service | LB Websites',
          description:
            lang === 'lt'
              ? t('termsOfService.description')
              : 'Review the terms and conditions for using website and CMS services provided by LB Websites.',
          url: `https://www.lbvisible.com${
            lang === 'lt' ? '/lt/sub/terms-of-service' : '/sub/terms-of-service'
          }`,
          inLanguage: lang === 'lt' ? 'lt' : 'en',
        }}
      />

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-xl font-bold text-center text-gray-200 mb-6'>
          {lang === 'lt' ? t('termsOfService.heading') : 'Terms of Service'}
        </h1>
        <p className='text-md text-center mb-8 text-gray-300'>
          {lang === 'lt'
            ? t('termsOfService.subtitle')
            : 'These Terms of Service govern your use of LB Websites, including our website development, CMS platform, hosting, and support services. By placing an order or accessing your admin dashboard, you agree to the following terms:'}
        </p>

        <ul className='list-disc pl-6 space-y-5 text-sm sm:text-sm text-gray-300'>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('termsOfService.sections.services.title')
                : 'Service scope:'}
            </span>{' '}
            {lang === 'lt'
              ? t('termsOfService.sections.services.content')
              : 'Each package (Beginner, Advanced, Business) includes specific features as described at the time of purchase.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('termsOfService.sections.payment.title')
                : 'Payment & billing:'}
            </span>{' '}
            {lang === 'lt'
              ? t('termsOfService.sections.payment.content')
              : 'Payments are processed securely via Stripe. Services are delivered upon successful checkout unless otherwise stated.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? t('termsOfService.sections.intellectualProperty.title')
                : 'Intellectual property:'}
            </span>{' '}
            {lang === 'lt'
              ? t('termsOfService.sections.intellectualProperty.content')
              : 'All websites are delivered with full rights to the client. Codebase reuse for CMS or backend is permitted by LB Websites.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt' ? 'Pagalba:' : 'Support:'}
            </span>{' '}
            {lang === 'lt'
              ? 'Nuolatiniai atnaujinimai ir pagalba prieinami pagal jūsų paketą. Atsarginė pagalba prieinama patvirtintiems klientams.'
              : 'Ongoing updates and help are available as outlined in your package. Emergency support is available for verified clients.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              {lang === 'lt'
                ? 'Privatumas ir atitiktis:'
                : 'Privacy & compliance:'}
            </span>{' '}
            {lang === 'lt'
              ? 'Laikomės ES GDPR įstatymų. Prašome perskaityti mūsų '
              : 'We comply with EU GDPR laws. Please read our '}
            <Link
              href='/privacy-policy'
              className='underline text-primary hover:text-pink-400 transition'
            >
              {lang === 'lt' ? t('footer.privacyPolicy') : 'Privacy Policy'}
            </Link>{' '}
            {lang === 'lt' ? 'dėl detalių.' : 'for details.'}
          </li>
        </ul>

        <p className='mt-10 text-sm text-gray-400 text-center'>
          {lang === 'lt' ? 'Paskutinį kartą atnaujinta:' : 'Last updated:'}{' '}
          {new Date().toLocaleDateString()}
        </p>
      </section>
    </Layout>
  );
};

export default TermsOfService;
