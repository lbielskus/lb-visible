import React from 'react';

const HowItWorksSection = () => (
  <section className='w-full px-4 sm:px-6 py-12 text-gray-200 max-w-3xl mx-auto rounded-3xl mt-12 shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.82)]'>
    <h1 className='text-xl font-bold text-center text-gray-200 mb-6'>
      How It Works
    </h1>
    <p className='text-md text-center mb-10 text-gray-300'>
      Launching a custom website with LB Visible is seamless, fast, and
      optimized for your success. Here’s how we work from idea to live product:
    </p>
    <ol className='space-y-6 list-decimal list-inside text-sm sm:text-sm'>
      <li>
        <span className='font-semibold text-white'>Choose a plan:</span> Select
        a service package (Beginner, Advanced, or Business) that fits your
        business needs and budget.
      </li>
      <li>
        <span className='font-semibold text-white'>Fill in your details:</span>{' '}
        After checkout, we’ll collect key project info—your goals, content,
        brand visuals, and design direction.
      </li>
      <li>
        <span className='font-semibold text-white'>We build your site:</span>{' '}
        Our team starts coding and designing your website using modern tools
        (Next.js, Firebase, Tailwind) with SEO and mobile in mind.
      </li>
      <li>
        <span className='font-semibold text-white'>You review & approve:</span>{' '}
        You’ll receive a live preview link to review the result and request
        final tweaks.
      </li>
      <li>
        <span className='font-semibold text-white'>Go live:</span> Once
        approved, we publish your site under your domain with lightning-fast
        hosting, and optionally connect Stripe or ImageKit if included in your
        plan.
      </li>
      <li>
        <span className='font-semibold text-white'>Manage with CMS:</span> If
        your plan includes it, log in anytime to update your content—products,
        blog posts, images—without coding.
      </li>
      <li>
        <span className='font-semibold text-white'>Stay supported:</span> We’re
        here for updates, scaling, or performance improvements. You get ongoing
        value, not just a launch.
      </li>
    </ol>
  </section>
);

export default HowItWorksSection;
