'use client';

import Head from 'next/head';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | LB Websites</title>
        <meta
          name='description'
          content='Learn how LB Websites handles your data and cookie preferences in compliance with GDPR regulations.'
        />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className='max-w-3xl mx-auto px-4 py-12'
      >
        <h1 className='text-xl font-bold text-center text-gray-200 mb-6'>
          Privacy & Cookie Policy
        </h1>

        <p className='text-sm text-gray-300 mb-6'>
          At LB Websites, we respect your privacy and are committed to
          protecting your personal information. This policy explains how we
          collect, use, and safeguard your data—especially in relation to cookie
          usage and GDPR compliance.
        </p>

        <h2 className='text-lg font-semibold text-white mb-3'>
          What Are Cookies?
        </h2>
        <p className='text-sm text-gray-300 mb-6'>
          Cookies are small text files stored on your device. They help us
          improve your experience by remembering preferences and providing usage
          analytics.
        </p>

        <h2 className='text-lg font-semibold text-white mb-3'>
          Types of Cookies We Use
        </h2>
        <ul className='list-disc pl-6 space-y-3 text-sm text-gray-300 mb-6'>
          <li>
            <strong className='text-white'>Essential Cookies:</strong> Required
            for basic site functionality and authentication.
          </li>
          <li>
            <strong className='text-white'>Preference Cookies:</strong> Remember
            your language and layout preferences.
          </li>
          <li>
            <strong className='text-white'>Analytics Cookies:</strong> Help us
            understand how users interact with our website (Google Analytics, if
            accepted).
          </li>
        </ul>

        <h2 className='text-lg font-semibold text-white mb-3'>
          How You Can Manage Cookies
        </h2>
        <p className='text-sm text-gray-300 mb-6'>
          You can manage or withdraw your cookie consent anytime using our
          cookie banner or your browser settings. Refusing cookies may limit
          some functionality.
        </p>

        <p className='mt-8 text-sm text-gray-400 text-right'>
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </motion.div>
    </Layout>
  );
}
