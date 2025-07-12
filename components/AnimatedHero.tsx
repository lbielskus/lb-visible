'use client';

import { motion } from 'framer-motion';
import { FiCode, FiImage, FiTrendingUp } from 'react-icons/fi';

export default function AnimatedHero() {
  return (
    <section className='py-12'>
      <div className='container mx-auto px-4 scale-[.8]'>
        <div className='text-center text-white'>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-4xl md:text-6xl font-bold mb-6'
          >
            Professional Web Development
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-xl md:text-2xl mb-8 opacity-90'
          >
            From concept to launch - we build exceptional websites
          </motion.p>
        </div>
      </div>
    </section>
  );
}
