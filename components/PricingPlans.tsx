'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '../lib/CartContext';
import styles from '../styles/buttonStyles3.module.scss';
import { createCartItem } from '../lib/cartUtils';

interface Product {
  id: string;
  title: string;
  features?: string[];
  description?: string;
  stripeOneTimePriceId?: string;
  stripePriceMonthlyId?: string;
  stripePriceYearlyId?: string;
  oneTime?: string;
  priceMonthly?: string;
  priceYearly?: string;
}

interface Props {
  products: Product[];
}

const formatPrice = (raw: string | number | undefined): string => {
  if (!raw) return '0.00';
  const numeric = typeof raw === 'string' ? parseFloat(raw) : raw;
  return numeric.toFixed(2);
};

const PricingPlans: React.FC<Props> = ({ products }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'yearly'
  );
  const { addProduct } = useCart();

  const sorted = [...products].sort((a, b) => {
    const order = ['Beginner', 'Advanced', 'Business'];
    return order.indexOf(a.title) - order.indexOf(b.title);
  });

  return (
    <section className='py-16 px-4 sm:px-8'>
      <div className='max-w-2xl mx-auto text-center mb-12 bg-[rgba(31,41,55,0.45)] backdrop-blur-xl rounded-3xl p-4'>
        <h2 className='text-3xl font-bold text-white'>Plans built to scale</h2>
        <p className='text-gray-300 mt-2 text-sm'>
          One-time setup + ongoing service (monthly or yearly)
        </p>

        <div className='mt-4 flex justify-center items-center gap-4'>
          <span className='text-white text-md'>Monthly</span>
          <button
            onClick={() =>
              setBillingCycle(billingCycle === 'yearly' ? 'monthly' : 'yearly')
            }
            className={`relative w-12 h-6 flex items-center rounded-full px-1 transition-colors duration-300 focus:outline-none ${
              billingCycle === 'yearly' ? 'bg-pink-500' : 'bg-gray-400'
            }`}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className='text-white text-md'>Yearly</span>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-screen-xl mx-auto'>
        {sorted.map((product) => {
          const oneTime = product.oneTime || '0.00';
          const ongoing =
            billingCycle === 'monthly'
              ? product.priceMonthly || '0.00'
              : product.priceYearly || '0.00';
          const suffix =
            billingCycle === 'monthly' ? '/ monthly' : '/ Per month*';

          return (
            <div
              key={product.id}
              className='max-w-sm w-full bg-[rgba(31,41,55,0.45)] backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 text-white flex flex-col justify-between hover:shadow-2xl transition-all'
            >
              <div>
                <h3 className='text-2xl font-bold text-center mb-4'>
                  {product.title}
                </h3>

                <ul className='text-sm space-y-2 mb-6'>
                  {(product.features?.length
                    ? product.features
                    : product.description?.split(/<br\s*\/?>|\n/)
                  )?.map((feature, idx) => {
                    const clean = feature
                      ?.replace(/<[^>]*>/g, '')
                      ?.replace(/^✔/, '')
                      ?.replace(/[\u200B-\u200D\uFEFF]/g, '')
                      ?.trim();
                    return (
                      clean && (
                        <li key={idx} className='flex items-start gap-2'>
                          <span className='text-green-400'>✔</span>
                          <span className='text-gray-200'>{clean}</span>
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>

              <div className='text-center mt-auto space-y-3'>
                <p className='text-sm text-gray-300'>One-time setup:</p>
                <p className='text-2xl font-bold text-white'>
                  € {formatPrice(oneTime)}
                </p>
                <p className='text-sm text-gray-300'>Ongoing service:</p>
                <p className='text-2xl font-bold text-pink-400'>
                  € {formatPrice(ongoing)}{' '}
                  <span className='text-sm text-gray-400'>{suffix}</span>
                </p>
                <button
                  onClick={() => {
                    addProduct(
                      createCartItem(product, billingCycle, 'payment')
                    );
                    addProduct(
                      createCartItem(product, billingCycle, 'subscription')
                    );
                    toast.success('Plan added to cart');
                  }}
                  className={`${styles['draw-border']} w-full text-center py-2.5`}
                >
                  Choose Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className='text-center text-sm text-gray-400 mt-6'>
        * billed once annually
      </p>
    </section>
  );
};

export default PricingPlans;
