'use client';

import { useEffect, useState } from 'react';
import { useCart } from '../../lib/CartContext';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';
import Spinner from '../../components/Spinner';
import { DefaultSeo } from 'next-seo';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../../lib/firebase';
import { createCartItem } from '../../lib/cartUtils';
import useTranslation from 'next-translate/useTranslation';

const db = getFirestore(app);

type Product = {
  id: string;
  slug: string;
  title: string;
  price: number;
  imageUrl?: string;
  billingCycle?: 'monthly' | 'yearly';
  stripePriceId?: string;
};

const formatPrice = (price: number | string) => {
  const parsed = typeof price === 'string' ? parseFloat(price) : price;
  return parsed.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function Products() {
  const { addProduct } = useCart();
  const { t, lang } = useTranslation('common');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
        const snapshot = await getDocs(
          collection(db, 'clients', clientId, 'products')
        );
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    setFilteredProducts(
      products.filter((p) => p.title.toLowerCase().includes(q))
    );
  }, [searchQuery, products]);

  const productNameMap = {
    Beginner: t('projects.beginner'),
    Advanced: t('projects.advanced'),
    Business: t('projects.business'),
  };

  return (
    <>
      <DefaultSeo
        title='Projects | LB Visible'
        description='Explore our web development packages including modern websites, CMS, SEO, and subscription billing. Choose the plan that fits your business needs.'
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://lbvisible.com/projects',
          site_name: 'LB Visible',
          title: 'Projects | LB Visible',
          description:
            'Explore our web development packages including modern websites, CMS, SEO, and subscription billing. Choose the plan that fits your business needs.',
          images: [
            {
              url: 'https://ik.imagekit.io/tooos2eo5/54612-01-01_m8sFKczc4.png',
              width: 1200,
              height: 630,
              alt: 'LB Visible Web Packages',
            },
          ],
        }}
        twitter={{
          handle: '@lbvisible',
          site: '@lbvisible',
          cardType: 'summary_large_image',
        }}
      />

      <div className='flex justify-center min-h-screen mt-10 mb-10 pb-20'>
        {loading ? (
          <div className='flex justify-center items-center min-h-screen w-full'>
            <Spinner />
          </div>
        ) : (
          <div className='w-full px-4 md:px-10'>
            <input
              type='text'
              placeholder={t('projects.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='mb-6 px-4 py-2 rounded-xl border border-gray-300 w-full text-gray-700 backdrop-blur-md bg-white/20 placeholder:text-gray-500'
            />

            {filteredProducts.length === 0 ? (
              <p className='text-center text-gray-400 pt-20'>
                No matching products found.
              </p>
            ) : (
              <div className='grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className='rounded-2xl mx-auto w-[320px] backdrop-blur-md bg-white/30 border border-primary border-opacity-30 shadow-xl'
                  >
                    <div className='relative h-[400px] overflow-hidden rounded-t-2xl'>
                      <Image
                        src={product.imageUrl || '/default-image.png'}
                        alt={product.title}
                        width={400}
                        height={400}
                        className='h-full w-full object-cover'
                      />
                    </div>

                    <div className='p-4'>
                      <Link href={`/projects/${product.slug}`}>
                        <h3 className='text-lg  text-gray-600 text-center hover:text-primary transition duration-200 cursor-pointer truncate'>
                          {productNameMap[
                            product.title as keyof typeof productNameMap
                          ] || product.title}
                        </h3>
                      </Link>

                      <div className='mt-3 flex items-center justify-between'>
                        <p className='text-pink-600 font-bold pl-2'>
                          € {formatPrice(product.price)}
                        </p>

                        <button
                          onClick={() => {
                            const billingCycle: 'monthly' | 'yearly' =
                              'monthly'; // default or toggle logic later

                            addProduct(
                              createCartItem(product, billingCycle, 'payment')
                            );
                            addProduct(
                              createCartItem(
                                product,
                                billingCycle,
                                'subscription'
                              )
                            );

                            toast.custom((toastObj) => (
                              <div
                                className={`${
                                  toastObj.visible
                                    ? 'animate-enter'
                                    : 'animate-leave'
                                } max-w-xs w-full bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 flex items-center px-4 py-3 pointer-events-auto`}
                                style={{ color: '#36454F' }}
                              >
                                <svg
                                  className='w-6 h-6 text-primary mr-3'
                                  fill='none'
                                  stroke='currentColor'
                                  strokeWidth='2'
                                  viewBox='0 0 24 24'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M5 13l4 4L19 7'
                                  />
                                </svg>
                                <span className='font-semibold text-md text-white'>
                                  {t('projects.planAdded')}
                                </span>
                              </div>
                            ));
                          }}
                          className='flex items-center gap-1 px-3 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-all text-sm'
                        >
                          <FiShoppingCart className='text-lg' />
                          {t('projects.add')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
