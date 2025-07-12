'use client';

import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import ServiceBanner from '../../components/ServiceBanner';

const HowItWorks = () => {
  return (
    <Layout>
      <Head>
        <title>How It Works | LB Websites</title>
        <meta
          name='description'
          content='Discover how LB Websites builds fast, modern, and mobile-optimized websites—from idea to live product with built-in CMS and support.'
        />
      </Head>

      <section className='w-full px-4 sm:px-6 py-6 mt-0 mb-0 text-gray-700 max-w-3xl mx-auto rounded-2xl shadow-md backdrop-blur-md bg-white/30 border border-white/30'>
        <h1 className='text-3xl font-bold text-center mb-6 mt-4 text-gray-700'>
          How It Works
        </h1>
        <p className='text-md text-center mb-6 text-gray-600'>
          Launching a custom website with LB Visible is seamless, fast, and
          optimized for your success. Here’s how we work from idea to live
          product:
        </p>

        <ol className='space-y-2 list-decimal list-inside text-sm'>
          <li>
            <span className='font-semibold text-primary'>Choose a plan:</span>{' '}
            Select a service package (Beginner, Advanced, or Business) that fits
            your business needs and budget.
          </li>
          <li>
            <span className='font-semibold text-primary'>
              Fill in your details:
            </span>{' '}
            After checkout, we’ll collect key project info—your goals, content,
            brand visuals, and design direction.
          </li>
          <li>
            <span className='font-semibold text-primary'>
              We build your site:
            </span>{' '}
            Our team starts coding and designing your website using modern tools
            (Next.js, Firebase, Tailwind) with SEO and mobile in mind.
          </li>
          <li>
            <span className='font-semibold text-primary'>
              You review & approve:
            </span>{' '}
            You’ll receive a live preview link to review the result and request
            final tweaks.
          </li>
          <li>
            <span className='font-semibold text-primary'>Go live:</span> Once
            approved, we publish your site under your domain with lightning-fast
            hosting, and optionally connect Stripe or ImageKit if included in
            your plan.
          </li>
          <li>
            <span className='font-semibold text-primary'>Manage with CMS:</span>{' '}
            If your plan includes it, log in anytime to update your
            content—products, blog posts, images—without coding.
          </li>
          <li>
            <span className='font-semibold text-primary'>Stay supported:</span>{' '}
            We’re here for updates, scaling, or performance improvements. You
            get ongoing value, not just a launch.
          </li>
        </ol>
      </section>
      <div className='-mt-8'>
        <ServiceBanner />
      </div>
    </Layout>
  );
};

export default HowItWorks;
