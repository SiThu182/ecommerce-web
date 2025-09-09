import { CiDeliveryTruck } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuHeadset } from "react-icons/lu";

export default function CustomerSupport() {
  return (
    <div className="font-poppins flex items-center gap-5 lg:gap-20 xl:gap-32 justify-center mx-5 lg:mx-12 my-10">
      <div className="flex flex-col gap-2 items-center text-center">
        <div className="rounded-full p-2 bg-gray-400 mb-3">
          <CiDeliveryTruck className="text-4xl text-white bg-blue-900 rounded-full" />
        </div>
        <h3 className="font-semibold text-xs sm:text-lg">
          FAST AND FREE DELIVERY
        </h3>
        <span className="text-xs"> Free Delivery for all orders over $200</span>
      </div>

      <div className="flex flex-col gap-2 items-center text-center">
        <div className="rounded-full p-2 bg-gray-400 mb-3">
          <LuHeadset className="text-4xl text-white p-1 bg-blue-900 rounded-full" />
        </div>
        <h3 className="font-semibold text-xs sm:text-lg">
          24/7 CUSTOMER SERVICE
        </h3>
        <span className="text-xs"> Friendly 24/7 Customer Support</span>
      </div>

      <div className="flex flex-col gap-2 items-center text-center">
        <div className="rounded-full p-2 bg-gray-400 mb-3">
          <IoShieldCheckmarkOutline className="text-4xl text-white p-1 bg-blue-900 rounded-full" />
        </div>
        <h3 className="font-semibold text-xs sm:text-lg">
          MONEY BACK GUARANTEE
        </h3>
        <span className="text-xs"> Money Back Guarantee in 30 days</span>
      </div>
    </div>
  );
}
