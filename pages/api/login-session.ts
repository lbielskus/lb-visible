import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookies } from 'cookies-next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Missing token' });

  setCookies('__session', token, {
    req,
    res,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    domain: '.lbvisible.com', // 👈 IMPORTANT FIX
    maxAge: 60 * 60 * 24 * 7,
  });

  return res.status(200).json({ ok: true });
}
