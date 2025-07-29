'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useCart } from '../lib/CartContext';
import { createCartItem } from '../lib/cartUtils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { FiCheck } from 'react-icons/fi';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

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

// Icons for each plan
const getPlanIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case 'beginner':
      return '⚡';
    case 'advanced':
      return '👑';
    case 'business':
      return '🚀';
    default:
      return '💎';
  }
};

const getPlanColor = (title: string) => {
  switch (title.toLowerCase()) {
    case 'beginner':
      return 'from-blue-500 to-cyan-500';
    case 'advanced':
      return 'from-purple-500 to-pink-500';
    case 'business':
      return 'from-orange-500 to-red-500';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

// Helper to get 4 key features and the inheritance line, with clean text and '+ Everything in ...' always last
const getDisplayFeatures = (product: Product) => {
  // Show all features or all description lines as-is, no filtering or inheritance, but sanitize HTML tags
  const sanitize = (str: string) => str.replace(/<[^>]*>/g, '').trim();
  if (product.features?.length) {
    return product.features.map(sanitize);
  }
  if (product.description) {
    return product.description
      .split(/<br\s*\/?>|\n/)
      .filter(Boolean)
      .map(sanitize);
  }
  return [];
};

const getDiscountPercent = (
  monthly: string | number | undefined,
  yearly: string | number | undefined
) => {
  const m = typeof monthly === 'string' ? parseFloat(monthly) : Number(monthly);
  const y = typeof yearly === 'string' ? parseFloat(yearly) : Number(yearly);
  if (!m || !y || y >= m) return null;
  const percent = Math.round((1 - y / m) * 100);
  return percent > 0 ? percent : null;
};

// Helper to get timeline, revisions, and support for each plan
function getPlanStats(title: string) {
  if (title === 'Beginner')
    return {
      timeline: '2-3 weeks',
      revisions: '3 rounds',
      support: '1 month',
    };
  if (title === 'Advanced')
    return {
      timeline: '3-4 weeks',
      revisions: '5 rounds',
      support: '3 months',
    };
  if (title === 'Business')
    return {
      timeline: '4-6 weeks',
      revisions: 'Unlimited',
      support: '6 months',
    };
  return { timeline: '', revisions: '', support: '' };
}

// Helper to get main description for each plan
function getPlanDescription(title: string) {
  if (title === 'Beginner')
    return 'Get your business online with a professional presence';
  if (title === 'Advanced') return 'Complete solution for growing businesses';
  if (title === 'Business')
    return 'Custom web applications and advanced features';
  return '';
}

const PricingPlans: React.FC<Props> = ({ products }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'yearly'
  );
  const { addProduct } = useCart();
  const { t, lang } = useTranslation('common');
  const { locale } = useRouter();

  // Helper to safely translate or fallback to English
  function safeT(key: string, fallback: string) {
    const translated = t(key);
    return translated === key ? fallback : translated;
  }

  const sorted = [...products].sort((a, b) => {
    const order = ['Beginner', 'Advanced', 'Business'];
    return order.indexOf(a.title) - order.indexOf(b.title);
  });

  // Helper to get subtitle for each plan
  const getPlanSubtitle = (title: string) => {
    if (title === 'Beginner') return 'Perfect for Small Businesses';
    if (title === 'Advanced') return 'Most Popular Choice';
    if (title === 'Business') return 'Ultimate Business Solution';
    return '';
  };

  const handleAddToCart = (product: Product) => {
    try {
      console.log('Adding product to cart:', product.title);
      const paymentItem = createCartItem(product, billingCycle, 'payment');
      const subscriptionItem = createCartItem(
        product,
        billingCycle,
        'subscription'
      );

      console.log('Payment item:', paymentItem);
      console.log('Subscription item:', subscriptionItem);

      addProduct(paymentItem);
      addProduct(subscriptionItem);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
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
            {safeT(
              'pricingPlans.planAdded',
              locale === 'lt'
                ? 'Planas pridėtas į krepšelį!'
                : 'Plan added to cart'
            )}
          </span>
        </div>
      ));
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-xs w-full bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl border border-red-200 flex items-center px-4 py-3 pointer-events-auto`}
          style={{ color: '#b91c1c' }}
        >
          <svg
            className='w-6 h-6 text-red-500 mr-3'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
          <span className='font-semibold text-md text-white'>
            Failed to add plan to cart
          </span>
        </div>
      ));
    }
  };

  const featureKeyMap: Record<string, string> = {
    '3 pages': 'pages3',
    Seo: 'seo',
    'Design colors': 'designColors',
    'Mobile-responsive': 'mobileResponsive',
    'Fast and customizable': 'fastCustomizable',
    'Custom Design': 'customDesign',
    Forms: 'forms',
    'Products, Blog posts (Create, delete, edit).': 'productsBlogPosts',
    Design: 'design',
    'Login / Register users': 'loginRegister',
    'Stripe payments integration': 'stripePayments',
  };

  // Add this mapping for stat values
  const statKeyMap: Record<string, string> = {
    '2-3 weeks': 'weeks23',
    '3-4 weeks': 'weeks34',
    '4-6 weeks': 'weeks46',
    '3 rounds': 'rounds3',
    '5 rounds': 'rounds5',
    Unlimited: 'unlimited',
    '1 month': 'month1',
    '3 months': 'months3',
    '6 months': 'months6',
  };

  return (
    <section className='py-6 px-1 sm:px-6 flex justify-center items-center min-h-[80vh] bg-transparent'>
      <div className='bg-white/30 backdrop-blur-md border border-white/30 shadow-md rounded-2xl container mx-auto max-w-7xl p-1 sm:p-6 lg:p-10'>
        <div className='text-center mb-5 sm:mb-14'>
          <h2 className='text-2xl sm:text-4xl font-bold text-gray-600 mb-4 sm:mb-6 mt-6 px-2'>
            {t('pricingPlans.choosePlanTitle')}
            <span className='bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
              {' '}
              {t('pricingPlans.planAcc')}
            </span>
          </h2>

          <p className='text-base sm:text-md text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto'>
            {t('pricingPlans.subtitle')}
          </p>

          {/* Enhanced Pricing Toggle */}
          <div className='flex items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12'>
            <div className='bg-white/50 rounded-full p-1 shadow border'>
              <div className='flex items-center gap-2 sm:gap-4 px-2 sm:px-4'>
                <span
                  className={`text-xs sm:text-sm font-medium transition-colors ${
                    billingCycle === 'monthly'
                      ? 'text-pink-500'
                      : 'text-gray-500'
                  }`}
                >
                  {t('pricingPlans.monthly')}
                </span>
                <button
                  onClick={() =>
                    setBillingCycle(
                      billingCycle === 'yearly' ? 'monthly' : 'yearly'
                    )
                  }
                  className={`relative inline-flex h-6 w-10 sm:h-8 sm:w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                    billingCycle === 'yearly'
                      ? 'bg-gradient-to-r from-purple-500/80 to-pink-500/80'
                      : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 sm:h-6 sm:w-6 transform rounded-full bg-white/90 transition-transform shadow-lg ${
                      billingCycle === 'yearly'
                        ? 'translate-x-6 sm:translate-x-8'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
                <span
                  className={`text-xs sm:text-sm font-medium transition-colors ${
                    billingCycle === 'yearly'
                      ? 'text-pink-500'
                      : 'text-gray-500'
                  }`}
                >
                  {t('pricingPlans.yearly')}
                </span>
              </div>
            </div>
            {/* Show the highest discount badge for yearly billing */}
            {billingCycle === 'yearly' &&
              (() => {
                let maxDiscount = 0;
                for (const p of sorted) {
                  const percent = getDiscountPercent(
                    p.priceMonthly,
                    p.priceYearly
                  );
                  if (percent && percent > maxDiscount) maxDiscount = percent;
                }
                return maxDiscount > 0 ? (
                  <div className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1'>
                    <span>
                      {t('pricingPlans.saveUpTo')} {maxDiscount}%
                    </span>{' '}
                    <span className='text-base'>🎉</span>
                  </div>
                ) : null;
              })()}
          </div>
        </div>

        {/* Mobile Swiper */}
        <div className='block lg:hidden w-full'>
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={16}
            className='!pb-8'
          >
            {sorted.map((product, idx) => {
              const oneTime = product.oneTime || '0.00';
              const ongoing =
                billingCycle === 'monthly'
                  ? product.priceMonthly || '0.00'
                  : product.priceYearly || '0.00';
              const suffix =
                billingCycle === 'monthly' ? '/ month' : '/ month*';
              const isPopular = product.title === 'Advanced';
              const planColor = getPlanColor(product.title);
              const planIcon = getPlanIcon(product.title);
              const displayFeatures = getDisplayFeatures(product);

              return (
                <SwiperSlide
                  key={product.id}
                  className='flex justify-center w-full px-2 h-[500px]'
                >
                  <Card
                    className={`max-w-xs w-full mx-auto relative flex flex-col justify-between h-[500px] bg-white/30 backdrop-blur-md border border-white/30 shadow-md rounded-2xl ring-2 ring-inset ring-purple-500 shadow-xl shadow-purple-500/15 transition-all duration-500 p-3 sm:p-4`}
                  >
                    <CardHeader className='text-center pb-3 pt-3 relative'>
                      {/* Icon */}
                      <div
                        className={`w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br ${planColor} flex items-center justify-center shadow text-white text-lg`}
                      >
                        {planIcon}
                      </div>
                      <CardTitle className='text-base font-bold mb-1 sm:text-lg text-gray-700'>
                        {t(`pricingPlans.${product.title.toLowerCase()}`)}
                      </CardTitle>
                      <CardDescription className='text-xs text-gray-600'>
                        {t(
                          `pricingPlans.${product.title.toLowerCase()}Subtitle`
                        )}
                      </CardDescription>
                      {/* Pricing */}
                      <div className='mt-3'>
                        <div className='text-center'>
                          <div className='text-xs text-gray-500 mb-1'>
                            {t('pricingPlans.oneTimeSetup')}
                          </div>
                          <div className='text-2xl font-bold text-gray-600 mb-1 sm:text-3xl'>
                            € {formatPrice(oneTime)}
                          </div>
                        </div>
                        <div className='mt-2 pt-2 border-t border-gray-200'>
                          <div className='text-xs text-gray-500 mb-1'>
                            {safeT(
                              'pricingPlans.thenOngoingMaintenance',
                              lang === 'lt'
                                ? 'Vėliau nuolatinė priežiūra'
                                : 'Then ongoing maintenance'
                            )}
                          </div>
                          <div className='text-lg font-semibold text-purple-600'>
                            € {formatPrice(ongoing)}
                            <span className='text-xs text-gray-500 font-normal ml-1'>
                              {locale === 'lt' ||
                              lang === 'lt' ||
                              (typeof window !== 'undefined' &&
                                window.navigator.language.startsWith('lt'))
                                ? 'Mėn.'
                                : 'month'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className='px-0 pb-3 flex-1 flex flex-col'>
                      <ul className='space-y-2 mb-3 flex-1 overflow-auto max-h-[220px]'>
                        {displayFeatures.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className='flex items-start gap-2'
                          >
                            {feature.startsWith('+ Everything') ? (
                              <span className='text-gray-500 text-xs font-semibold'>
                                {feature}
                              </span>
                            ) : (
                              <>
                                <div className='flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5'>
                                  <FiCheck className='text-pink-500 text-[13px]' />
                                </div>
                                <span className='text-gray-700 text-xs leading-relaxed'>
                                  {safeT(
                                    `pricingPlans.${
                                      featureKeyMap[feature] || feature
                                    }`,
                                    feature
                                  )}
                                </span>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                      <div className='mt-auto w-full relative z-20'>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className={`w-full h-9 text-xs font-semibold transition-all duration-300 mt-2 sm:h-10 sm:text-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg relative z-10 cursor-pointer`}
                        >
                          {t('pricingPlans.choosePlan')}
                        </Button>
                      </div>
                      <div className='text-center mt-2'>
                        <p className='text-[10px] text-gray-500'>
                          {safeT(
                            'pricingPlans.freeConsultShort',
                            locale === 'lt'
                              ? 'Nemokama konsultacija'
                              : 'Free consultation'
                          )}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className='hidden lg:grid lg:grid-cols-3 gap-6'>
          {sorted.map((product, index) => {
            const oneTime = product.oneTime || '0.00';
            const ongoing =
              billingCycle === 'monthly'
                ? product.priceMonthly || '0.00'
                : product.priceYearly || '0.00';
            const suffix = billingCycle === 'monthly' ? '/ month' : '/ month*';
            const isPopular = product.title === 'Advanced';
            const planColor = getPlanColor(product.title);
            const planIcon = getPlanIcon(product.title);
            const displayFeatures = getDisplayFeatures(product);

            return (
              <div
                key={product.id}
                className='relative group flex flex-col h-[600px]'
              >
                <Card
                  className={`h-full relative flex flex-col justify-between bg-white/30 backdrop-blur-md border border-white/30 shadow-md rounded-2xl ring-2 ring-inset ring-purple-500 shadow-xl shadow-purple-500/15 transition-all duration-500 p-0`}
                >
                  <CardHeader className='text-center pb-3 pt-6 px-6 relative flex flex-col items-center'>
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${planColor} flex items-center justify-center shadow text-white text-xl`}
                    >
                      {planIcon}
                    </div>

                    <CardTitle className='text-lg font-bold mb-1 text-gray-700'>
                      {t(`pricingPlans.${product.title.toLowerCase()}`)}
                    </CardTitle>
                    <div className='text-xs font-medium text-purple-600 mb-1'>
                      {safeT(
                        `pricingPlans.${product.title.toLowerCase()}Subtitle`,
                        getPlanSubtitle(product.title)
                      )}
                    </div>
                    <div className='text-xs text-gray-600 mb-2'>
                      {safeT(
                        `pricingPlans.${product.title.toLowerCase()}Desc`,
                        getPlanDescription(product.title)
                      )}
                    </div>

                    {/* Pricing */}
                    <div className='mt-4'>
                      <div className='text-center'>
                        <div className='text-xs text-gray-500 mb-1'>
                          {t('pricingPlans.oneTimeSetup')}
                        </div>
                        <div className='text-3xl font-bold text-gray-600 mb-1'>
                          € {formatPrice(oneTime)}
                        </div>
                      </div>

                      <div className='mt-3 pt-3 border-t border-gray-200'>
                        <div className='text-xs text-gray-500 mb-1'>
                          {safeT(
                            'pricingPlans.thenOngoingMaintenance',
                            lang === 'lt'
                              ? 'Vėliau nuolatinė priežiūra'
                              : 'Then ongoing maintenance'
                          )}
                        </div>
                        <div className='text-xl font-semibold text-purple-600'>
                          € {formatPrice(ongoing)}
                          <span className='text-xs text-gray-500 font-normal ml-1'>
                            {locale === 'lt' ||
                            lang === 'lt' ||
                            (typeof window !== 'undefined' &&
                              window.navigator.language.startsWith('lt'))
                              ? 'Mėn.'
                              : 'month'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className='grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 w-full'>
                      <div className='text-center'>
                        <span className='text-gray-400 text-base'>⏱️</span>
                        <div className='text-[10px] text-gray-500'>
                          {t('pricingPlans.timeline')}
                        </div>
                        <div className='text-xs font-medium text-purple-600'>
                          {safeT(
                            `pricingPlans.${
                              statKeyMap[getPlanStats(product.title).timeline]
                            }`,
                            getPlanStats(product.title).timeline
                          )}
                        </div>
                      </div>
                      <div className='text-center text-purple-600'>
                        <span className='text-gray-400 text-base'>👥</span>
                        <div className='text-[10px] text-gray-500'>
                          {t('pricingPlans.revisions')}
                        </div>
                        <div className='text-xs font-medium text-purple-600'>
                          {safeT(
                            `pricingPlans.${
                              statKeyMap[getPlanStats(product.title).revisions]
                            }`,
                            getPlanStats(product.title).revisions
                          )}
                        </div>
                      </div>
                      <div className='text-center text-purple-600'>
                        <span className='text-gray-400 text-base'>🎧</span>
                        <div className='text-[10px] text-gray-500'>
                          {t('pricingPlans.support')}
                        </div>
                        <div className='text-xs font-medium'>
                          {safeT(
                            `pricingPlans.${
                              statKeyMap[getPlanStats(product.title).support]
                            }`,
                            getPlanStats(product.title).support
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className='flex-1 flex flex-col justify-between px-6 pb-6 pt-0'>
                    <ul className='space-y-2 mb-4 flex-1 overflow-auto min-h-[120px] max-h-[180px]'>
                      {displayFeatures.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className='flex items-start gap-2'
                        >
                          {feature.startsWith('+ Everything') ? (
                            <span className='text-gray-500 text-xs font-semibold'>
                              {feature}
                            </span>
                          ) : (
                            <>
                              <div className='flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5'>
                                <span className='text-green-600 text-[10px]'>
                                  ✓
                                </span>
                              </div>
                              <span className='text-gray-700 text-xs leading-relaxed'>
                                {safeT(
                                  `pricingPlans.${
                                    featureKeyMap[feature] || feature
                                  }`,
                                  feature
                                )}
                              </span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                    <div className='w-full mt-auto relative z-20'>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full h-10 text-sm font-semibold transition-all duration-300 mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg relative z-10 cursor-pointer`}
                      >
                        {t('pricingPlans.choosePlan')}
                      </Button>
                    </div>
                    <div className='text-center mt-2'>
                      <p className='text-[10px] text-gray-500'>
                        {safeT(
                          'pricingPlans.freeConsultShort',
                          locale === 'lt'
                            ? 'Nemokama konsultacija'
                            : 'Free consultation'
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className='mt-10 sm:mt-14 text-center'>
          <div className='relative  rounded-2xl p-6 sm:p-8 overflow-hidden'>
            <h3 className='relative text-lg sm:text-xl font-semibold text-gray-600 mb-2 sm:mb-4 z-10'>
              {t('pricingPlans.includedTitle')}
            </h3>
            <div className='relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs sm:text-sm z-10'>
              <div className='bg-white/30 backdrop-blur-md border border-white/30 shadow-md rounded-2xl p-4 flex flex-col items-center text-center'>
                <span className='text-red-500 text-xl mb-1'>🛡️</span>
                <span className='text-gray-700'>{t('pricingPlans.ssl')}</span>
              </div>
              <div className='bg-white/30 backdrop-blur-md border border-white/30 shadow-md rounded-2xl p-4 flex flex-col items-center text-center'>
                <span className='text-yellow-500 text-xl mb-1'>⚡</span>
                <span className='text-gray-700'>
                  {t('pricingPlans.performance')}
                </span>
              </div>
              <div className='bg-white/30 backdrop-blur-md border border-white/30 shadow-md rounded-2xl p-4 flex flex-col items-center text-center'>
                <span className='text-blue-500 text-xl mb-1'>👥</span>
                <span className='text-gray-700'>{t('pricingPlans.seo')}</span>
              </div>
              <div className='bg-white/30 backdrop-blur-md border border-white/30 shadow-md rounded-2xl p-4 flex flex-col items-center text-center'>
                <span className='text-black text-xl mb-1'>🎧</span>
                <span className='text-gray-700'>
                  {t('pricingPlans.ongoingSupport')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className='text-center text-xs sm:text-sm text-gray-400 mt-4 sm:mt-6'>
          {t('pricingPlans.billedAnnually')}
        </p>
      </div>
    </section>
  );
};

export default PricingPlans;
