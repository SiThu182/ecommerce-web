import { ProductData } from "@/api/axiosClient";
import React from "react";
import { useNavigate } from "react-router";

interface ProductCardProps {
  product: ProductData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.images[0]?.url || "/image/no-image-available.jpg";
  console.log(imageUrl, "Image URL");
  const price =
    product.variations.length > 0 && product.variations[0].prices.length > 0
      ? `$${product.variations[0].prices[0].sale_price}`
      : "Price not available";
  const navigate = useNavigate();
  return (
    <div className="w-[250px]  border border-slate-300 min-h-[350px] flex 
    flex-col gap-[16px]
     hover:bg-gray-100   hover:shadow-lg  ">
      <div className="relative w-full h-[250px] group">
        <img
          src={`${
            product.images[0]?.url
              ? import.meta.env.VITE_APP_BACKEND_URL +"/uploads/"  + imageUrl
              :  imageUrl
          }`}
          alt={product.name}
          className="w-full h-full object-cover p-5"
          crossOrigin="anonymous"
        />
        <button
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary
           text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100
            transition-opacity"
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
          {"View details"}
        </button>
      </div>
      <div className="flex flex-col gap-[8px] p-4">
        <h1 className="font-poppins font-medium text-[1rem]">{product.name}</h1>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-sm text-gray-600">
          Category: {product.category.name}
        </p>
        <p className="text-sm text-gray-600">
          Supplier: {product.supplier.name}
        </p>
        <div>
          <span className="text-[#DB4444]">{price}</span>
        </div>
        <div className="rating">
          <input
            type="radio"
            name={`rating-${product.id}`}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name={`rating-${product.id}`}
            className="mask mask-star-2 bg-orange-400"
            defaultChecked
          />
          <input
            type="radio"
            name={`rating-${product.id}`}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name={`rating-${product.id}`}
            className="mask mask-star-2 bg-orange-400"
          />
          <input
            type="radio"
            name={`rating-${product.id}`}
            className="mask mask-star-2 bg-orange-400"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
