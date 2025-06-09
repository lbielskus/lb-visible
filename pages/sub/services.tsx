'use client';

import Head from 'next/head';
import Layout from '../../components/Layout';

const Services = () => {
  return (
    <Layout>
      <Head>
        <title>Services | LB Websites</title>
        <meta
          name='description'
          content='Explore LB Websites services — custom websites, SEO, design, hosting, and full CMS included.'
        />
      </Head>

      <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
        <h1 className='text-xl font-bold text-center text-gray-200 mb-6'>
          Services
        </h1>
        <p className='text-md text-center mb-10 text-gray-300'>
          We deliver full-stack website solutions with everything your business
          needs — from development to launch, and beyond.
        </p>

        <ul className='list-disc pl-6 space-y-5 text-sm sm:text-sm text-gray-300'>
          <li>
            <span className='font-semibold text-white'>
              Custom website development:
            </span>{' '}
            Fast, scalable sites using Next.js, Firebase, and modern tech.
          </li>
          <li>
            <span className='font-semibold text-white'>SEO optimization:</span>{' '}
            Your website is built to rank on Google from day one.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Graphic & UI design:
            </span>{' '}
            Elegant, professional visuals tailored to your brand.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Mobile-first approach:
            </span>{' '}
            Responsive layouts that work beautifully on any screen.
          </li>
          <li>
            <span className='font-semibold text-white'>
              Hosting & domain setup:
            </span>{' '}
            We take care of everything — hosting, SSL, and domain management.
          </li>
          <li>
            <span className='font-semibold text-white'>CMS & admin tools:</span>{' '}
            Easily update your site with our included content manager.
          </li>
        </ul>
      </section>
    </Layout>
  );
};

export default Services;
