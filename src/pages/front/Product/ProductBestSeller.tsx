import { ProductData } from "@/api/axiosClient";

export interface ProductProps {
  products: ProductData[];
}

const ProductBestSeller: React.FC<ProductProps> = ({ products }) => {
  return (
    <>
      {products?.map((product) => (
        <>
          <div className="flex items-start space-x-4 p-4 bg-white shadow-md rounded-md">
            {/* Product Image */}
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={`${
                  product.images[0]?.url
                    ? import.meta.env.VITE_APP_BACKEND_URL +
                      "/uploads/" +
                      product.images[0]?.url
                    : "null"
                }`}
                alt={product.name}
                className="w-full h-full object-cover p-5"
                crossOrigin="anonymous"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              {/* Product Name */}
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>

              {/* Rating (Stars) */}
              <div className="flex items-center space-x-1 my-2">
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

              {/* Pricing */}
              <div className="mt-2">
                <span className="text-lg font-bold text-green-600">
                  {product.variations.length > 0 &&
                  product.variations[0].prices.length > 0
                    ? `$${product.variations[0].prices[0].sale_price}`
                    : "Price not available"}
                </span>
                <span className="text-gray-400 line-through mr-2">
                  {/* ${product.discountedPrice.toFixed(2)} */}
                </span>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default ProductBestSeller;
