'use client';

import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';

const MobileResponsive = () => {
  return (
    <Layout>
      <Head>
        <title>Mobile Responsive | LB Websites</title>
        <meta
          name='description'
          content='LB Websites are fully mobile responsive, delivering flawless performance and accessibility on all screen sizes.'
        />
      </Head>

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-xl font-bold text-center text-gray-200 mb-6'>
          Mobile Responsive
        </h1>
        <p className='text-md text-center mb-10 text-gray-300'>
          Today’s users browse from phones, tablets, and laptops. We build every
          website to adapt to any screen, giving your visitors a flawless
          experience wherever they are.
        </p>

        <ul className='list-disc pl-6 space-y-5 text-sm sm:text-md text-gray-300'>
          <li>
            <span className='font-semibold text-white'>
              Better user experience:
            </span>{' '}
            Your site remains easy to navigate and visually appealing across all
            devices.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Improved SEO rankings:
            </span>{' '}
            Google favors mobile-friendly websites in search results.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Increased accessibility:
            </span>{' '}
            Reach more people, including mobile-first users and those with
            accessibility needs.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Stronger brand reputation:
            </span>{' '}
            A professional, consistent design builds trust and credibility.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Higher conversions:
            </span>{' '}
            Responsive design helps drive more leads, sales, and customer
            engagement.
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default MobileResponsive;
