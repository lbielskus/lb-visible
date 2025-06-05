// File: pages/checkout-step2.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Success from '../components/Success';

export default function CheckoutStep2() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const encodedData = searchParams.get('data');

    if (!encodedData) {
      setError('No subscription data found.');
      setLoading(false);
      return;
    }

    try {
      const decoded = JSON.parse(Buffer.from(encodedData, 'base64').toString());

      axios
        .post('/api/checkout', {
          email: decoded[0]?.email, // optional fallback, or pass form fields again
          cartProducts: decoded,
        })
        .then((res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          } else {
            setError('No Stripe URL returned.');
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to initiate subscription.');
          setLoading(false);
        });
    } catch (err) {
      setError('Invalid data format.');
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-red-600 font-semibold'>{error}</p>
      </div>
    );
  }

  if (success) return <Success />;

  return null;
}
