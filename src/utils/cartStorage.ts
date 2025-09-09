 const CART_KEY = "guest_cart";
import axiosClient, {
  ProductData,
  Variation, 
} from "@/api/axiosClient";

export interface GuestCartItem {
  id: number;
  productId: number;
  product: ProductData;
  variation: Variation;
  variationId: number;
  quantity: number;
}

export function getGuestCart(): GuestCartItem[] {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveGuestCart(cart: GuestCartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToGuestCart(item: GuestCartItem, onCartChange?: () => void) {
  const cart = getGuestCart();
  const existing = cart.find(
    (i) => i.product?.id === item.product?.id && i.variation?.id === item.variation?.id
  );
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveGuestCart(cart);
  if (onCartChange) onCartChange();
}

export function removeFromGuestCart(item: GuestCartItem, onCartChange?: () => void) {
  const cart = getGuestCart();
  const existing = cart.find(
    (i) => i.product?.id === item.product?.id && i.variation?.id === item.variation?.id
  );
  if (existing) {
    if (existing.quantity > 1) {
      existing.quantity -= 1;
    } else {
      const index = cart.indexOf(existing);
      cart.splice(index, 1);
    }
    saveGuestCart(cart);
    if (onCartChange) onCartChange();
  }
}

export function clearGuestCart(onCartChange?: () => void) {
  localStorage.removeItem(CART_KEY);
  if (onCartChange) onCartChange();
}

export const storeTempCartData = async () => {
  const guestCart = getGuestCart();
  if (guestCart.length > 0) {
    for (const item of guestCart) {
      await axiosClient.post("/client/cart", {
        productId: item.product?.id,
        variationId: item.variation?.id || null,
        quantity: item.quantity,
      });
    }
    clearGuestCart();
  }
};