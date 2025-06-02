'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type BillingCycle = 'monthly' | 'yearly';

export interface CartProduct {
  id: string;
  quantity: number;
  stripePriceId: string;
  billingCycle: BillingCycle;
  price: string;
  title?: string;
  imageUrl?: string;
}

interface CartContextType {
  cartProducts: CartProduct[];
  addProduct: (product: Omit<CartProduct, 'quantity'>) => void;
  removeProduct: (id: string, billingCycle?: BillingCycle) => void;
  clearCart: () => void;
  hydrated: boolean;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart');
      if (stored) {
        try {
          setCartProducts(JSON.parse(stored));
        } catch (e) {
          console.error('Invalid cart data in localStorage');
        }
      }
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts, hydrated]);

  const addProduct = (product: Omit<CartProduct, 'quantity'>) => {
    setCartProducts((prev) => {
      const existing = prev.find(
        (p) => p.id === product.id && p.billingCycle === product.billingCycle
      );
      if (existing) {
        return prev.map((p) =>
          p.id === product.id && p.billingCycle === product.billingCycle
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeProduct = (id: string, billingCycle?: BillingCycle) => {
    setCartProducts((prev) => {
      const found = prev.find(
        (p) => p.id === id && p.billingCycle === billingCycle
      );
      if (!found) return prev;
      if (found.quantity === 1) {
        return prev.filter(
          (p) => !(p.id === id && p.billingCycle === billingCycle)
        );
      }
      return prev.map((p) =>
        p.id === id && p.billingCycle === billingCycle
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );
    });
  };

  const clearCart = () => setCartProducts([]);

  return (
    <CartContext.Provider
      value={{ cartProducts, addProduct, removeProduct, clearCart, hydrated }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
