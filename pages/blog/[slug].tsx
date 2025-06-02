'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { DefaultSeo } from 'next-seo';

type BlogPost = {
  title: string;
  description: string;
  createdAt?: string | { seconds: number; nanoseconds: number };
  mainImage?: string;
};

export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
      const ref = collection(db, 'clients', clientId, 'blogPosts');
      const q = query(ref, where('slug', '==', slug));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docData = snapshot.docs[0].data();
        setPost(docData as BlogPost);
      } else {
        setPost(null);
      }
    };

    fetchPost();
  }, [slug]);

  const getFormattedDate = (date: BlogPost['createdAt']) => {
    if (!date) return 'N/A';
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    if (typeof date === 'string') {
      return new Date(date).toLocaleDateString('en-US', options);
    }

    if ('seconds' in date) {
      return new Date(date.seconds * 1000).toLocaleDateString('en-US', options);
    }

    return 'N/A';
  };

  if (!post)
    return (
      <p className='text-center text-gray-400 mt-12'>
        Post not found or loading...
      </p>
    );

  return (
    <>
      <DefaultSeo
        title={`LB | ${post.title}`}
        description='Websites for your niche'
        openGraph={{
          type: 'article',
          locale: 'en_IE',
          url: `https://www.yourwebsite.com/blog/${slug}`,
          site_name: 'LB Websites',
          title: `LB | ${post.title}`,
          description: 'Websites for your niche',
          images: [
            {
              url:
                post.mainImage ??
                'https://your-default-image.com/blog-cover.jpg',
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
        }}
      />

      <div className='max-w-4xl mx-auto px-4 sm:px-8 py-10 mt-10 backdrop-blur-md bg-white/30 border border-primary border-opacity-30 rounded-2xl shadow-lg'>
        <h1 className='text-3xl font-bold text-gray-600 text-center mb-4'>
          {post.title}
        </h1>
        <p className='text-sm text-gray-500 text-center mb-6'>
          Published on {getFormattedDate(post.createdAt)}
        </p>

        {post.mainImage && (
          <div className='mb-8'>
            <Image
              src={post.mainImage}
              alt={post.title}
              width={800}
              height={630}
              className='rounded-lg mx-auto max-h-96 object-cover'
            />
          </div>
        )}

        <div className='text-gray-600 text-base leading-relaxed break-words overflow-hidden'>
          <div
            dangerouslySetInnerHTML={{ __html: post.description }}
            className='w-full prose prose-invert prose-p:text-justify prose-a:break-all max-w-none text-gray-600'
            style={{
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
            }}
          />
        </div>
      </div>
    </>
  );
}
