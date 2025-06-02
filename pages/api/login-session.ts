import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookies } from 'cookies-next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Missing token' });

  setCookies('__session', token, {
    req,
    res,
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res.status(200).json({ ok: true });
}
