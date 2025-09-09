import {
  fetchProductDataByCategory,
  ProductTableData,
} from "@/api/axiosClient";
import CategoryAccordion from "@/components/common/CategoryAccordion";
import ProductCard from "@/components/common/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useParams } from "react-router";
import MiniCarousel from "@/components/common/MiniCarousel";

function ProductByCategory() {
  const { category } = useParams();
  const state = useLocation();
  console.log(state, "state");
  const [page, setPage] = useState<number>(1);
  const { data, error, isLoading } = useQuery<ProductTableData, Error>({
    queryKey: ["tableData", page, 10], // Include page and limit in query key
    queryFn: () =>
      fetchProductDataByCategory(state.state?.id || null, page, 10), // Pass page and limit to fetch function
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-[70vh] flex max-w-[1600px] justify-center mx-auto">
      <section className="w-full gap-[60px] flex flex-col p-10">
        <div>
          <div className="flex gap-2 mb-4 items-center">
            <div className="w-[20px] h-[40px] rounded-[5px] overflow-hidden bg-primary"></div>
            <h1 className=" font-poppins text-primary font-semibold text-[16px]">
              Product By Category
            </h1>
          </div>
          <div>
            <h2 className="text-4xl  font-inter font-semibold">{category}</h2>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col">
          {isLoading && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
          <div className=" flex gap-5">
            <div className="w-[24rem]">
              <CategoryAccordion />
            </div>
            <div className="flex gap-[50px] flex-wrap mx-auto">
              <MiniCarousel />
              {data?.data?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div className="join my-5">
            <button
              className="join-item btn"
              onClick={() => setPage((prev) => (prev <= 1 ? prev : prev - 1))}
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
        </div>
      </section>
    </div>
  );
}

export default ProductByCategory;
