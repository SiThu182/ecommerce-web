import axiosClient from "@/api/axiosClient";
import { addToGuestCart, removeFromGuestCart } from "@/utils/cartStorage";
import { CartItem } from "@/components/common/ProductCard";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

 

export async function handleAddToCart(
  item: CartItem,
  isLoggedIn: boolean,
  queryClient?: QueryClient,
  updateCartCount?: () => void
) {
  
  if (isLoggedIn) {
    {
      item?.variation?.stock <= 0 &&
        toast.error("Item is currently out of stock");
    }
    try {
      await axiosClient.post("/client/cart", {
        productId: item.product.id,
        variationId: item.variation.id,
        quantity: 1,
      });

      console.log("Added");
      toast.success("Item added to cart successfully!");
      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
    } catch (error) {
      console.log("Not Added");
      if (error instanceof Error) {
        toast.error(error.message || "Failed to add item to cart");
      } else {
        toast.error("Failed to add item to cart");
      }
      console.error("Failed to add item to cart:", error);
    }
  } else {
    addToGuestCart({
      id: item.id,
      productId: item.product.id,
      product: item.product,
      variation: item.variation,
      variationId: item.variation.id,
      quantity: 1,
    });
    console.log("Added");
    toast.success("Item added to cart successfully!");
    // Optionally update cart count in context
    if (updateCartCount) updateCartCount();

    // Optionally update cartItems state in your component:
    // (if you want to return the updated cart)
    // return getGuestCart();
  }
}

export async function handleRemoveFromCart(
  item: CartItem,
  isLoggedIn: boolean,
  queryClient?: QueryClient,
  updateCartCount?: () => void
) {
  if (isLoggedIn) {
    
    try {
      // await axiosClient.post("/client/cart", {
      //   productId: item.product.id,
      //   variationId: item.variation.id,
      //   quantity: 1, // or the quantity you want to remove
      // });
       await axiosClient.delete(`/client/cart/item/${item.id}`);
      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  } else {
    removeFromGuestCart({
      id: item.id,
      productId: item.product.id,
      product: item.product,
      variation: item.variation,
      variationId: item.variation.id,
      quantity: 1,
    });
    if (updateCartCount) updateCartCount();
    // Optionally return getGuestCart();
  }
}
