 import React, { createContext, useContext, useEffect, useState } from "react";

const getGuestCartFromStorage = () => {
  const stored = localStorage.getItem("guest_cart");
  return stored ? JSON.parse(stored) : [];
};

const countGuestCartItems = () => {
  const cart = getGuestCartFromStorage();
  return cart.reduce((total: number, item: any) => total + item.quantity, 0);
};

const CartContext = createContext<{
  cartCount: number;
  updateCartCount: () => void;
  resetCart: () => void;
} >({
  cartCount: 0,
  updateCartCount: () => {},
  resetCart: () => {},
});

export const GuestCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    
    setCartCount(countGuestCartItems());
  };

  const resetCart = () => {
    setCartCount(0);
    localStorage.removeItem("guest_cart");
  };

  useEffect(() => {
    updateCartCount(); // On mount

    // Listen for localStorage changes (cross-tab sync)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "guest_cart") {
        updateCartCount();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useGuestCart = () => useContext(CartContext);