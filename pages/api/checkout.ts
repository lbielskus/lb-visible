import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, name, address, city, country, zip, cartProducts } = req.body;

  if (
    !email ||
    !name ||
    !address ||
    !city ||
    !country ||
    !zip ||
    !Array.isArray(cartProducts)
  ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  if (!clientId) {
    return res.status(500).json({ message: 'Client ID not set in env' });
  }

  try {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let mode: 'payment' | 'subscription' | null = null;

    for (const item of cartProducts) {
      if (
        !item.id ||
        !item.stripePriceId ||
        !item.quantity ||
        !item.mode ||
        (item.mode !== 'payment' && item.mode !== 'subscription')
      ) {
        console.warn('⚠️ Skipping invalid item:', item);
        continue;
      }

      if (mode && item.mode !== mode) {
        return res.status(400).json({
          message:
            'Cannot mix subscriptions and one-time purchases in the same checkout.',
        });
      }

      mode = item.mode;

      const ref = doc(db, 'clients', clientId, 'products', item.id);
      const snap = await getDoc(ref);
      if (!snap.exists()) continue;

      lineItems.push({
        price: item.stripePriceId,
        quantity: item.quantity,
      });
    }

    if (!lineItems.length || !mode) {
      return res.status(400).json({ message: 'No valid items for checkout.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode,
      line_items: lineItems,
      customer_email: email,
      success_url: `${req.headers.origin}/cart?success=true`,
      cancel_url: `${req.headers.origin}/cart?cancelled=true`,
      metadata: {
        name,
        address,
        city,
        country,
        zip,
        clientId,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('🔥 Checkout error:', error.message || error);
    return res
      .status(500)
      .json({ message: 'Stripe error', error: error.message });
  }
}
