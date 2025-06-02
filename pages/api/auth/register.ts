// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { uid, fullName, email, clientId } = req.body;

  if (!uid || !fullName || !email || !clientId) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    console.log('Registering user:', { uid, fullName, email, clientId });

    await db
      .collection('clients')
      .doc(clientId)
      .collection('users')
      .doc(uid)
      .set({
        fullName,
        email,
        clientId,
        createdAt: new Date(),
      });

    return res.status(201).json({ success: true });
  } catch (err: any) {
    console.error('🔥 Firestore write error:', err.message);
    return res
      .status(500)
      .json({ error: 'Could not save user', details: err.message });
  }
}
