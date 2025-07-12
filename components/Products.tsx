'use client';

import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useCart } from '../lib/CartContext';
import { Product } from '../types/index';
import { createCartItem } from '../lib/cartUtils';

type Props = {
  products: Product[];
};

const formatPrice = (price: number | string) => {
  const parsed = typeof price === 'string' ? parseFloat(price) : price;
  return parsed.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function Products({ products }: Props) {
  const { addProduct } = useCart();

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
          <h2 className='text-2xl sm:text-4xl font-semibold leading-tight text-gray-500 sm:text-white'>
            {product.title} Plan
          </h2>
          <p className='text-lg text-gray-400 sm:text-white'>
            From only{' '}
            <span className='text-primary font-semibold text-xl sm:text-white'>
              €{formatPrice(Number(product.priceYearly))} / monthly*
            </span>
          </p>

          <div className='flex flex-wrap gap-3 mt-4'>
            <Link href={`/projects/${product.slug}`}>
              <button className='bg-primary text-white px-5 py-2 rounded-lg shadow hover:bg-opacity-90 transition'>
                View Project
              </button>
            </Link>
            <button
              onClick={() => {
                const billingCycle: 'monthly' | 'yearly' = 'yearly';

                addProduct(createCartItem(product, billingCycle, 'payment'));
                addProduct(
                  createCartItem(product, billingCycle, 'subscription')
                );

                toast.success('Plan added to cart!');
              }}
              className='border border-white/20 bg-white/20 hover:bg-white/20 px-5 py-2 rounded-lg text-gray-500 transition sm:text-white'
            >
              Add to Cart
            </button>
          </div>

          <p className='text-left text-sm text-gray-400 sm:text-white '>
            * billed yearly for best value
          </p>
        </div>
      </div>
    </section>
  );
}
