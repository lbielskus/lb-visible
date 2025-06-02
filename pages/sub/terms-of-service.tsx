'use client';

import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

const TermsOfService = () => {
  return (
    <Layout>
      <Head>
        <title>Terms of Service | LB Websites</title>
        <meta
          name='description'
          content='Review the terms and conditions for using website and CMS services provided by LB Websites.'
        />
      </Head>

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-3xl font-bold text-center text-gray-200 mb-6'>
          Terms of Service
        </h1>
        <p className='text-lg text-center mb-8 text-gray-300'>
          These Terms of Service govern your use of LB Websites, including our
          website development, CMS platform, hosting, and support services. By
          placing an order or accessing your admin dashboard, you agree to the
          following terms:
        </p>

        <ul className='list-disc pl-6 space-y-5 text-base sm:text-md text-gray-300'>
          <li>
            <span className='font-semibold text-white'>Service scope:</span>{' '}
            Each package (Beginner, Advanced, Business) includes specific
            features as described at the time of purchase.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Payment &amp; billing:
            </span>{' '}
            Payments are processed securely via Stripe. Services are delivered
            upon successful checkout unless otherwise stated.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Intellectual property:
            </span>{' '}
            All websites are delivered with full rights to the client. Codebase
            reuse for CMS or backend is permitted by LB Websites.
          </li>
          <li>
            <span className='font-semibold text-white'>Support:</span> Ongoing
            updates and help are available as outlined in your package.
            Emergency support is available for verified clients.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Privacy &amp; compliance:
            </span>{' '}
            We comply with EU GDPR laws. Please read our{' '}
            <Link
              href='/privacy-policy'
              className='underline text-primary hover:text-pink-400 transition'
            >
              Privacy Policy
            </Link>{' '}
            for details.
          </li>
        </ul>

        <p className='mt-10 text-sm text-gray-400 text-center'>
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </section>
    </Layout>
  );
};

export default TermsOfService;
