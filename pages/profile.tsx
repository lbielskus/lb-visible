import React from 'react';
import UserProfile from '../components/profile';

import { DefaultSeo } from 'next-seo';
import { motion } from 'framer-motion';

type Props = {};

const profile = (props: Props) => {
  return (
    <>
      <DefaultSeo
        title='LB Websites | Profile'
        description='Websites for your niche'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.yourwebsite.com',
          site_name: 'LB Websites',
          title: 'LB Websites',
          description: 'Websites for your niche',
          images: [
            {
              url: '',
              width: 1200,
              height: 630,
              alt: 'Your image alt text',
            },
          ],
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className='min-h-screen flex flex-col justify-center items-center px-4'
      >
        <UserProfile />
      </motion.div>
    </>
  );
};

export default profile;
