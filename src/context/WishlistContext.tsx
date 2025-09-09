 import React, { createContext, useContext } from "react";
import { useWishlist, WishlistItem } from "@/hooks/useWishlist";
import { ProductData, Variation } from "@/api/axiosClient";

type WishlistContextType = {
  wishlist: WishlistItem[];
  count: number;
  addToWishlist: (product: ProductData | undefined, variation: Variation | undefined) => Promise<void>;
  removeFromWishlist: (productId: number | undefined, variationId: number | undefined) => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const wishlistHook = useWishlist();
  return (
    <WishlistContext.Provider value={wishlistHook}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlistContext must be used within a WishlistProvider");
  }
  return context;
};