import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import {
  fetchProductData,
  ProductTableData,
  fetchProductDataByCategory,
  fetchCategories,
  ProductData,
  fetchBrand,
  fetchPromotionProduct,
} from "@/api/axiosClient";
// import Categories from "@/components/CategoryComponents";
import Carousel from "@/components/common/Carousel";
import ProductCard from "@/components/common/ProductCard";
import CategoryAccordion from "@/components/common/CategoryAccordion";
import { useNavigate } from "react-router";
import { useGuestCart } from "@/context/CartContext";

//  import Slider from "react-slick";
// import PromotionItem from "@/components/common/Promotionitem";
import { addToGuestCart, GuestCartItem } from "@/utils/cartStorage";
import useAuthStatus from "@/hooks/useAuthStatus";
import axiosClient from "@/api/axiosClient";
import BurmeseBoxSection from "./BurmeseBox";
import Slider from "@/components/common/Slider";

// const sliderSettings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 3,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// };

interface Category {
  id: number;
  name: string;
  productCount?: number;
  children?: Category[];
  image?: string; // Optional image field for category
}

function LandingPage() {
  // const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const { isLoggedIn } = useAuthStatus();
  const queryClient = useQueryClient();
  const { updateCartCount } = useGuestCart();

  const { data, error, isLoading } = useQuery<ProductTableData, Error>({
    queryKey: ["tableData", page, 4], // Include page and limit in query key
    queryFn: () => fetchProductData(page, 12), // Pass page and limit to fetch function
  });

  const { data: dataPC } = useQuery<ProductTableData, Error>({
    queryKey: ["tableData", page, 10], // Include page and limit in query key
    queryFn: () => fetchProductDataByCategory(1, page, 4), // Pass page and limit to fetch function
  });

  const { data: bestSellerProduct } = useQuery({
    queryKey: ["promotion"], // Include categoryId in query key
    queryFn: () => fetchPromotionProduct(10, "best-seller"), // Fetch data based on categoryId
  });

  //  const {
  //       data: brands
  //     } = useQuery<BrandData[], Error>({
  //       queryKey: ["brand-list"],
  //       queryFn : () =>  fetchBrand(10),
  //     });

  const { data: brands } = useQuery({
    queryKey: ["brand-list"],
    queryFn: () => fetchBrand(10), // Fetch data based on categoryId
  });

  const { data: categories } = useQuery<Category[], Error>({
    queryKey: ["categoriesWithCount"],
    queryFn: fetchCategories,
  });
  const navigate = useNavigate();

  // const brands = [
  //   "/image/brand/b1.png",
  //   "/image/brand/b2.png",
  //   "/image/brand/b3.png",
  //   "/image/brand/b4.png",
  //   "/image/brand/b5.png",
  //   "/image/brand/b6.png",
  //   "/image/brand/b7.png",
  // ];

  const handleNavigate = (product: ProductData) => {
    navigate(
      "/" +
        product.category.name.toLowerCase() +
        "/product/" +
        product.name.toLowerCase().split(" ").join("-"),
      { state: { id: product.id } }
    );
  };

  const addToCart = async (product: ProductData) => {
    const cartItem: GuestCartItem = {
      id: product.id,
      productId: product.id,
      product: product,
      variation: product.variations[0],
      variationId: product.variations[0].id,
      quantity: 1,
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

  return (
    <div className="bg-base-100">
      <main className="bg-base-100 max-w-[1650px] w-full mx-auto">
        <Carousel />
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
        {/* 3 Cards */}
        <div className="w-full mt-4 flex flex-col md:flex-row gap-2 lg:gap-6 justify-center items-stretch px-4 mb-10">
          {/* Card 1 */}
          <div className="flex-1 bg-orange-200 rounded-xl p-0 pl-2 lg:p-6 flex justify-between items-center min-h-[150px] sm:min-h-[230px] min-w-[250px] lg:min-w-[300px] max-w-[400px]">
            <div className="flex flex-col justify-between">
              <h4 className="font-bold text-base lg:text-lg mb-2">
                Authentic Touch: Dried Prawns & Goods
              </h4>
              <button
                className="w-2/3 sm:w-full mt-6 bg-white text-gray-700 px-4 py-2 rounded-full  text-xs sm:text-sm lg:text-base font-normal lg:font-semibold shadow hover:bg-gray-100 transition"
                onClick={() =>
                  navigate(
                    "/dried%20fish,%20meat%20&%20fish%20crackers%20(ငါးခြောက်အမျိုးမျိုး%20နှင့်%20ငါးမုန့်ခြောက်)/product",
                    { state: { id: 1 } }
                  )
                }
              >
                Shop Now →
              </button>
            </div>
            <img
              src="/image/categories/Prawns.png"
              alt="Dried Prawns"
              className="w-32 h-32 object-contain"
            />
          </div>

          {/* Card 2 */}
          <div className="flex-1 bg-pink-200 rounded-xl p-0 pl-2 lg:p-6 flex justify-between items-center min-h-[150px] sm:min-h-[230px] min-w-[250px] lg:min-w-[300px] max-w-[400px]">
            <div className="flex flex-col justify-between">
              <h4 className="font-bold text-base lg:text-lg mb-2">
                Quick & Tasty: Canned Burmese Favorites
              </h4>
              <button
                className="w-2/3 sm:w-full mt-6 bg-white text-gray-700 px-4 py-2 rounded-full  text-xs sm:text-sm lg:text-base font-normal lg:font-semibold shadow hover:bg-gray-100 transition"
                onClick={() =>
                  navigate("/myanmar%20pork%20sausage11/product", {
                    state: { id: 8 },
                  })
                }
              >
                Shop Now →
              </button>
            </div>
            <img
              src="/image/categories/Canned.png"
              alt="Canned"
              className="w-32 h-32 object-contain"
            />
          </div>

          {/* Card 3 */}
          <div className="flex-1 bg-yellow-200 rounded-xl p-0 pl-2 lg:p-6 flex justify-between items-center min-h-[150px] sm:min-h-[230px] min-w-[250px] lg:min-w-[300px] max-w-[400px]">
            <div className="flex flex-col justify-between">
              <h4 className="font-bold text-base lg:text-lg mb-2">
                Taste of Tea Shop: Burmese Tea Mix
              </h4>
              <button
                className="w-2/3 sm:w-full mt-6 bg-white text-gray-700 px-4 py-2 rounded-full text-xs sm:text-sm lg:text-base font-normal lg:font-semibold shadow hover:bg-gray-100 transition"
                onClick={() =>
                  navigate(
                    "/taste%20of%20tea%20shop:%20burmese%20tea%20mix/product",
                    { state: { id: 3 } }
                  )
                }
              >
                Shop Now →
              </button>
            </div>
            <img
              src="/image/categories/Tea.png"
              alt="Tea Mix"
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>

        {/* Top Categories */}
        <div className="w-full px-4 mb-8">
          <h2 className="text-2xl font-bold mb-4">Top Categories</h2>
          <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-2">
            {categories &&
              categories.map((cat, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[150px] bg-white p-4 rounded shadow hover:shadow-md transition cursor-pointer"
                  onClick={() =>
                    navigate("/" + cat.name.toLocaleLowerCase() + "/product", {
                      state: { id: cat.id },
                    })
                  }
                >
                  <img
                    src={`${
                      cat.image
                        ? import.meta.env.VITE_APP_BACKEND_URL + "/" + cat.image
                        : "/image/brand/b7.png"
                    }`}
                    alt={cat.name}
                    className="h-28 mx-auto object-contain mb-2"
                    crossOrigin="anonymous"
                  />
                  <span className="text-sm font-semibold text-center block">
                    {cat.name}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Product List */}
        <div className="w-full px-4 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              All Products - Dried Fish & Fish Cracker
            </h2>
            <button
              className="text-blue-500 text-sm font-semibold hover:underline"
              onClick={() =>
                navigate(
                  "/quick%20&%20tasty:%20canned%20burmese%20favorites/product",
                  {
                    state: 1,
                  }
                )
              }
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* {[
              {
                name: "Eain Chat Burmese Coconut Noodle Paste",
                img: "/image/products/noodle.png",
                price: "$6.25",
                rating: 4.5,
              },
              {
                name: "Eain Chat Boiled Peas",
                img: "/image/products/boiled-peas.png",
                price: "$6.25",
                rating: 4.5,
              },
              {
                name: "Best Burmese Mote Hin Khar Paste",
                img: "/image/products/mhk-paste.png",
                price: "$6.25",
                rating: 5.0,
              },
              {
                name: "Eain Chat Burmese Chicken Biryani",
                img: "/image/products/biryani.png",
                price: "$12",
                rating: 4.0,
              },
            ].map((product, index) => ( */}
            {dataPC &&
              dataPC?.data?.length > 0 &&
              dataPC.data.map((product, index) => (
                <div
                  key={index}
                  className="border p-4 flex flex-col justify-between rounded-xl shadow hover:shadow-md transition cursor-pointer"
                >
                  <img
                    onClick={() => handleNavigate(product)}
                    src={`${
                      product.images[0]?.url
                        ? import.meta.env.VITE_APP_BACKEND_URL +
                          "/uploads/" +
                          product.images[0].url
                        : "/image/products/default.png"
                    }`}
                    alt={product.name}
                    className="h-40 mx-auto object-contain mb-4"
                    crossOrigin="anonymous"
                  />
                  <h3 className="text-sm font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold">
                      {product.variations.length > 0 &&
                      product.variations[0].prices.length > 0
                        ? `$ ${product.variations[0].prices[0].sale_price} AUD`
                        : "Price not available"}
                    </span>
                    <button
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => addToCart(product)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="relative flex px-1 lg:px-5 w-full flex-col overflow-hidden bg-base-100">
          <div className="z-10">
            {/* <section className="flex justify-center   my-20 w-full">
              <Categories />
            </section> */}

            <section className="w-full gap-[60px] flex flex-col">
              <div className="flex flex-col">
                {isLoading && (
                  <span className="loading loading-spinner loading-lg"></span>
                )}
                {error && <div>Error: {error.message}</div>}
                <div className="flex items-start gap-1 lg:gap-5">
                  <div className="flex-none max-w-[150px] lg:max-w-[250px] overflow-y-auto max-h-[850px]">
                    <CategoryAccordion />
                  </div>
                  <div className="flex-grow flex gap-[15px] flex-wrap">
                    {data &&
                      data?.data?.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>
                </div>
                <div className="join flex items-end justify-end my-5 bg-gray-100">
                  <button
                    className="join-item btn bg-gray-100"
                    onClick={() =>
                      setPage((prev) => (prev < 1 ? prev - 1 : prev))
                    }
                  >
                    «
                  </button>
                  <button className="join-item btn bg-gray-100">
                    Page {page}
                  </button>
                  <button
                    className="join-item btn bg-gray-100"
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    »
                  </button>
                </div>
              </div>
            </section>
            <section className="w-full gap-[60px] flex flex-col"></section>
          </div>
        </div>
      </main>

      {/* Best Selling Product */}
      <div className="px-4 py-2 my-2 bg-gray-100 border-t-2 border-gray-200">
        <h2 className="text-lg font-semibold text-gray-400 underline underline-offset-8 decoration-2 decoration-[#008eCC] ml-4 my-2">
          Best Seller
        </h2>
        {bestSellerProduct ? (
          <Slider products={bestSellerProduct?.data} />
        ) : (
          <p>{"Loading .."}</p>
        )}
      </div>

      <div className="min-h-full bg-gray-100 flex items-center justify-center">
        <BurmeseBoxSection />
      </div>
    </div>
  );
}

export default LandingPage;
