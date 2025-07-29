import React from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

const ContactDiv: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <div className='p-4 bg-[rgba(31,41,55,0.25)] backdrop-blur-xl rounded-b-xl text-center shadow-2xl border border-white/20 border-t-0'>
      <h2 className='text-xl font-bold mb-2 text-gray-600 sm:text-white'>
        {t('contactDiv.title')}
      </h2>
      <p className='text-gray-200 sm:text-white mb-4'>{t('contactDiv.desc')}</p>
      <Link href='/contact'>
        <button className='bg-green-600/70 hover:bg-green-700 text-white  py-2 px-4 rounded-2xl'>
          {t('contactDiv.button')}
        </button>
      </Link>
    </div>
  );
};

export default ContactDiv;
