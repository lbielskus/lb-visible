'use client';

import Head from 'next/head';
import Layout from '../../components/Layout';

const Domains = () => {
  return (
    <Layout>
      <Head>
        <title>Domains | LB Websites</title>
        <meta
          name='description'
          content='Learn how LB Websites handles domain registration and transfers for your online business.'
        />
      </Head>

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-xl font-bold text-center text-gray-200 mb-6'>
          Domains
        </h1>
        <p className='text-md text-center mb-10 text-gray-300'>
          Your domain name is your digital address. We make it easy to register
          or migrate your domain as part of your website launch.
        </p>

        <ol className='list-decimal pl-6 space-y-5 text-sm sm:text-sm text-gray-300'>
          <li>
            <span className='font-semibold text-white'>
              Register a new domain:
            </span>{' '}
            Choose your brand name and we’ll help you secure it through trusted
            registrars like GoDaddy, Namecheap, or Google Domains.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Already own a domain?
            </span>{' '}
            We’ll connect it to your new website and handle DNS setup
            professionally.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Need to transfer your domain?
            </span>{' '}
            We guide you through the transfer process, including unlocks and
            authorization codes, to ensure a smooth handover.
          </li>
        </ol>
      </section>
    </Layout>
  );
};

export default Domains;
