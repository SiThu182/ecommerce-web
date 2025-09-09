import { ProductData, Variation } from "@/api/axiosClient";
import React from "react";
import { useNavigate } from "react-router";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useGuestCart } from "@/context/CartContext";
// import { addToGuestCart, GuestCartItem } from "@/utils/cartStorage";
import useAuthStatus from "@/hooks/useAuthStatus";
import { useQueryClient } from "@tanstack/react-query";
import { WishlistItem } from "@/hooks/useWishlist";
import { useWishlistContext } from "@/context/WishlistContext";

import { handleAddToCart } from "@/store/cartStore";

export interface CartItem {
  id: number;
  productId: number;
  product: ProductData;
  variation: Variation;
  variationId: number;
  quantity: number;
}

interface ProductCardProps {
  product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.images[0]?.url || "/image/no-image-available.jpg";
  // const fullImageUrl = product.images[0]?.url
  //   ? import.meta.env.VITE_APP_BACKEND_URL + "/uploads/" + imageUrl
  //   : imageUrl;
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStatus();
  const { updateCartCount } = useGuestCart();
  const queryClient = useQueryClient();
  const { addToWishlist, wishlist, removeFromWishlist } = useWishlistContext();
  const isInWishlist = wishlist.some(
    (w: WishlistItem) =>
      w.product?.id === product.id &&
      w.variation?.id === product.variations[0]?.id
  );
  const price =
    product.variations.length > 0 && product.variations[0].prices.length > 0
      ? `${product.variations[0].prices[0].sale_price}`
      : "Price not available";

  const salePrice =
    product.variations.length > 0 && product.variations[0].prices.length > 0
      ? Number(product.variations[0].prices[0].sale_price)
      : 0;

  const discountedPrice =
    product?.discount?.isActive === true &&
    product?.discount?.isFlashSale &&
    product?.discount?.discountType === "FIXED"
      ? salePrice - (product?.discount?.value ?? 0)
      : salePrice - salePrice * (product?.discount?.value / 100);

  const handleNavigate = () => {
    console.log(product, "Product 40");
    navigate(
      "/" +
        product.categories[0].name.toLowerCase() +
        "/product/" +
        product.name.toLowerCase().split(" ").join("-"),
      { state: { id: product.id } }
    );
  };

  const addToCart = async (item: CartItem) => {
    await handleAddToCart(item, isLoggedIn, queryClient, updateCartCount);

    //   const cartItem : GuestCartItem= {
    //   id: product.id,
    //   productId: product.id,
    //   product:product,
    //   variationId: product.variations[0].id,
    //   variation: product.variations[0],
    //   quantity : 1,
    // };

    //   if (isLoggedIn) {
    //       try {
    //         alert("Adding item to cart...");
    //         const response = await axiosClient.post("/client/cart", {
    //             userId: 1, // Replace this with actual user ID from auth context
    //             ...cartItem,
    //           });
    //               queryClient.invalidateQueries({ queryKey: ["cart"] });

    //         console.log("Item added to cart:", response.data);
    //       } catch (error) {
    //         console.error("Failed to add item to cart:", error);
    //       }
    //   } else {
    //       addToGuestCart(cartItem);
    //       updateCartCount(); // ✅ Triggers NavBar update
    //   }
  };

  return (
    <div className="relative w-[220px]  max-h-[370px] lg:max-h-[445px] rounded-xl border p-2 shadow hover:shadow-lg bg-white flex flex-col justify-between gap-1 transition-all duration-200">
      {/* Heart Icon */}
      <div className="flex justify-between">
        {product?.discount?.isActive === true && (
          <span className="absolute border border-red-500 text-white bg-red-600 rounded-xl px-2 text-xs font-bold leading-none flex items-center justify-center h-5">
            {product?.discount?.discountType === "FIXED"
              ? `-$${product?.discount?.value}`
              : `-${product?.discount?.value}%`}
          </span>
        )}
        <div className="absolute top-2 right-2 text-gray-400 hover:text-red-400 cursor-pointer bg-gray-200 rounded-tr-xl rounded-bl-xl">
          <button
            onClick={() =>
              isInWishlist
                ? removeFromWishlist(product?.id, product.variations[0]?.id)
                : addToWishlist(product, product.variations[0])
            }
            // disabled={isInWishlist}
            className={`flex items-center px-4 py-2     ${
              isInWishlist ? "text-red-500 " : "text-white-500 "
            } hover:bg-orange-100 transition-colors`}
          >
            {isInWishlist ? <FaHeart /> : <FaRegHeart size={18} />}
          </button>
        </div>
      </div>

      {/* Image */}
      <div
        onClick={handleNavigate}
        className="cursor-pointer bg-white p-2 flex items-center justify-center"
      >
        <img
          src={`${
            product.images[0]?.url
              ? import.meta.env.VITE_APP_BACKEND_URL + "/uploads/" + imageUrl
              : imageUrl
          }`}
          alt={product.name}
          className="w-full object-contain h-[200px]"
          crossOrigin="anonymous"
        />
      </div>

      {/* Details */}
      <div className="px-2 flex flex-col justify-between">
        <h2
          className="font-semibold text-sm lg:text-base cursor-pointer hover:text-blue-500"
          onClick={handleNavigate}
        >
          {product.name}
        </h2>
      </div>
      <div className="px-2">
        <p className="text-xs lg:text-sm text-gray-500 ">
          {product.description.length > 100
            ? product.description.slice(0, 100) + "..."
            : product.description}
        </p>
      </div>
      <div className="px-2">
        <p className="text-xs lg:text-sm text-gray-500">
          {product.variations.length > 0 &&
            product.variations[0].id &&
            `${product.variations[0].weight} grams`}
        </p>

        {/* Rating */}
        {/* <div className="flex items-center gap-1 text-yellow-400 text-sm">
          {"★".repeat(4)}★
          <span className="text-gray-600 ml-2">4.5/5</span>
        </div> */}

        {/* Price and Add Button */}
        <div className="flex justify-between items-center">
          {product?.discount?.isActive === true ? (
            <span className="text-blue-600 font-semibold">
              ${discountedPrice} AUD{" "}
              <span className="text-gray-500 line-through">${price}</span>
            </span>
          ) : (
            <span className="text-blue-600 font-semibold">${price} AUD</span>
          )}

          {product.variations[0].stock > 0 ? (
            // <span className="text-green-500 text-sm">In Stock</span>
            <button
              className="flex items-center gap-2 bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
              onClick={() =>
                addToCart({
                  id: product.id,
                  productId: product.id,
                  product: product,
                  variation: product.variations[0],
                  variationId: product.variations[0].id,
                  quantity: 1,
                })
              }
            >
              <FaShoppingCart />
              Add
            </button>
          ) : (
            <span className="text-red-500 text-sm font-semibold">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
