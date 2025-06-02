import { useRouter } from 'next/router';
import { FiPhone } from 'react-icons/fi';
import { useState } from 'react';

const ContactButton = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push('/contact');
  };

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <div
        className='relative inline-block'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <span className='absolute right-14 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-green-700 rounded-xl backdrop-blur-md bg-white/30 shadow-md border border-white/40 whitespace-nowrap'>
            Contact us
          </span>
        )}
        <button
          onClick={handleClick}
          className='w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-xl bg-green-600/80 hover:bg-green-600/80 border border-white/30 shadow-lg text-white transition'
        >
          <FiPhone size={20} />
        </button>
      </div>
    </div>
  );
};

export default ContactButton;
