export function createCartItem(
  product: any,
  billingCycle: 'monthly' | 'yearly' = 'monthly'
) {
  return {
    id: product.id,
    billingCycle,
    stripePriceId:
      billingCycle === 'yearly'
        ? product.stripePriceYearlyId
        : product.stripePriceMonthlyId,
    price:
      billingCycle === 'yearly' ? product.priceYearly : product.priceMonthly,
    title: product.title,
    imageUrl: product.imageUrl || product.gallery?.[0] || '',
  };
}
