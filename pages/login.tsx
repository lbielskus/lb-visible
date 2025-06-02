import React from 'react';
import LoginForm from '../components/Form/LoginForm';
import Link from 'next/link';
import { DefaultSeo } from 'next-seo';

const login = () => {
  return (
    <>
      <DefaultSeo
        title='LB Websites | Login'
        description='Websites for your niche'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.yourwebsite.com',
          site_name: 'LB Websites',
          title: 'LB Websites',
          description: 'Websites for your niche',
          images: [
            {
              url: '',
              width: 1200,
              height: 630,
              alt: 'Your image alt text',
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
