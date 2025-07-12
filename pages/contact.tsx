'use client';

import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import ContactForm from '../components/ContactForm';
import { DefaultSeo } from 'next-seo';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <DefaultSeo
        title='Contact | LB Visible'
        description='Websites for your niche'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.lbvisible.com',
          site_name: 'LB Visible',
          title: 'LB Visible',
          description: 'Websites for your niche',
          images: [
            {
              url: 'https://lb-visible.vercel.app/ogbanners/ogbanner.png',
              width: 1200,
              height: 630,
              alt: 'LB Visible Website & CMS Preview',
            },
          ],
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className='w-full pt-24 pb-20 px-4 flex justify-center'
      >
        {loading ? (
          <div className='flex justify-center items-center min-h-[50vh]'>
            <Spinner />
          </div>
        ) : (
          <ContactForm />
        )}
      </motion.div>
    </>
  );
};

export default ContactPage;
