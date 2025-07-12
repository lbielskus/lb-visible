'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

type BannerData = {
  url: string;
  title: string;
};

export default function Banner() {
  const [banner, setBanner] = useState<BannerData | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
        const ref = collection(db, 'clients', clientId!, 'hero_banners');
        const snapshot = await getDocs(ref);
        if (!snapshot.empty) {
          const firstDoc = snapshot.docs[0].data() as BannerData;
          setBanner(firstDoc);
        }
      } catch (err) {
        console.error('Error fetching banner:', err);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <section className='relative w-full h-[200px] sm:h-[300px] rounded-t-xl shadow-2xl overflow-hidden bg-white/10 backdrop-blur-md'>
      {/* Background image */}
      <Image
        src={banner.url}
        alt={banner.title || 'Hero Banner'}
        fill
        priority
        className='object-cover object-center'
        sizes='100vw'
      />

      {/* Glass overlay */}
      <div className='absolute inset-0 border border-b-0 border-white/20 rounded-t-xl z-0' />

      {/* Foreground text */}
      <div className='absolute inset-0 z-10 flex items-center justify-start px-6 sm:px-8'>
        <div className='text-gray-600 pl-4 sm:pl-48'>
          <h1 className='text-2xl sm:text-5xl font-extrabold leading-snug drop-shadow-md text-gray-500 sm:text-white'>
            Confused?
            <br />
            <span className='text-gray-600 sm:text-white'>Let us help!</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
