import { GetServerSideProps } from 'next';

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

function generateStaticSitemap() {
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

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');

  const sitemap = generateStaticSitemap();
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default function SitemapStatic() {
  return null;
}
