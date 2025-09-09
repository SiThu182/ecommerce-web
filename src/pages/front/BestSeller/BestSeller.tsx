// import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchBrand,
  // fetchProductDataByCategory,
  // fetchProductDetail,
  fetchPromotionProduct,
  // ProductData,
  // ProductDetails,
  // ProductTableData,
} from "@/api/axiosClient";
import { useNavigate } from "react-router";
// import { addToGuestCart, GuestCartItem } from "@/utils/cartStorage";
// import useAuthStatus from "@/hooks/useAuthStatus";
// import axiosClient from "@/api/axiosClient";
// import { useGuestCart } from "@/context/CartContext";
// import { MdKeyboardArrowRight } from "react-icons/md";
import Slider from "@/components/common/Slider";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuHeadset } from "react-icons/lu";
import CustomerSupport from "@/components/common/CustomerSupport";

// const fetchRelatedProducts = async (
//   categoryId: number,
//   page: number = 1,
//   limit: number = 10
// ) => {
//   const response = await axiosClient.get(`/client/related-products`, {
//     params: {
//       categoryId,
//       page,
//       limit,
//     },
//   });
//   return response.data;
// };

function BestSeller() {
  const navigate = useNavigate();
  // const [page, setPage] = useState<number>(1);
  // const { isLoggedIn } = useAuthStatus();
  // const queryClient = useQueryClient();
  // const { updateCartCount } = useGuestCart();

  // const state = useLocation();

  const { data: brands } = useQuery({
    queryKey: ["brand-list"],
    queryFn: () => fetchBrand(10), // Fetch data based on categoryId
  });

  const { data: bestSellerProduct } = useQuery({
    queryKey: ["promotion"], // Include categoryId in query key
    queryFn: () => fetchPromotionProduct(10, "best-seller"), // Fetch data based on categoryId
  });

  // const handleNavigate = (product: ProductData) => {
  //   navigate(
  //     "/" +
  //       product.category.name.toLowerCase() +
  //       "/product/" +
  //       product.name.toLowerCase().split(" ").join("-"),
  //     { state: { id: product.id } }
  //   );
  // };

  // const addToCart = async (product: ProductData) => {
  //   const cartItem: GuestCartItem = {
  //     id: product.id,
  //     productId: product.id,
  //     product: product,
  //     variation: product.variations[0],
  //     variationId: product.variations[0].id,
  //     quantity: 1,
  //   };

  //   if (isLoggedIn) {
  //     try {
  //       const response = await axiosClient.post("/client/cart", {
  //         userId: 1, // Replace this with actual user ID from auth context
  //         ...cartItem,
  //       });
  //       queryClient.invalidateQueries({ queryKey: ["cart"] });

  //       console.log("Item added to cart:", response.data);
  //     } catch (error) {
  //       console.error("Failed to add item to cart:", error);
  //     }
  //   } else {
  //     addToGuestCart(cartItem);
  //     updateCartCount(); // ✅ Triggers NavBar update
  //   }
  // };

  return (
    <>
      {/* Banner Image */}
      <div className="flex justify-center bg-cover mx-5 lg:mx-12">
        <img
          src="image/bestseller_banner1.png"
          alt="BestSeller Banner Image"
          className="my-5 lg:m-12 w-full h-full object-cover rounded-2xl"
        ></img>

        <div className="absolute top-44 lg:top-56 xl:top-64 right-0 z-10 mx-5 lg:mx-12 overflow-hidden">
          <div className="bg-blue-900 bg-opacity-50 rounded-l-2xl pl-6 lg:pl-10 pr-52 lg:pr-80 xl:pr-96 py-5 lg:py-6 xl:py-10 w-auto">
            <h2 className="text-xl lg:text-5xl font-song text-black">
              Easy to Carry
            </h2>
            <p className="text-white text-base lg:text-xl font-poppins font-medium my-5 xl:my-8">
              Enjoy Myanmar Snacks
            </p>
            <button
              className="mt-2 lg:mt-8 bg-blue-800 text-white px-4 xl:px-8 py-2 rounded-xl text-xs lg:text-sm font-medium"
              onClick={() => {
                navigate("/myanmar%20pork%20sausage/product", {
                  state: { id: 9 },
                });
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* Brand */}
      <div className="w-full flex justify-evenly items-center py-6 rounded bg-slate-300">
        {brands &&
          brands.length > 0 &&
          brands.map((brand, index) => (
            <img
              key={index}
              src={`${import.meta.env.VITE_APP_BACKEND_URL}/${brand.image}`}
              alt={`Brand ${index + 1}`}
              className="h-12"
              crossOrigin="anonymous"
            />
          ))}
        {/* <img src="/image/brand/img.png" alt="Brand 1" className="h-12" /> */}
      </div>

      <div className="flex ml-12 mt-4">
        <div className="h-8 w-4 bg-blue-800 rounded mr-1"></div>
        <span className="p-2 text-blue-700">This Month</span>
      </div>

      <div className="flex justify-between mx-12 mt-2 mb-2">
        <span className="text-2xl font-semibold leading-loose">
          Best Selling Products
        </span>
        {/* <button className="bg-blue-600 py-3 px-14 text-white rounded-xl">
          View All
        </button> */}
      </div>
      {/* Best Selling Product */}
      <div className="mx-12 ">
        {bestSellerProduct ? (
          <Slider products={bestSellerProduct?.data} />
        ) : (
          <p>{"Loading .."}</p>
        )}
      </div>

      <div className="flex ml-12 mt-4">
        <div className="h-8 w-4 bg-blue-800 rounded mr-1"></div>
        <span className="p-2 text-blue-700">Featured</span>
      </div>

      <div className="flex mx-12 mt-2 mb-2">
        <span className="text-2xl font-semibold leading-loose">
          New Arrival
        </span>
      </div>

      {/* Main Grid Container */}
      <div className="mx-12 max-h-[500px] flex gap-5">
        {/* Large left card - Onion Cheese Rolls */}
        <div className="w-1/2 bg-cover relative rounded-xl overflow-hidden">
          <img
            src="/image/new-arrival/new-arrival1.png"
            alt="Onion Cheese Rolls"
            className=""
          />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-lg font-semibold">Snacks</h2>
            <p className="text-sm">Onion Cheese Rolls</p>
            <button
              className="mt-2 inline-block text-blue-500 bg-white px-2 md:px-4 py-1 md:py-2 rounded-xl text-xs md:text-sm font-medium"
              onClick={() => {
                navigate("/onion%20cheese%20rolls/product", {
                  state: { id: 9 },
                });
              }}
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Right side container - grid for smaller cards */}
        <div className="w-1/2 flex flex-col gap-5">
          {/* Top right card - Assorted Cookies */}
          <div className="h-1/2 relative rounded-xl overflow-hidden">
            <img
              src="/image/new-arrival/new-arrival2.png"
              alt="Assorted Cookies"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-2 md:p-6 text-white">
              <h2 className="text-base md:text-lg font-semibold">Snacks</h2>
              <p className="text-xs md:text-sm">Assorted Cookies</p>
              <button
                className="mt-2 inline-block text-blue-500 bg-white px-2 md:px-4 py-1 md:py-2 rounded-xl  text-xs md:text-sm font-medium"
                onClick={() => {
                  navigate("/assorted%20cookie/product", {
                    state: { id: 9 },
                  });
                }}
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Bottom right container - flex for the two smallest cards */}
          <div className="h-1/2 flex justify-between gap-5">
            {/* Bottom-left card - Canned Food */}
            <div className="w-1/2 relative rounded-xl overflow-hidden">
              <img
                src="/image/new-arrival/new-arrival3.png"
                alt="Canned Food"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-2 md:p-6 text-white">
                <h2 className="text-sm md:text-lg font-semibold">
                  Canned Food
                </h2>
                <p className="text-xs md:text-sm">Eain Chat Curry</p>
                <button
                  className="mt-2 inline-block text-blue-500 bg-white px-2 md:px-4 py-1 md:py-2 rounded-xl  text-xs md:text-sm font-medium"
                  onClick={() => {
                    navigate("/eain%20chat%20curry/product", {
                      state: { id: 8 },
                    });
                  }}
                >
                  Shop Now
                </button>
              </div>
            </div>

            {/* Bottom-right card - Pickled Tea */}
            <div className="w-1/2 relative rounded-xl overflow-hidden">
              <img
                src="/image/new-arrival/new-arrival4.png"
                alt="Pickled Tea"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-2 md:p-6 text-white">
                <h2 className="text-sm md:text-lg font-semibold">
                  Pickled Tea
                </h2>
                <p className="text-xs md:text-sm">Shu Shal Laphat</p>
                <button
                  className="mt-2 inline-block text-blue-500 bg-white px-2 md:px-4 py-1 md:py-2 rounded-xl text-xs md:text-sm font-medium"
                  onClick={() => {
                    navigate("/pickle%20tea/product", {
                      state: { id: 3 },
                    });
                  }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-end items-end mx-12 mt-10">
        <div className="flex items-center space-x-1">
          <button className="text-gray-600 rounded-xl">View All</button>
          <MdKeyboardArrowRight className="text-2xl" />
        </div>
      </div> */}

      {/* New Arrival Product, now the same with Best Sellerr Project */}
      <div className="mx-12 mt-10">
        {bestSellerProduct ? (
          <Slider products={bestSellerProduct?.data} />
        ) : (
          <p>{"Loading .."}</p>
        )}
      </div>
      <CustomerSupport />
    </>
  );
}
export default BestSeller;
