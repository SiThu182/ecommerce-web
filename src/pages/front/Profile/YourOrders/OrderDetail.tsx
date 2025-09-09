import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchOrderDetailInfo,
  OrderAddress,
  OrderData,
  ProductData,
  Variation,
} from "@/api/axiosClient";

export interface OrderItem {
  id: number;
  product: ProductData;
  variation: Variation;
  quantity: number;
  price?: number;
}

export interface ItemProps {
  item: OrderItem;
}

// OrderDetail.tsx
interface OrderDetailProps {
  orderId: number;
  onBack: () => void;
}

const CartItem: React.FC<ItemProps> = ({ item }) => {
  console.log(item.variation.images[0].url, "Itemss");
  const [itemQuantity] = useState(item.quantity);

  const totalPrice = (item?.price || 0) * itemQuantity;

  return (
    <div className="grid grid-cols-5 items-center border-b border-gray-300 py-4 space-x-4 border my-1 rounded">
      <div className="col-span-2 flex items-center gap-4">
        <img
          src={`${
            import.meta.env.VITE_APP_BACKEND_URL +
            "/uploads/" +
            item.variation.images[0].url
          }`}
          crossOrigin="anonymous"
          alt={item.variation.product?.name}
          className="w-16 h-16 rounded-md"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {item.variation?.product.name}
          </h2>
          <p className="text-gray-600">{item.variation.product.description}</p>
          <p className="text-gray-600">
            {item.variation.colorAttribute?.value}{" "}
            {item.variation.sizeAttribute?.value}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-400">${item.price}</p>
      <p className="text-sm text-gray-400">{item.quantity}</p>
      <p className="text-sm text-gray-400">${totalPrice}</p>
    </div>
  );
};

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, onBack }) => {
  const { data, error, isLoading } = useQuery<OrderData, Error>({
    queryKey: ["order-detail", orderId],
    queryFn: () => fetchOrderDetailInfo(orderId.toString()),
    enabled: orderId !== null && orderId > 0, // Prevent query when orderId is invalid
    retry: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes cache
  });

  const parseAddress = (address: OrderAddress | string | undefined) => {
    console.log("Address :", address);
    try {
      // If it's already an object, return it
      if (typeof address === "object" && address !== null) {
        return address;
      }
      // If it's a string, parse it
      if (typeof address === "string") {
        return JSON.parse(address);
      }
      // If it's undefined/null, return empty object
      return {};
    } catch (error) {
      return {};
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full">
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to Orders
      </button>

      <div className="shadow-sm rounded-lg border-2 p-3">
        <div className="w-full max-w-[1500px] shadow-sm rounded-lg border-2 p-3">
          <div className="flex justify-between mb-6">
            {/* Order Details Section */}
            <div className="mb-6 w-1/2">
              <div className="flex justify-between mb-1">
                <div className="prose">
                  <h2>Order Details</h2>
                </div>
              </div>
              <div className="flex w-72 mb-1 text-gray-600">
                <p className="w-1/2">Order no:</p>
                <p className="w-1/2">{data?.invoiceNo}</p>
              </div>
              <div className="flex w-72 mb-1 text-gray-600">
                <p className="w-1/2">Order Date:</p>
                <p className="w-1/2">
                  {new Date(data?.orderDate ?? "").toLocaleDateString()}
                </p>
              </div>
              <div className="flex w-72 mb-1 text-gray-600">
                <p className="w-1/2">Tracking Number:</p>
                <p className="w-1/2">{data?.invoiceNo}</p>
              </div>
              <div className="flex w-72 mb-1 text-gray-600">
                <p className="w-1/2">Shipping Fee:</p>
                <p className="w-1/2">${data?.shippingFees || 0} AUD</p>
              </div>
            </div>

            {/* Billing Information Section */}
            <div className="mb-6 w-1/2">
              <div className="prose">
                <h3>Billing Information</h3>
              </div>
              <div className="rounded-md shadow-sm p-2 flex gap-5 relative">
                <div className="absolute top-3 right-3 z-10">
                  <svg
                    width="18"
                    className="cursor-pointer"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 0C4.02975 0 0 4.02975 0 9C0 13.9703 4.02975 18 9 18C13.9703 18 18 13.9703 18 9C18 4.02975 13.9703 0 9 0ZM9 13.6875C8.4825 13.6875 8.0625 13.2675 8.0625 12.75C8.0625 12.2325 8.4825 11.8125 9 11.8125C9.51825 11.8125 9.9375 12.2325 9.9375 12.75C9.9375 13.2675 9.51825 13.6875 9 13.6875ZM10.4708 9.2415C9.79275 9.97275 9.7605 10.377 9.7695 10.875H8.26575C8.2605 9.76875 8.28075 9.28125 9.339 8.274C9.76875 7.866 10.1077 7.54275 10.0605 6.90825C10.017 6.3045 9.513 5.98875 9.03675 5.98875C8.505 5.98875 7.88325 6.384 7.88325 7.4985H6.37575C6.37575 5.6985 7.4325 4.536 9.06825 4.536C9.84525 4.536 10.5247 4.79025 10.9808 5.25225C11.4082 5.68575 11.6295 6.28125 11.6213 6.97575C11.6093 8.013 10.9785 8.694 10.4708 9.2415Z"
                      fill="#89868D"
                    />
                  </svg>
                </div>
                <div className="">
                  <div className="flex w-96 mb-2 text-gray-600">
                    <p className="w-1/3">Billing Username:</p>
                    <p className="w-2/3">
                      {parseAddress(data?.address)?.name || " "}
                    </p>
                  </div>
                  <div className="flex w-96 mb-2 text-gray-600">
                    <p className="w-1/3">Phone:</p>
                    <p className="w-2/3">
                      {parseAddress(data?.address)?.phone_no || " "}
                    </p>
                  </div>
                  <div className="flex w-96 mb-2 text-gray-600">
                    <p className="w-1/3">Address:</p>
                    <p className="w-2/3">
                      {/* {data?.address.address}, {data?.address.subDistrict},{" "}
                      {data?.address.district}, {data?.address.province},{" "}
                      {data?.address.postal_code} */}
                      {parseAddress(data?.address)?.address || " "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product Detail Section */}
          <div className="mb-6">
            <div className="prose">
              <h3>Product Detail</h3>
            </div>
            {data !== null ? (
              <>
                <div className="grid grid-cols-5 font-medium text-gray-700 border-b border-gray-300 py-2 space-x-4 border p-4 rounded">
                  <div className="col-span-2">Product</div>
                  <div>Unit Price</div>
                  <div>Quantity</div>
                  <div>Total Price</div>
                </div>

                {data?.orderItems.map((item: OrderItem) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </>
            ) : (
              <p className="text-center">Cart Empty</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
