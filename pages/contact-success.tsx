// pages/contact-success.tsx
'use client';

import { DefaultSeo } from 'next-seo';
import { motion } from 'framer-motion';

export default function ContactSuccessPage() {
  return (
    <>
      <DefaultSeo
        title='Success | LB Visible'
        description='Form submitted successfully'
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className='min-h-screen flex flex-col justify-center items-center px-4'
      >
        <h1 className='text-3xl font-bold text-primary mb-4'>Thank You!</h1>
        <p className='text-md text-gray-700 mb-2'>We received your message.</p>
        <p className='text-md text-gray-600'>
          We’ll contact you shortly with answers and a customized offer.
        </p>
      </motion.div>
    </>
  );
}
