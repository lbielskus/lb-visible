'use client';

import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';

const Cookies = () => {
  return (
    <Layout>
      <Head>
        <title>Cookies | LB Websites</title>
        <meta
          name='description'
          content='Learn how LB Websites uses cookies to comply with GDPR and improve user experience.'
        />
      </Head>

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-3xl font-bold text-center text-gray-200 mb-6'>
          Cookie Usage
        </h1>
        <p className='text-lg mb-6 text-gray-300 text-center'>
          Our website uses cookies to ensure functionality, improve your
          experience, and support optional analytics—only after your consent.
          This ensures compliance with GDPR and EU ePrivacy standards.
        </p>

        <ul className='list-disc pl-6 space-y-4 text-base text-gray-300'>
          <li>
            <span className='text-white font-semibold'>Essential Cookies:</span>{' '}
            Required for site functionality like navigation, forms, and login.
          </li>
          <li>
            <span className='text-white font-semibold'>Analytics Cookies:</span>{' '}
            We use Google Analytics to understand user behavior—but only after
            consent is given.
          </li>
          <li>
            <span className='text-white font-semibold'>Consent-Based:</span>{' '}
            Users can accept or decline non-essential cookies through our
            consent banner. Preferences can be updated by clearing cookies.
          </li>
          <li>
            <span className='text-white font-semibold'>Data Privacy:</span> We
            do not store personal information without your consent. Analytics
            data is anonymous and used to improve performance.
          </li>
        </ul>

        <p className='text-sm text-gray-400 mt-8 text-center'>
          By continuing to use this website, you agree to essential cookie use.
          For more details, see our{' '}
          <a
            href='/privacy-policy'
            className='underline text-purple-300 hover:text-purple-400'
          >
            Privacy Policy
          </a>
          .
        </p>
      </section>
    </Layout>
  );
};

export default Cookies;
