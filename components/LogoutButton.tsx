'use client';

import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase'; // ✅ adjust path if needed
import React from 'react';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); // ✅ Firebase sign-out
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className='px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition'
    >
      Logout
    </button>
  );
};

export default LogoutButton;
