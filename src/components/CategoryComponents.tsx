import { fetchCategoriesData } from "@/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
  
interface Category {
  id: number;
  name: string;
  image: string;
}

// const categories: Category[] = [
//   { id: 1, name: "Electronics", image: "📱" },
//   { id: 2, name: "Foods", image: "🍔" },
//   { id: 3, name: "Fashion", image: "👜" },
//   { id: 4, name: "Medicine", image: "💊" },
//   { id: 5, name: "Sports", image: "⚽" },
//   { id: 6, name: "Beauty", image: "💄" },
// ];



const Categories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {data} = useQuery<Category[],Error>({
    queryKey: ["categories"],
    queryFn: fetchCategoriesData,
  });
  console.log(data,"Category Data")
  // Scroll to the left
  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  // Scroll to the right
  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="w-full">
      <div className=" mb-4">
        <div className="flex gap-2 mb-4 items-center">
          <div className="w-[20px] h-[40px] rounded-[5px] overflow-hidden bg-primary"></div>
          <h1 className=" font-poppins text-primary font-semibold text-[16px]">
            Categories
          </h1>
        </div>
        <div>
          {" "}
          <h2 className="text-4xl  font-inter font-semibold">
            Browse By Category
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex space-x-2 justify-end">
          <button
            onClick={scrollLeft}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="grid grid-cols-4 gap-4 overflow-x-auto no-scrollbar"
      >
        {data && data?.map((category) => (
          <div
            key={category.id}
            className="w-full h-48 bg-gray-100 rounded-lg shadow-md hover:bg-primary hover:text-white transition duration-300 cursor-pointer text-center"
            style={{ backgroundImage: `url('https://www.gomyanmartours.com/wp-content/uploads/2014/11/Myanmar-lacquerware.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}

          >
            <div className="flex flex-col items-center justify-center h-full">

              <div className="text-5xl mt-6">{category.image}</div>
              <p className="mt-4 font-medium text-white text-center justify-center items-center">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
