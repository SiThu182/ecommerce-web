import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axiosClient, {
  fetchProductDataByCategory,
  ProductTableData,
} from "@/api/axiosClient";
import CategoryAccordion from "@/components/common/CategoryAccordion";
import ProductCard from "@/components/common/ProductCard";
import MiniCarousel from "@/components/common/MiniCarousel";
import { useLocation } from "react-router";
// import ProductBestSeller from "./ProductBestSeller";
import { useNavigate } from "react-router";

const Product = () => {
  const [page, setPage] = useState<number>(1);
  // const [filterValue, setFilterValue] = useState(50); // Initial filter value
  const [searchTerm, setSearchTerm] = useState(""); // <-- Add state for search

  const location = useLocation();

  const categoryId = location.state?.id || null; // Extract category ID from location state
  const navigate = useNavigate();

  // Search API function
  const fetchFilteredProducts = async (search: string) => {
    const res = await axiosClient.get(`client/product-filter/${search}`);
    return res.data;
  };

  // Use search if present, otherwise use category
  const {
    data: productFilter,
    error: errorPF,
    isLoading: isLoadingPF,
  } = useQuery({
    queryKey: ["product-filter", searchTerm],
    queryFn: () =>
      searchTerm
        ? fetchFilteredProducts(searchTerm)
        : fetchProductDataByCategory(categoryId, page, 10),
  });

  // Include categoryId in queryKey to trigger refetch on change
  const { data, error, isLoading } = useQuery<ProductTableData, Error>({
    queryKey: ["tableData", categoryId, page, 10], // Include categoryId in query key
    queryFn: () => fetchProductDataByCategory(categoryId, page, 10), // Fetch data based on categoryId
  });

  // const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFilterValue(parseInt(event.target.value));
  // };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className=" flex flex-col max-w-[1600px] justify-center m-3">
      <div>
        <MiniCarousel />
      </div>

      <div className="w-1/4 mt-5">
        {/* Search container */}
        <div className="relative">
          <div className="rounded-3xl bg-gray-100 border border-blue-600 flex items-center px-3 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.25 4.5a7.5 7.5 0 015.4 12.15z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search your Products,Categories"
              className="bg-transparent outline-none w-56 placeholder:text-gray-500 text-xs lg:text-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Search results dropdown */}
          {searchTerm && (
            <div className="absolute left-0 top-full mt-1 w-full bg-white rounded shadow-lg z-50 max-h-64 overflow-y-auto">
              {isLoadingPF && (
                <div className="p-3 text-gray-500">Loading...</div>
              )}
              {errorPF && (
                <div className="p-3 text-red-500">Error: {errorPF.message}</div>
              )}
              {productFilter?.length > 0 ? (
                productFilter.map((product: any) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer"
                    onClick={() =>
                      navigate(
                        "/" +
                          product.category.name.toLowerCase() +
                          "/product/" +
                          product.name.toLowerCase().split(" ").join("-"),
                        { state: { id: product.id } }
                      )
                    }
                  >
                    <img
                      src={
                        product.images?.[0]?.url
                          ? `${import.meta.env.VITE_APP_BACKEND_URL}/uploads/${
                              product.images[0].url
                            }`
                          : "/image/no-image.png"
                      }
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                      crossOrigin="anonymous"
                    />
                    <span className="font-medium">{product.name}</span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-400 text-sm">
                  No products found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* <div className="form-control my-3">
          <label className="label">
            <span className="label-text">Filter by Price</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filterValue}
            onChange={handleFilterChange}
            className="range"
          />
          <div className="w-full flex justify-between text-xs px-1">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
          <div className="text-center mt-2">
            <span>Current Filter Value: {filterValue}</span>
          </div>
        </div> */}

        {/* <ProductBestSeller products={data?.data || []} /> */}
      </div>
      <div className="flex">
        <div className="flex-none max-w-[150px] lg:max-w-[250px] overflow-y-auto max-h-[850px] min-h-[200vh]">
          <CategoryAccordion />
        </div>
        <div className="w-full mt-5">
          <main className="bg-base-100 max-w-[1650px] w-full mx-auto">
            <section className="w-full gap-[60px] flex flex-col">
              <div className="flex flex-col">
                {isLoading && (
                  <span className="loading loading-spinner loading-lg"></span>
                )}
                {error && <div>Error: {error.message}</div>}
                {data && data?.data?.length > 0 ? (
                  <>
                    <div className="flex gap-5">
                      <div className="flex-grow flex gap-[15px] flex-wrap mx-4">
                        {data?.data?.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                    <div className="join my-5 flex text-end justify-end">
                      <button
                        className="join-item btn"
                        onClick={() =>
                          setPage((prev) => (prev > 1 ? prev - 1 : prev))
                        }
                      >
                        «
                      </button>
                      <button className="join-item btn">Page {page}</button>
                      <button
                        className="join-item btn"
                        onClick={() => setPage((prev) => prev + 1)}
                      >
                        »
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center h-10">Product Not Available.</div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Product;
