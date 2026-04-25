import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load initial cart from local storage if needed, or keep empty
    const saved = localStorage.getItem('pos_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [taxRate, setTaxRate] = useState(11); // Default 11%
  const [taxEnabled, setTaxEnabled] = useState(true);

  // Fetch settings when app loads to get tax config
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setTaxRate(res.data.nilai_pajak);
        setTaxEnabled(res.data.pajak_aktif);
      } catch (error) {
        console.error('Error fetching settings for cart context:', error);
        // Fallback to local storage if API fails
        const localSettings = JSON.parse(localStorage.getItem('pos_settings') || '{}');
        if (localSettings.nilaiPajak !== undefined) setTaxRate(Number(localSettings.nilaiPajak));
        if (localSettings.pajakAktif !== undefined) setTaxEnabled(localSettings.pajakAktif);
      }
    };
    fetchSettings();
  }, []);

  // Save cart to local storage whenever it changes (optional but good for persistence on reload)
  useEffect(() => {
    localStorage.setItem('pos_cart', JSON.stringify(cart));
  }, [cart]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, qty: quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, increment) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          const newQty = item.qty + increment;
          return { ...item, qty: newQty > 0 ? newQty : 1 }; // prevent 0 or negative via update
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('pos_cart');
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxAmount = taxEnabled ? Math.round(subtotal * (taxRate / 100)) : 0;
  const discount = 0; // Future enhancement
  const total = subtotal + taxAmount - discount;
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        taxAmount,
        discount,
        total,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
