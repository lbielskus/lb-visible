// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { poppins } from '../lib/fonts';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';

const logoUrl =
  'https://ik.imagekit.io/tooos2eo5/42px.png?updatedAt=1749149087723';

const Footer: React.FC = () => {
  const socialLinks: Record<string, string> = {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
    tiktok: 'https://www.tiktok.com/explore',
  };

  const handleIconClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className='footer-container py-16 mt-3'>
      <div className='container mx-auto flex flex-col items-center bg-[rgba(31,41,55,0.52)] backdrop-blur-sm rounded-3xl py-10'>
        <div className='flex flex-wrap w-full justify-center mb-2 text-center'>
          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0'>
            <div className='footer-link-items'>
              <h2 className='text-xl font-semibold mb-4 text-gray-200'>
                About Us
              </h2>
              <div className='flex flex-col mb-2 text-gray-200'>
                <Link href='/sub/how-it-works'>How it works</Link>
                <Link href='/sub/mobile-responsive'>Mobile responsive</Link>
                <Link href='/sub/developer-tools'>Developer tools</Link>
                <Link href='/sub/cookies-info'>Cookies</Link>
                <Link href='/privacy-policy'>Privacy Policy</Link>
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0'>
            <div className='footer-link-items text-gray-200'>
              <h2 className='text-xl font-semibold mb-4'>Contact Us</h2>
              <div className='flex flex-col mb-2'>
                <Link href='/contact'>Contact</Link>
                <Link href='/sub/support'>Support</Link>
                <Link href='/sub/faq'>F.A.Q.</Link>
                <Link href='/sub/tutorials'>Tutorials</Link>
                <Link href='/sub/terms-of-service'>Terms of Service</Link>
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0'>
            <div className='footer-link-items text-gray-200'>
              <h2 className='text-xl font-semibold mb-4'>Websites</h2>
              <div className='flex flex-col mb-2'>
                <Link href='/projects'>Examples</Link>
                <Link href='/pricing'>Pricing</Link>
                <Link href='/sub/domains'>Domains</Link>
                <Link href='/sub/hosting'>Hosting</Link>
                <Link href='/sub/services'>Services</Link>
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0'>
            <div className='footer-link-items text-gray-200'>
              <h2 className='text-xl font-semibold mb-4'>Social Media</h2>
              <div className='flex flex-col mb-2'>
                <Link href='/'>Instagram</Link>
                <Link href='/'>Facebook</Link>
                <Link href='/'>Youtube</Link>
                <Link href='/'>LinkedIn</Link>
                <Link href='/'>TikTok</Link>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <div className='footer-logo mb-4 '>
            <Link href='/' className='social-logo flex items-center '>
              <Image
                src={logoUrl}
                alt='logo-lbvisible'
                width={42}
                height={42}
              />
              <span
                className={`text-xs mt-2 ml-2 text-gray-200 ${poppins.className}`}
              >
                Let&apos;s Be Visible
              </span>
            </Link>
          </div>

          <div className='social-icons flex items-center space-x-4 text-primary mt-8'>
            <div
              onClick={() => handleIconClick(socialLinks.facebook)}
              role='button'
              className='cursor-pointer'
            >
              <FaFacebook size={24} />
            </div>
            <div
              onClick={() => handleIconClick(socialLinks.instagram)}
              role='button'
              className='cursor-pointer'
            >
              <FaInstagram size={24} />
            </div>
            <div
              onClick={() => handleIconClick(socialLinks.linkedin)}
              role='button'
              className='cursor-pointer'
            >
              <FaLinkedin size={24} />
            </div>
            <div
              onClick={() => handleIconClick(socialLinks.tiktok)}
              role='button'
              className='cursor-pointer'
            >
              <FaTiktok size={24} />
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <small className='website-rights text-gray-200'>
            Created by Let’s Be Visible © 2024
          </small>
        </div>
      </div>
    </div>
  );
};

export default Footer;
