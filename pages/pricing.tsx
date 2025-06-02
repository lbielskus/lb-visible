import { GetServerSideProps } from 'next';
import { db } from '../lib/firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { DefaultSeo } from 'next-seo';
import PricingPlans from '../components/PricingPlans';
import { Product } from '../types';

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

type Props = {
  allProducts: Product[];
};

const Pricing = ({ allProducts }: Props) => {
  return (
    <>
      <DefaultSeo
        title='Pricing | LB Visible'
        description='Websites for your niche'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.lbvisible.com',
          site_name: 'LB Websites',
          title: 'LB Websites',
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

      <div className='px-4 py-8 max-w-screen-xl mx-auto'>
        <PricingPlans products={allProducts} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
  const ref = collection(db, 'clients', clientId, 'products');

  const snapshot = await getDocs(query(ref, orderBy('createdAt', 'desc')));
  let allProducts: Product[] = snapshot.docs.map((doc) =>
    serializeFirestore({ id: doc.id, ...doc.data() })
  );

  // Ensure sorted: Beginner → Advanced → Business
  const sortOrder = ['Beginner', 'Advanced', 'Business'];
  allProducts = allProducts
    .filter((p) => sortOrder.includes(p.title))
    .sort((a, b) => sortOrder.indexOf(a.title) - sortOrder.indexOf(b.title));

  return {
    props: {
      allProducts,
    },
  };
};

export default Pricing;
