import React from 'react';
import { useRouter } from 'next/router';
import {
  FiMessageCircle,
  FiImage,
  FiUpload,
  FiRefreshCw,
  FiGlobe,
  FiBarChart2,
} from 'react-icons/fi';

const services = [
  {
    icon: FiMessageCircle,
    title: 'Personal Business Consultation',
  },
  {
    icon: FiImage,
    title: 'Complete Brand Ecosystem',
  },
  {
    icon: FiUpload,
    title: 'Content Management & Migration',
  },
  {
    icon: FiRefreshCw,
    title: 'Continuous Design Evolution',
  },
  {
    icon: FiGlobe,
    title: 'Complete Hosting & Domain Management',
  },
  {
    icon: FiBarChart2,
    title: 'Advanced Analytics & SEO Ecosystem',
  },
];

export default function HomeHowItWorksBanner() {
  const router = useRouter();
  return (
    <section className='container max-w-7xl mx-auto w-full rounded-2xl border border-white/30 backdrop-blur-xl bg-white/20 shadow-md p-4 sm:p-8 flex flex-col items-center text-center mb-12'>
      <h2 className='text-2xl sm:text-4xl font-semibold text-gray-500 mb-10 mt-6'>
        How We Build Your Website
      </h2>
      <p className='text-base sm:text-md text-gray-600 mb-10 max-w-2xl mx-auto'>
        From idea to launch, we handle everything. Planning, design,
        development, and support. So you can focus on your business.
      </p>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 w-full mb-8 max-w-3xl'>
        {services.map((service, idx) => (
          <div
            key={idx}
            className='bg-white/40 border border-white/30 rounded-2xl shadow p-3 flex flex-col items-center text-center min-h-[100px] w-full hover:scale-105 hover:shadow-lg transition-transform duration-200 cursor-pointer'
          >
            <div className='w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-blue-100 ring-2 ring-blue-400 mb-2'>
              {React.createElement(service.icon, {
                className: 'w-6 h-6 md:w-7 md:h-7 text-blue-500',
              })}
            </div>
            <h3 className='text-base sm:text-lg font-semibold text-gray-600 text-center'>
              {service.title}
            </h3>
          </div>
        ))}
      </div>

      <button
        className='bg-primary hover:bg-primary/70 text-white py-2 rounded-lg shadow hover:bg-opacity-90  hover:shadow-lg font-semibold text-sm h-10 px-6  transition-all duration-300 mx-auto block mb-2 mt-2'
        onClick={() => router.push('/sub/how-it-works')}
      >
        Read More
      </button>
    </section>
  );
}
