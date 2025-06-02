'use client';

import { GetServerSideProps } from 'next';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useCart } from '../../lib/CartContext';
import { DefaultSeo } from 'next-seo';
import sanitizeHtml from 'sanitize-html';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useState } from 'react';
import {
  FiBox,
  FiDroplet,
  FiCalendar,
  FiTag,
  FiFolder,
  FiGlobe,
  FiClock,
  FiEye,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { createCartItem } from '../../lib/cartUtils'; // ✅ Central logic

interface ProductType {
  id: string;
  title: string;
  price: number;
  previousPrice?: string;
  shortDescription?: string;
  description?: string;
  sku?: string;
  size?: string;
  color?: string;
  tags?: string[];
  categoryTitles?: string[];
  imageUrl?: string;
  gallery?: string[];
  shippingTime?: string;
  country?: string;
  createdAt?: string;
  additionalUrls?: string;
  stripePriceMonthlyId?: string;
  stripePriceYearlyId?: string;
  billingCycle?: 'monthly' | 'yearly';
}

const formatPrice = (price: number) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const calculateVatFromIncluded = (price: number) => {
  const vat = price - price / 1.21;
  return vat.toFixed(2);
};

export default function ProductPage({ product }: { product: ProductType }) {
  const { addProduct } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [product.imageUrl || '', ...(product.gallery || [])].filter(
    Boolean
  );
  const vat = calculateVatFromIncluded(product.price);

  const sanitizedDescription = sanitizeHtml(product.description || '', {
    allowedTags: ['br'],
    allowedAttributes: {},
  });

  const featureLines = sanitizedDescription
    .split(/<br\s*\/?>|\n/)
    .map((line) =>
      line
        .replace(/^✔/, '')
        .replace(/<\/?[^>]+(>|$)/g, '')
        .trim()
    )
    .filter(Boolean);

  const details: [string, React.ReactNode, IconType][] = [
    ['Pages Included', product.size || '-', FiBox],
    ['Website Color Theme', product.color || '-', FiDroplet],
    ['Website Ready In', product.shippingTime || '-', FiClock],
    ['Tags', product.tags?.join(', ') || '-', FiTag],
    ['Categories', product.categoryTitles?.join(', ') || '-', FiFolder],
    ['Country', product.country || '-', FiGlobe],
    ['Created At', product.createdAt || '-', FiCalendar],
    [
      'Preview URL',
      product.additionalUrls ? (
        <a
          href={product.additionalUrls}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline break-all'
        >
          {product.additionalUrls}
        </a>
      ) : (
        '-'
      ),
      FiEye,
    ],
  ];

  return (
    <>
      <DefaultSeo
        title={`LB | ${product.title}`}
        description={product.shortDescription || ''}
      />
      <section className='mt-20 md:mt-6 p-4 rounded-xl'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          {/* Left - Images */}
          <div className='flex flex-col gap-4 w-full max-w-[700px]'>
            <div className='relative rounded-xl p-2 backdrop-blur-md bg-white/10'>
              <Image
                src={images[currentImageIndex]}
                alt={product.title}
                width={500}
                height={300}
                className='object-contain w-full h-[500px] rounded-md'
              />
            </div>
            {images.length > 1 && (
              <div className='flex gap-2 justify-center flex-wrap'>
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`border rounded w-16 h-16 p-1 transition ${
                      index === currentImageIndex
                        ? 'ring-2 ring-pink-500 border-pink-500'
                        : 'border-gray-300 hover:ring-1 hover:ring-pink-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${index}`}
                      width={64}
                      height={64}
                      className='object-cover w-full h-full rounded'
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Info */}
          <div className='backdrop-blur-md bg-white/20 border border-gray-200 p-6 rounded-xl shadow-xl'>
            <h1 className='text-3xl font-bold mb-4 text-gray-600'>
              {product.title}
            </h1>
            <p className='text-md p-1 rounded-xl text-gray-600'>
              {product.shortDescription || 'N/A'}
            </p>

            <div className='text-right mb-4'>
              {product.previousPrice && (
                <p className='text-sm text-gray-400 line-through'>
                  € {product.previousPrice}
                </p>
              )}
              <p className='text-xl font-bold text-pink-600'>
                € {formatPrice(Number(product.price))}
              </p>
              <p className='text-sm text-gray-500'>VAT (21%): € {vat}</p>
            </div>

            <button
              className='bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl w-full mb-6 text-sm'
              onClick={() => {
                const item = createCartItem(
                  {
                    ...product,
                    stripePriceMonthlyId: product.stripePriceMonthlyId || '',
                    stripePriceYearlyId: product.stripePriceYearlyId || '',
                  },
                  product.billingCycle || 'monthly'
                );
                addProduct(item);
                toast.success('Item added to cart!');
              }}
            >
              Add to Cart
            </button>

            {/* Features */}
            <div className='mb-4'>
              <h2 className='text-xl font-semibold mb-2 text-gray-600'>
                This Plan Covers:
              </h2>
              <div className='rounded-xl p-3 text-sm leading-6 text-gray-600 space-y-2'>
                {featureLines.map((line, idx) => (
                  <div key={idx} className='flex items-start gap-2'>
                    <span className='text-green-400'>✔</span>
                    <span className='text-gray-600'>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-4 pt-4'>
              {details.map(([label, value, Icon], index) => (
                <div key={index}>
                  <label className='block text-sm font-semibold text-gray-600 max-md:text-gray-300 mb-1'>
                    <Icon className='inline mr-2 text-pink-500' />
                    {label}:
                  </label>
                  <div className='backdrop-blur-md bg-white/10 p-3 rounded-xl'>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string;

  try {
    const ref = collection(db, 'clients', clientId, 'products');
    const q = query(ref, where('slug', '==', slug));
    const snap = await getDocs(q);

    if (snap.empty) return { notFound: true };

    const docSnap = snap.docs[0];
    const data = docSnap.data();

    let categoryTitles: string[] = [];
    if (data.categories && Array.isArray(data.categories)) {
      const titlePromises = data.categories.map(async (catId: string) => {
        const catRef = doc(db, 'clients', clientId, 'categories', catId);
        const catSnap = await getDoc(catRef);
        return catSnap.exists() ? catSnap.data()?.title || '' : '';
      });
      categoryTitles = (await Promise.all(titlePromises)).filter(Boolean);
    }

    const createdAtFormatted = data.createdAt?.toDate
      ? new Date(data.createdAt.toDate()).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : null;

    return {
      props: {
        product: {
          id: docSnap.id,
          ...data,
          price: Number(data.price),
          createdAt: createdAtFormatted,
          categoryTitles,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return { notFound: true };
  }
};
