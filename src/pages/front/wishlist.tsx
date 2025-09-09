import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductData, fetchPromotionProduct } from "@/api/axiosClient";
import { WishlistItem } from "@/hooks/useWishlist";
import { useWishlistContext } from "@/context/WishlistContext";
import useAuthStatus from "@/hooks/useAuthStatus";
import { useGuestCart } from "@/context/CartContext";
import { handleAddToCart } from "@/store/cartStore";
import { CartItem } from "@/pages/front/Cart";

interface CartItemProps {
  item: WishlistItem;
  onRemove: (itemId: number) => void;
}

const ItemCard: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const navigate = useNavigate();
  const handleNavigate = (product: ProductData) => {
    navigate(
      "/" +
        product?.categories[0]?.name?.toLowerCase() +
        "/product/" +
        product?.name?.toLowerCase().split(" ").join("-"),
      { state: { id: product.id } }
    );
  };
  return (
    <tr className="border-b text-sm text-left align-middle">
      {/* Checkbox */}

      {/* Remove */}
      <td className="p-4">
        <button
          onClick={() => onRemove(item.product?.id || 1)}
          className="text-red-500 text-sm hover:underline"
        >
          X
        </button>
      </td>
      {/* Product image + info */}
      <td className="p-4">
        <div className="flex items-center gap-4">
          <img
            src={
              import.meta.env.VITE_APP_BACKEND_URL +
              "/uploads/" +
              item.variation?.images[0]?.url
            }
            alt={item.product?.name}
            className="w-16 h-16 object-cover rounded"
            crossOrigin="anonymous"
          />
          <div>
            <h3
              className="font-semibold text-orange-600 hover:underline cursor-pointer"
              onClick={() => item.product && handleNavigate(item.product)}
            >
              {item.product?.name}
            </h3>
            <p className="text-xs text-gray-500">{item.product?.description}</p>
            <p className="text-xs text-gray-400">
              {item.variation?.weight
                ? `Weight: ${item.variation?.weight} kg`
                : "No weight specified"}
            </p>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="p-4 text-orange-500 font-semibold whitespace-nowrap">
        $ {item.variation?.prices[0].sale_price} AUD
      </td>

      {/* Stock + Quantity control */}
      <td className="p-4">
        {item.variation?.stock ?? 0} Items
        {/* <div className="flex flex-col gap-2">
          <span className="text-green-600 text-sm">In Stock</span>
        </div> */}
      </td>
    </tr>
  );
};

const Wishlist: React.FC = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const { isLoggedIn } = useAuthStatus();
  const { updateCartCount } = useGuestCart();
  const { wishlist, removeFromWishlist } = useWishlistContext();
  const navigate = useNavigate();

  // const { data } = useQuery({
  //   queryKey: ["wishlist"],
  //   queryFn: fetchWishlist,
  //   enabled: isLoggedIn, // <-- only run if logged in

  // });

  const { data: promotionData } = useQuery({
    queryKey: ["promotion"], // Include categoryId in query key
    queryFn: () => fetchPromotionProduct(4), // Fetch data based on categoryId
  });

  const handleNavigate = (product: ProductData) => {
    navigate(
      "/" +
        product?.category?.name?.toLowerCase() +
        "/product/" +
        product?.name?.toLowerCase().split(" ").join("-"),
      { state: { id: product.id } }
    );
  };

  // const removeItemFromCart = async (itemId: number | undefined,variationId:number | undefined) => {
  //   try {
  //     await axiosClient.delete(`/client/wishlist/${itemId}/${variationId}`);
  //     queryClient.invalidateQueries({ queryKey: ["wishlist"] });
  //   } catch (error) {
  //     console.error("Failed to remove item from wishlist:", error);
  //   }
  // };

  const addToCart = async (item: CartItem) => {
    await handleAddToCart(item, isLoggedIn, queryClient, updateCartCount);

    // try {
    //   await axiosClient.post("/client/cart", {
    //     userId: 1, // Replace with actual user ID
    //     productId: item.product.id,
    //     variationId: item.variation.id,
    //     quantity: 1,
    //   });
    //   queryClient.invalidateQueries({ queryKey: ["cart"] });
    // } catch (error) {
    //   console.error("Failed to add item to cart:", error);
    // }
  };

  return (
    <div className="max-w-7xl mx-auto p-4  min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Wish</h1>

      <div className="flex flex-col gap-8 bg-white my-10 min-h-[300px] p-6 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="p-4"></th>
                <th className="p-4">PRODUCT NAME</th>
                <th className="p-4">UNIT PRICE</th>
                <th className="p-4">STOCK STATUS</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {wishlist && wishlist.length > 0 ? (
                wishlist.map((item: WishlistItem) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onRemove={() =>
                      removeFromWishlist(item.product?.id, item.variation?.id)
                    }
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 p-4">
                    No products added to the wishlist
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Promotion Section */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-2">Popular with your order</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {promotionData &&
            promotionData.data.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded shadow-sm text-center cursor-pointer hover:shadow-lg transition"
              >
                <img
                  onClick={() => handleNavigate(item)}
                  src={
                    import.meta.env.VITE_APP_BACKEND_URL +
                    "/uploads/" +
                    item.images[0]?.url
                  }
                  alt={item.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                  crossOrigin="anonymous"
                />
                <p
                  className="text-sm text-start my-3 cursor-pointer font-semibold hover:text-blue-600"
                  onClick={() => handleNavigate(item)}
                >
                  {item.name}
                </p>
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
      <div className="bg-blue-500 text-white rounded-2xl mt-10 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Heading */}
        <h3 className="text-3xl md:text-4xl font-bold text-left md:w-1/2 leading-tight">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h3>
        {/* Right: Input and Button */}
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

export default Wishlist;
