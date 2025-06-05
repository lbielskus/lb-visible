export type BillingCycle = 'monthly' | 'yearly';
export type Mode = 'payment' | 'subscription';

// Base item used during "add to cart" (no quantity)
export interface CartProductBase {
  id: string;
  billingCycle?: BillingCycle;
  stripePriceId: string;
  price: string;
  title: string;
  imageUrl: string;
  mode: Mode;
}

// Final cart item used *inside the cart* (includes quantity)
export interface CartProduct extends CartProductBase {
  quantity: number;
}

/**
 * Creates a product object for CartContext
 */
export function createCartItem(
  product: any,
  billingCycle: BillingCycle = 'monthly',
  mode: Mode = 'subscription'
): CartProductBase {
  const stripePriceId =
    mode === 'payment'
      ? product.stripeOneTimePriceId
      : billingCycle === 'yearly'
      ? product.stripePriceYearlyId
      : product.stripePriceMonthlyId;

  const price =
    mode === 'payment'
      ? product.oneTime
      : billingCycle === 'yearly'
      ? product.priceYearly
      : product.priceMonthly;

  return {
    id: product.id,
    billingCycle: mode === 'subscription' ? billingCycle : undefined,
    stripePriceId,
    price,
    title: product.title,
    imageUrl: product.imageUrl || product.gallery?.[0] || '',
    mode,
  };
}
