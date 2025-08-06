'use client';

import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

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
    if (!slug) return;

    const fetchPost = async () => {
      const q = query(collection(db, 'blog'), where('slug', '==', slug));
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

  const getISODate = (date: BlogPost['createdAt']) => {
    if (!date) return new Date().toISOString();

    if (typeof date === 'string') {
      return new Date(date).toISOString();
    }

    if ('seconds' in date) {
      return new Date(date.seconds * 1000).toISOString();
    }

    return new Date().toISOString();
  };

  if (!post)
    return (
      <p className='text-center text-gray-400 mt-12'>
        Post not found or loading...
      </p>
    );

  // Article Schema for AI indexing
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description.substring(0, 200) + '...',
    image: post.mainImage || 'https://www.lbvisible.com/ogbanners/ogbanner.png',
    datePublished: getISODate(post.createdAt),
    dateModified: getISODate(post.createdAt),
    author: {
      '@type': 'Organization',
      name: 'LB Visible',
      url: 'https://www.lbvisible.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LB Visible',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.lbvisible.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.lbvisible.com/blog/${slug}`,
    },
    articleSection: 'Web Development',
    keywords: [
      'web development',
      'digital marketing',
      'Lithuania',
      'SEO',
      'Next.js',
      'React',
      'custom websites',
    ],
    inLanguage: ['en', 'lt'],
    isAccessibleForFree: true,
    wordCount: post.description.split(' ').length,
    articleBody: post.description,
  };

  return (
    <>
      <Head>
        {/* Article Schema for AI models */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleStructuredData),
          }}
        />
      </Head>

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
