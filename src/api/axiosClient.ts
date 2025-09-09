import { CartItem } from "@/pages/front/Cart";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { JSX } from "react/jsx-runtime";

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URL + "/api/v1", // Set your API base URL
  withCredentials: true, // Ensures cookies are sent with each request
});

// Intercept responses to handle authentication errors
axiosClient.interceptors.response.use(
  (response) => response, // Return the response if successful
  (error) => {
    console.log(error, "Error");
    // Handle authentication errors (e.g., 401 Unauthorized)
    if (error.response?.status === 401) {
      toast.error("Unauthorized access. Please log in.");
      // Redirect to logout or login page if token is invalid/expired
      // /window.location.href = "/login-register"; // Or use your routing library to navigate
    }

    return Promise.reject(error);
  }
);

export const fetchCategories = async () => {
  try {
    console.log("Fetching categories");
    const response = await axiosClient.get("/client/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchPromotionCategories = async () => {
  try {
    console.log("Fetching categories");
    const response = await axiosClient.get(
      "/client/categories-with-active-discount"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching promotion categories:", error);
    throw error;
  }
};

// Add this interface to your types file or at the top of your API file
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  contactType: string;
}

export interface ProductData {
  id: number;
  name: string;
  description: string;
  ingredient: string;
  ingredient_mm: string;
  category: {
    name: string;
  };
  categories: CategoryHierarchy[];
  supplier: {
    name: string;
  };
  categoryId: number;
  supplierId: number;
  attributes?: string;
  productType: string; // SINGLE or VARIANTS
  images: ProductImage[];
  variations: Variation[];
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

interface ProductImage {
  id: number;
  url: string;
}

interface Attribute {
  id: number;
  type: "COLOR" | "SIZE" | string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface Variation {
  id: number;
  productId: number;
  attributes?: string | null;
  stock: number;
  sku: string;
  color_attribute_id?: number;
  size_attribute_id?: number;
  others_attribute_id?: number | null;
  createdAt: string;
  updatedAt: string;
  prices: VariationPrice[];
  images: VariationImage[];
  colorAttribute?: Attribute;
  sizeAttribute?: Attribute;
  othersAttribute?: Attribute | null;
  product: ProductData;
  weight: number; // Optional weight field
}

interface VariationPrice {
  id: number;
  variationId: number;
  price: number;
  sale_price: number;
}

interface VariationImage {
  id: number;
  variationId: number;
  url: string;
}

export interface ProductTableData {
  data: ProductData[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export interface WishList {
  id: number;
  product: ProductData;
  variation: Variation;
  quantity: number;
}

interface ErrorResponse {
  error?: string;
}

export interface CategoryHierarchy {
  id: number;
  name: string;
  description: string;
  slug: string;
  nested_level: number;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetails {
  product: ProductData;
  categoryHierarchy: CategoryHierarchy;
}

export interface TableOrderData {
  map(
    arg0: (order: OrderData) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode | Iterable<import("react").ReactNode>;
  data: OrderData[];

  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export interface OrderData {
  id: number;
  categoryData: string;
  customerId: number;
  addressId: number;
  orderStatus: OrderStatus;
  orderDate: Date;
  paymentStatus?: PaymentStatus;
  totalPrice: number;
  orderItems: CartItem[]; // One-to-many relationship with OrderItems
  // customer: Customer;  // @relation(fields: [customerId], references: [id])
  //  address: Address;  // @relation(fields:[addressId], references: [id])
  //  payment?: Payment;
  createdAt: Date;
  updatedAt: Date;
  address: AddressData;
  invoiceNo: string;
  shippingFees?: string;
  // totalItem: number;
  // Add other properties as needed
}

export interface AddressData {
  id?: number;
  name?: string;
  address?: string;
  note?: string;
  district?: string;
  subDistrict?: string;
  province?: string;
  postal_code?: string;
  country?: string;
  phone_no?: string;
  isActive?: boolean;
  addressId?: number; // Optional, used for updating existing addresses
}

export interface OrderAddress {
  name?: string;
  address?: string;
  phone_no?: string;
}
interface OrderStatus {
  id: number;
  name: string;
}

interface PaymentStatus {
  id: number;
  name?: string;
}

export const fetchProductData = async (
  page: number,
  limit: number
): Promise<ProductTableData> => {
  try {
    const response = await axiosClient.get<ProductTableData>(
      `/client/products?page=${page}&limit=${limit}`
    ); // Replace with your API endpoint
    if (response.status !== 200) {
      if (response.status === 401) {
        window.location.href = "/login-register";
      }
      const errorMessage = "Network error occurred"; // Get the error message
      throw new Error(errorMessage); // Throw the error with the message
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error || "Network error occurred";
      console.error("Error fetching product data:", errorMessage);
      throw new Error(errorMessage); // Re-throw the error with the message
    } else {
      console.error("Error fetching product data:", error);
      throw error; // Re-throw the error after logging it
    }
  }
};

export const fetchFlashSaleProductData =
  async (): Promise<ProductTableData> => {
    try {
      const response = await axiosClient.get<ProductTableData>(
        `/client/flash-sale-products`
      ); // Replace with your API endpoint
      if (response.status !== 200) {
        if (response.status === 401) {
          window.location.href = "/login-register";
        }
        const errorMessage = "Network error occurred"; // Get the error message
        throw new Error(errorMessage); // Throw the error with the message
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errorMessage =
          axiosError.response?.data?.error || "Network error occurred";
        console.error("Error fetching product data:", errorMessage);
        throw new Error(errorMessage); // Re-throw the error with the message
      } else {
        console.error("Error fetching product data:", error);
        throw error; // Re-throw the error after logging it
      }
    }
  };

export const fetchProductDataByCategory = async (
  categoryId: number,
  page: number,
  limit: number
): Promise<ProductTableData> => {
  try {
    const response = await axiosClient.get<ProductTableData>(
      `/client/products-by-category?categoryId=${categoryId}&page=${page}&limit=${limit}`
    ); // Replace with your API endpoint
    if (response.status !== 200) {
      if (response.status === 401) {
        window.location.href = "/login-register";
      }
      const errorMessage = "Network error occurred"; // Get the error message
      throw new Error(errorMessage); // Throw the error with the message
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error || "Network error occurred";
      console.error("Error fetching product data:", errorMessage);
      throw new Error(errorMessage); // Re-throw the error with the message
    } else {
      console.error("Error fetching product data:", error);
      throw error; // Re-throw the error after logging it
    }
  }
};

export const fetchProductDetail = async (
  productId: number
): Promise<ProductDetails> => {
  try {
    const response = await axiosClient.get<ProductDetails>(
      `/client/products-details?productId=${productId}`
    ); // Replace with your API endpoint
    if (response.status !== 200) {
      if (response.status === 401) {
        window.location.href = "/login-register";
      }
      const errorMessage = "Network error occurred"; // Get the error message
      throw new Error(errorMessage); // Throw the error with the message
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error || "Network error occurred";
      console.error("Error fetching product data:", errorMessage);
      throw new Error(errorMessage); // Re-throw the error with the message
    } else {
      console.error("Error fetching product data:", error);
      throw error; // Re-throw the error after logging it
    }
  }
};

export const fetchWishListByUserId = async (
  productId: number
): Promise<WishList> => {
  try {
    const response = await axiosClient.get<WishList>(
      `/client/products-details?productId=${productId}`
    ); // Replace with your API endpoint
    if (response.status !== 200) {
      if (response.status === 401) {
        window.location.href = "/login-register";
      }
      const errorMessage = "Network error occurred"; // Get the error message
      throw new Error(errorMessage); // Throw the error with the message
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error || "Network error occurred";
      console.error("Error fetching product data:", errorMessage);
      throw new Error(errorMessage); // Re-throw the error with the message
    } else {
      console.error("Error fetching product data:", error);
      throw error; // Re-throw the error after logging it
    }
  }
};

export const fetchUserInfo = async () => {
  const response = await axiosClient.get("/customer-info");
  const data = response.data;
  return data;
};

export const fetchTableData = async (
  page: number,
  limit: number,
  orderStatus?: string
): Promise<TableOrderData> => {
  console.log("orderStatus is : ", orderStatus);
  let url = `${
    import.meta.env.VITE_APP_BACKEND_URL
  }/api/v1/client/orders?page=${page}&limit=${limit}&orderStatus=${orderStatus}`;

  // if (orderStatus && orderStatus !== "allOrders") {
  //   url += `&orderStatus=${orderStatus}`;
  // }
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Network error occurred");
  }
  return response.json();
};

export const fetchOrderDetailInfo = async (
  orderId: string
): Promise<OrderData> => {
  const response = await fetch(
    `${
      import.meta.env.VITE_APP_BACKEND_URL
    }/api/v1/client/order-detail/${orderId}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Network error occurred");
  }
  return response.json();
};

export const fetchCategoriesData = async () => {
  const response = await axiosClient.get("client/categories");
  const data = response.data;
  return data;
};

export const saveAddressToDB = async (data: AddressData) => {
  try {
    let response;
    if (data.id) {
      response = await axiosClient.put(`/customer/address/${data.id}`, data);
    } else {
      response = await axiosClient.post("/customer/address", data);
    }

    if (!response) {
      throw new Error("Failed to save address");
    }

    return true;
  } catch (error) {
    console.error("Error saving address:", error);
    return false;
  }
};

// In your axiosClient.ts file
export const deleteAddressFromDB = async (id: number): Promise<boolean> => {
  try {
    const response = await axiosClient.delete(`/customer/address/${id}`);
    return response.status === 200;
  } catch (error) {
    console.error("Error deleting address:", error);
    return false;
  }
};

export const fetchCartData = async () => {
  const response = await axiosClient.get("/client/cart");
  return response.data;
};

export const syncGuestCartToServer = async (userId: string) => {
  const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
  if (!guestCart) return;

  try {
    for (const cartItem of guestCart) {
      try {
        await axiosClient.post("/client/cart", {
          userId, // from auth context
          ...cartItem,
        });
      } catch (err) {
        console.error("Error syncing item to cart:", cartItem, err);
      }
    }
    localStorage.removeItem("guest_cart");
  } catch (err) {
    console.error("Failed to sync guest cart", err);
  }
};

export const fetchProduct = async (
  limit: number,
  type: string = "promotion"
): Promise<ProductTableData> => {
  try {
    const response = await axiosClient.get<ProductTableData>(
      `/client/promotion-products?limit=${limit}&type=${type}`
    ); // Replace with your API endpoint
    if (response.status !== 200) {
      if (response.status === 401) {
        window.location.href = "/login-register";
      }
      const errorMessage = "Network error occurred"; // Get the error message
      throw new Error(errorMessage); // Throw the error with the message
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error || "Network error occurred";
      console.error("Error fetching product data:", errorMessage);
      throw new Error(errorMessage); // Re-throw the error with the message
    } else {
      console.error("Error fetching product data:", error);
      throw error; // Re-throw the error after logging it
    }
  }
};

export const fetchPromotionProduct = async (
  limit: number,
  type: string = "promotion"
): Promise<ProductTableData> => {
  try {
    const response = await axiosClient.get<ProductTableData>(
      `/client/promotion-products?limit=${limit}&type=${type}`
    ); // Replace with your API endpoint
    if (response.status !== 200) {
      if (response.status === 401) {
        window.location.href = "/login-register";
      }
      const errorMessage = "Network error occurred"; // Get the error message
      throw new Error(errorMessage); // Throw the error with the message
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error || "Network error occurred";
      console.error("Error fetching product data:", errorMessage);
      throw new Error(errorMessage); // Re-throw the error with the message
    } else {
      console.error("Error fetching product data:", error);
      throw error; // Re-throw the error after logging it
    }
  }
};

export interface BrandData {
  map(
    arg0: (brand: any, index: any) => JSX.Element
  ): import("react").ReactNode | Iterable<import("react").ReactNode>;
  length: number;
  id: number;
  name: string;
  image: string;
}

export const fetchBrand = async (limit: number): Promise<BrandData> => {
  try {
    const response = await axiosClient.get<BrandData>(
      `/client/brands?limit=${limit}`
    ); // Replace with your API endpoint

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error || "Network error occurred";
      console.error("Error fetching product data:", errorMessage);
      throw new Error(errorMessage); // Re-throw the error with the message
    } else {
      console.error("Error fetching product data:", error);
      throw error; // Re-throw the error after logging it
    }
  }
};

// Add this function to your existing axios client file
export const saveContactMessage = async (data: ContactFormData) => {
  try {
    const response = await axiosClient.post("/client/contact-message", {
      firstName: data.firstName, // Correct field names
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      message: data.message,
      contactType: data.contactType,
    });

    if (!response || response.status !== 200) {
      throw new Error("Failed to save contact message");
    }

    return true;
  } catch (error) {
    console.error("Error saving contact message:", error);
    return false;
  }
};

export const removeWishListItem = async (
  productId: number,
  variationId: number
): Promise<void> => {
  try {
    const response = await axiosClient.delete(
      `/client/wishlist?productId=${productId}&variationId=${variationId}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to remove item from wishlist");
    }
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    throw error; // Re-throw the error after logging it
  }
};

export default axiosClient;
