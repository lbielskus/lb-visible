'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowNarrowRight } from 'react-icons/hi';

export default function HeroBanner() {
  return (
    <section className=' relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-10 bg-white/20 backdrop-blur-md rounded-3xl overflow-hidden'>
      {/* Left: Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col items-center text-center max-w-xl w-full ml-0 md:ml-10'
      >
        <div className='relative w-full '>
          <h2 className='text-3xl sm:text-5xl font-extrabold text-gray-600'>
            This isn’t your average website.
          </h2>
          <span className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-[3px] bg-gradient-to-r from-pink-500 to-blue-400 rounded-full animate-pulse' />
        </div>

        <Link
          href='https://parallax-demo-snowy.vercel.app/'
          target='_blank'
          rel='noopener noreferrer'
          className='mt-4 text-pink-500 hover:text-pink-400 text-sm sm:text-base transition inline-flex items-center gap-1'
        >
          Check our Parallax demo{' '}
          <HiArrowNarrowRight className='inline w-4 h-4' />
        </Link>
      </motion.div>

      {/* Right: Laptop with Embedded Demo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className='relative w-[240px] h-[190px] sm:w-[420px] sm:h-[330px] mr-0 md:mr-10'
      >
        {/* Laptop frame */}
        <Image
          src='/laptop-frame.png'
          alt='Laptop Frame'
          fill
          priority
          className='object-contain z-10 pointer-events-none select-none'
        />

        {/* GIF inside screen (perfectly cropped with ratio lock) */}
        <div
          className='absolute z-0'
          style={{
            top: '21.2%',
            left: '19.8%',
            width: '60.4%',
            height: '50%',
          }}
        >
          <div className='relative w-full h-full overflow-hidden rounded-sm shadow-m '>
            <Image
              src='/demo-loop.gif'
              alt='Parallax Demo Animation'
              fill
              className='object-cover'
              priority
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
