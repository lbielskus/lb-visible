// ✅ FILE: pages/index.tsx
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import BannerHero from '../components/BannerHero';
import AuditForm from '../components/AuditForm';
import Products from '../components/Products';
import ContactDiv from '../components/ContactDiv';
import BlogSlide from '../components/BlogSlide';
import PricingPlans from '../components/PricingPlans';
import Banner from '../components/Banner';
import WhatMakesUsDifferent from '../components/WhatMakesUsDifferent';
import { db } from '../lib/firebaseAdmin';
import { Product, BlogPost } from '../types';
import { motion } from 'framer-motion';

interface Props {
  newProducts: Product[];
  blogPosts: BlogPost[];
  pricingProducts: Product[];
}

function serializeFirestore(data: any): any {
  if (data._seconds) return new Date(data._seconds * 1000).toISOString();
  if (Array.isArray(data)) return data.map(serializeFirestore);
  if (typeof data === 'object' && data !== null) {
    const result: any = {};
    for (const key in data) {
      result[key] = serializeFirestore(data[key]);
    }
    return result;
  }
  return data;
}

export default function Home({
  newProducts,
  blogPosts,
  pricingProducts,
}: Props) {
  const ogImageUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/ogbanner.png`;

  return (
    <>
      <Head>
        <meta property='og:title' content='Home | LB Visible' />
        <meta name='robots' content='index, follow' />
        <meta
          property='og:description'
          content='Custom-built websites, CMS, SEO, and marketing tools – all in one platform. Launch your business online with LB Visible.'
        />
        <meta property='og:url' content='https://www.lbvisible.com' />
        <meta property='og:image' content={ogImageUrl} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:type' content='image/png' />
      </Head>

      <DefaultSeo
        title='Home | LB Visible'
        description='Custom-built websites, CMS, SEO, and marketing tools – all in one platform. Launch your business online with LB Visible.'
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://lbvisible.com',
          site_name: 'LB Visible',
          title: 'Home | LB Visible',
          description:
            'Custom-built websites, CMS, SEO, and marketing tools – all in one platform. Launch your business online with LB Visible.',
          images: [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: 'LB Visible Website & CMS Preview',
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          handle: '@lbvisible',
          site: '@lbvisible',
          cardType: 'summary_large_image',
        }}
      />

      <main className='h-full p-4'>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <BannerHero />
        </motion.div>
        <hr className='my-3 h-px border-0 bg-gray-200' />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <PricingPlans products={pricingProducts} />
        </motion.div>

        <hr className='my-3 h-px border-0 bg-gray-200 mt-10 hidden lg:block' />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.25 }}
        >
          <Products products={newProducts} />
        </motion.div>

        <hr className='my-3 h-px border-0 bg-gray-200' />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        >
          <BlogSlide posts={blogPosts} />
        </motion.div>
        <hr className='my-3 h-px border-0 bg-gray-200 mt-6 mb-6' />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.35 }}
        >
          <AuditForm />
        </motion.div>
        <hr className='my-3 h-px border-0 bg-gray-200 mb-10 mt-10' />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.4 }}
        >
          <Banner />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
        >
          <ContactDiv />
        </motion.div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;

  const productSnapshot = await db
    .collection('clients')
    .doc(clientId)
    .collection('products')
    .orderBy('createdAt', 'desc')
    .limit(2)
    .get();
  const newProducts = productSnapshot.docs.map((doc) =>
    serializeFirestore({ id: doc.id, ...doc.data() })
  );

  const blogSnapshot = await db
    .collection('clients')
    .doc(clientId)
    .collection('blogPosts')
    .orderBy('createdAt', 'desc')
    .limit(5)
    .get();
  const blogPosts = blogSnapshot.docs.map((doc) =>
    serializeFirestore({ id: doc.id, ...doc.data() })
  );

  const pricingSnapshot = await db
    .collection('clients')
    .doc(clientId)
    .collection('products')
    .orderBy('createdAt', 'desc')
    .limit(4)
    .get();
  const pricingProducts = pricingSnapshot.docs.map((doc) =>
    serializeFirestore({ id: doc.id, ...doc.data() })
  );

  return {
    props: {
      newProducts,
      blogPosts,
      pricingProducts,
    },
  };
};
