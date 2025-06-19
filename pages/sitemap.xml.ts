import { GetServerSideProps } from 'next';

const BASE_URL = 'https://www.lbvisible.com';

const staticPaths = [
  '',
  '/projects',
  '/pricing',
  '/blog',
  '/contact',
  '/terms',
];

function generateSitemap(): string {
  const lastmod = new Date().toISOString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths
  .map(
    (path) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('')}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/xml');
  res.write(generateSitemap());
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
