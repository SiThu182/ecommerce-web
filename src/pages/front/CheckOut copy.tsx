import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import {  RootState } from "@/redux/store";
import axiosClient, { AddressData, saveAddressToDB } from "@/api/axiosClient";
import { useForm } from "react-hook-form";

// import AddressModal from "./Profile/Address/AddressModal";
// import AddressForm from "./Profile/Address/AddressForm";

import { useNavigate } from "react-router-dom";
import AddressModal from "./Profile/Address/AddressModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "@/components/common/LoadingOverlay";

// Define types for cart items and selected items
interface Product {
  id: number;
  name: string;
  description: string;
  discount: {
    id: number;
    discountType: string;
    value: number;
    startDate: string;
    endDate: string;
    isFlashSale: boolean;
    isActive: boolean;
    productId: number;
    variationId: number;
    categoryId: number;
  };
}

interface Variation {
  id: number;
  colorAttribute: { value: string };
  sizeAttribute: { value: string };
  prices: Price[];
  images: { url: string }[];
}
interface Price {
  id: number;
  sale_price: number;
  purchase_price: number;
}
interface CartItem {
  id: number;
  product: Product;
  variation: Variation;
  quantity: number;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const { selectedItems, shippingFees, box, specialPackage } = location.state as {
    selectedItems: CartItem[];
    shippingFees: number;
    box: any;
    specialPackage: any;
  };

  // const { email } = useSelector(
  //   (state: RootState) => state.user
  // );
  interface FormData {
    image: File | null;
  }
  const navigate = useNavigate();

  const methods = useForm<FormData>();

  const [image, setImage] = useState<File | null>(null);
  const { setValue } = methods;
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  // const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAddressListVisible] = useState(true);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [formData, setFormData] =useState<AddressData>({});
  const [editAddress, setEditAddress] = useState<AddressData | null>(null);
  const [modalType, setModalType] = useState<null | "main" | "add" | "edit">(
    null
  );
  const [loading, setLoading] = useState(false);

  // const handleOpenModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setIsFormVisible(false);
  //   setIsAddressListVisible(true);
  // };

