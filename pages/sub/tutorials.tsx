'use client';

import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

const Tutorials = () => {
  return (
    <Layout>
      <Head>
        <title>Tutorials | LB Websites</title>
        <meta
          name='description'
          content='Step-by-step tutorials for ordering websites and using the CMS from LB Websites.'
        />
      </Head>

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-3xl font-bold text-center text-gray-200 mb-6'>
          Tutorials
        </h1>
        <p className='text-lg text-center mb-10 text-gray-300'>
          New to LB Websites? Here&apos;s how to get started with ordering your
          service and managing your site with ease.
        </p>

        <div className='space-y-10 text-base sm:text-md text-gray-300'>
          <div>
            <h2 className='text-xl font-semibold text-white mb-2'>
              🛒 How to Order a Website
            </h2>
            <ol className='list-decimal list-inside space-y-3'>
              <li>
                Go to the{' '}
                <span className='font-semibold text-white'>Pricing</span> page
                and choose the plan that best suits your business (Beginner,
                Advanced, Business).
              </li>
              <li>
                Click{' '}
                <span className='font-semibold text-white'>
                  &quot;Order Now&quot;
                </span>{' '}
                and proceed to checkout. Payments are securely processed via
                Stripe.
              </li>
              <li>
                After purchase, fill out the project brief with your brand info,
                content, and preferences.
              </li>
              <li>
                You&apos;ll get a confirmation and we&apos;ll begin development
                immediately.
              </li>
            </ol>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-white mb-2'>
              ⚙️ How to Manage Your Site (CMS Access)
            </h2>
            <ol className='list-decimal list-inside space-y-3'>
              <li>
                Log in using your email and password from the website&apos;s
                client area.
              </li>
              <li>
                Navigate to the CMS dashboard to manage:
                <ul className='list-disc list-inside ml-4 mt-2 space-y-1'>
                  <li>Products and pricing</li>
                  <li>Blog posts</li>
                  <li>Categories and banners</li>
                  <li>Orders &amp; customer info</li>
                </ul>
              </li>
              <li>
                Make updates anytime. Changes are saved in real-time and
                instantly visible on your live website.
              </li>
              <li>
                Need help? Contact us via the{' '}
                <Link
                  href='/contact'
                  className='text-primary font-medium hover:underline'
                >
                  Support
                </Link>{' '}
                page anytime.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tutorials;
