// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { poppins } from '../lib/fonts';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';
import useTranslation from 'next-translate/useTranslation';

const logoUrl =
  'https://ik.imagekit.io/tooos2eo5/42px.png?updatedAt=1749149087723';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  const socialLinks: Record<string, string> = {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/in/lbielskus/',
    tiktok: 'https://www.tiktok.com/@letsbevisible',
  };

  const handleIconClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className='footer-container mt-3  '>
      <div className='container mx-auto flex flex-col items-center bg-[rgba(31,41,55,0.52)] backdrop-blur-sm rounded-t-3xl py-10 sm:bg-[rgba(31,41,55,0.52)] bg-[rgba(31,41,55,0.92)]'>
        <div className='flex flex-wrap w-full justify-center mb-2 text-center'>
          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0'>
            <div className='footer-link-items'>
              <h2 className='text-xl font-semibold mb-4 text-gray-200'>
                {t('footer.about')}
              </h2>
              <div className='flex flex-col mb-2 text-gray-200'>
                <Link href='/sub/how-it-works'>{t('footer.howItWorks')}</Link>
                <Link href='/sub/mobile-responsive'>
                  {t('footer.mobileResponsive')}
                </Link>
                <Link href='/sub/developer-tools'>
                  {t('footer.developerTools')}
                </Link>
                <Link href='/sub/cookies-info'>{t('footer.cookies')}</Link>
                <Link href='/privacy-policy'>{t('footer.privacyPolicy')}</Link>
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0'>
            <div className='footer-link-items text-gray-200'>
              <h2 className='text-xl font-semibold mb-4'>
                {t('footer.contact')}
              </h2>
              <div className='flex flex-col mb-2'>
                <Link href='/contact'>{t('footer.contactLink')}</Link>
                <Link href='/sub/support'>{t('footer.support')}</Link>
                <Link href='/sub/faq'>{t('footer.faq')}</Link>
                <Link href='/sub/tutorials'>{t('footer.tutorials')}</Link>
                <Link href='/sub/terms-of-service'>{t('footer.terms')}</Link>
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0'>
            <div className='footer-link-items text-gray-200'>
              <h2 className='text-xl font-semibold mb-4'>
                {t('footer.websites')}
              </h2>
              <div className='flex flex-col mb-2'>
                <Link href='/projects'>{t('footer.examples')}</Link>
                <Link href='/pricing'>{t('footer.pricing')}</Link>
                <Link href='/sub/domains'>{t('footer.domains')}</Link>
                <Link href='/sub/hosting'>{t('footer.hosting')}</Link>
                <Link href='/sub/services'>{t('footer.services')}</Link>
              </div>
            </div>
          </div>

          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0'>
            <div className='footer-link-items text-gray-200'>
              <h2 className='text-xl font-semibold mb-4'>
                {t('footer.social')}
              </h2>
              <div className='flex flex-col mb-2'>
                <Link href='/'>{t('footer.instagram')}</Link>
                <Link href='/'>{t('footer.facebook')}</Link>
                <Link href='/'>{t('footer.youtube')}</Link>
                <Link href='/'>{t('footer.linkedin')}</Link>
                <Link href='https://www.tiktok.com/@letsbevisible'>
                  {t('footer.tiktok')}
                </Link>
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
                {t('navbar.brand')}
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
            {t('footer.createdBy')}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Footer;
