// pages/contact-success.tsx
'use client';

import { DefaultSeo } from 'next-seo';

export default function ContactSuccessPage() {
  return (
    <>
      <DefaultSeo
        title='Success | LB Visible'
        description='Form submitted successfully'
      />
      <div className='min-h-screen flex flex-col items-center justify-center px-6 text-center '>
        <h1 className='text-3xl font-bold text-primary mb-4'>Thank You!</h1>
        <p className='text-md text-gray-700 mb-2'>We received your message.</p>
        <p className='text-md text-gray-600'>
          We’ll contact you shortly with answers and a customized offer.
        </p>
      </div>
    </>
  );
}
