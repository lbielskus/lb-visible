import React from 'react';
import SignupForm from '../components/Form/SignupForm';
import { DefaultSeo } from 'next-seo';
import { motion } from 'framer-motion';

const Signup = () => {
  return (
    <>
      <DefaultSeo
        title='LB Visible | Register'
        description='Sukurkite paskyrą ir gaukite prieigą prie LB Visible paslaugų.'
        openGraph={{ title: 'LB Visible | Register' }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className='min-h-screen flex flex-col justify-center items-center px-4'
      >
        <SignupForm />
      </motion.div>
    </>
  );
};

export default Signup;
