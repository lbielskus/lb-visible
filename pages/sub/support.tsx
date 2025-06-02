'use client';

import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';

const Support = () => {
  return (
    <Layout>
      <Head>
        <title>Support | LB Websites</title>
        <meta
          name='description'
          content='Learn how LB Websites provides ongoing customer support after purchase. Contact options, emergency access, and guaranteed response times.'
        />
      </Head>

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-3xl font-bold text-center text-gray-200 mb-6'>
          Support
        </h1>

        <p className='text-base text-gray-300 mb-6 text-center'>
          Our commitment doesn’t end at launch. We provide ongoing support to
          ensure your website continues performing at its best—and you feel
          confident every step of the way.
        </p>

        <ul className='list-disc pl-6 space-y-4 text-base text-gray-300'>
          <li>
            <span className='font-semibold text-white'>Dedicated support:</span>{' '}
            Reach out anytime for technical assistance or questions related to
            your service.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Response guarantee:
            </span>{' '}
            We respond to support requests within 2–3 business days, depending
            on workload.
          </li>
          <li>
            <span className='font-semibold text-white'>Priority access:</span>{' '}
            Customers with an active plan receive emergency contact info (SMS or
            direct line) for urgent website issues.
          </li>
          <li>
            <span className='font-semibold text-white'>Performance help:</span>{' '}
            If your site needs updates, optimizations, or new features—we're
            ready to scale with your growth.
          </li>
        </ul>

        <p className='mt-8 text-sm text-gray-400 text-right'>
          Need help now? Use the contact button.
        </p>
      </section>
    </Layout>
  );
};

export default Support;
