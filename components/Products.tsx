'use client';

import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useCart } from '../lib/CartContext';
import { Product } from '../types/index';
import { createCartItem } from '../lib/cartUtils';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  products: Product[];
};

const formatPrice = (price: number | string) => {
  const parsed = typeof price === 'string' ? parseFloat(price) : price;
  return parsed.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function Products({ products }: Props) {
  const { addProduct } = useCart();
  const { t } = useTranslation('common');

  if (!products?.length) return null;

  const product = products[0];

  return (
    <section className='px-4 sm:px-8 py-16'>
      <div className='max-w-6xl mx-auto flex flex-col sm:flex-row bg-white/30 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden'>
        <div className='relative w-full sm:w-1/2 aspect-[16/10] bg-gray-100 rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none overflow-hidden'>
          <Image
            src={product.gallery?.[0] || ''}
            alt={product.title}
            fill
            sizes='(max-width: 640px) 100vw, 50vw'
            className='object-cover'
          />
        </div>

        <div className='p-6 sm:p-10 flex flex-col justify-center gap-4 text-gray-500 w-full sm:w-1/2'>
          <h2 className='text-2xl sm:text-4xl font-semibold leading-tight text-gray-500 sm:text-gray-500'>
            {product.title} {t('products.plan')}
          </h2>
          <p className='text-lg text-gray-400 sm:text-gray-500'>
            {t('products.fromOnly')}{' '}
            <span className='text-primary font-semibold text-xl sm:text-gray-500'>
              €{formatPrice(Number(product.priceYearly))} /{' '}
              {t('products.monthly')}*
            </span>
          </p>

          <div className='flex flex-row gap-2 mt-4 sm:flex-wrap sm:gap-3'>
            <Link href={`/projects/${product.slug}`}>
              <button className='bg-primary text-white px-3 py-2 sm:px-5 sm:py-2 rounded-lg shadow hover:bg-opacity-90 transition text-sm sm:text-base'>
                {t('products.viewProject')}
              </button>
            </Link>
            <button
              onClick={() => {
                const billingCycle: 'monthly' | 'yearly' = 'yearly';

                addProduct(createCartItem(product, billingCycle, 'payment'));
                addProduct(
                  createCartItem(product, billingCycle, 'subscription')
                );

                toast.custom((toastObj) => (
                  <div
                    className={`${
                      toastObj.visible ? 'animate-enter' : 'animate-leave'
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
                      {t('products.planAdded')}
                    </span>
                  </div>
                ));
              }}
              className='border border-white/20 bg-white/20 hover:bg-white/20 px-3 py-2 sm:px-5 sm:py-2 rounded-lg text-gray-500 transition text-sm sm:text-base'
            >
              {t('products.addToCart')}
            </button>
          </div>

          <p className='text-left text-sm text-gray-400 sm:text-gray-500 '>
            * {t('products.billedYearly')}
          </p>
        </div>
      </div>
    </section>
  );
}
