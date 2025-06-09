'use client';

import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';

const FAQ = () => {
  return (
    <Layout>
      <Head>
        <title>FAQ | LB Websites</title>
        <meta
          name='description'
          content='Frequently asked questions about LB Websites. Learn more about pricing, launch time, and content delivery.'
        />
      </Head>

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-xl font-bold text-center text-gray-200 mb-6'>
          Frequently Asked Questions:
        </h1>

        <div className='space-y-8 text-sm sm:text-md text-gray-300'>
          <div>
            <h2 className='font-semibold text-white'>
              How long does it take to launch my website?
            </h2>
            <p className='mt-1'>
              Most websites are delivered within 5–10 business days after we
              receive your completed project brief. If your plan includes more
              features (e.g., CMS, Stripe), it may take slightly longer.
            </p>
          </div>

          <div>
            <h2 className='font-semibold text-white'>
              Do I need to provide all the content?
            </h2>
            <p className='mt-1'>
              You provide the basics—like company info, services, and any
              branding assets. We help you structure everything and offer copy
              guidance if needed.
            </p>
          </div>

          <div>
            <h2 className='font-semibold text-white'>
              What happens after the website is live?
            </h2>
            <p className='mt-1'>
              After launch, you can log in anytime to manage content through the
              CMS (if included). We also provide support for updates,
              improvements, or scaling your site as you grow.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
