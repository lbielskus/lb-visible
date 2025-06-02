import React from 'react';
import UserProfile from '../components/profile';

import { DefaultSeo } from 'next-seo';

type Props = {};

const profile = (props: Props) => {
  return (
    <>
      <DefaultSeo
        title='LB Websites | Profile'
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
      <UserProfile />
    </>
  );
};

export default profile;
