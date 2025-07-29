'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { BlogPost } from '../types/index';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { lt as ltLocale } from 'date-fns/locale';

type Props = {
  posts: BlogPost[];
};

export default function BlogSlide({ posts }: Props) {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [truncatedText, setTruncatedText] = useState<string>('');
  const { t } = useTranslation('common');
  const { locale } = useRouter();

  const truncateHtml = (html: string, maxLength: number): string => {
    if (typeof window === 'undefined') return '';
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPostIndex((prevIndex) =>
        posts.length > 0 ? (prevIndex + 1) % posts.length : 0
      );
    }, 7000);
    return () => clearInterval(intervalId);
  }, [posts]);

  useEffect(() => {
    const post = posts[currentPostIndex];
    if (post?.description) {
      setTruncatedText(truncateHtml(post.description, 300));
    }
  }, [currentPostIndex, posts]);

  const redirectToPost = (slug: string) => {
    window.location.href = `/blog/${slug}`;
  };

  if (!posts.length) {
    return (
      <p className='text-center text-gray-400'>{t('blogSlide.noPosts')}</p>
    );
  }

  const post = posts[currentPostIndex];

  return (
    <div className='w-full px-4 py-8 flex justify-center'>
      <div className='w-full sm:max-w-4xl backdrop-blur-md bg-white/10 border border-primary border-opacity-40 rounded-3xl shadow-xl p-8 text-center'>
        <h3 className='text-xl sm:text-2xl font-bold text-gray-600 sm:text-white mb-2'>
          {post.title}
        </h3>

        <p className='text-gray-600 sm:text-white mb-2 text-sm'>
          {t('blogSlide.publishedOn')}{' '}
          {post.createdAt
            ? format(
                new Date(post.createdAt),
                'PPP',
                locale === 'lt' ? { locale: ltLocale } : undefined
              )
            : 'N/A'}
        </p>

        <p className='text-gray-600 sm:text-white text-sm sm:text-md max-w-2xl mx-auto min-h-[120px]'>
          {truncatedText}
        </p>

        <div className='mt-6'>
          <button
            className='bg-primary hover:bg-primary/70 text-white px-5 py-2 rounded-lg shadow hover:bg-opacity-90 transition'
            onClick={() => redirectToPost(post.slug)}
          >
            <span>{t('blogSlide.readMore')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
