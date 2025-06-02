// pages/api/checkout-sessions.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../lib/stripe';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { priceId } = req.body;

  if (!priceId) return res.status(400).json({ error: 'Missing priceId' });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/pricing`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
