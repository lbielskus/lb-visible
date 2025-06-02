import React from 'react';
import LoginForm from '../components/Form/LoginForm';
import Link from 'next/link';
import { DefaultSeo } from 'next-seo';

const login = () => {
  return (
    <>
      <DefaultSeo
        title='LB Visible | Login'
        description='Websites for your niche'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.lbvisible.com',
          site_name: 'LB Visible',
          title: 'LB Visible',
          description: 'Websites for your niche',
          images: [
            {
              url: 'https://lb-visible.vercel.app/ogbanners/ogbanner.png',
              width: 1200,
              height: 630,
              alt: 'LB Visible Website & CMS Preview',
            },
          ],
        }}
      />
      <div className='min-h-screen flex flex-col justify-center items-center px-4'>
        <LoginForm />
      </div>
    </>
  );
};

export default login;
