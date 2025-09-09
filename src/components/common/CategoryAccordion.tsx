import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/api/axiosClient";
import { useNavigate } from "react-router";
import { FaBars, FaWindowClose } from "react-icons/fa";

interface Category {
  id: number;
  name: string;
  productCount?: number;
  children?: Category[];
}

const CategoryAccordion: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );

  // NEW: Toggle sidebar state
  const [isOpen, setIsOpen] = useState(true);

  const {
    data: categories,
    error,
    isLoading,
  } = useQuery<Category[], Error>({
    queryKey: ["categoriesWithCount"],
    queryFn: fetchCategories,
  });

  const handleToggle = (id: number) => {
    setExpandedCategories((prevExpanded) => {
      const newExpanded = new Set(prevExpanded);
      newExpanded.has(id) ? newExpanded.delete(id) : newExpanded.add(id);
      return newExpanded;
    });
    setActiveCategoryId(id);
  };

  const navigate = useNavigate();

  const renderCategories = (categories: Category[]) => {
    return categories.map((category) => (
      <div key={category.id}>
        <div
          className={`flex items-center cursor-pointer py-1 border-b text-sm  
            ${
              activeCategoryId === category.id
                ? "text-blue-700 font-semibold"
                : ""
            } hover:text-blue-600`}
        >
          {/* Expand/Collapse Icon */}
          {category.children && (
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
          )}

          {/* Category Name */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setActiveCategoryId(category.id);
              navigate("/" + category.name.toLocaleLowerCase() + "/product", {
                state: { id: category.id },
              });
              setIsOpen(true); // close menu after navigation (on mobile)
            }}
            className="text-xs lg:text-base"
          >
            {category.name} ({category?.productCount})
          </div>
        </div>

        {/* Children */}
        {expandedCategories.has(category.id) && category.children && (
          <div className="pl-4 text-xs lg:text-base">
            {renderCategories(category.children)}
          </div>
        )}
      </div>
    ));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {/* Header + Hamburger */}
      <article className="flex justify-between items-center text-sm lg:text-lg p-1 my-2">
        {isOpen ? (
          <span>
            Shop From{" "}
            <span className="text-sky-500 font-bold">Top Categories</span>
          </span>
        ) : (
          ""
        )}

        {/* Hamburger (hidden on lg screens) */}
        <button
          className="lg:hidden p-2 border rounded-md text-end"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            // Close (X) icon
            <FaWindowClose />
          ) : (
            // Hamburger icon
            <FaBars />
          )}
        </button>
      </article>

      {/* Accordion Content */}
      <div
        className={`w-full border-t-4 border-sky-500 px-2 
          ${isOpen ? "block" : "hidden"} lg:block`}
      >
        {categories && renderCategories(categories)}
      </div>
    </>
  );
};

export default CategoryAccordion;
