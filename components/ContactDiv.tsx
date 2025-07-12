import React from 'react';
import Link from 'next/link';

const ContactDiv: React.FC = () => {
  return (
    <div className='p-4 bg-[rgba(31,41,55,0.25)] backdrop-blur-xl rounded-b-xl text-center shadow-2xl border border-white/20 border-t-0'>
      <h2 className='text-xl font-bold mb-2 text-gray-500 sm:text-white'>
        Contact Us
      </h2>
      <p className='text-gray-300 sm:text-white mb-4'>
        Have questions or need assistance? Feel free to contact us.
      </p>
      <Link href='/contact'>
        <button className='bg-green-600/70 hover:bg-green-700 text-white  py-2 px-4 rounded-2xl'>
          Contact
        </button>
      </Link>
    </div>
  );
};

export default ContactDiv;
