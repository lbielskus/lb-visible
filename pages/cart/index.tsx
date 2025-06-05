'use client';

import { useEffect, useState } from 'react';
import { useCart } from '../../lib/CartContext';
import axios from 'axios';
import Link from 'next/link';
import Spinner from '../../components/Spinner';
import { useAuth } from '../../lib/AuthContext';
import Success from '../../components/Success';
import toast from 'react-hot-toast';
import { DefaultSeo } from 'next-seo';
import Image from 'next/image';
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
  FaLock,
} from 'react-icons/fa';

const VAT_RATE = 0.21;
const formatPrice = (price: number): string =>
  price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default function Cart() {
  const { cartProducts, removeProduct, addProduct, clearCart } = useCart();
  const { user } = useAuth();

  const [products, setProducts] = useState<any[]>([]);
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setName(user.displayName || '');
    }
  }, [user]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    if (cartProducts.length > 0) {
      axios
        .post('/api/cart', { cartItems: cartProducts })
        .then((res) => {
          if (!cancelled) {
            setProducts(res.data);
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    } else {
      setProducts([]);
      setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [cartProducts]);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.href.includes('success')
    ) {
      setIsSuccess(true);
      clearCart();
    }
  }, [clearCart]);

  const subTotal = products.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  const vatAmount = subTotal - subTotal / (1 + VAT_RATE);
  const total = subTotal;

  const stripeCheckout = async () => {
    const billingCycles = new Set(cartProducts.map((p) => p.billingCycle));
    if (billingCycles.size > 1) {
      toast.error(
        'Only one billing type (monthly or yearly) is allowed per checkout. Please remove one of the items.'
      );
      return;
    }

    try {
      const response = await axios.post('/api/checkout', {
        email,
        name,
        address,
        city,
        country,
        zip,
        cartProducts,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        toast.error('Checkout error: No redirect URL');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred during checkout');
    }
  };

  if (isSuccess) return <Success />;

  if (!user) {
    return (
      <div className='grid h-screen px-4 place-content-center'>
        <div className='text-center'>
          <p className='mt-4 text-text text-2xl'>
            You should sign in to view cart items
          </p>
          <Link
            href='/login'
            className='inline-block px-5 py-3 mt-6 text-sm font-medium text-text bg-primary rounded hover:bg-primary focus:outline-none focus:ring'
          >
            Login / Register
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <DefaultSeo title='LB | Cart' description='Websites for your niche' />
      <section className='flex justify-between max-md:flex-col space-x-4'>
        {/* LEFT */}
        <div className='md:w-2/3 px-4'>
          <div className='mt-16 md:mt-6'>
            <header className='text-center flex justify-between w-full'>
              <h1 className='text-xl font-bold text-gray-600 sm:text-2xl'>
                Your Cart
              </h1>
            </header>

            {loading ? (
              <div className='flex justify-center items-center h-screen'>
                <Spinner />
              </div>
            ) : !products.length ? (
              <div className='flex flex-col justify-center items-center min-h-[70vh] px-4 text-center'>
                <p className='text-xl text-primary mb-4'>Your cart is empty</p>
                <Link
                  href='/pricing'
                  className='inline-block rounded-2xl bg-primary px-6 py-3 text-white font-medium text-md hover:bg-primary/80 transition'
                >
                  Browse Plans
                </Link>
              </div>
            ) : (
              <>
                {/* Warning if billing cycles mixed */}
                {new Set(
                  products
                    .filter((p) => p.mode === 'subscription') // Only validate subscriptions
                    .map((p) => p.billingCycle)
                ).size > 1 && (
                  <p className='text-red-500 mt-4 text-sm'>
                    ⚠️ You can only checkout with one billing cycle (monthly or
                    yearly). Please remove one of the items.
                  </p>
                )}

                <ul className='space-y-4 mt-4'>
                  {products.map((product) => (
                    <li
                      key={`${product._id}-${product.billingCycle}`}
                      className='flex items-center gap-4 justify-between'
                    >
                      <Image
                        src={product.imageUrl || '/no-image.png'}
                        alt={product.title}
                        width={64}
                        height={64}
                        className='rounded object-cover'
                      />
                      <div>
                        <h3 className='text-md text-text max-w-md'>
                          {product.title}
                        </h3>
                        <p className='text-sm text-primary'>
                          {product.mode === 'payment'
                            ? 'One-time Setup Fee'
                            : product.billingCycle === 'yearly'
                            ? 'Yearly Plan'
                            : 'Monthly Plan'}
                        </p>
                        <p className='text-[15px] text-text'>
                          €{' '}
                          {formatPrice(
                            Number(product.price) * product.quantity
                          )}
                        </p>
                      </div>
                      <div className='flex items-center gap-1'>
                        <button
                          onClick={() =>
                            removeProduct(product.id, product.billingCycle)
                          }
                          className='w-10 h-10 leading-10 text-text transition hover:opacity-75 border'
                        >
                          -
                        </button>
                        <input
                          type='number'
                          value={product.quantity}
                          readOnly
                          className='h-10 w-16 rounded border border-secondary text-primary font-bold text-center'
                        />
                        <button
                          onClick={() =>
                            addProduct({
                              id: product.id,
                              billingCycle: product.billingCycle,
                              stripePriceId: product.stripePriceId,
                              price: product.price,
                              title: product.title,
                              imageUrl: product.imageUrl,
                              mode: product.mode, // ✅ This fixes the TypeScript error
                            })
                          }
                          className='w-10 h-10 leading-10 text-text transition hover:opacity-75 border'
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className='mt-8 flex justify-end border-t border-gray-100 pt-8'>
                  <div className='max-w-md space-y-4'>
                    <dl className='space-y-0.5 text-md text-gray-600'>
                      <div className='flex justify-end text-primary border-b mb-3'>
                        <button onClick={clearCart}>Clear Cart</button>
                      </div>
                      <div className='flex justify-between'>
                        <dt>Total (incl. VAT)</dt>
                        <dd>€ {formatPrice(total)}</dd>
                      </div>
                      <div className='flex justify-between'>
                        <dt>VAT Included ({Math.round(VAT_RATE * 100)}%)</dt>
                        <dd>€ {formatPrice(vatAmount)}</dd>
                      </div>
                    </dl>
                    <div className='flex justify-end'>
                      <Link
                        href='/projects'
                        className='group flex items-center justify-between gap-4 rounded-lg border border-current px-4 py-2 text-[#2f364a] active:bg-[#2f364a] transition-colors hover:bg-[#2f364a] focus:outline-none focus:ring'
                      >
                        <span className='font-medium transition-colors group-hover:text-primary'>
                          Continue shopping
                        </span>
                        <span className='shrink-0 rounded-full border p-2 group-active:border-[#2f364a] group-hover:text-white'>
                          <svg
                            className='h-4 w-4 rtl:rotate-180'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT */}
        {products.length > 0 && (
          <div className='md:w-1/3 mt-16 md:mt-6 px-4 mr-2'>
            <header className='text-start flex flex-col w-full'>
              <h1 className='text-xl font-bold text-gray-600 sm:text-xl'>
                Customer details
              </h1>
              <p className='mt-2 text-text text-md'>
                We use your account details for payment and shipping.
              </p>
            </header>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                stripeCheckout();
              }}
              className='mx-auto max-w-xl p-4 border my-3 shadow-lg rounded-3xl bg-white/10 backdrop-blur-md'
            >
              <div className='grid grid-cols-1 sm:grid-cols-12 gap-4'>
                <div className='sm:col-span-6'>
                  <label className='block text-sm font-medium text-text mb-1'>
                    Email
                  </label>
                  <input
                    type='email'
                    required
                    className='block w-full rounded-2xl p-3 border text-gray-600 bg-gray-200'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='sm:col-span-6'>
                  <label className='block text-sm font-medium text-text mb-1'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    required
                    className='block w-full rounded-2xl p-3 border text-gray-600 bg-gray-200'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='sm:col-span-12'>
                  <label className='block text-sm font-medium text-text mb-1'>
                    Address
                  </label>
                  <input
                    type='text'
                    required
                    className='block w-full rounded-2xl p-3 border text-gray-600 bg-gray-200'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className='sm:col-span-6'>
                  <label className='block text-sm font-medium text-text mb-1'>
                    City
                  </label>
                  <input
                    type='text'
                    required
                    className='block w-full rounded-2xl p-3 border text-gray-600 bg-gray-200'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className='sm:col-span-4'>
                  <label className='block text-sm font-medium text-text mb-1'>
                    Country
                  </label>
                  <input
                    type='text'
                    required
                    className='block w-full rounded-2xl p-3 border text-gray-600 bg-gray-200'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className='sm:col-span-2'>
                  <label className='block text-sm font-medium text-text mb-1'>
                    Zip
                  </label>
                  <input
                    type='text'
                    required
                    className='block w-full rounded-2xl p-3 border text-gray-600 bg-gray-200'
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
                <div className='col-span-1 sm:col-span-12 text-center w-full'>
                  <button
                    type='submit'
                    className='block rounded-3xl bg-[#222b44] px-5 py-3 text-md text-white transition hover:bg-[#3d455a] w-full'
                  >
                    Checkout
                  </button>
                </div>
              </div>

              <div className='mt-6 p-4 rounded-3xl backdrop-blur-md bg-white/10 border border-white/10 shadow-xl text-center'>
                <p className='text-gray-600 text-sm mb-2'>
                  All payments are securely processed through{' '}
                  <span className='text-blue-500 font-medium'>Stripe</span>.
                </p>
                <div className='flex justify-center items-center gap-4 text-3xl mb-2'>
                  <FaCcVisa style={{ color: '#1A1F71' }} />
                  <FaCcMastercard style={{ color: '#eb001b' }} />
                  <FaCcPaypal style={{ color: '#003087' }} />
                  <FaCcStripe style={{ color: '#635bff' }} />
                </div>
                <p className='text-green-600 text-xs flex items-center justify-center gap-1'>
                  <FaLock className='text-green-700' />
                  256-bit SSL Encryption Secured
                </p>
              </div>
              <div className='mt-6 p-4 mb-4 rounded-2xl bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm sm:text-base shadow-md'>
                💬 <strong>Before placing your order</strong>, we highly
                recommend reaching out to us to discuss your goals and
                expectations. Together, we&rsquo;ll plan the best solution and
                ensure you choose the most suitable plan for your business.{' '}
                <Link
                  href='/contact'
                  className='underline font-medium text-yellow-900 hover:text-yellow-700'
                >
                  Contact us
                </Link>
                .
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
}
