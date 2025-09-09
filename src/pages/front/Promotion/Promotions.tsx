import {
  fetchBrand,
  fetchFlashSaleProductData,
  fetchPromotionProduct,
  ProductTableData,
} from "@/api/axiosClient";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuHeadset } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import Slider from "@/components/common/Slider";
// import CategoryAccordion from "@/components/common/CategoryAccordion";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import PromotionCountdown from "./Countdown";
import PromotionCategoryAccordion from "@/components/common/PromoionCategoryAccordion";
import ProductCard from "@/components/common/ProductCard";
import CustomerSupport from "@/components/common/CustomerSupport";

function Promotions() {
  const nav = useNavigate();
  const { data: brands } = useQuery({
    queryKey: ["brand-list"],
    queryFn: () => fetchBrand(10),
  });

  const { data: bestSellerProduct } = useQuery({
    queryKey: ["promotion"], // Include categoryId in query key
    queryFn: () => fetchPromotionProduct(10, "best-seller"), // Fetch data based on categoryId
  });

  const { data } = useQuery<ProductTableData, Error>({
    queryKey: ["tableData"], // Include page and limit in query key
    queryFn: fetchFlashSaleProductData, // Pass page and limit to fetch function
  });

  return (
    <>
      <div className="">
        <div className="flex mx-5 lg:mx-8 my-3">
          <div className="w-1/4 mr-2 text-xs md:text-sm">
            <PromotionCategoryAccordion />
          </div>
          <div className="bg-gray-400 w-px h-auto m-2"></div>
          <div className="h-fit w-3/4 flex justify-center my-auto ml-3 bg-[#7097f2] rounded-xl">
            <div className="col-span-3 my-3 lg:my-5 ml-5 lg:ml-10 mr-0 w-full">
              <div className="flex flex-col items-start">
                <img
                  src="/image/logo.png"
                  alt="Logo Image"
                  className="h-24 lg:h-26 w-28 Lg:w-32"
                />
                <h2 className="font-song text-xl md:text-3xl xl:text-5xl leading-normal mb-2 lg:mb-8">
                  Up to 20 % Off <br /> Voucher
                </h2>
                <button
                  className="text-white flex underline underline-offset-8 mb-4"
                  onClick={() => nav("/flash-sale")}
                >
                  Buy Now <FaArrowRight className="mt-1 ml-1 text-xs" />
                </button>
              </div>
            </div>
            <div className="col-span-1 flex justify-end w-2/3">
              <img
                src="/image/promotions/promotion-image.png"
                alt="Promotion Cover"
                className=""
              />
            </div>
            {/* <img
              src="/image/promotions/promotion-cover.png"
              alt="Promotion Cover"
              className=""
            /> */}
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
        </div>

        <div className="flex ml-12 mt-4">
          <div className="h-8 w-4 bg-blue-800 rounded mr-1"></div>
          <span className="p-2 text-blue-700">Today's</span>
        </div>

        <div className="flex justify-between mx-12 mt-2 mb-2">
          <span className="text-2xl font-semibold leading-relaxed ">
            Flash Sales
          </span>
          <PromotionCountdown
            targetDate="2025-09-15T18:00:00"
            textWhite={false}
          />
          <button
            className="bg-blue-600 py-[1.5px] px-6 text-white rounded-xl"
            onClick={() => nav("/flash-sale")}
          >
            View All
          </button>
        </div>

        {/* Sale Product */}
        {/* <div className="mx-12 "> */}
        <div className="mx-10 w-fit flex gap-[10px] flex-wrap mb-5">
          {data &&
            data?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        <div className="flex ml-12 mt-4">
          <div className="h-8 w-4 bg-blue-800 rounded mr-1"></div>
          <span className="p-2 text-blue-700">This Month</span>
        </div>

        <div className="flex justify-between mx-12 mt-2 mb-2">
          <span className="text-2xl font-semibold leading-loose">
            Best Selling Products
          </span>
        </div>

        {/* Best Selling Product */}
        <div className="mx-12 ">
          {bestSellerProduct ? (
            <Slider products={bestSellerProduct?.data} />
          ) : (
            <p>{"Loading .."}</p>
          )}
        </div>

        {/* Promotion Cover-2 */}

        {/* <div className="flex bg-cover my-5 mx-10 "> */}
        <div
          // className="relative flex justify-center items-center my-5 mx-10 h-96"
          className="relative flex justify-start items-start my-5 mx-10 h-auto min-h-fit"
          style={{
            backgroundImage: "url('/image/promotions/promotion-cover2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="my-5 xl:my-20 ml-5 lg:ml-10 xl:ml-28 flex flex-col justify-start items-start">
            <h2 className="text-2xl lg:text-5xl text-white font-song my-3 lg:my-10">
              Enjoy Myanmar <br />
              Best Tea
            </h2>
            <PromotionCountdown
              targetDate="2025-09-15T18:00:00"
              textWhite={true}
            />
            <button
              className="bg-blue-600 py-2 px-6 text-white rounded-xl mt-3 lg:mt-10"
              onClick={() => nav("/flash-sale")}
            >
              Buy Now
            </button>
          </div>
        </div>
        <CustomerSupport />
      </div>
    </>
  );
}
export default Promotions;
