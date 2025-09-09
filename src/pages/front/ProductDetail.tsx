import React, { useState, useEffect } from "react";
import ProductShowcase from "@/components/common/ProductShowcase";
import { useQuery } from "@tanstack/react-query";
import axiosClient, {
  fetchProductDetail,
  ProductDetails,
  Variation,
  fetchPromotionProduct,
} from "@/api/axiosClient";
import Slider from "@/components/common/Slider";
import { useLocation } from "react-router";
import useAuthStatus from "@/hooks/useAuthStatus";
import { useGuestCart } from "@/context/CartContext";
import { addToGuestCart, GuestCartItem } from "@/utils/cartStorage";
import { useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // npm install react-icons

import { WishlistItem } from "@/hooks/useWishlist";
import { useWishlistContext } from "@/context/WishlistContext";
import toast from "react-hot-toast";

const fetchRelatedProducts = async (
  categoryId: number,
  page: number = 1,
  limit: number = 10
) => {
  const response = await axiosClient.get(`/client/related-products`, {
    params: {
      categoryId,
      page,
      limit,
    },
  });
  return response.data;
};

// const mockReviews = [
//   {
//     id: 1,
//     user: "John Doe",
//     rating: 4,
//     comment: "Great product!",
//     createdAt: "2024-11-20T10:26:44.000Z",
//   },
//   {
//     id: 2,
//     user: "Jane Smith",
//     rating: 5,
//     comment: "Excellent quality!",
//     createdAt: "2024-11-21T10:26:44.000Z",
//   },
// ];

// interface wishlistProps{
//   wishItem: WishList[];
// }

const ProductDetail: React.FC = () => {
  const state = useLocation();

  const { data, error, isLoading } = useQuery<ProductDetails, Error>({
    queryKey: [state.state?.id], // Include categoryId in query key
    queryFn: () => fetchProductDetail(state.state?.id), // Fetch data based on categoryId
    //  enabled: !!state.state?.id,
  });
  const { isLoggedIn } = useAuthStatus();
  // const [added, setAdded] = useState(false);

  const { updateCartCount } = useGuestCart();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("details");
  const { addToWishlist, wishlist } = useWishlistContext();
  // const { data : wishlist } = useQuery({
  //         queryKey: ["fetch-wishlist"],
  //     queryFn: () => fetchWishlist(), // Fetch data based on categoryId
  //   });
  const [currentImage, setCurrentImage] = useState<string>();
  const [selectedVariant, setSelectedVariant] = useState<Variation>();
  const [quantity, setQuantity] = useState<number>(1);
  // const [rating, setRating] = useState<number>(0);
  // const [comment, setComment] = useState<string>("");
  // const [reviews, setReviews] = useState(mockReviews);
  const salePrice =
    Number(data?.product.variations[0].prices[0].sale_price) || 0;
  console.log(
    "Sale Price ",
    salePrice,
    "Discount : ",
    data?.product?.discount?.value,
    "value "
  );
  const discountedPrice =
    data?.product?.discount?.isFlashSale &&
    data?.product?.discount?.discountType === "FIXED"
      ? salePrice - (data?.product?.discount?.value ?? 0)
      : salePrice -
        salePrice *
          (data?.product?.discount?.value
            ? (data?.product?.discount?.value || 0) / 100
            : 0);

  console.log(data, "product detail data");

  const isInWishlist = wishlist.some(
    (w: WishlistItem) =>
      w.product?.id === data?.product.id &&
      w.variation?.id === selectedVariant?.id
  );

  const {
    data: relatedProducts,
    // isLoading: isLoadingRelated,
    // error: relatedError,
  } = useQuery({
    queryKey: ["relatedProducts", data?.product?.categories[0]?.id],
    queryFn: () =>
      fetchRelatedProducts(data ? data?.product?.categories[0]?.id : 1), //we need to sent  multiple category id to backend
    enabled: !!data?.product?.categories[0]?.id,
  });

  const { data: bestSellerProduct } = useQuery({
    queryKey: ["promotion"], // Include categoryId in query key
    queryFn: () => fetchPromotionProduct(10, "best-seller"), // Fetch data based on categoryId
  });

  useEffect(() => {
    if (data?.product?.productType === "SINGLE") {
      setSelectedVariant(data?.product.variations[0]);
    }
  }, [data?.product?.productType, data?.product?.variations]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  // const sortedCategories = Array.isArray(data?.categoryHierarchy)
  //   ? data.categoryHierarchy.sort((a, b) => a.nested_level - b.nested_level)
  //   : [];

  const images = [
    ...(data?.product.images?.map((image) => ({
      original: image.url,
      thumbnail: image.url,
    })) || []), // Handle undefined images in data
    ...(data?.product.variations?.flatMap((variation) =>
      variation.images.map((image) => ({
        original: image.url,
        thumbnail: image.url,
      }))
    ) || []), // Handle undefined variations in data
  ];

  const handleVariantChange = (variantId: number) => {
    const selectedVariantData = data?.product.variations.find(
      (variation) => variation.id === variantId
    );
    console.log(
      selectedVariantData,
      "variant Data",
      selectedVariant,
      variantId
    );
    if (selectedVariantData && selectedVariantData.images.length > 0) {
      setSelectedVariant(selectedVariantData);
      setCurrentImage(selectedVariantData.images[0].url);
      console.log(selectedVariantData, "variant Data", selectedVariant);

      setQuantity(1); // Reset quantity when changing variant
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stock = selectedVariant?.stock ?? 0; // Use 0 if stock is undefined
    const value = Math.min(Number(event.target.value), stock);
    setQuantity(value);
  };

  const addToCart = async () => {
    if (!selectedVariant) {
      toast.error("Please select a variant.");
      return;
    }

    const cartItem: GuestCartItem = {
      id: data.product.id || 1,
      productId: data.product.id,
      product: data.product,
      variationId: selectedVariant?.id,
      variation: selectedVariant,
      quantity,
    };

    if (isLoggedIn) {
      try {
        const response = await axiosClient.post("/client/cart", {
          userId: 1, // Replace this with actual user ID from auth context
          ...cartItem,
        });
        queryClient.invalidateQueries({ queryKey: ["cart"] });

        console.log("Item added to cart:", response.data);
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    } else {
      addToGuestCart(cartItem);
      updateCartCount(); // ✅ Triggers NavBar update
    }
  };

  // const handleAddToWish = async (productId: Number | undefined,variationId: Number | undefined) => {

  //     try {
  //       await axiosClient.post('/client/wishlist', { productId,variationId}); // Adjust this API URL
  //       setAdded(true);
  //     } catch (error) {
  //       console.error('Failed to add to wishlist:', error);
  //     }
  // };

  // const handleRatingChange = (newRating: number) => {
  //   setRating(newRating);
  // };

  // const submitReview = () => {
  //   const newReview = {
  //     id: reviews.length + 1,
  //     user: "Anonymous", // Replace with actual user name
  //     rating,
  //     comment,
  //     createdAt: new Date().toISOString(),
  //   };
  //   setReviews([...reviews, newReview]);
  //   setRating(0);
  //   setComment("");
  // };

  return (
    <div className="min-h-[70vh] flex max-w-[1600px] justify-center mx-auto">
      <section className="w-full p-10">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            {/* {sortedCategories.map((category) => (
              <li key={category.id}>
                <a href={`/category/${category.slug}`}>{category.name}</a>
              </li>
            ))} */}
            <li>{data?.product.name}</li>
          </ul>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <ProductShowcase
              images={images}
              currentImage={currentImage || images[0]?.original || ""}
            />
          </div>

          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-2xl font-bold">
              {data?.product.name || "Loading..."}
            </h1>
            <p className="text-primary">
              Price :{" "}
              {data?.product?.discount?.isActive === true ? (
                <span className=" font-semibold">
                  ${discountedPrice} AUD{" "}
                  <span className="text-gray-500 line-through">
                    $
                    {data?.product.variations[0]?.prices[0].sale_price ||
                      "Loading ..."}
                  </span>
                  {data?.product?.discount?.discountType === "FIXED" ? (
                    <span className="border rounded border-orange-500 text-orange-500 px-1 ml-2">
                      ${data?.product?.discount?.value} Off
                    </span>
                  ) : (
                    <span className="border rounded border-orange-500 text-orange-500 px-1 ml-2">
                      {data?.product?.discount?.value}% Off
                    </span>
                  )}
                </span>
              ) : (
                <span>
                  $
                  {data?.product.variations[0]?.prices[0].sale_price ||
                    "Loading..."}{" "}
                  AUD
                </span>
              )}
            </p>
            {data.product.productType === "VARIANTS" && (
              <div className="space-y-4">
                {data?.product.variations.map((variation) => (
                  <label
                    key={variation.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      name="variant"
                      value={variation.id}
                      className="form-radio radio-primary"
                      onChange={() => handleVariantChange(variation.id)}
                    />
                    <span>
                      {variation.colorAttribute?.value}
                      {variation.sizeAttribute?.value && (
                        <>/ {variation.sizeAttribute?.value}</>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            )}

            <p className="mb-4">{data?.product.description}</p>
            {selectedVariant && (
              <p className="mb-4"> Weight : {selectedVariant.weight}g</p>
            )}

            <p className="mb-4">
              {data.product.categories &&
                data.product.categories.length > 0 && (
                  <>
                    {/* <span>
                  {data.product.categories.length > 1 ? "Categories" : "Category"} :
                </span> */}
                    <span>
                      {data.product.categories.length > 1 ? (
                        <div className="  flex-wrap gap-1 mb-1 inline">
                          {data.product.categories.map(
                            (cat: { id: number; name: string }) => (
                              <span
                                key={cat.id}
                                className="bg-blue-600 text-gray-50 text-sm px-2 py-1 rounded mr-1"
                              >
                                {cat.name}
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        <span className="bg-blue-600 text-gray-50 text-sm px-2 py-0.5 rounded ml-2">
                          {data.product.categories[0].name}
                        </span>
                      )}
                    </span>
                  </>
                )}
            </p>

            <div className="flex flex-wrap items-center space-x-4 mt-4">
              {selectedVariant && selectedVariant.stock > 0 ? (
                <span>Available Quantity: {selectedVariant.stock}</span>
              ) : (
                <span className="font-semibold text-red-600">Out of Stock</span>
              )}

              <input
                type="number"
                min="1"
                max={selectedVariant?.stock}
                value={quantity}
                onChange={handleQuantityChange}
                className="form-input input input-bordered w-20"
              />
              <button
                disabled={selectedVariant && selectedVariant.stock <= 0}
                className="bg-primary btn text-white px-4 py-2 rounded"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            </div>
            <button
              onClick={() => addToWishlist(data?.product, selectedVariant)}
              disabled={isInWishlist}
              className={`flex items-center px-4 py-2 border rounded ${
                isInWishlist
                  ? "text-red-500 border-red-500"
                  : "text-orange-500 border-orange-500"
              } hover:bg-orange-100 transition-colors`}
            >
              {isInWishlist ? (
                <FaHeart className="mr-2" />
              ) : (
                <FaRegHeart className="mr-2" />
              )}
              {isInWishlist ? "Added to wishlist" : "Add to wishlist"}
            </button>
          </div>
        </div>
        <div role="tablist" className="tabs tabs-bordered w-full mt-10">
          <a
            role="tab"
            className={`tab text-lg ${
              activeTab === "details" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("details")}
          >
            Product Details
          </a>
          <a
            role="tab"
            className={`tab text-lg ${
              activeTab === "myanmar" ? "tab-active" : ""
            }`}
            onClick={() => setActiveTab("myanmar")}
          >
            အသေးစိတ်ဖော်ပြရန်
          </a>
          {/* <a
            role="tab"
            className={`tab text-lg ${activeTab === "reviews" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Rating & Reviews
          </a> */}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === "details" && (
            <div className="p-4">
              {/* Your product detail content here */}
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data?.product?.ingredient ?? ""),
                }}
              />
            </div>
          )}
          {activeTab === "myanmar" && (
            <div className="p-4">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    data?.product?.ingredient_mm ?? ""
                  ),
                }}
              />
            </div>
          )}
          {/* {activeTab === "reviews" && (
              <div className="h-40vh overflow-scroll no-scrollbar">
                <div className="mt-8">
                  <h2 className="text-xl font-semibold ">Submit a Review</h2>
                  <div className="rating">
                    <input
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-yellow-400"
                      value="1"
                      checked={rating === 1}
                      onChange={() => handleRatingChange(1)}
                    />
                    <input
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-yellow-400"
                      value="2"
                      checked={rating === 2}
                      onChange={() => handleRatingChange(2)}
                    />
                    <input
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-yellow-400"
                      value="3"
                      checked={rating === 3}
                      onChange={() => handleRatingChange(3)}
                    />
                    <input
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-yellow-400"
                      value="4"
                      checked={rating === 4}
                      onChange={() => handleRatingChange(4)}
                    />
                    <input
                      type="radio"
                      name="rating"
                      className="mask mask-star-2 bg-yellow-400"
                      value="5"
                      checked={rating === 5}
                      onChange={() => handleRatingChange(5)}
                    />
                  </div>

                  <textarea
                    className="textarea textarea-primary block w-full"
                    placeholder="Write your review here..."
                    value={comment}
                    rows={3}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end">
                    <button
                      className="bg-primary btn text-white px-4 py-2 rounded mt-2"
                      onClick={submitReview}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold ">Reviews</h2>
                  <div className="max-h-[30vh] overflow-y-auto scrollbar-hide">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 py-2"
                      >
                        <div className="flex items-center">
                          <span className="font-semibold ">{review.user}</span>
                          <div className="rating ml-2">
                            {[...Array(5)].map((_, index) => (
                              <input
                                key={index}
                                type="radio"
                                name={`rating-${review.id}`}
                                className="mask mask-star-2 bg-yellow-400"
                                checked={review.rating === index + 1}
                                readOnly
                              />
                            ))}
                          </div>
                        </div>
                        <p className="">{review.comment}</p>
                        <span className="text-gray-400 text-sm">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div> 
          )} */}
        </div>
        <div className="mt-8">
          {isLoading ? (
            <p className="">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error loading related products</p>
          ) : (
            <div className="">
              <h2 className="font-song text-4xl my-10 text-center">
                You might also like
              </h2>
              {relatedProducts ? (
                <Slider products={relatedProducts?.data} />
              ) : (
                <p>{"Loading .."}</p>
              )}
            </div>
          )}
        </div>
        <div className="mt-8">
          {isLoading ? (
            <p className="">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error loading related products</p>
          ) : (
            <div className="">
              <h2 className="font-lato font-semibold text-4xl mt-10 mb-2">
                Best Sellers
              </h2>
              <hr className="border-t-2 border-blue-500 mb-6 w-64" />
              {bestSellerProduct ? (
                <Slider products={bestSellerProduct?.data} />
              ) : (
                <p>{"Loading .."}</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
