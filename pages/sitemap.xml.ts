import { GetServerSideProps } from 'next';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const BASE_URL = 'https://www.lbvisible.com';

const staticPaths = [
  '',
  '/projects',
  '/pricing',
  '/blog',
  '/contact',
  '/terms',
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
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!;
  // Projects
  const projectsSnap = await getDocs(
    collection(db, 'clients', clientId, 'products')
  );
  const projectSlugs = projectsSnap.docs
    .map((doc) => doc.data().slug)
    .filter(Boolean);
  // Blogs
  const blogSnap = await getDocs(
    collection(db, 'clients', clientId, 'blogPosts')
  );
  const blogSlugs = blogSnap.docs.map((doc) => doc.data().slug).filter(Boolean);
  return { projects: projectSlugs, blogs: blogSlugs };
}

function generateSitemap({
  projects,
  blogs,
}: {
  projects: string[];
  blogs: string[];
}) {
  const lastmod = new Date().toISOString();
  let urls: string[] = [];

  // English pages
  urls = urls.concat(
    staticPaths.map(
      (path) => `
    <url>
      <loc>${BASE_URL}${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>
  `
    )
  );

  // English sub pages
  urls = urls.concat(
    subPages.map(
      (path) => `
    <url>
      <loc>${BASE_URL}${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `
    )
  );

  // Lithuanian pages
  urls = urls.concat(
    staticPaths.map(
      (path) => `
    <url>
      <loc>${BASE_URL}/lt${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>
  `
    )
  );

  // Lithuanian sub pages
  urls = urls.concat(
    subPages.map(
      (path) => `
    <url>
      <loc>${BASE_URL}/lt${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `
    )
  );

  // Privacy policy pages
  urls.push(`
    <url>
      <loc>${BASE_URL}/privacy-policy</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
  `);
  urls.push(`
    <url>
      <loc>${BASE_URL}/lt/privacy-policy</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>
  `);

  // Dynamic content
  urls = urls.concat(
    projects.map(
      (slug) => `
      <url>
        <loc>${BASE_URL}/projects/${slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `
    ),
    projects.map(
      (slug) => `
      <url>
        <loc>${BASE_URL}/lt/projects/${slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `
    ),
    blogs.map(
      (slug) => `
      <url>
        <loc>${BASE_URL}/blog/${slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `
    ),
    blogs.map(
      (slug) => `
      <url>
        <loc>${BASE_URL}/lt/blog/${slug}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
    `
    )
  );

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
    ''
  )}\n</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const dynamicPaths = await getDynamicPaths();
  const sitemap = generateSitemap(dynamicPaths);
  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
