import { useState, useEffect } from "react";
import axiosClient, { ProductData, Variation } from "@/api/axiosClient";
import useAuthStatus from "@/hooks/useAuthStatus";
import toast from "react-hot-toast";

export interface WishlistItem {
  id: number | undefined; // Product ID
  product: ProductData | undefined;
  variation: Variation | undefined;
}
const WISHLIST_KEY = "guest_wishlist";

// interface UseWishlistProps {
//   isLoggedIn: boolean;
// }

export const storeWlTempToDb = async () => {
  let stored = localStorage.getItem(WISHLIST_KEY);
  let wishlist = stored ? JSON.parse(stored) : [];
  if (wishlist.length > 0) {
    for (const item of wishlist) {
      let productId = item.product?.id;
      let variationId = item.variation?.id;
      await axiosClient.post("/client/wishlist", { productId, variationId });
    }
    localStorage.removeItem(WISHLIST_KEY);
  }
};

export function useWishlist() {
  //{ isLoggedIn }: UseWishlistProps
  const { isLoggedIn } = useAuthStatus();

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Fetch wishlist from correct source
  useEffect(() => {
    const fetchWishlist = async () => {
      if (isLoggedIn) {
        try {
          const res = await axiosClient.get("/client/get-wishlist-by-id");
          setWishlist(res.data);
        } catch (err) {
          console.error("Error fetching wishlist:", err);
        }
      } else {
        try {
          const stored = localStorage.getItem(WISHLIST_KEY);
          setWishlist(stored ? JSON.parse(stored) : []);
        } catch (err) {
          console.error("Invalid wishlist in localStorage:", err);
          setWishlist([]);
        }
      }

      console.log("Wishlist fetched:", wishlist);
    };

    fetchWishlist();
  }, [isLoggedIn]);

  // Add to wishlist
  const addToWishlist = async (
    product: ProductData | undefined,
    variation: Variation | undefined
  ) => {
    let item: WishlistItem = {
      id: product?.id,
      product: product,
      variation: variation,
    };
    if (isLoggedIn) {
      let productId = item?.id;
      let variationId = variation?.id;
      await axiosClient.post("/client/wishlist", { productId, variationId });
      setWishlist((prev) => [...prev, item]);
    } else {
      const updated = [...wishlist, item];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
      setWishlist(updated);
    }

    toast.success("Item added to wishlist");
  };

  // Remove from wishlist
  // const removeFromWishlist = async (productId: number | undefined,variationId:number | undefined)  => {
  //   alert("Removing item from wishlist...");
  //   if (isLoggedIn) {
  //     await axiosClient.delete(`/client/wishlist/${productId}/${variationId}`);
  //     setWishlist(prev => prev.filter(item => item.id !== productId));
  //   } else {
  //     const updated = wishlist.filter(item => item.id !== productId);
  //     localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  //     setWishlist(updated);
  //   }

  // };

  const removeFromWishlist = async (
    productId: number | undefined,
    variationId: number | undefined
  ) => {
    if (isLoggedIn) {
      await axiosClient.delete(`/client/wishlist/${productId}/${variationId}`);
      setWishlist((prev) =>
        prev.filter(
          (item) =>
            !(
              item.product?.id === productId &&
              item.variation?.id === variationId
            )
        )
      );
    } else {
      const updated = wishlist.filter(
        (item) =>
          !(
            item.product?.id === productId && item.variation?.id === variationId
          )
      );
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
      setWishlist(updated);
    }
  };

  return {
    wishlist,
    count: wishlist.length,
    addToWishlist,
    removeFromWishlist,
  };
}
