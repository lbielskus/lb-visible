'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export type BillingCycle = 'monthly' | 'yearly';
export type Mode = 'payment' | 'subscription';

export interface CartProductBase {
  id: string;
  billingCycle?: BillingCycle;
  stripePriceId: string;
  price: string;
  title?: string;
  imageUrl?: string;
  mode: Mode;
}

export interface CartProduct extends CartProductBase {
  quantity: number;
}

interface CartContextType {
  cartProducts: CartProduct[];
  addProduct: (product: CartProductBase) => void;
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

  const addProduct = (product: CartProductBase) => {
    setCartProducts((prev) => {
      const existing = prev.find(
        (p) =>
          p.id === product.id &&
          p.billingCycle === product.billingCycle &&
          p.mode === product.mode
      );
      if (existing) {
        return prev.map((p) =>
          p.id === product.id &&
          p.billingCycle === product.billingCycle &&
          p.mode === product.mode
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
