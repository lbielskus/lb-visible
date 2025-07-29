'use client';

import React from 'react';
import Layout from '../../components/Layout';
import useTranslation from 'next-translate/useTranslation';
import SEOHead from '../../components/SEOHead';

const CodingLanguages = () => {
  const { t, lang } = useTranslation('common');

  return (
    <Layout>
      <SEOHead
        title={
          lang === 'lt'
            ? t('developerTools.pageTitle')
            : 'Developer tools | LB Websites'
        }
        description={
          lang === 'lt'
            ? t('developerTools.description')
            : 'Learn about LB Visible developing tools.'
        }
        keywords='Next.js, React, TypeScript, Tailwind CSS, Firebase, modern web development, developer tools, web technologies'
        canonicalUrl={
          lang === 'lt' ? '/lt/sub/developer-tools' : '/sub/developer-tools'
        }
        lang={lang}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name:
            lang === 'lt'
              ? t('developerTools.pageTitle')
              : 'Developer tools | LB Websites',
          description:
            lang === 'lt'
              ? t('developerTools.description')
              : 'Learn about LB Visible developing tools.',
          url: `https://www.lbvisible.com${
            lang === 'lt' ? '/lt/sub/developer-tools' : '/sub/developer-tools'
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
          {lang === 'lt'
            ? t('developerTools.heading')
            : 'Coding Languages & Technologies'}
        </h1>
        <p className='text-md text-center mb-10 text-gray-300'>
          {lang === 'lt'
            ? t('developerTools.subtitle')
            : 'At LB Visible, we build every project using a hand-picked stack of modern, scalable, and secure technologies. Each tool in our workflow is chosen to ensure performance, user experience, and future-ready architecture.'}
        </p>

        <ul className='list-disc pl-6 space-y-5 text-sm sm:text-md text-gray-300'>
          <li>
            <span className='font-semibold text-white'>Next.js:</span>{' '}
            {lang === 'lt'
              ? t('developerTools.tools.codeEditor.desc')
              : 'A powerful React framework that enables server-side rendering, static generation, and lightning-fast performance. Perfect for SEO and production-ready websites.'}
          </li>
          <li>
            <span className='font-semibold text-white'>React.js:</span>{' '}
            {lang === 'lt'
              ? t('developerTools.tools.debugger.desc')
              : 'The industry-standard JavaScript library for creating dynamic, responsive, and highly interactive user interfaces.'}
          </li>
          <li>
            <span className='font-semibold text-white'>Node.js:</span>{' '}
            {lang === 'lt'
              ? t('developerTools.tools.versionControl.desc')
              : 'A server-side runtime that allows scalable backend logic and seamless API integration—ideal for custom dashboards, form handling, and database access.'}
          </li>
          <li>
            <span className='font-semibold text-white'>
              JavaScript & TypeScript:
            </span>{' '}
            {lang === 'lt'
              ? t('developerTools.tools.testing.desc')
              : 'Core languages used to build the logic of every page. TypeScript brings additional type safety, reliability, and maintainability to the codebase.'}
          </li>
          <li>
            <span className='font-semibold text-white'>Tailwind CSS:</span>{' '}
            {lang === 'lt'
              ? t('developerTools.tools.deployment.desc')
              : 'A utility-first CSS framework that allows rapid design implementation with full control over responsiveness and theming—perfect for custom UI at scale.'}
          </li>
          <li>
            <span className='font-semibold text-white'>Sass (SCSS):</span>{' '}
            {lang === 'lt'
              ? t('developerTools.tools.codeEditor.desc')
              : 'A CSS preprocessor that helps us write more structured and reusable styles when custom modules are required beyond Tailwind.'}
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default CodingLanguages;
