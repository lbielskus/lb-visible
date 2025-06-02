import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../lib/CartContext';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { useAuth } from '../lib/AuthContext';
import { auth } from '../lib/firebaseAuth';
import { FiChevronDown } from 'react-icons/fi';
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

  return (
    <header className='sticky top-0 z-40 w-full rounded-b-xl shadow-xl backdrop-blur-sm bg-[rgba(15,23,42,0.84)]'>
      <div className='mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-2 lg:px-4 border-b border-white/10'>
        <Link
          className='flex gap-1 items-center text-gray-200 font-medium text-lg hover:text-gray-300 '
          href='/'
        >
          <Image
            src='https://ik.imagekit.io/tooos2eo5/android-chrome-192x192.png?updatedAt=1747311661438'
            alt='Logo'
            width={24}
            height={24}
          />
          <span> Visible</span>
        </Link>

        <div className='lg:hidden'>
          <button
            className='text-primary flex items-center focus:outline-none absolute left-32 top-5'
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            <span>{isMobileNavOpen ? 'Menu' : 'Menu'}</span>
            {isMobileNavOpen ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-4 h-4 ml-1 mt-1'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <FiChevronDown className='ml-1 mt-1' />
            )}
          </button>
          {isMobileNavOpen && (
            <div className='absolute top-[73px] left-0 w-2/3 right-0 bg-[rgba(31,41,55,0.85)] backdrop-blur-md p-4 rounded-xl border border-white/10 z-30 sm:w-full md:w-80 lg:w-80'>
              <ul className='flex flex-col gap-2 text-center'>
                {['/', '/projects', '/contact', '/pricing', '/blog'].map(
                  (path, i) => (
                    <li key={i}>
                      <Link
                        className={`$ {
                          {
                            '/': pathname === '/',
                            '/projects': pathname === '/projects',
                            '/contact': pathname === '/contact',
                            '/pricing': pathname === '/pricing',
                            '/blog': pathname === '/blog',
                          }[path]
                            ? 'text-primary'
                            : 'text-third'
                        } transition hover:text-primary`}
                        href={path}
                        onClick={handleLinkClick}
                      >
                        {path === '/'
                          ? 'Home'
                          : path.slice(1).charAt(0).toUpperCase() +
                            path.slice(2)}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>

        <nav aria-label='Global' className='hidden lg:block'>
          <ul className='flex items-center gap-6 text-lg'>
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

        <div className='flex items-center gap-2'>
          <div className='ml-4 flow-root lg:ml-4'>
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
                <span className='ml-2 text-lg text-white font-bold group-hover:text-green-600'>
                  {cartProducts.length}
                </span>
                <span className='sr-only'>items in cart, view bag</span>
              </div>
            </Link>
          </div>

          <span className='mx-2 hidden sm:block '>|</span>

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
            <div className='flex gap-4'>
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
    </header>
  );
};

export default Header;
