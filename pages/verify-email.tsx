'use client';

import { useAuth } from '../lib/AuthContext';
import { useEffect, useState } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function VerifyEmail() {
  const { user, loading } = useAuth();
  const [resent, setResent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const router = useRouter();

  // ✅ Check on load if verified
  useEffect(() => {
    if (!loading && user?.emailVerified) {
      router.replace('/');
    }
  }, [user, loading, router]);

  // ✅ Cooldown counter for resend button
  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [cooldown]);

  // ✅ Auto-check email verification every 3 minutes (180000 ms)
  useEffect(() => {
    if (!user || loading) return;

    const interval = setInterval(async () => {
      try {
        await user.reload(); // Refresh user data
        if (user.emailVerified) {
          toast.success('Email verified!');
          router.replace('/');
        }
      } catch (err) {
        console.error('Error reloading user:', err);
      }
    }, 30000); // 1 minute

    return () => clearInterval(interval);
  }, [user, loading, router]);

  const handleResend = async () => {
    if (!user) {
      toast.error('User not found.');
      return;
    }

    if (user.emailVerified) {
      toast.success('Email is already verified!');
      router.replace('/');
      return;
    }

    try {
      await sendEmailVerification(user);
      toast.success('Verification email resent!');
      setResent(true);
      setCooldown(30);
    } catch (err) {
      console.error(err);
      toast.error('Failed to resend verification email.');
    }
  };

  if (loading || !user) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-gray-500 text-lg'>Loading...</p>
      </div>
    );
  }

  return (
    <div className='max-w-lg mx-auto mt-20 text-center bg-[rgba(31,41,55,0.52)] border border-white/10 p-8 rounded-xl backdrop-blur-md shadow-xl'>
      <h1 className='text-2xl font-semibold text-gray-100 mb-4'>
        Verify your email
      </h1>
      <p className='text-gray-200 mb-6'>
        We’ve sent a verification link to{' '}
        <strong className='text-primary'>{user.email}</strong>.<br />
        Please check your inbox and click the link to activate your account.
      </p>

      <button
        onClick={handleResend}
        disabled={cooldown > 0}
        className='bg-primary text-white px-5 py-2 rounded-xl hover:bg-opacity-90 transition disabled:opacity-50'
      >
        {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Email'}
      </button>
    </div>
  );
}
