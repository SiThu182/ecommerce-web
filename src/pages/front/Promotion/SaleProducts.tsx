import {
  fetchFlashSaleProductData,
  // fetchProductData,
  ProductTableData,
} from "@/api/axiosClient";
import ProductCard from "@/components/common/ProductCard";
import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
import PromotionCountdown from "./Countdown";
import { CiDeliveryTruck } from "react-icons/ci";
import { LuHeadset } from "react-icons/lu";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

function SaleProducts() {
  // const [page] = useState<number>(1);
  const { data, error, isLoading } = useQuery<ProductTableData, Error>({
    queryKey: ["tableData"], // Include page and limit in query key
    queryFn: fetchFlashSaleProductData, // Pass page and limit to fetch function
  });
  console.log(error, isLoading);
  return (
    <>
      <div>
        <div className="object-cover mx-10 overflow-hidden my-12">
          <img
            src="/image/promotions/flashsale-cover.png"
            alt="Flash Sale Cover"
            className=""
          />
        </div>
        <div className="flex ml-12 mt-4">
          <div className="h-8 w-4 bg-blue-800 rounded mr-1"></div>
          <span className="p-2 text-blue-700">Today's</span>
        </div>

        <div className="flex gap-5 mx-12 mt-2 mb-2">
          <span className="text-3xl font-inter font-semibold leading-relaxed p-2">
            Flash Sales
          </span>
          <PromotionCountdown
            targetDate="2025-09-15T18:00:00"
            textWhite={false}
          />
        </div>
        <div className="mx-10 w-fit flex gap-[10px] flex-wrap mb-5">
          {data &&
            data?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>

        <div className="font-poppins flex item-center gap-20 xl:gap-32 justify-center mx-12 my-10">
          <div className="flex flex-col gap-2 items-center text-center">
            <div className="rounded-full p-2 bg-gray-400 mb-3">
              <CiDeliveryTruck className="text-4xl text-white bg-blue-900 rounded-full" />
            </div>
            <h3 className="font-semibold text-lg">FAST AND FREE DELIVERY</h3>
            <span className="text-xs">
              {" "}
              Free Delivery for all orders over $200
            </span>
          </div>

          <div className="flex flex-col gap-2 items-center text-center">
            <div className="rounded-full p-2 bg-gray-400 mb-3">
              <LuHeadset className="text-4xl text-white p-1 bg-blue-900 rounded-full" />
            </div>
            <h3 className="font-semibold text-lg">24/7 CUSTOMER SERVICE</h3>
            <span className="text-xs"> Friendly 24/7 Customer Support</span>
          </div>

          <div className="flex flex-col gap-2 items-center text-center">
            <div className="rounded-full p-2 bg-gray-400 mb-3">
              <IoShieldCheckmarkOutline className="text-4xl text-white p-1 bg-blue-900 rounded-full" />
            </div>
            <h3 className="font-semibold text-lg">MONEY BACK GUARANTEE</h3>
            <span className="text-xs"> Money Back Guarantee in 30 days</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default SaleProducts;
