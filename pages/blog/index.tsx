'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { DefaultSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation';

type BlogPost = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  createdAt?: string | { seconds: number; nanoseconds: number };
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t, lang } = useTranslation('common');

  useEffect(() => {
    const fetchPosts = async () => {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
      const ref = collection(db, 'clients', clientId, 'blogPosts');
      const q = query(ref, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const fetchedPosts: BlogPost[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          slug: data.slug || '',
          ...(data as Omit<BlogPost, '_id' | 'slug'>),
        };
      });

      setPosts(fetchedPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handlePostClick = (slug: string) => {
    router.push(`/blog/${slug}`);
  };

  const getFormattedDate = (date: BlogPost['createdAt']) => {
    if (!date) return 'N/A';
    if (typeof date === 'string') return new Date(date).toLocaleDateString();
    if ('seconds' in date)
      return new Date(date.seconds * 1000).toLocaleDateString();
    return 'N/A';
  };

  const truncateHtml = (html: string, maxLength: number): string => {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <>
      <DefaultSeo
        title='Blog | LB Visible'
        description='Websites for your niche'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.lbvisible.com/blog',
          site_name: 'LB Visible',
          title: 'LB Visible',
          description: 'Websites for your niche',
          images: [
            {
              url: 'https://your-default-image.com/cover.jpg',
              width: 1200,
              height: 630,
              alt: 'LB Websites blog image',
            },
          ],
        }}
      />

      <div className='mx-auto px-4 py-8'>
        <h1 className='text-2xl tracking-tight text-center text-third mb-6'>
          {t('blog.relatedPosts')}
        </h1>

        <div className='grid grid-cols-1 gap-6 max-w-5xl mx-auto'>
          {loading ? (
            <p className='text-gray-400 text-center'>Loading...</p>
          ) : posts.length === 0 ? (
            <p className='text-gray-400 text-center'>{t('blog.noPosts')}</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className='w-full backdrop-blur-md bg-white/10 border border-primary border-opacity-30 rounded-2xl shadow-lg px-6 py-6 text-left min-h-[220px]'
              >
                <h2 className='text-xl font-semibold text-gray-600 mb-2'>
                  {post.title}
                </h2>
                <p className='text-gray-500 mb-1 text-sm'>
                  {t('blog.publishedOn')}{' '}
                  {post.createdAt
                    ? new Date(
                        typeof post.createdAt === 'string'
                          ? post.createdAt
                          : post.createdAt.seconds * 1000
                      ).toLocaleDateString(lang === 'lt' ? 'lt-LT' : 'en-US')
                    : 'N/A'}
                </p>
                <p className='text-gray-600 text-sm mb-4'>
                  {truncateHtml(post.description || '', 300)}
                </p>
                <div className='flex justify-end'>
                  <button
                    onClick={() => handlePostClick(post.slug)}
                    type='button'
                    className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-third to-primary group-hover:from-third group-hover:to-primary hover:text-white dark:text-white'
                  >
                    <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-third rounded-md group-hover:bg-opacity-0'>
                      {t('blog.readMore')}
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
