'use client';

import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type='button'
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 z-40 p-3 rounded-full shadow-lg 
                      bg-[rgba(57,72,94,0.85)] backdrop-blur-md hover:bg-[rgba(48,59,73,0.85)] 
                      text-primary dark:bg-[rgba(39,49,63,0.85)] dark:hover:bg-[rgba(31,41,55,0.85)]
                      transition-opacity duration-300 ease-in-out
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                      ${
                        isVisible
                          ? 'opacity-100'
                          : 'opacity-0 pointer-events-none'
                      }`}
      aria-label='Scroll to top'
    >
      <FiArrowUp className='h-6 w-6' />
    </button>
  );
}
