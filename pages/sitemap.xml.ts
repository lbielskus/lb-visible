import { GetServerSideProps } from 'next';
import { db } from '../lib/firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';

const BASE_URL = 'https://www.lbvisible.com';

const staticPaths = [
  '',
  '/projects',
  '/pricing',
  '/blog',
  '/contact',
  '/terms-of-service',
  '/privacy-policy',
];

const subPages = [
  '/sub/how-it-works',
  '/sub/mobile-responsive',
  '/sub/developer-tools',
  '/sub/cookies-info',
  '/sub/support',
  '/sub/faq',
  '/sub/tutorials',
  '/sub/terms-of-service',
  '/sub/domains',
  '/sub/hosting',
  '/sub/services',
];

async function getDynamicPaths() {
  try {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    if (!clientId) {
      console.warn(
        'NEXT_PUBLIC_CLIENT_ID not found, using empty dynamic paths'
      );
      return { projects: [], blogs: [] };
    }

    // Projects with timeout and limit
    const projectsQuery = query(
      collection(db, 'clients', clientId, 'products'),
      limit(100)
    );
    const projectsSnap = await getDocs(projectsQuery);
    const projectSlugs = projectsSnap.docs
      .map((doc) => doc.data().slug)
      .filter(Boolean);

    // Blogs with timeout and limit
    const blogQuery = query(
      collection(db, 'clients', clientId, 'blogPosts'),
      limit(100)
    );
    const blogSnap = await getDocs(blogQuery);
    const blogSlugs = blogSnap.docs
      .map((doc) => doc.data().slug)
      .filter(Boolean);

    return { projects: projectSlugs, blogs: blogSlugs };
  } catch (error) {
    console.error('Error fetching dynamic paths:', error);
    return { projects: [], blogs: [] };
  }
}

function generateSitemap({
  projects,
  blogs,
}: {
  projects: string[];
  blogs: string[];
}) {
  const lastmod = new Date().toISOString();
  const urls: string[] = [];

  // English pages (default locale)
  staticPaths.forEach((path) => {
    urls.push(`
    <url>
      <loc>${BASE_URL}${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>
  `);
  });

  // English sub pages
  subPages.forEach((path) => {
    urls.push(`
    <url>
      <loc>${BASE_URL}${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `);
  });

  // Lithuanian pages (with /lt prefix)
  staticPaths.forEach((path) => {
    urls.push(`
    <url>
      <loc>${BASE_URL}/lt${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>
  `);
  });

  // Lithuanian sub pages
  subPages.forEach((path) => {
    urls.push(`
    <url>
      <loc>${BASE_URL}/lt${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `);
  });

  // Dynamic content - English
  projects.forEach((slug) => {
    urls.push(`
      <url>
        <loc>${BASE_URL}/projects/${slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });

  blogs.forEach((slug) => {
    urls.push(`
      <url>
        <loc>${BASE_URL}/blog/${slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });

  // Dynamic content - Lithuanian
  projects.forEach((slug) => {
    urls.push(`
      <url>
        <loc>${BASE_URL}/lt/projects/${slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });

  blogs.forEach((slug) => {
    urls.push(`
      <url>
        <loc>${BASE_URL}/lt/blog/${slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    // Set proper headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');

    // Get dynamic paths with timeout
    const dynamicPaths = (await Promise.race([
      getDynamicPaths(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 10000)
      ),
    ])) as { projects: string[]; blogs: string[] };

    // Generate sitemap
    const sitemap = generateSitemap(dynamicPaths);

    // Write response
    res.write(sitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Sitemap generation error:', error);

    // Fallback to static sitemap if dynamic generation fails
    const fallbackSitemap = generateSitemap({ projects: [], blogs: [] });

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.write(fallbackSitemap);
    res.end();

    return { props: {} };
  }
};

export default function Sitemap() {
  return null;
}
