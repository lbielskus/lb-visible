import { GetServerSideProps } from 'next';
import Banner from '../components/Banner';
import AuditForm from '../components/AuditForm';
import Products from '../components/Products';
import ContactDiv from '../components/ContactDiv';
import BlogSlide from '../components/BlogSlide';
import PricingPlans from '../components/PricingPlans';
import { db } from '../lib/firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { DefaultSeo } from 'next-seo';
import { Product, BlogPost } from '../types';
import Head from 'next/head';

interface Props {
  newProducts: Product[];
  blogPosts: BlogPost[];
  pricingProducts: Product[];
}

function serializeFirestore(data: any): any {
  if (data instanceof Timestamp) return data.toDate().toISOString();
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
        <Banner />
        <hr className='my-3 h-px border-0 bg-gray-200' />
        <AuditForm />
        <hr className='my-3 h-px border-0 bg-gray-200' />
        <Products products={newProducts} />
        <hr className='my-3 h-px border-0 bg-gray-200' />
        <PricingPlans products={pricingProducts} />
        <hr className='my-3 h-px border-0 bg-gray-300' />
        <BlogSlide posts={blogPosts} />
        <hr className='my-3 h-px border-0 bg-gray-300 mb-6' />
        <ContactDiv />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
  const productRef = collection(db, 'clients', clientId, 'products');
  const blogRef = collection(db, 'clients', clientId, 'blogPosts');

  const newSnapshot = await getDocs(
    query(productRef, orderBy('createdAt', 'desc'), limit(2))
  );
  const newProducts = newSnapshot.docs.map((doc) =>
    serializeFirestore({ id: doc.id, ...doc.data() })
  );

  const blogSnapshot = await getDocs(
    query(blogRef, orderBy('createdAt', 'desc'), limit(5))
  );
  const blogPosts = blogSnapshot.docs.map((doc) =>
    serializeFirestore({ id: doc.id, ...doc.data() })
  );

  const pricingSnapshot = await getDocs(
    query(productRef, orderBy('createdAt', 'desc'), limit(4))
  );
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
