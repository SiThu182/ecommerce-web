import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient, {
  ProductData,
  Variation,
  fetchCartData,
  fetchPromotionProduct,
} from "@/api/axiosClient";
import { FaChevronLeft } from "react-icons/fa";
import useAuthStatus from "@/hooks/useAuthStatus";
import {
  getGuestCart,
  // GuestCartItem,
  // addToGuestCart,
  // saveGuestCart,
  // removeFromGuestCart
} from "@/utils/cartStorage";
import { useGuestCart } from "@/context/CartContext";
import { handleAddToCart, handleRemoveFromCart } from "@/store/cartStore";
import toast from "react-hot-toast";
// import { use } from "i18next";

export interface CartItem {
  id: number;
  productId: number;
  product: ProductData;
  variation: Variation;
  variationId: number;
  quantity: number;
  price?: number;
}

interface CartItemProps {
  item: CartItem;
  onRemove: (item: CartItem) => void;
  onAdd: (item: CartItem) => void;
  handleSelectItem: (item: CartItem) => void;
  selectItem: CartItem[];
}

const CartItemCard: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onAdd,
  handleSelectItem,
  selectItem,
}) => {
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const [outOfStock, setOutOfStock] = useState(false);
  const navigate = useNavigate();

  const salePrice =
    Number(item?.product.variations[0].prices[0].sale_price) || 0;

  const discountedPrice =
    item?.product?.discount?.isActive &&
    item?.product?.discount?.isFlashSale &&
    item?.product?.discount?.discountType === "FIXED"
      ? salePrice - (item?.product?.discount?.value ?? 0)
      : salePrice -
        salePrice *
          (item?.product?.discount?.value
            ? (item?.product?.discount?.value || 0) / 100
            : 0);

  useEffect(() => {
    setItemQuantity(item.quantity);
    const stock = item?.variation?.stock ?? -1;
    setOutOfStock(stock <= 0);
  }, [item.quantity, item?.variation?.stock]);

  const handleQuantityChange = async (type: "increment" | "decrement") => {
    const stock = item.variation.stock ?? 0; // Use 0 if stock is undefined
    const value = Math.min(Number(itemQuantity), stock);
    console.log(value, "value", itemQuantity, "itemQuantity", stock);
    const newQuantity =
      type === "increment" ? itemQuantity + 1 : itemQuantity - 1;

    if (value <= 0) {
      alert("stock limit");
      return;
    }
    if (type === "increment") {
      if (stock < newQuantity) {
        // Show error message (implementation depends on your UI framework)
        toast.error(`Insufficient stock! Only ${stock} available.`);
        return; // Exit the function early
      }
      await onAdd(item);
    } else if (type === "decrement" && itemQuantity >= 1) {
      await onRemove(item);
    }
    setItemQuantity(newQuantity);
    if (selectItem.length > 0) {
      handleSelectItem({ ...item, quantity: newQuantity });
    }
  };

  const handleNavigate = () => {
    navigate(
      "/" +
        item.product?.category?.name.toLowerCase() +
        "/product/" +
        item.product.name.toLowerCase().split(" ").join("-"),
      { state: { id: item.product.id } }
    );
  };

  const totalPrice = item?.product?.discount?.isActive
    ? discountedPrice
    : item.variation.prices[0]?.sale_price ?? 0;

  return (
    <div className="flex justify-between gap-4 border p-3 rounded shadow-sm items-center">
      <input
        type="checkbox"
        disabled={item?.variation?.stock <= 0}
        className={`w-5 h-5 ${
          item?.variation?.stock <= 0
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        }`}
        onChange={() => handleSelectItem(item)}
      />
      <img
        src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/${
          item.product.variations[0].images[0]?.url
        }`}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded"
        crossOrigin="anonymous"
      />
      <div className="flex-1">
        <h3
          className="font-semibold hover:text-blue-600 cursor-pointer"
          onClick={handleNavigate}
        >
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500">{item.product.description}</p>
        <p className="text-sm text-gray-400">
          {item.variation.weight
            ? `Weight: ${item.variation.weight} grams`
            : "No weight specified"}
        </p>
        {/* <p className="text-sm font-semibold mt-1">
          $ {item.variation.prices[0]?.sale_price ?? "0"}
        </p> */}
        <p className="text-sm font-semibold mt-1">
          {item?.product?.discount?.isActive === true ? (
            <span className=" font-semibold">
              <span className="text-gray-500 line-through">
                $
                {item?.product.variations[0]?.prices[0].sale_price ||
                  "Loading ..."}
              </span>
              {item?.product?.discount?.discountType === "FIXED" ? (
                <span className="border rounded border-orange-500 text-orange-500 px-1 ml-2">
                  ${item?.product?.discount?.value} Off
                </span>
              ) : (
                <span className="border rounded border-orange-500 text-orange-500 px-1 ml-2">
                  {item?.product?.discount?.value}% Off
                </span>
              )}{" "}
              ${discountedPrice} AUD
            </span>
          ) : (
            <span>
              $
              {item?.product.variations[0]?.prices[0].sale_price ||
                "Loading..."}{" "}
              AUD
            </span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {outOfStock ? (
          <span className="text-red-600 font-semibold">Out of Stock</span>
        ) : (
          <>
            <button
              onClick={() => handleQuantityChange("decrement")}
              className="border px-2 rounded"
            >
              –
            </button>
            <span>{itemQuantity}</span>

            <button
              onClick={() => handleQuantityChange("increment")}
              className="border px-2 rounded"
            >
              +
            </button>
          </>
        )}
      </div>
      <p className="font-semibold w-20 text-right">$ {totalPrice.toFixed(2)}</p>
      <button
        onClick={() => onRemove(item)}
        className="text-red-500 text-sm hover:underline"
      >
        Remove
      </button>
    </div>
  );
};

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthStatus();

  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [totalWeight, setTotalWeight] = useState(0);
  const [shippingFees, setShippingFees] = useState(0);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { updateCartCount } = useGuestCart();

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartData,
    enabled: isLoggedIn,
  });

  const { data: promotionData } = useQuery({
    queryKey: ["promotion"],
    queryFn: () => fetchPromotionProduct(4),
  });

  // useEffect(() => {
  //   if (cartData?.cartItem) {
  //     setCartItems(cartData.cartItem);
  //   }
  // }, [cartData]);
  useEffect(() => {
    if (isLoggedIn) {
      // Logged-in: load from API (React Query already fetches)
      console.log(cartData, "Cart Data");
      if (cartData?.cartItem) {
        setCartItems(cartData.cartItem);
      } else {
        setCartItems([]);
      }
    } else {
      // Guest mode: load from local storage
      const guestCart = getGuestCart();

      // Convert GuestCartItem[] → CartItem[] with full product data
      // Normally you'd need to fetch the product details from your backend
      // For now, let's assume you have an endpoint to batch fetch by product/variation IDs
      if (guestCart.length > 0) {
        const formattedGuestCart: CartItem[] = guestCart.map((item) => ({
          id: item.id, // or generate unique id
          productId: item.productId,
          product: item.product, // ensure product data is stored in guest cart
          variation: item.variation,
          variationId: item.variationId,
          quantity: item.quantity,
        }));
        setCartItems(formattedGuestCart);
      } else {
        setCartItems([]);
      }
    }
  }, [isLoggedIn, cartData, cartItems]);

  const removeItemFromCart = async (item: CartItem) => {
    handleRemoveFromCart(item, isLoggedIn, queryClient, updateCartCount);
    // if (isLoggedIn) {
    //   try {
    //     await axiosClient.delete(`/client/cart/item/${itemId}`);
    //     queryClient.invalidateQueries({ queryKey: ["cart"] });
    //   } catch (error) {
    //     console.error("Failed to remove item from cart:", error);
    //   }
    // } else {
    //    if (item) {
    //   removeFromGuestCart(item);
    //   setCartItems(getGuestCart());
    // } else {
    //   // fallback: remove by id
    //   const updatedCart = getGuestCart().filter((i) => i.id !== itemId);
    //   saveGuestCart(updatedCart);
    //   setCartItems(updatedCart);
    // }
    // }
  };

  const handleNavigate = (item: CartItem) => {
    navigate(
      "/" +
        item.product?.category?.name.toLowerCase() +
        "/product/" +
        item.product.name.toLowerCase().split(" ").join("-"),
      { state: { id: item.product.id } }
    );
  };

  const addToCart = async (item: CartItem) => {
    await handleAddToCart(item, isLoggedIn, queryClient, updateCartCount);

    // if (isLoggedIn) {
    //   try {
    //     await axiosClient.post("/client/cart", {  // Replace with actual user ID
    //       productId: item.product.id,
    //       variationId: item.variation.id,
    //       quantity: 1,
    //     });
    //     queryClient.invalidateQueries({ queryKey: ["cart"] });
    //   } catch (error) {
    //     console.error("Failed to add item to cart:", error);
    //   }
    // } else {

    //   addToGuestCart({
    //     id:item.id,
    //     productId:item.product.id,
    //     product: item.product,
    //     variation: item.variation,
    //     variationId:item.variation.id,
    //     quantity: 1,
    //   });

    //   // const updatedGuestCart = getGuestCart();
    //   const updatedItems = [...cartItems];
    //   const existingIndex = updatedItems.findIndex(
    //     (i) => i.product.id === item.product.id && i.variation.id === item.variation.id
    //   );
    //   if (existingIndex !== -1) {
    //     updatedItems[existingIndex].quantity += 1;
    //   } else {
    //     updatedItems.push(item);
    //   }
    //   saveGuestCart(updatedItems)
    //   setCartItems(updatedItems);
    // }
    // For guest users, update the cartItems state so the UI reflects the new quantity
  };

  useEffect(() => {
    if (selectedItems.length === 0) {
      setSubtotal(0);
      setTotalWeight(0);
      setDiscount(0);
      setShippingFees(0);
      setTotal(0);
      return;
    }

    // Calculate original subtotal (without any discounts)
    // const originalSubtotal = selectedItems.reduce(
    //   (acc, item) =>
    //     acc +
    //     (Number(item.variation.prices[0].sale_price) || 0) * item.quantity,
    //   0
    // );

    // Calculate discounted subtotal and individual item discounts
    const { discountedSubtotal, totalDiscount } = selectedItems.reduce(
      (acc, item) => {
        const salePrice = Number(item.variation.prices[0].sale_price) || 0;
        const originalItemTotal = salePrice * item.quantity;

        // Calculate discounted price for each item
        const discountedPrice =
          item.product?.discount?.isActive &&
          item.product?.discount?.isFlashSale
            ? item.product.discount.discountType === "FIXED"
              ? Math.max(0, salePrice - (item.product.discount.value ?? 0))
              : salePrice -
                salePrice * ((item.product.discount.value ?? 0) / 100)
            : salePrice;

        const discountedItemTotal = discountedPrice * item.quantity;
        const itemDiscount = originalItemTotal - discountedItemTotal;

        return {
          discountedSubtotal: acc.discountedSubtotal + discountedItemTotal,
          totalDiscount: acc.totalDiscount + itemDiscount,
        };
      },
      { discountedSubtotal: 0, totalDiscount: 0 }
    );

    const newTotalWeight =
      selectedItems.reduce(
        (acc, item) => acc + item.variation.weight * item.quantity,
        0
      ) / 1000;

    setSubtotal(discountedSubtotal);
    setTotalWeight(newTotalWeight);
    setDiscount(totalDiscount); // Set the total discount amount

    axiosClient
      .get(`/client/shipping-fees?weight=${newTotalWeight}`)
      .then((res) => {
        const shippingCost = res.data.price;
        setShippingFees(shippingCost);
        setTotal(discountedSubtotal + shippingCost);
      })
      .catch(() => {
        setShippingFees(0);
        setTotal(discountedSubtotal);
      });
  }, [selectedItems]);

  const handleSelectItem = (item: CartItem) => {
    setSelectedItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        if (prevItems[existingIndex].quantity === item.quantity) {
          return prevItems.filter((_, index) => index !== existingIndex);
        }
        // Otherwise update the quantity
        return prevItems.map((existingItem, index) =>
          index === existingIndex
            ? { ...existingItem, quantity: item.quantity }
            : existingItem
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      if (selectedItems.length === 0) {
        toast.error("Please select at least one product to checkout.");
        return;
      }
      navigate("/checkout", { state: { selectedItems, shippingFees } });
    } else {
      navigate("/login-register");
    }
  };

  useEffect(() => {}, [updateCartCount]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {cartItems.length ? (
          <div className="w-full lg:w-2/3 space-y-4">
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onRemove={removeItemFromCart}
                onAdd={addToCart}
                handleSelectItem={handleSelectItem}
                selectItem={selectedItems}
              />
            ))}
          </div>
        ) : (
          <p className="w-full lg:w-2/3 text-center text-gray-500">
            Cart is empty.
          </p>
        )}

        {/* Summary */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-4 rounded shadow-md space-y-3 max-h-[350px] overflow-y-auto">
          <div className="flex justify-between">
            <span>Total Weight</span>
            <span>{totalWeight} KG</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>$ {discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>$ {shippingFees}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>$ {total.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      <div>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <FaChevronLeft /> Continue Shopping
        </button>
      </div>

      {/* Promotions */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-2">Popular with your order</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {promotionData?.data.map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded shadow-sm text-center"
            >
              <img
                src={`${import.meta.env.VITE_APP_BACKEND_URL}/uploads/${
                  item.images[0]?.url
                }`}
                alt={item.name}
                className="w-full h-40 object-cover mb-2 rounded"
                crossOrigin="anonymous"
              />
              <h3
                className="text-sm text-start font-semibold my-3 hover:text-blue-600 cursor-pointer"
                onClick={() =>
                  handleNavigate({
                    id: item.id,
                    productId: item.id,
                    product: item,
                    variation: item.variations[0],
                    variationId: item.variations[0].id,
                    quantity: 1,
                  })
                }
              >
                {item.name}
              </h3>
              <div className="flex items-center justify-between mt-1">
                <p className="font-semibold text-sm">
                  $ {item.variations?.[0]?.prices?.[0]?.sale_price ?? "0"} AUD
                </p>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      productId: item.id,
                      product: item,
                      variation: item.variations[0],
                      variationId: item.variations[0].id,
                      quantity: 1,
                    })
                  }
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-blue-500 text-white rounded-2xl mt-10 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <h3 className="text-3xl md:text-4xl font-bold text-left md:w-1/2 leading-tight">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h3>
        <div className="flex flex-col gap-4 w-full md:w-1/2 max-w-md">
          <div className="flex items-center bg-white rounded-full px-4 py-2">
            <svg
              className="w-5 h-5 text-gray-400 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 12l10 7 10-7"
              />
            </svg>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent outline-none text-black placeholder-gray-400"
            />
          </div>
          <button className="bg-white text-blue-500 rounded-full py-2 font-semibold hover:bg-blue-100 transition">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
