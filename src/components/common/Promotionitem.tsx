import React from 'react';

import { ProductData } from '@/api/axiosClient';
import { useNavigate } from 'react-router';
 
interface ProductCardProps {
  product: ProductData;
}
     
const PromotionItem: React.FC<ProductCardProps> = ({ product }) => {
    console.log(product, "Product Data");
    const imageUrl = product.images[0]?.url || "/image/no-image-available.jpg";
    console.log(product.images[0]?.url, "Image URL");
    // const price =
    // product.variations.length > 0 && product.variations[0].prices.length > 0
    //   ? `$${product.variations[0].prices[0].sale_price}`
    //   : "Price not available";

    const navigate = useNavigate();
      
    return (
        <div className="max-w-md mx-auto  bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-4">
                {/* Image */}
                <div className="relative group ">
                    <img
                        src={`${
                            product.images[0]?.url && product.images[0]?.url !== undefined
                            ? import.meta.env.VITE_APP_BACKEND_URL +"/uploads/"  + imageUrl
                            :  imageUrl
                        }`}                
                        alt="Lay's Snack Box"
                        className="rounded-t-lg h-50"
                        crossOrigin="anonymous"

                    />
                        <button
                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 
                            rounded opacity-0 group-hover:opacity-100 transition-opacity"
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
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button className="btn btn-circle btn-outline text-gray-600">
                        ❤️
                        </button>
                        <button className="btn btn-circle btn-outline text-gray-600">
                        👁
                        </button>
                    </div>
                </div>

                {/* Content */}
                <h2 className="text-lg font-semibold text-gray-700 mt-4">
                {product.name}
                </h2>
                <div className="flex items-center space-x-2 mt-2">
                <span className="text-xl font-bold text-red-500"></span>
                {/* <span className="text-sm line-through text-gray-400">$30</span> */}
                </div>

                {/* Rating */}
                <div className="flex items-center mt-2">
                <div className="rating">
                    <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400"
                    checked
                    readOnly
                    />
                    <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400"
                    checked
                    readOnly
                    />
                    <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400"
                    checked
                    readOnly
                    />
                    <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400"
                    checked
                    readOnly
                    />
                    <input
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400"
                    readOnly
                    />
                </div>
                <span className="text-sm text-gray-500 ml-2">(65)</span>
                </div>
            </div>
        </div>
    );
};

export default PromotionItem;
