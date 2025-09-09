import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosClient, {
  fetchBrand,
  ProductTableData,
  fetchProductData,
  ProductData,
  Variation,
} from "@/api/axiosClient";
// import axios, { AxiosError } from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";
Chart.register(ArcElement, Tooltip, Legend);
import useAuthStatus from "@/hooks/useAuthStatus";
 
import toast from "react-hot-toast";
 
const boxSizes = [
  {
    id: 1,
    name: "1kg Box",
    size: "Small",
    desc: "Up to 2kg",
    image: "/image/Family.png",
  },
  {
    id: 2,
    name: "5kg Box",
    size: "Medium",
    desc: "Up to 5kg",
    image: "/image/Family.png",
  },
  {
    id: 3,
    name: "10kg Box",
    size: "Large",
    desc: "Up to 10kg",
    image: "/image/Family.png",
  },
];

// const availableProducts = [
//   // Example products
//   { id: 1, name: "Tea Mix", image: "/image/products/tea.png", weight: 0.5, price: 5 },
//   { id: 2, name: "Dried Prawns", image: "/image/products/prawns.png", weight: 1, price: 10 },
//   { id: 3, name: "Canned Fish", image: "/image/products/canned.png", weight: 0.8, price: 7 },
// ];
interface Package {
  id: number;
  name: string;
  description?: string;
  price?: number; // optional: can be calculated from items
  image?: string;
  status: string; // "active" or "inactive"
  createdAt: Date;
  updatedAt: Date;
  weight: number;
  items: PackageItem[];
}

interface PackageItem {
  id: number;
  name: string;
  weight: number;
  price: number;
  image: string;
  product: ProductData | null;
  quantity: number;
  variant: Variation | null;
}

const fetchPackage = async (limit: number = 3) => {
  const response = await axiosClient.get(
    `/client/package-limit?limit=${limit}`
  );
  return response.data.data;
};

