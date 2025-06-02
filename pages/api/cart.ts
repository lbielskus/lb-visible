import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { cartItems } = req.body;

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ message: 'Invalid cartItems' });
  }

  try {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    if (!clientId) {
      console.error('❌ Missing NEXT_PUBLIC_CLIENT_ID');
      return res.status(500).json({ message: 'Missing client ID' });
    }

    const enriched: any[] = [];

    for (const item of cartItems) {
      if (!item?.id) {
        console.warn('⚠️ Skipping invalid item without ID:', item);
        continue;
      }

      const ref = doc(db, 'clients', clientId, 'products', item.id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        enriched.push({ ...snap.data(), _id: snap.id, ...item });
      } else {
        console.warn(`⚠️ Product not found for ID: ${item.id}`);
      }
    }

    return res.status(200).json(enriched);
  } catch (err: any) {
    console.error('🔥 /api/cart error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
