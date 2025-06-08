'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import { loginUser } from '../../lib/loginUser'; // Your login logic

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');

    const cleanedEmail = email.trim();
    const cleanedPassword = password.trim();

    if (!/\S+@\S+\.\S+/.test(cleanedEmail)) {
      setSubmitError('Invalid email format');
      return;
    }
    if (cleanedPassword.length < 6) {
      setSubmitError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser(cleanedEmail, cleanedPassword);

      if (!res.ok) {
        setSubmitError(res.error || 'Login failed');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setSubmitError(err?.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='flex items-center justify-center min-h-screen px-4 py-8'>
      <div className='w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 text-gray-800 rounded-xl shadow-2xl p-8'>
        <Link
          href='/'
          className='mb-6 flex justify-center gap-2 items-center text-xl font-semibold hover:opacity-75'
        >
          <Image src='/favicon-32x32.png' alt='Logo' width={28} height={28} />
          <span className='text-purple-400'>Visible</span>
        </Link>

        <h1 className='text-3xl font-bold text-center mb-6 text-gray-700'>
          Sign In
        </h1>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='flex items-center gap-3'>
            <AiOutlineMail />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 placeholder-gray-800 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>

          <div className='flex items-center gap-3'>
            <AiOutlineUnlock />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 placeholder-gray-800 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-purple-700 hover:bg-purple-600 transition text-white font-medium py-2.5 rounded-xl'
          >
            {loading ? 'Processing...' : 'Sign In'}
          </button>

          {submitError && (
            <p className='text-red-400 text-sm text-center'>{submitError}</p>
          )}

          <p className='text-sm text-center text-gray-800/70 mt-2'>
            Don&apos;t have an account?{' '}
            <Link
              href='/signup'
              className='text-purple-400 hover:underline hover:text-purple-500'
            >
              Register
            </Link>
          </p>
          <p className='text-sm text-center text-gray-800/70 mt-2'>
            Forgot password?{' '}
            <Link
              href='/reset-password'
              className='text-purple-400 hover:underline hover:text-purple-500'
            >
              Reset
            </Link>
          </p>
        </form>

        {/* New &quot;To Home Page&quot; Button */}
        <Link
          href='/'
          className='mt-6 inline-block w-full text-center bg-white/10 border border-primary/20 hover:bg-white/20 text-primary font-medium py-2.5 rounded-xl transition duration-300 backdrop-blur-md'
        >
          To Home Page
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