export default function Package() {
  const [selectedBox, setSelectedBox] = useState(boxSizes[0]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page] = useState<number>(1);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [limit, setLimit] = useState<number>(4); // Add this line
  const [shippingFees, setShippingFees] = useState(0);
  const [total, setTotal] = useState(0);
  const [modalPage, setModalPage] = useState(1);
  const [modalProducts, setModalProducts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const modalLimit = 20;
const navigate = useNavigate();
  const { isLoggedIn } = useAuthStatus();

  const getBoxMaxWeight = () => {
    if (selectedBox.id === 1) return 2; // 2kg for 1kg Box
    if (selectedBox.id === 2) return 5; // 5kg for 5kg Box
    if (selectedBox.id === 3) return 10; // 10kg for 10kg Box
    return 0;
  };
  // Calculate total weight and price
  const totalWeight = selectedProducts.reduce(
    (sum, p) => sum + (p.variation.weight * (p.quantity || 1)),
    0
  ) / 1000; // if weight is in grams

  const totalPrice = selectedProducts.reduce(
    (sum, p) => sum + ((p.variation.prices?.[0]?.sale_price || 0) * (p.quantity || 1)),
    0
  );
  const { data: brands } = useQuery({
    queryKey: ["brand-list"],
    queryFn: () => fetchBrand(10), // Fetch data based on categoryId
  });

  const {
    data: products,
    error,
    isLoading,
  } = useQuery<ProductTableData, Error>({
    queryKey: ["productData", page, limit], // Use limit in queryKey
    queryFn: () => fetchProductData(page, limit), // Use limit in fetch
  });

  const { data: modalData, isLoading: modalLoading } = useQuery<
    ProductTableData,
    Error
  >({
    queryKey: ["modalProducts", modalPage, modalLimit],
    queryFn: () => fetchProductData(modalPage, modalLimit),
    enabled: showAllProducts,
    // keepPreviousData: true,
  });

  const {
    data: packages,
    error: errorP,
    isLoading: isLoadingP,
  } = useQuery<Package[], Error>({
    queryKey: ["packageData", limit], // Use limit in queryKey
    queryFn: () => fetchPackage(limit), // Use limit in fetch
  });

  // Add product to box
  const handleAddProduct = (product: any) => {
     const firstVariation = product.variations?.[0];
      if (!firstVariation) {
        alert("No variation available for this product.");
        return;
      }
    const productWeight = product.variations[0].weight / 1000; // convert to kg if needed
    const maxWeight = getBoxMaxWeight();
    const existing = selectedProducts.find((p) => p.id === product.id);
    const currentTotalWeight = selectedProducts.reduce(
      (sum, p) => sum + (p.variation.weight * (p.quantity || 1)) / 1000,
      0
    );
    const newTotalWeight = existing
      ? currentTotalWeight + productWeight
      : currentTotalWeight + productWeight;

    // If already in box, check if adding one more exceeds box size
    if (existing && currentTotalWeight + productWeight > maxWeight) {
      toast.error("Cannot add more. Box weight limit exceeded!");
      return;
    }
    // If new product, check if adding it exceeds box size
    if (!existing && currentTotalWeight + productWeight > maxWeight) {
      toast.error("Cannot add. Box weight limit exceeded!");
      return;
    }
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.product.id === product.id);
      if (existing) {
        // Update quantity
        return prev.map((p) =>
          p.product.id === product.id
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        );
      } else {
        console.log(product,"Handle add product")
        // Add new with quantity 1 if not set
        return [...prev, {
          product: product,
          variation: firstVariation,
          quantity: product.quantity || 1,
        },
      ];
      }
    });
  };

  // Remove product from box
  const handleRemoveProduct = (id: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

 
  const handleChangeQuantity = (id: number, delta: number) => {
      
    setSelectedProducts((prev) => {
      return prev.map((p) => {
        if (p.product.id === id) {
          const stock = p.variation?.stock ?? 1;
          const newQty = (p.quantity || 1) + delta;
          const productWeight = p.variation.weight / 1000; // kg
          const maxWeight = getBoxMaxWeight();
          const otherProductsWeight = prev
            .filter((item) => item.id !== id)
            .reduce((sum, item) => sum + (item.variation.weight * (item.quantity || 1)) / 1000, 0);
          const newTotalWeight = otherProductsWeight + (productWeight * newQty);
  
          if (newQty > stock) {
            alert("Stock is limited!");
            return p;
          }
          if (newTotalWeight > maxWeight) {
            alert("Cannot add more. Box weight limit exceeded!");
            return p;
          }
          return { ...p, quantity: Math.max(1, newQty) };
        }
        return p;
      }).filter((p) => p.quantity > 0);
    });
  };

  // Pie chart data
  const pieData = {
    labels: ["Used", "Remaining"],
    datasets: [
      {
        data: [
          totalWeight,
          Math.max(
            0,
            (selectedBox.id === 1 ? 2 : selectedBox.id === 2 ? 5 : 10) -
              totalWeight
          ),
        ],
        backgroundColor: ["#3b82f6", "#f87171"],
      },
    ],
  };

  const handleViewAll = () => {
    setLimit(20); // or any number you want for "all"
    alert(limit);
    setShowAllProducts(true);
  };

  // When closing the modal, reset limit to default (e.g., 4)
  const handleCloseModal = () => {
    setLimit(4);
    setShowAllProducts(false);
  };

  useEffect(() => {
    console.log(modalData, "Modal data");
    if (modalData?.data) {
      setModalProducts((prev) =>
        modalPage === 1 ? modalData.data : [...prev, ...modalData.data]
      );
      setHasMore((modalData.data.length || 0) === modalLimit);
    }
  }, [modalData, modalPage]);

  useEffect(() => {
    if (showAllProducts) {
      setModalPage(1);
      setModalProducts([]);
    }
  }, [showAllProducts]);

  useEffect(() => {
  const newSubtotal = totalPrice;
  const newTotalWeight = totalWeight;

  if (newTotalWeight > 0) {
    axiosClient
      .get(`/client/shipping-fees?weight=${newTotalWeight}`)
      .then((res) => {
        const shippingCost = res.data.price;
        setShippingFees(shippingCost);
        setTotal(newSubtotal + shippingCost);
      })
      .catch(() => {
        setShippingFees(0);
        setTotal(newSubtotal);
      });
  } else {
    setShippingFees(0);
    setTotal(newSubtotal);
  }
}, [totalWeight, totalPrice]);
 
const handleCheckout = (checkoutType: "CUSTOM_PACKAGE" | "PREDEFINED_PACKAGE", specialPackage?: Package) => {
  if (!isLoggedIn) {
    navigate("/login-register");
    return;
  }

 
  if (checkoutType === "CUSTOM_PACKAGE") {
    if (selectedProducts.length === 0) {
      // toast.error("Please select at least one product to checkout.");
      return;
    }
    navigate("/checkout", { state: { selectedItems: selectedProducts, shippingFees, box: selectedBox ,orderType: checkoutType} });
  } else if (checkoutType === "PREDEFINED_PACKAGE" && specialPackage) {
    navigate("/checkout", { state: { specialPackage, shippingFees ,orderType: checkoutType} });
  }
};

console.log(selectedProducts,"Selected products >>>")
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-1 xl:gap-8">
        {/* Left: Text */}
        <div className="flex-1">
          <h1 className="text-3xl xl:text-5xl font-bold mb-6 leading-tight text-gray-900">
            Customize Your Own Box
          </h1>
          <p className="text-base xl:text-lg text-gray-600 mb-4">
            Choose your box size, add products, and watch your flavors stack up.{" "}
            <br />
            We'll show you how much space you've got left!
          </p>
          <div className="text-xl xl:text-2xl font-semibold mb-8 text-gray-700">
            ဘူးရွေးပါ၊ ပစ္စည်းရွေးပါ၊ စိတ်ကြိုက်ထုပ်ပိုးပါ
          </div>
          <div className="flex flex-col items-center sm:flex-row gap-6">
            {/* Dropdown for box size */}
            <div className="relative">
              <button
                className="bg-blue-700 text-white px-2 xl:px-8 py-4 rounded-xl text-base xl:text-lg font-semibold flex items-center gap-2 min-w-[200px] xl:min-w-[260px]"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                {selectedBox.name} ({selectedBox.desc})
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white border rounded-xl shadow-lg z-10">
                  {boxSizes.map((box) => (
                    <div
                      key={box.id}
                      className={`px-6 py-3 cursor-pointer flex items-center justify-between hover:bg-blue-50 ${
                        selectedBox.id === box.id ? "bg-blue-100 font-bold" : ""
                      }`}
                      onClick={() => {
                        setSelectedBox(box);
                        setDropdownOpen(false);
                      }}
                    >
                      <span>
                        {box.name} ({box.desc})
                      </span>
                      {selectedBox.id === box.id && (
                        <svg
                          className="w-5 h-5 text-blue-600 ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Get Started Button */}
            <button className="bg-blue-700 text-white px-8 py-4 rounded-xl text-base xl:text-lg font-semibold min-w-[200px] xl:min-w-[260px]">
              Get Started
            </button>
          </div>
        </div>
        {/* Right: Box Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="/image/Family.png"
            alt="Box"
            className="w-[330px] xl:w-[420px] max-w-full"
            style={{ minWidth: 280 }}
          />
        </div>
      </div>

      {/* Brand */}
      <div className="w-full flex justify-evenly items-center   py-6   rounded bg-slate-300">
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

      {/* Header */}
      <div className="max-w-xl mx-auto py-8 text-center ">
        <h1 className="text-3xl font-bold mb-2">
          Build Your Own Myanmar Parcel Box Parcel Box
        </h1>

        <p className="text-gray-600">
          Pick your favorite food products and track how much weight is left as
          you go. Choose from 1kg, 5kg, or 10kg boxes.
        </p>
      </div>

      {/* Box Size Selection */}
      <div className="w-full mx-auto bg-blue-100 py-10">
        <h2 className="text-xl font-semibold mb-8 text-center">
          Choose Your Box Size
        </h2>
        <div className="flex gap-8 justify-center mb-8 flex-wrap">
          {boxSizes.map((box) => (
            <button
              key={box.id}
              className={`relative flex flex-col   text-left p-2 rounded-xl border-2 transition min-w-[340px] max-w-[360px] bg-white ${
                selectedBox.id === box.id
                  ? "border-blue-500 shadow-lg"
                  : "border-blue-200 hover:border-blue-400"
              }`}
              onClick={() => setSelectedBox(box)}
            >
              {/* Checkmark for selected */}
              {selectedBox.id === box.id && (
                <span className="absolute top-4 left-4 bg-white rounded-full p-1 shadow">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              )}
              <div className="flex m-2">
                <div className="w-1/2">
                  <img
                    src={box.image}
                    alt={box.name}
                    className="h-28 m-2 align-middle"
                  />
                </div>
                <div className="w-1/2">
                  <div className="text-2xl font-bold mb-1">{box.name}</div>
                  <div className="text-gray-400 text-lg mb-1">{box.size}</div>
                  <div className="text-base text-gray-700 mb-4">{box.desc}</div>
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-2 py-2 rounded mt-auto text-xs"
                    tabIndex={-1}
                  >
                    Estimated Capacity: 1kg
                  </button>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Available Products */}
      <div className="max-w-7xl mx-auto mb-12 px-4 mt-2">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4">
          <div>
            <h2 className="text-5xl font-bold mb-2">Available Products</h2>
            <div className="text-xl text-gray-700 mb-2">
              Select your favorites to add to your box.
            </div>
          </div>
          <button
            type="button"
            onClick={handleViewAll}
            className="text-lg text-right text-gray-700 font-medium hover:text-blue-600 flex items-center gap-1 mt-2 md:mt-0"
          >
            View All
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products?.data &&
            products.data.length > 0 &&
            products.data.map((product) => {
              // Convert weight to g if < 1kg
              let weight = product.variations[0].weight;
              let weightStr =
                weight >= 1 ? `${weight}kg` : `${Math.round(weight * 1000)}g`;
              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center transition hover:shadow-lg"
                >
                  <img
                    src={
                      product.images.length > 0
                        ? `${import.meta.env.VITE_APP_BACKEND_URL}/uploads/${
                            product.images[0].url
                          }`
                        : "/image/placeholder.png"
                    }
                    alt={product.name}
                    className="h-40 w-40 object-contain mb-4"
                    crossOrigin="anonymous"
                  />
                  <div className="flex w-full justify-between items-center mb-1">
                    <div className="font-medium text-lg">{product.name}</div>
                    <div className="text-gray-500 text-base">{weightStr}</div>
                  </div>
                  <div className="flex w-full justify-between items-center border-t pt-4 mt-4">
                    <div className="font-bold text-blue-700 text-lg">
                      $
                      {product.variations?.[0]?.prices?.[0]?.sale_price !==
                      undefined
                        ? product.variations[0].prices[0].sale_price
                        : "N/A"}
                    </div>{" "}
                    <button
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition"
                      onClick={() => handleAddProduct(product)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"
                        />
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Selected Products & Summary */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-start">
        {/* Title on the left */}
        <div className="min-h-60 md:col-span-1 flex items-center justify-center md:justify-start h-full">
          <h2 className="text-2xl font-bold">Selected Products</h2>
        </div>
        {/* Product list on the right */}
        <div className="md:col-span-2 w-full">
          <ul className="space-y-4">
            {selectedProducts.map((p, idx) => {
              const stock = p.variations?.[0]?.stock ?? 0;
              return (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-white rounded-xl shadow px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.product.images.length > 0 ? `${import.meta.env.VITE_APP_BACKEND_URL}/uploads/${p.product.images[0].url}` : "/image/placeholder.png"}
                      alt={p.product.name}
                      className="w-8 h-8 object-contain"
                      crossOrigin="anonymous"
                    />
                    <span className="font-medium">{p.product.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Decrease button */}
                    <button
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg font-bold"
                      onClick={() => handleChangeQuantity(p.product.id, -1)}
                      disabled={p.quantity <= 1}
                      title="Decrease"
                    >
                      -
                    </button>
                    {/* Quantity and weight */}
                    <span className="text-gray-700 font-semibold min-w-[70px] text-center">
                      {p.quantity} x {p.variation.weight < 1 ? `${Math.round(p.variation.weight * 1000)}g` : `${p.variation.weight}g`}
                    </span>
                    {/* Add button */}
                    <button
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg font-bold"
                      onClick={() => handleChangeQuantity(p.product.id, 1)}
                      disabled={p.variation.quantity >= stock}
                      title={p.variation.quantity >= stock ? "No more stock" : "Increase"}
                    >+</button>
                    {/* Remove button */}
                    <button
                      className="ml-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition text-sm"
                      onClick={() => handleRemoveProduct(p.id)}
                      title="Remove"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Live Box Summary */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-start">
        <div className="md:col-span-1 flex items-center justify-center md:justify-start h-full">
          <h2 className="text-2xl font-bold">Live Box Summary</h2>
        </div>
        <div className="md:col-span-2 w-full flex flex-col gap-4">
          <div className="flex items-center bg-white rounded-xl shadow p-4">
            <img src="/box/box.png" alt="Box" className="w-28 h-28 mr-4" />
            <div>
              <div className="text-gray-500 text-sm">Selected Box Size</div>
              <div className="font-semibold">{selectedBox.name}</div>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-xl shadow p-4">
            <img
              src="/box/box-weight.png"
              alt="Weight Used"
              className="w-28 h-28 mr-4"
            />
            <div>
              <div className="text-gray-500 text-sm">Total Weight Used</div>
              <div className="font-semibold">{totalWeight} kg</div>
            </div>
          </div>
          <div className="flex items-center bg-white rounded-xl shadow p-4">
            <img
              src="/box/box-remaining.png"
              alt="Remaining Weight"
              className="w-28 h-28 mr-4"
            />
            <div>
              <div className="text-gray-500 text-sm">Remaining Weight</div>
              <div className="font-semibold">
                {Math.max(
                  0,
                  (selectedBox.id === 1 ? 2 : selectedBox.id === 2 ? 5 : 10) -
                    totalWeight
                ).toFixed(3)}{" "}
                kg
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weight Progress */}
      <div className="max-w-4xl mx-auto my-12 border-gray-500 border rounded-lg p-6 text-start">
        <h2 className="text-2xl font-bold mb-4  ">Weight Progress</h2>
        <div className="flex  gap-8 mt-6 text-lg font-semibold">
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded bg-blue-500"></span>
            Used: {totalWeight.toFixed(3)} kg
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded bg-red-400"></span>
            Remaining:{" "}
            {Math.max(
              0,
              (selectedBox.id === 1 ? 2 : selectedBox.id === 2 ? 5 : 10) -
                totalWeight
            ).toFixed(3)}{" "}
            kg
          </div>
        </div>
        <div className="flex justify-center p-20">
          <Pie
            data={pieData}
            options={{
              plugins: {
                legend: {
                  display: false,
                  // align: "start", // aligns legend to the start (left)
                  // position: "top", // keep legend on top
                  // labels: {
                  //   boxWidth: 20,
                  //   padding: 20,
                  // },
                },
              },
            }}
          />
        </div>
      </div>


      
{/* Checkout Summary */}
<div className="max-w-5xl mx-auto mt-16 mb-24">
  <h2 className="text-4xl font-bold text-center mb-2">Checkout Summary</h2>
  <p className="text-center text-gray-600 mb-8">See your total cost and estimated delivery.</p>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <div className="border rounded-xl p-8">
      <div className="text-gray-400 text-lg mb-2">Subtotal</div>
      <div className="text-3xl font-bold">${totalPrice.toFixed(2)}</div>
    </div>
    <div className="border rounded-xl p-8">
      <div className="text-gray-400 text-lg mb-2">Shipping Fee</div>
      <div className="text-3xl font-bold">{shippingFees.toFixed(2)}</div>
    </div>
  </div>
  <div className="border rounded-xl p-8 mb-8">
    <div className="text-gray-400 text-lg mb-2">Total</div>
    <div className="text-3xl font-bold">${(totalPrice).toFixed(2)}</div>
  </div>
  <div className="flex justify-center">
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-12 py-3 rounded-lg transition"
      onClick={() => handleCheckout("CUSTOM_PACKAGE")}
    >
      Confirm Order
    </button>
  </div>
</div>
      
    

      {/* Special Box Packages */}
      {/* <div className="max-w-5xl mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4">Special Discount Package</h2>
        <div className="flex gap-6 justify-center flex-wrap">
          <div className="bg-red-100 p-6 rounded-lg shadow w-72">
            <h3 className="font-bold text-lg mb-2">Economy Box</h3>
            <ul className="mb-4 text-sm text-gray-700 list-disc pl-4">
              <li>Up to 2kg</li>
              <li>Best for small gifts</li>
              <li>Low shipping fee</li>
            </ul>
            <div className="font-bold text-xl mb-2">$20</div>
            <button className="btn btn-primary w-full">Select</button>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow w-72">
            <h3 className="font-bold text-lg mb-2">Standard Box</h3>
            <ul className="mb-4 text-sm text-gray-700 list-disc pl-4">
              <li>Up to 5kg</li>
              <li>Popular choice</li>
              <li>Balanced price & size</li>
            </ul>
            <div className="font-bold text-xl mb-2">$40</div>
            <button className="btn btn-primary w-full">Select</button>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow w-72">
            <h3 className="font-bold text-lg mb-2">Value Box</h3>
            <ul className="mb-4 text-sm text-gray-700 list-disc pl-4">
              <li>Up to 10kg</li>
              <li>Best for families</li>
              <li>Great value</li>
            </ul>
            <div className="font-bold text-xl mb-2">$70</div>
            <button className="btn btn-primary w-full">Select</button>
          </div>
        </div>
      </div> */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Special Discount Package
        </h2>
        <div className="flex gap-8 justify-center flex-wrap">
          {packages?.map((pkg, idx) => {
            // Color map for header, badge, border
            const colorMap = [
              {
                header: "bg-rose-700",
                badge: "bg-rose-700",
                border: "border-rose-400",
                price: "text-blue-700",
              },
              {
                header: "bg-blue-700",
                badge: "bg-blue-700",
                border: "border-blue-400",
                price: "text-blue-700",
              },
              {
                header: "bg-green-700",
                badge: "bg-green-700",
                border: "border-green-400",
                price: "text-blue-700",
              },
            ];
            const color = colorMap[idx % colorMap.length];

            // Calculate total weight
            // const totalWeight =
            //   pkg.items && pkg.items.length > 0
            //     ? pkg.items.reduce((sum, item) => {
            //         const weight = item.product?.variations[0].weight || 1;
            //         return sum + weight * (item.quantity || 1);
            //       }, 0)
            //     : null;
                
      
            return (
              <div
                key={pkg.id}
                className={`relative bg-white ${color.border} border-2 rounded-2xl shadow-md w-96 flex flex-col items-center px-0 pt-0 pb-6 transition`}
                style={{ boxShadow: "0 2px 12px 0 rgba(0,0,0,0.06)" }}
              >
                {/* Header */}
                <div
                  className={`w-full h-24 rounded-t-2xl flex items-center justify-center ${color.header} relative`}
                >
                  <h3 className="font-bold text-2xl text-white text-center z-10">
                    {pkg.name}
                  </h3>
                  {/* Weight Badge */}
                  <div className="absolute -bottom-16 pt-2 right-0 z-20">
                    <div
                      className={`relative ${color.badge} text-white text-2xl font-bold rounded-full border-4 border-white shadow-lg w-24 h-24 flex items-center justify-center`}
                      style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.12)" }}
                    >
                      {`${pkg.weight}KG`}
                    </div>
                  </div>
                </div>
                {/* Package Image */}
                <img
                  src={
                    pkg.image
                      ? `${import.meta.env.VITE_APP_BACKEND_URL}/${pkg.image}`
                      : "/image/box.png"
                  }
                  alt={pkg.name}
                  className="h-36 mx-auto mb-4 object-contain mt-12"
                  crossOrigin="anonymous"
                />
                {/* Product List */}
                <ul className="mb-4 px-2 text-base text-gray-700 text-left space-y-2 w-full mt-2">
                  {pkg.items && pkg.items.length > 0 ? (
                    pkg.items.map((item) => (
                      <li key={item.id} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✔</span>
                        <span>
                          {item.product?.name || item.name}
                          {item.quantity ? ` – ${item.quantity}` : ""}
                          {item.variant?.weight
                            ? ` (${item.variant.weight}kg)`
                            : ""}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 italic">No items listed</li>
                  )}
                </ul>
                {/* Price and Button */}
                <div className="flex w-full items-center justify-between mt-auto px-2">
                  <span className={`font-bold text-xl ${color.price}`}>
                    ${pkg.price?.toFixed(2)}
                  </span>
                  <button
              className="border-2 border-blue-700 text-blue-700 font-semibold rounded-xl px-6 py-2 ml-auto hover:bg-blue-50 transition bg-white"
              onClick={() => handleCheckout("PREDEFINED_PACKAGE", pkg)}
            >
              Choose Package
            </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal for all products */}
      {showAllProducts && (
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        //   <div className="bg-white rounded-2xl shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
        //      <button
        //         className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
        //         onClick={handleCloseModal}
        //       >
        //         &times;
        //       </button>
        //     <h2 className="text-3xl font-bold mb-6">All Products</h2>
        //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        //       {products?.data && products.data.length > 0 &&  products?.data.map((product) => {
        //          let weight = product.variations[0].weight;
        //         let weightStr = weight >= 1 ? `${weight}kg` : `${Math.round(weight * 1000)}g`;

        //         return (
        //           <div
        //             key={product.id}
        //             className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center transition hover:shadow-lg"
        //           >
        //             <img
        //               src={ product.images.length > 0 ? `${import.meta.env.VITE_APP_BACKEND_URL}/uploads/${product.images[0].url}` : "/image/placeholder.png"}
        //               alt={product.name}
        //               className="h-40 w-40 object-contain mb-4"
        //               crossOrigin="anonymous"
        //             />
        //             <div className="flex w-full justify-between items-center mb-1">
        //               <div className="font-medium text-lg">{product.name}</div>
        //               <div className="text-gray-500 text-base">{weightStr}</div>
        //             </div>
        //             <div className="flex w-full justify-between items-center border-t pt-4 mt-4">
        //               <div className="font-bold text-blue-700 text-lg">${product.variations[0].prices[0].sale_price}</div>
        //               <button
        //                 className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition"
        //                 onClick={() => handleAddProduct(product)}
        //               >
        //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        //                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
        //                 </svg>
        //                 Add
        //               </button>
        //             </div>
        //           </div>
        //         );
        //       })}
        //     </div>
        //   </div>
        // </div>
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-2xl shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto p-8 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {modalProducts.map((product) => {
                  let weight = product.variations[0].weight;
                  let weightStr =
                    weight >= 1
                      ? `${weight}kg`
                      : `${Math.round(weight * 1000)}g`;
                  return (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col items-center transition hover:shadow-lg"
                    >
                      <img
                        src={
                          product.images.length > 0
                            ? `${
                                import.meta.env.VITE_APP_BACKEND_URL
                              }/uploads/${product.images[0].url}`
                            : "/image/placeholder.png"
                        }
                        alt={product.name}
                        className="h-40 w-40 object-contain mb-4"
                        crossOrigin="anonymous"
                      />
                      <div className="flex w-full justify-between items-center mb-1">
                        <div className="font-medium text-lg">
                          {product.name}
                        </div>
                        <div className="text-gray-500 text-base">
                          {weightStr}
                        </div>
                      </div>
                      <div className="flex w-full justify-between items-center border-t pt-4 mt-4">
                        <div className="font-bold text-blue-700 text-lg">
                          $
                          {product.variations?.[0]?.prices?.[0]?.sale_price !==
                          undefined
                            ? product.variations[0].prices[0].sale_price
                            : "N/A"}
                        </div>
                        <button
                          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-medium transition"
                          onClick={() => handleAddProduct(product)}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"
                            />
                          </svg>
                          Add
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {hasMore && (
                <div className="flex justify-center mt-6">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
                    onClick={() => setModalPage((p) => p + 1)}
                    disabled={modalLoading}
                  >
                    {modalLoading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
