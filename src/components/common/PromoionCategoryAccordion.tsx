import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchPromotionCategories } from "@/api/axiosClient";
import { useNavigate } from "react-router";

interface Category {
  id: number;
  name: string;
  description: string;
  slug: string;
  nested_level: number;
  image: string;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
}

// Add interface for API response
interface ApiResponse {
  data: Category[];
}

const PromotionCategoryAccordion: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );

  // Fetch categories from the API - updated to handle response structure
  const {
    data: response,
    error,
    isLoading,
  } = useQuery<ApiResponse, Error>({
    queryKey: ["promotionCategories"],
    queryFn: fetchPromotionCategories,
  });

  // Extract categories from response data
  const categories = response?.data || [];

  // Toggle the expanded state for a specific category
  const handleToggle = (id: number) => {
    setExpandedCategories((prevExpanded) => {
      const newExpanded = new Set(prevExpanded);
      if (newExpanded.has(id)) {
        newExpanded.delete(id); // Collapse the category if it's already expanded
      } else {
        newExpanded.add(id); // Expand the category if it's not expanded
      }
      return newExpanded;
    });
  };

  const navigate = useNavigate();

  // Recursive function to render categories and their children
  const renderCategories = (categories: Category[]) => {
    // Add safety check
    if (!categories || !Array.isArray(categories)) {
      return <div>No categories available</div>;
    }

    return categories.map((category) => (
      <div key={category.id}>
        <div className="flex justify-center items-center cursor-pointer p-0 border-b">
          {/* Expand/Collapse Icon */}
          {/* {category.children && (
            <span
              className="mr-2 cursor-pointer"
              onClick={() => handleToggle(category.id)}
            >
              {expandedCategories.has(category.id) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </span>
          )} */}
          {/* Category Name */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate("/" + category.name.toLocaleLowerCase() + "/product", {
                state: { id: category.id },
              });
            }}
            className="text-xs lg:text-base cursor-pointer p-2 hover:bg-gray-100"
          >
            {category.name}
            {/* ({category?.productCount}) */}
          </div>
        </div>
        {/* If the category is expanded, render its children recursively */}
        {/* {expandedCategories.has(category.id) && category.children && (
          <div className="pl-4 text-xs lg:text-base">
            {renderCategories(category.children)}
          </div>
        )} */}
      </div>
    ));
  };

  // Loading and error handling
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Main render
  return (
    <>
      {/* <article className="text-lg p-1 my-2">
        Shop From{" "}
        <span className="text-sky-500 font-bold">Top Categories </span>
      </article> */}

      <div className="w-full px-1 items-center">
        {renderCategories(categories)}
      </div>
    </>
  );
};

export default PromotionCategoryAccordion;
