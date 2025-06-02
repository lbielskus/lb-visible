'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Reset email sent!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='bg-[rgba(31,41,55,0.52)] backdrop-blur-sm rounded-3xl p-8  shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6 text-gray-100'>
          Reset your password
        </h2>
        <input
          type='email'
          placeholder='Your email'
          className='w-full p-3 mb-4 rounded border text-gray-800'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleReset}
          disabled={loading}
          className='w-full bg-primary text-white font-semibold py-2 rounded hover:bg-opacity-90 transition'
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        <p className='text-center text-sm text-gray-300 mt-4'>
          Remember password?{' '}
          <Link href='/login' className='text-primary hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
