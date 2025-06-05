// File: pages/api/checkout-split.ts

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
    const lineItemsPayment: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const subscriptionItems: any[] = [];

    for (const item of cartProducts) {
      if (!item.id || !item.stripePriceId || !item.quantity || !item.mode) {
        console.warn('⚠️ Skipping invalid item:', item);
        continue;
      }

      const ref = doc(db, 'clients', clientId, 'products', item.id);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        console.warn(`❌ Product not found in Firestore: ${item.id}`);
        continue;
      }

      const lineItem = {
        price: item.stripePriceId,
        quantity: item.quantity,
      };

      if (item.mode === 'payment') {
        lineItemsPayment.push(lineItem);
      } else if (item.mode === 'subscription') {
        subscriptionItems.push(item); // store full item data for step 2
      }
    }

    console.log('✅ lineItemsPayment:', lineItemsPayment);
    console.log('✅ subscriptionItems:', subscriptionItems);

    if (!lineItemsPayment.length || !subscriptionItems.length) {
      return res.status(400).json({
        message: 'Cart must include both setup fee and subscription.',
      });
    }

    // Encode subscription data
    const subEncoded = Buffer.from(JSON.stringify(subscriptionItems)).toString(
      'base64'
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItemsPayment,
      customer_email: email,
      success_url: `${req.headers.origin}/checkout-step2?data=${subEncoded}`,
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
    console.error('🔥 Stripe Checkout Error:', {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      message: 'Stripe error',
      error: error.message,
    });
  }
}
