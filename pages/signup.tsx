import React from 'react';
import SignupForm from '../components/Form/SignupForm';
import { DefaultSeo } from 'next-seo';

const Signup = () => {
  return (
    <>
      <DefaultSeo
        title='LB Visible | Register'
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
      <SignupForm />
    </>
  );
};

export default Signup;
