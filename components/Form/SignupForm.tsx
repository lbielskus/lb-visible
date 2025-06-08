'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import Link from 'next/link';
import Image from 'next/image';
import { registerUser } from '../../lib/registerUser';
import toast from 'react-hot-toast';

interface InputErrors {
  [key: string]: string;
}

const SignupForm = () => {
  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState<InputErrors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateData = () => {
    const errors: InputErrors = {};
    const cleaned = {
      fullName: data.fullName.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim(),
    };

    if (cleaned.fullName.length < 4) {
      errors.fullName = 'Full name must be at least 4 characters';
    } else if (cleaned.fullName.length > 30) {
      errors.fullName = 'Full name should be less than 30 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(cleaned.fullName)) {
      errors.fullName = 'Only letters and spaces allowed';
    }

    if (!/\S+@\S+\.\S+/.test(cleaned.email)) {
      errors.email = 'Invalid email format';
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(cleaned.password)) {
      errors.password =
        'Password must be at least 6 characters and contain letters and numbers';
    }

    if (cleaned.password !== cleaned.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    setValidationErrors(errors);

    // show first error in toast
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
    }

    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateData()) return;

    try {
      setLoading(true);
      await registerUser(
        data.fullName.trim(),
        data.email.trim(),
        data.password.trim(),
        process.env.NEXT_PUBLIC_CLIENT_ID as string
      );

      toast.success('Check your inbox to verify your email');
      router.push('/verify-email');
    } catch (err: any) {
      toast.error(err?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
          Create Account
        </h1>

        <form className='space-y-4' onSubmit={handleSignup}>
          <div className='flex items-center gap-3'>
            <BsPerson />
            <input
              type='text'
              name='fullName'
              placeholder='Full Name'
              value={data.fullName}
              onChange={handleInputChange}
              className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 placeholder-gray-800 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
          {validationErrors.fullName && (
            <p className='text-red-400 text-sm'>{validationErrors.fullName}</p>
          )}

          <div className='flex items-center gap-3'>
            <AiOutlineMail />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={data.email}
              onChange={handleInputChange}
              className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 placeholder-gray-800 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
          {validationErrors.email && (
            <p className='text-red-400 text-sm'>{validationErrors.email}</p>
          )}

          <div className='flex items-center gap-3'>
            <AiOutlineUnlock />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={data.password}
              onChange={handleInputChange}
              className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 placeholder-gray-800 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
          {validationErrors.password && (
            <p className='text-red-400 text-sm'>{validationErrors.password}</p>
          )}

          <div className='flex items-center gap-3'>
            <RiLockPasswordLine />
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={data.confirmPassword}
              onChange={handleInputChange}
              className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 placeholder-gray-800 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
          </div>
          {validationErrors.confirmPassword && (
            <p className='text-red-400 text-sm'>
              {validationErrors.confirmPassword}
            </p>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-purple-700 hover:bg-purple-600 transition text-white font-medium py-2.5 rounded-xl'
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>

          <p className='text-sm text-center text-gray-800/70 mt-2'>
            Already have an account?{' '}
            <Link href='/login' className='text-purple-300 hover:underline'>
              Log in
            </Link>
          </p>
        </form>

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

export default SignupForm;
