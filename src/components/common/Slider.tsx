import React, { useState } from "react";
import ProductCard from "@/components/common/ProductCard"; // Import the ProductCard component
import { ProductData } from "@/api/axiosClient";

interface SliderProps {
  products: ProductData[];
}

const Slider: React.FC<SliderProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; // Number of items to show per page

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.ceil(products.length / itemsPerPage) - 1
        : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === Math.ceil(products.length / itemsPerPage) - 1
        ? 0
        : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
        }}
      >
        {/*className="flex-shrink-0 p-2" */}
        {products.map((product) => (
          <div key={product.id} className="w-4/5 flex gap-[15px] flex-wrap p-2">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={handlePrev}
      >
        &larr;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={handleNext}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Slider;
