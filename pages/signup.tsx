import React from 'react';
import SignupForm from '../components/Form/SignupForm';
import { DefaultSeo } from 'next-seo';

const Signup = () => {
  return (
    <>
      <DefaultSeo
        title='LB Websites | Register'
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
      <SignupForm />
    </>
  );
};

export default Signup;
