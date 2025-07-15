'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../lib/CartContext';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { useAuth } from '../lib/AuthContext';
import { auth } from '../lib/firebaseAuth';
import {
  FiChevronDown,
  FiHome,
  FiFolder,
  FiMail,
  FiTag,
  FiBookOpen,
} from 'react-icons/fi';
import { poppins } from '../lib/fonts';
import Image from 'next/image';

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { cartProducts } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { pathname } = router;

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const handleLinkClick = () => {
    setIsMobileNavOpen(false);
  };

  const handleLogoClick = () => {
    if (window.innerWidth < 1024) {
      router.push('/');
    }
  };

  return (
    <header className='sticky top-0 z-40 w-full lg:rounded-b-xl shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.84)]'>
      <div className='mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6 border-b border-white/10 relative'>
        {/* Desktop: Logo and text */}
        <div
          className='hidden lg:flex gap-1 items-end text-gray-200 font-medium text-sm hover:text-gray-300 cursor-pointer'
          onClick={handleLogoClick}
        >
          <Image
            src='https://ik.imagekit.io/tooos2eo5/42px.png?updatedAt=1749149087723'
            alt='Logo'
            width={38}
            height={38}
          />
          <span className='opacity-90 ml-2 text-sm tracking-normal drop-shadow-sm'>
            <span className='text-gray-300'>Let&apos;s Be </span>
            <span className='text-white'>Visible</span>
          </span>
        </div>
        {/* Mobile: Logo and Burger grouped left */}
        <div className='flex items-center lg:hidden'>
          <div
            className='flex items-end text-gray-200 font-medium text-sm hover:text-gray-300 cursor-pointer'
            onClick={handleLogoClick}
          >
            <Image
              src='https://ik.imagekit.io/tooos2eo5/42px.png?updatedAt=1749149087723'
              alt='Logo'
              width={38}
              height={38}
            />
          </div>
          <button
            className='ml-1 text-primary flex items-center focus:outline-none border-opacity-50 rounded-xl py-2 px-3 shadow-md hover:bg-gray-800 transition-all duration-200'
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            aria-label={isMobileNavOpen ? 'Close menu' : 'Open menu'}
            type='button'
          >
            {isMobileNavOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-7 h-7 text-pink-500 hover:text-pink-600 transition-colors duration-200'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-7 h-7 text-pink-500 hover:text-pink-600 transition-colors duration-200'
              >
                <line
                  x1='4'
                  y1='7'
                  x2='20'
                  y2='7'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                <line
                  x1='4'
                  y1='12'
                  x2='20'
                  y2='12'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
                <line
                  x1='4'
                  y1='17'
                  x2='20'
                  y2='17'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                />
              </svg>
            )}
          </button>
          {isMobileNavOpen && (
            <div className='absolute left-0 right-0 top-full w-full bg-white p-4 rounded-b-2xl border border-gray-200 shadow-2xl z-30 animate-slideDown'>
              <ul className='flex flex-col gap-2 text-center mt-2'>
                {[
                  {
                    path: '/',
                    label: 'Home',
                    icon: (
                      <FiHome className='inline-block mr-2 text-pink-500 text-lg' />
                    ),
                  },
                  {
                    path: '/projects',
                    label: 'Projects',
                    icon: (
                      <FiFolder className='inline-block mr-2 text-pink-500 text-lg' />
                    ),
                  },
                  {
                    path: '/contact',
                    label: 'Contact',
                    icon: (
                      <FiMail className='inline-block mr-2 text-pink-500 text-lg' />
                    ),
                  },
                  {
                    path: '/pricing',
                    label: 'Pricing',
                    icon: (
                      <FiTag className='inline-block mr-2 text-pink-500 text-lg' />
                    ),
                  },
                  {
                    path: '/blog',
                    label: 'Blog',
                    icon: (
                      <FiBookOpen className='inline-block mr-2 text-pink-500 text-lg' />
                    ),
                  },
                ].map(({ path, label, icon }, i) => (
                  <li key={i}>
                    <Link
                      className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-150 cursor-pointer hover:bg-pink-50 hover:text-pink-700 focus:bg-pink-100 focus:text-pink-800 outline-none ${
                        pathname === path
                          ? 'text-pink-700 font-bold bg-pink-100'
                          : 'text-gray-800'
                      }`}
                      href={path}
                      onClick={handleLinkClick}
                      tabIndex={0}
                    >
                      {icon}
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <nav aria-label='Global' className='hidden lg:block'>
          <ul className='flex items-center gap-6 text-md'>
            {['/', '/projects', '/contact', '/pricing', '/blog'].map(
              (path, i) => (
                <li key={i}>
                  <Link
                    className={`text-white transition hover:text-zinc-400/75 ${
                      pathname === path ? 'text-white' : ''
                    }`}
                    href={path}
                  >
                    {path === '/'
                      ? 'Home'
                      : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className='flex items-center gap-4'>
          <div className='flow-root'>
            <Link href='/cart' className='group -m-2 flex items-center p-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                />
              </svg>
              <div className='hidden lg:flex'>
                <span className='ml-2 text-md text-white font-bold group-hover:text-green-600'>
                  {cartProducts.length}
                </span>
                <span className='sr-only'>items in cart, view bag</span>
              </div>
            </Link>
          </div>

          <span className='mx-3 hidden sm:block'>|</span>

          {user ? (
            <div className='flex items-center gap-2'>
              <span className='text-sm text-white hidden sm:block'>
                {user.email}
              </span>
              <button
                onClick={logout}
                className='text-sm text-white hover:underline'
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='flex gap-5'>
              <Link href='/signup'>
                <span className='text-sm text-white hover:underline'>
                  Register
                </span>
              </Link>
              <Link href='/login'>
                <span className='text-sm text-white hover:underline'>
                  Login
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideDown {
          from {
            transform: scaleY(0.7);
            opacity: 0;
            transform-origin: top;
          }
          to {
            transform: scaleY(1);
            opacity: 1;
            transform-origin: top;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: top;
        }
      `}</style>
    </header>
  );
};

export default Header;
