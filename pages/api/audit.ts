import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const apiKey = process.env.NEXT_PUBLIC_PSI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  try {
    const getAudit = async (strategy: 'mobile' | 'desktop') => {
      const { data } = await axios.get(
        'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
        {
          params: { url, key: apiKey, strategy, category: 'performance' },
          paramsSerializer: (params) => {
            const base = new URLSearchParams();
            base.append('url', params.url);
            base.append('key', params.key);
            base.append('strategy', params.strategy);
            base.append('category', 'performance');
            base.append('category', 'accessibility');
            base.append('category', 'seo');
            base.append('category', 'best-practices');
            return base.toString();
          },
        }
      );

      const categories = data.lighthouseResult?.categories || {};
      const audits = data.lighthouseResult?.audits || {};

      const tips = Object.values(audits)
        .filter((a: any) => a?.details?.type === 'opportunity')
        .map(
          (a: any) => a.title + (a.displayValue ? ` – ${a.displayValue}` : '')
        );

      return {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round(
          (categories['best-practices']?.score || 0) * 100
        ),
        seo: Math.round((categories.seo?.score || 0) * 100),
        tips,
      };
    };

    const [mobile, desktop] = await Promise.all([
      getAudit('mobile'),
      getAudit('desktop'),
    ]);

    return res.status(200).json({ mobile, desktop });
  } catch (error: any) {
    console.error('[Audit API]', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to fetch audit' });
  }
}
