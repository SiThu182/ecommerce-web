import { OrderData, TableOrderData, fetchTableData } from "@/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
// import { useNavigate } from "react-router";
import OrderDetail, { OrderItem } from "./OrderDetail";
import Pagination from "@/components/Pagination";
import { MdOutlineAddToHomeScreen } from "react-icons/md";

interface OrderListProps {
  onOrderSelect: (orderId: number) => void;
  orderStatus?:
    | "AllOrders"
    | "Processing"
    | "Cancelled"
    | "Delivered"
    | "Return";
}

function OrderList({
  // onOrderSelect,
  orderStatus = "AllOrders",
}: OrderListProps) {
  const [page, setPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const { data, error, isLoading } = useQuery<TableOrderData, Error>({
    queryKey: ["tableData", page, 10, orderStatus],
    queryFn: () => fetchTableData(page, 10, orderStatus),
    enabled: orderStatus !== undefined,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (selectedOrderId) {
    return (
      <OrderDetail
        orderId={selectedOrderId}
        onBack={() => setSelectedOrderId(null)}
      />
    );
  }

  return (
    <>
      <div className="w-full flex flex-col">
        {/* Container with proper width control */}
        {data?.data?.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No orders found.</div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
              <table className="table table-lg table-pin-rows table-pin-cols px-0 py-3">
                <thead className="text-sm bg-gray-50 text-center px-0 py-3">
                  <tr className=" px-0.5 py-0.5">
                    <th className="whitespace-nowrap">Order ID</th>
                    <th className="whitespace-nowrap">Invoice No</th>
                    <th className="whitespace-nowrap">Order Date</th>
                    <th className="whitespace-nowrap">Total Items</th>
                    <th className="whitespace-nowrap">Payment Status</th>
                    <th className="whitespace-nowrap">Total Price</th>
                    <th className="whitespace-nowrap">Detail</th>
                  </tr>
                </thead>
                <tbody className=" text-gray-600 divide-y divide-gray-200 text-center px-0 py-3">
                  {data?.data?.map((order: OrderData) => (
                    <tr key={order.id} className=" px-0 py-3">
                      <td className="whitespace-nowrap text-sm py-3">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap  text-sm  py-3">
                        {order.invoiceNo}
                      </td>
                      <td className="whitespace-nowrap  text-sm py-3">
                        {new Date(order.createdAt).toDateString()}
                      </td>
                      <td className="whitespace-nowrap text-sm py-3">
                        {order?.orderItems?.reduce(
                          (total: number, orderItem: OrderItem) =>
                            total + orderItem.quantity,
                          0
                        )}
                        {/* {order.orderItems[0].quantity} */}
                      </td>
                      <td className="whitespace-nowrap text-sm py-3">
                        {order?.paymentStatus
                          ? String(order.paymentStatus)
                          : " "}
                      </td>
                      <td className="whitespace-nowrap text-sm py-3">
                        {order.totalPrice}
                      </td>
                      <td className="whitespace-nowrap  py-0">
                        <button
                          onClick={() => setSelectedOrderId(order.id)}
                          className="p-1 text-lg text-white bg-blue-600 rounded-xl shadow-md hover:bg-gray-400"
                        >
                          <MdOutlineAddToHomeScreen />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-2 mb-0">
              <Pagination
                page={page}
                setPage={setPage}
                lastPage={data?.totalPages !== undefined ? data?.totalPages : 1}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default OrderList;