  const fetchAddresses = async () => {
    try {
      const response = await axiosClient.get("/customer/get-address");
      setAddresses(response.data);

      console.log(response.data, "response.data");
      // Automatically select the address with isActive set to 1
      const activeAddress = response.data.find(
        (address: AddressData) => address.isActive == true
      );
      console.log(activeAddress, "activeAddress");
      if (activeAddress) {
        setSelectedAddressId(activeAddress.id);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // const { data  } = useQuery({
  //   queryKey: ["adderss-info"],
  //   queryFn: () => fetchAddresses(),
  // });

  const [paymentMethod, setPaymentMethod] = useState("bankTransfer");

  

  const calculateUnitPrice = (item: CartItem) => {
    const salePrice = item.variation.prices[0].sale_price;
    console.log(
      "Is active ",
      item.product?.discount?.isActive,
      "Is Flash Sale : ",
      item.product?.discount?.isFlashSale
    );
    if (
      item.product?.discount?.isActive &&
      item.product?.discount?.isFlashSale
    ) {
      if (item.product.discount.discountType === "FIXED") {
        console.log(
          "Sale Price : ",
          Math.max(0, salePrice - (item.product.discount.value ?? 0))
        );
        return Math.max(0, salePrice - (item.product.discount.value ?? 0));
      } else {
        // PERCENTAGE discount
        const discountPercentage = (item.product.discount.value ?? 0) / 100;
        console.log(
          "Sale Price : ",
          salePrice - salePrice * discountPercentage
        );
        return salePrice - salePrice * discountPercentage;
      }
    }
    console.log("Sale Price : ", salePrice);

    return salePrice;
  };
  const calculateItemSubtotal = (item: CartItem) => {
    const unitPrice = calculateUnitPrice(item);
    return unitPrice * item.quantity;
  };

  const calculateOriginalItemSubtotal = (item: CartItem) => {
    const salePrice = item.variation.prices[0].sale_price;
    return salePrice * item.quantity;
  };

  // const calculateItemDiscount = (item: CartItem) => {
  //   const originalSubtotal = calculateOriginalItemSubtotal(item);
  //   const discountedSubtotal = calculateItemSubtotal(item);
  //   return originalSubtotal - discountedSubtotal;
  // };

  const calculateTotal = () => {
    const itemTotal = selectedItems.reduce((total, item) => {
      const salePrice = item.variation.prices[0].sale_price;
      const discountedPrice =
        item.product?.discount?.isActive === true &&
        item.product?.discount?.isFlashSale &&
        item.product?.discount?.discountType === "FIXED"
          ? salePrice - (item.product?.discount?.value ?? 0)
          : salePrice - salePrice * (item.product?.discount?.value / 100);
      console.log("Item data : ", item);
      return item.product?.discount?.isActive
        ? total + discountedPrice * item.quantity
        : total + item.variation.prices[0].sale_price * item.quantity;
    }, 0);

    const itemCount = selectedItems
      .map((item) => item.quantity)
      .reduce((a, b) => a + b, 0);

    const discount = 0; // Example discount
    const total = itemTotal - discount + shippingFees;
    return { itemTotal, discount, total, itemCount };
  };

  const { total, itemCount } = calculateTotal();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setValue("image", event.target.files[0]);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error("⚠️ Please select a delivery address.");
      return;
    }

    if (paymentMethod !== "stripe" && image === null) {
      toast.error("⚠️ Please upload a payment slip.");
      return;
    }

    //   if (paymentMethod === "stripe") {
    //   try {
    //     const response = await axiosClient.post("http://localhost:8080/api/v1/client/checkout", {
    //       order_data: selectedItems.map(item => ({
    //         name: item.product.name,
    //         amount: item.variation.prices[0].sale_price,
    //         quantity: item.quantity,
    //       })),
    //       invoice_no: `INV-${Date.now()}`, // generate unique invoice
    //       order_type: "product",
    //       discount: 0, // change this if using coupons
    //       country: "USD",
    //     });

    //     const { url } = response.data;
    //     if (url) {
    //       window.location.href = url;
    //     }
    //   } catch (error) {
    //     console.error("Stripe checkout error:", error);
    //     alert("Failed to redirect to Stripe.");
    //   }
    //   return;
    // }

    const formData = new FormData();
    formData.append(
      "items",
      JSON.stringify(
        selectedItems.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          variationId: item.variation.id,
          quantity: item.quantity,
          unitPrice: calculateUnitPrice(item),
          subTotal: calculateItemSubtotal(item),
          paymentMethod: paymentMethod,
        }))
      )
    );
    formData.append("total", total.toString());
    formData.append("paymentMethod", paymentMethod);
    formData.append("address", selectedAddressId.toString());
    if (image) {
      formData.append("image", image);
    }
    formData.append("orderType", "PRODUCT");
    formData.append("shippingFees", shippingFees.toString());
    try {
      const response = await axiosClient.post("/client/orders", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status == 200) {
        if (paymentMethod === "stripe") {
          window.location.href = response.data.url;
        } else {
          toast.success("Order placed successfully!");
          setTimeout(() => navigate("/"), 2000);
        }
      }
      console.log("Order placed successfully:", response.data);

      // Handle successful order placement (e.g., redirect to a confirmation page)
    } catch (error: any) {
      if (error?.status === 400) {
        toast.error(
          error?.response?.data?.message || "❌ Failed to place order."
        );
      }
      console.error("Error placing order:", error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  //  const handleShowForm = () => {
  //   setIsFormVisible(true);
  //   setModalType(null);

  // setIsAddressListVisible(false);
  // setFormData({}); // Clear form for new address
  // };

  //   const hideShowForm = () => {
  //   setIsFormVisible(false);
  //   setIsAddressListVisible(true);
  // };

  //   const handleEditAddress = (address: AddressData) => {
  //   setFormData(address);
  //   // setIsFormVisible(true);
  //   setIsAddressListVisible(false);
  // };

  const updateAddressStatus = () => {
    if (!selectedAddressId) {
      console.error("No address selected");
      return;
    }

    axiosClient
      .post("/customer/update-address-status", { addressId: selectedAddressId })
      .then((response) => {
        console.log("Address status updated successfully:", response.data);
        // Handle success (e.g., close modal, update address list)
        fetchAddresses(); // Refresh address list
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error updating address status:", error);
        // Handle error (e.g., show error message)
      });
  };

  const handleOpenMainModal = () => {
    setModalType("main");
  };

  const handleOpenAddModal = () => setModalType("add");

  const handleOpenEditModal = (address: AddressData) => {
    setEditAddress(address);
    setModalType("edit");
  };

  const handleCloseModal = () => {
    setModalType(null);
    setEditAddress(null);
    // setIsFormVisible(false);
  };

  console.log(addresses.length, "addresses.length");
  return (
    <div className="p-4 min-h-[90vh] flex  container px-5 justify-center  ">
      <div className="w-3/4 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <div className="w-full my-3">
          {/* <h3>Delivery Address</h3> */}

          {addresses.length > 0 ? (
            addresses.find((address: AddressData) => address.isActive) ? (
              addresses.map(
                (address: AddressData) =>
                  address?.isActive == true && (
                    <div key={address.id}>
                      {/* Your existing address display code */}
                      <div
                        className="top-0 left-0 w-full h-[3px]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(45deg, #6fa6d6, #6fa6d6 33px, transparent 0, transparent 41px, #f18d9b 0, #f18d9b 74px, transparent 0, transparent 82px)",
                          backgroundPositionX: "-30px",
                          backgroundSize: "116px 3px",
                        }}
                      ></div>
                      <h4 className="text-red-500 font-semibold flex items-center gap-2 mt-2">
                        <span>📍</span> Delivery Address
                      </h4>
                      <div className="text-gray-800">
                        <div className="font-bold text-xl">
                          {address.name}{" "}
                          <span className="text-gray-500 font-normal">
                            {address.phone_no}
                          </span>
                        </div>
                        <div className="mt-2">
                          {address.address}, {address.subDistrict},{" "}
                          {address.district}, {address.province},{" "}
                          {address.postal_code}
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button className="border border-red-500 text-red-500 rounded px-4 py-1 text-sm">
                          Default
                        </button>
                        <button
                          className="border border-gray-300 text-gray-700 rounded px-4 py-1 text-sm"
                          onClick={handleOpenMainModal}
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  )
              )
            ) : (
              <div className="border border-dashed border-gray-300 p-4 rounded-lg text-center">
                <p className="text-gray-500 mb-2">
                  You have addresses but none are set as default
                </p>
                <button
                  className="text-blue-500 font-medium"
                  onClick={handleOpenMainModal}
                >
                  Set a default address
                </button>
              </div>
            )
          ) : (
            <div className="border border-dashed border-gray-300 p-4 rounded-lg text-center">
              <p className="text-gray-500 mb-2">No addresses saved yet</p>
              <button
                className="text-blue-500 font-medium"
                onClick={handleOpenMainModal}
              >
                Add an address
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col  gap-10">
          {/* User Info Column */}

          {/* Calculation Column */}
          <div className="w-full  space-y-4 border-2 border-gray-200 rounded-md p-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:text-gray-900 dark:bg-white-800">
                <thead>
                  <tr>
                    <td className="py-2 px-4 border-b font-semibold">
                      Product Name
                    </td>
                    <th className="py-2 px-4 border-b">Unit Price</th>
                    {/* <th className="py-2 px-4 border-b">Discount</th>
                    <th className="py-2 px-4 border-b">Discounted Price</th> */}
                    <th className="py-2 px-4 border-b">Quantity</th>
                    <th className="py-2 px-4 border-b">Sub-total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2 px-4 border-b">
                        {item.product.name}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {item.product?.discount?.isActive ? (
                          <div className="flex items-center">
                            <span className="line-through text-gray-500">
                              ${item.variation.prices[0].sale_price.toFixed(2)}
                            </span>
                            <span className="font-medium">
                              ${calculateUnitPrice(item).toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span>${calculateUnitPrice(item).toFixed(2)}</span>
                        )}
                      </td>
                      {/* <td className="py-2 px-4 border-b text-center">
                        ${calculateItemDiscount(item).toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        ${calculateUnitPrice(item).toFixed(2)}
                      </td> */}
                      <td className="py-2 px-4 border-b text-center">
                        {item.quantity}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        ${calculateItemSubtotal(item).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2 px-4 border-b text-end" colSpan={3}>
                      Shipping Fees
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      $ {shippingFees.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b text-end" colSpan={3}>
                      Order Total ({itemCount} item)
                    </td>
                    <td className="py-3 px-4 border-b text-center text-lg font-bold whitespace-nowrap min-w-[120px]">
                      $ {total.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div className="space-y-2">
              {selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-700">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="text-gray-700">
                    $
                    {(item.variation.prices[0].sale_price * item.quantity).toFixed(
                      2
                    )}
                  </span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="text-gray-700">Item Total:</span>
                <span className="text-gray-700">${itemTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Discount:</span>
                <span className="text-gray-700">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-gray-700">Total:</span>
                <span className="text-gray-700">${total.toFixed(2)}</span>
              </div>
            </div> */}
          </div>
          <div className="w-full  space-y-4 border-2 border-gray-200 rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Bank Transfer</span>
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio checked:bg-red-500"
                  checked={paymentMethod === "bankTransfer"}
                  onChange={() => setPaymentMethod("bankTransfer")}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Prompt Pay</span>
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio checked:bg-blue-500"
                  checked={paymentMethod === "promptPay"}
                  onChange={() => setPaymentMethod("promptPay")}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Stripe (Credit/Debit)</span>
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio checked:bg-green-500"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />
              </label>
            </div>
            {paymentMethod === "bankTransfer" && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Bank Account Details</h3>
                <img
                  src="/image/payment/promptpay.jpg"
                  alt="Bank Account Details"
                  className="w-60 h-auto mt-2 mx-auto"
                  // crossOrigin="anonymous"
                />
              </div>
            )}
            {paymentMethod === "promptPay" && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Prompt Pay QR Code</h3>
                <img
                  src="/image/payment/promptpay.jpg"
                  alt="Bank Account Details"
                  className="w-60 mx-auto h-auto mt-2 align-middle"
                />
              </div>
            )}

            {paymentMethod !== "stripe" && (
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Profile Image</span>
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleImageUpload}
                    // className="hidden"
                  />
                  <a
                    href={
                      image
                        ? URL.createObjectURL(image)
                        : "https://via.placeholder.com/150"
                    }
                    target="_blank"
                  >
                    View FIle
                  </a>
                </label>
              </div>
            )}
            <div className="flex justify-end">
              <button
                className="bg-primary text-white px-4 py-2 rounded mt-4  "
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box w-3/5 max-w-5xl">
            {isAddressListVisible &&  (
              <>
              <h2 className="font-bold text-lg mb-2">Address List</h2>
              <hr />
            {addresses.map((address) => (
              <div key={address.id} className="card bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="radio"
                    name="selectedAddress"
                    className="radio radio-primary"
                    checked={selectedAddressId === address.id}
                    onChange={() => setSelectedAddressId(address.id || 1)}
                  />
                  <div className="w-4/5">
                    <h3 className="text-lg font-bold">{address.name}</h3>
                    <p>{address.phone_no}</p>
                    <p>{address.note}</p>
                    <p>{address.address}</p>
                    <p>{address.postal_code}</p>
                    <div className="border-2 border-sky-500 w-10">{address.isActive === true && "default"}</div>
                  </div>
                  <button className="btn btn-sm btn-outline" onClick={() => handleEditAddress(address)}>Edit</button>
                </div>
              </div>
            ))}

            <button className="btn btn-primary mb-4" onClick={() => handleShowForm(false)}>
              Add New Address
            </button>
            </>
            )}  
            {isFormVisible && (
              <div className="card bg-white shadow-md rounded-lg p-4 mb-4">
                <h2 className="font-bold text-lg mb-2">Add New Address</h2>
                <hr />
                <AddressForm
                setAddressData={setFormData}
                defaultAddress={formData}
              />
              </div>
            )}
            {isAddressListVisible ? (
              <div className="modal-action">
                <button className="btn" onClick={handleCloseModal}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={updateAddressStatus}>
                  Confirm
                </button>
              </div>
            ):
            (
              <>
                 <div className="modal-action">

                    <button className="btn" type="button" onClick={hideShowForm}>
                      Cancel
                    </button>
                    <button onClick={ () => saveAddressToDB(formData)} className="btn btn-primary">Confirm</button>
                  </div>
              </>
            )
          
            }
            </div>
          </div>
      )} */}
      {modalType === "main" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
            {/* Close Icon */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="p-6 max-h-[80vh] overflow-y-auto">
              {isAddressListVisible && (
                <>
                  <h2 className="font-bold text-xl mb-4">
                    Select Delivery Address
                  </h2>
                  <div className="max-h-72 overflow-y-auto space-y-4 mb-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="flex items-center border rounded-lg p-4 hover:shadow transition"
                      >
                        <input
                          type="radio"
                          name="selectedAddress"
                          className="radio radio-primary mr-4"
                          checked={selectedAddressId === address.id}
                          onChange={() => setSelectedAddressId(address.id || 1)}
                        />
                        <div className="flex-1">
                          <div className="font-semibold">
                            {address.name}{" "}
                            <span className="text-gray-500">
                              {address.phone_no}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {address.address}, {address.subDistrict},{" "}
                            {address.district}, {address.province},{" "}
                            {address.postal_code}
                          </div>
                          {address.isActive === true && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <button
                          className="btn btn-xs btn-outline ml-4"
                          onClick={() => handleOpenEditModal(address)}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-primary w-full"
                    onClick={handleOpenAddModal}
                  >
                    + Add New Address
                  </button>
                </>
              )}

              <div className="modal-action flex justify-end mt-6 gap-2">
                <>
                  <button className="btn" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={updateAddressStatus}
                  >
                    Confirm
                  </button>
                </>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalType === "edit" && editAddress && (
        <AddressModal
          title="Edit"
          setAddressData={saveAddressToDB}
          defaultAddress={editAddress}
          onSuccess={fetchAddresses}
          open={true}
          onClose={handleCloseModal}
        />
      )}

      {modalType === "add" && (
        <AddressModal
          title="Add New Address"
          setAddressData={saveAddressToDB}
          defaultAddress={{}}
          onSuccess={async () => {
            await fetchAddresses();
            handleCloseModal();
          }}
          open={modalType === "add"}
          onClose={handleCloseModal}
        />
      )}

      {/* ✅ Loading + Toast */}
      {loading && <LoadingOverlay />}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Checkout;
