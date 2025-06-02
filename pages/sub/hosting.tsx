'use client';

import Head from 'next/head';
import Layout from '../../components/Layout';

const Hosting = () => {
  return (
    <Layout>
      <Head>
        <title>Hosting | LB Websites</title>
        <meta
          name='description'
          content='Fast, reliable hosting for your custom website — we handle the tech so you can focus on business.'
        />
      </Head>

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-3xl font-bold text-center text-gray-200 mb-6'>
          Hosting
        </h1>
        <p className='text-lg text-center mb-10 text-gray-300'>
          Every website we build comes with premium hosting included — optimized
          for speed, reliability, and zero maintenance on your side.
        </p>

        <ul className='list-disc pl-6 space-y-5 text-base sm:text-md text-gray-300'>
          <li>
            <span className='font-semibold text-white'>
              Fast global delivery:
            </span>{' '}
            Your site is hosted on Vercel’s edge network, ensuring fast load
            times from any location.
          </li>
          <li>
            <span className='font-semibold text-white'>
              No setup or maintenance:
            </span>{' '}
            We handle all the deployment, domains, SSL certificates, and uptime
            monitoring for you.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Secure & backed up:
            </span>{' '}
            Regular backups and modern security practices keep your site safe
            and stable.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Included with your plan:
            </span>{' '}
            Hosting is included in every website package — no extra cost or
            hosting headaches.
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Hosting;
