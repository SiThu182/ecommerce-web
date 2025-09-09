 
import { useWishlistContext } from "@/context/WishlistContext";
 
export const WishlistIcon = () => {
     const { count } = useWishlistContext();

  // const { wlCount } = useGuestCart();

  return (
    <div className="relative">
       <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.239-4.5-5-4.5a5.45 5.45 0 00-4 1.754A5.45 5.45 0 008 3.75c-2.761 0-5 2.015-5 4.5 0 3.75 6 8.25 9 10.5 3-2.25 9-6.75 9-10.5z"
                />
              </svg>
       <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
              {count > 0 ? count : 0}
                </span>
    </div>
  );
};
