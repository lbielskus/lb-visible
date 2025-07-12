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
  let urls = staticPaths.map(
    (path) => `
    <url>
      <loc>${BASE_URL}${path}</loc>
      <lastmod>${lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>${path === '' ? '1.0' : '0.8'}</priority>
    </url>
  `
  );
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
    blogs.map(
      (slug) => `
      <url>
        <loc>${BASE_URL}/blog/${slug}</loc>
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
