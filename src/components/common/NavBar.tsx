import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import useAuthStatus from "@/hooks/useAuthStatus";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { userLogout } from "@/redux/slice/UserSlice";
import axiosClient, { fetchCartData } from "@/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useGuestCart } from "@/context/CartContext";
import { CartItem } from "@/pages/front/Cart";
import { fetchCategoriesData } from "@/api/axiosClient";
import ThemeToggle from "./ThemeToggleButton";
import { FaBars } from "react-icons/fa";
import { WishlistIcon } from "./WishListIcon";

export const DropdownAccordions = () => {
  // const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // const toggleExpand = (index: number) => {
  //   setExpandedIndex(expandedIndex === index ? null : index);
  // };

  return (
    <nav className="w-full max-w-md mx-auto bg-secondary text-white p-4 rounded-lg">
      <ul>
        {/* {navItems.map((item, index) => (
          <li key={index} className="mb-2">
            <button
              onClick={() => toggleExpand(index)}
              className="flex items-center justify-between w-full py-2 px-4 text-left font-semibold focus:outline-none bg-gray-700 rounded-md"
            >
              {item.title}
              {item.items && (
                <svg
                  className={`w-5 h-5 transition-transform ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
            {item.items && (
              <div
                className={`transition-[max-height,opacity,transform] duration-300 ease-in-out overflow-hidden transform ${
                  expandedIndex === index
                    ? "max-h-40 opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-4"
                }`}
              >
                <ul className="pl-6 mt-2 space-y-1 text-sm text-gray-300">
                  {item.items.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={item.links ? item.links[subIndex] : "#"}
                        className="block py-1 px-2 rounded hover:bg-primary"
                      >
                        {subItem}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))} */}
      </ul>
    </nav>
  );
};

const NavLink = ({
  label,
  link,
  onClick,
}: {
  label: string;
  link: string;
  onClick?: () => void;
}) => (
  <RouterNavLink
    to={link}
    className={({ isActive }) =>
      isActive
        ? "text-blue-600 underline underline-offset-8 font-semibold transition-colors"
        : "text-black hover:text-blue-600 hover:underline underline-offset-8 transition-colors"
    }
    onClick={onClick}
  >
    {label}
  </RouterNavLink>
);

export const MobileDrawer = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: (isExpand: boolean) => void;
}) => {
  return (
    <div
      className={`fixed z-[99] top-0 right-0 h-full w-full bg-secondary/50 backdrop-blur-[20px] transition-opacity duration-300 ${
        isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setIsExpanded(false)} // Close when clicking outside
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent close on drawer click
        className={`fixed top-0 right-0 h-full transition-transform transform duration-300 ease-in-out ${
          isExpanded ? "translate-x-0" : "translate-x-full"
        } w-[90%] max-w-[350px] bg-gray-800 text-white rounded-l-lg   p-4`}
      >
        <button
          onClick={() => setIsExpanded(false)}
          className="rounded-full p-1 text-white"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <DropdownAccordions />
      </div>
    </div>
  );
};

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { cartCount, resetCart } = useGuestCart();
  const { isLoggedIn, setIsLoggedIn } = useAuthStatus();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // <-- Add state for search
  const dropdownRef = useRef<HTMLDivElement>(null); // ref for outside click
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCartData,
    enabled: isLoggedIn,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesData,
  });

  const isCategoryActive = categories?.some(
    (category: any) =>
      location.pathname === `/${category.name.toLowerCase()}/product`
  );

  const cartSize = isLoggedIn
    ? data?.cartItem.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      ) || 0
    : cartCount;

  // const handleLinkClick = () => {
  //   setIsMobileNavOpen(false);
  // };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  // Search API function
  const fetchFilteredProducts = async (search: string) => {
    const res = await axiosClient.get(`client/product-filter/${search}`);
    return res.data;
  };

  const { data: productFilter, isLoading: isLoadingPF } = useQuery({
    queryKey: ["product-filter", searchTerm],
    queryFn: () => searchTerm !== "" && fetchFilteredProducts(searchTerm),
  });

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close when navigating to another route
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between gap-2 xl:gap-4">
        {/* Left - Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src="/image/logo.png" alt="ZZSHOP" className="h-20 w-auto" />
        </div>

        {/* Center - Navigation */}
        <nav className="hidden lg:flex gap-4 lg:gap-8 items-center text-sm font-semibold">
          <NavLink link="/" label="Home" />
          {/* Category Dropdown */}
          <div className="relative group">
            <button
              className={`text-black flex items-center gap-1 transition-colors hover:text-blue-600 hover:underline underline-offset-8
                ${
                  isCategoryActive
                    ? "text-blue-600 underline font-semibold"
                    : ""
                }
              `}
            >
              Categories
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-auto bg-white border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible pointer-events-auto transition-all z-50">
              {categories && categories.length > 0 ? (
                categories.map((category: any) => (
                  <RouterNavLink
                    key={category.id}
                    to={`/${category.name.toLowerCase()}/product`}
                    state={{ id: category.id }}
                    className={({ isActive }) =>
                      isActive
                        ? "block px-4 py-2 text-blue-600 text-xs bg-gray-100 font-semibold whitespace-nowrap"
                        : "block px-4 py-2 text-xs hover:bg-gray-100 text-black whitespace-nowrap"
                    }
                  >
                    {category.name}
                    {/* {category.name.split(" ").slice(0, 4).join(" ")}
                    <br />
                    {category.name.split(" ").slice(4, 8).join(" ")}
                    <br />
                    {category.name.split(" ").slice(8).join(" ")} */}
                  </RouterNavLink>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-400">No categories</div>
              )}
            </div>
          </div>
          <NavLink link="/promotions" label="Promotions" />
          <NavLink link="/about-us" label="About Us" />
          <NavLink link="/contact-us" label="Contact Us" />
          <NavLink link="/best-seller" label="Best Seller" />
          <NavLink link="/package" label="Custom Package" />
        </nav>

        {/* Right - Search + Icons */}
        <div className="flex flex-col-reverse sm:flex-row items-center gap-1 sm:gap-5">
          {/* Search bar */}
          {/* Search container */}
          <div className="relative" ref={dropdownRef}>
            <div className="rounded-lg bg-gray-100 flex items-center px-3 py-2">
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
                className="ml-1 bg-transparent outline-none w-40 xl:w-56 placeholder:text-gray-500 text-sm"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Search results dropdown */}
            {isOpen && (
              <div className="absolute left-0 top-full mt-1 w-full bg-white rounded shadow-lg z-50 max-h-64 overflow-y-auto">
                {isLoadingPF && (
                  <div className="p-3 text-gray-500">Loading...</div>
                )}
                {/* {errorPF && (
                  <div className="p-3 text-red-500">Error: {errorPF.message}</div>
                )} */}
                {productFilter?.length > 0 ? (
                  productFilter.map((product: any) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() =>
                        navigate(
                          "/" +
                            product.categories[0].name.toLowerCase() +
                            "/product/" +
                            product.name.toLowerCase().split(" ").join("-"),
                          { state: { id: product.id } }
                        )
                      }
                    >
                      <img
                        src={
                          product.images?.[0]?.url
                            ? `${
                                import.meta.env.VITE_APP_BACKEND_URL
                              }/uploads/${product.images[0].url}`
                            : "/image/no-image.png"
                        }
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                        crossOrigin="anonymous"
                      />
                      <span className="font-medium">
                        {product.categories[0].name.toLowerCase()}{" "}
                        {product.name}{" "}
                      </span>
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

          {/* Icons */}
          <div className="flex items-center gap-4 text-blue-600">
            {/* Profile or Login */}
            {isLoggedIn ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      <NavLink link={"/profile"} label="Profile" />

                      <span className="hidden badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a className="justify-between">
                      <NavLink link={"/profile"} label="Setting" />
                    </a>
                  </li>
                  <li>
                    <button
                      className="btn"
                      disabled={isLoggingOut}
                      onClick={async () => {
                        setIsLoggingOut(true);
                        try {
                          const response = await axiosClient.post(
                            "/customer-logout",
                            {}
                          );
                          if (response.data.redirect) {
                            localStorage.removeItem("login");
                            dispatch(userLogout());
                            resetCart();
                            setIsLoggedIn(false);
                            window.location.href = response.data.redirect; // Redirect on the client
                            // navigate("/", {
                            //   state: {
                            //     status: "success",
                            //     message: "Log out success",
                            //   },
                            // });
                          }
                          setIsLoggingOut(false);
                        } catch (error) {
                          console.log(error);
                          setIsLoggingOut(false);
                        }
                      }}
                    >
                      {" "}
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="btn"
                onClick={() => navigate("/login-register")}
              >
                {"LogIn"}
              </button>
            )}

            {/* Wishlist */}
            {/* <button onClick={() => navigate("/wishlist")}>
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
            </button> */}
            <button onClick={() => navigate("/wishlist")}>
              <WishlistIcon />
            </button>

            {/* Cart */}
            <button className="relative" onClick={() => navigate("/cart")}>
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
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12a1.125 1.125 0 0 1-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                {cartSize > 0 ? cartSize : 0}
              </span>
            </button>
            <ThemeToggle />
            <button
              className="lg:hidden"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              aria-label="Toggle menu"
            >
              <FaBars size={22} />
            </button>
            {isMobileNavOpen && (
              <>
                {/* Overlay - clicking this will close nav */}
                <div
                  className="fixed inset-0  z-40"
                  //bg-black bg-opacity-30
                  onClick={() => setIsMobileNavOpen(false)}
                ></div>

                <div className="lg:hidden text-xs sm:text-base absolute top-16 sm:top-20 right-0 bg-white shadow-lg z-50 py-5 px-5">
                  <nav className="flex flex-col space-y-3">
                    <NavLink
                      link="/"
                      label="Home"
                      onClick={() => setIsMobileNavOpen(false)}
                    />
                    <NavLink
                      link="/promotions"
                      label="Promotions"
                      onClick={() => setIsMobileNavOpen(false)}
                    />
                    <NavLink
                      link="/best-seller"
                      label="Best Seller"
                      onClick={() => setIsMobileNavOpen(false)}
                    />
                    <NavLink
                      link="/about-us"
                      label="About Us"
                      onClick={() => setIsMobileNavOpen(false)}
                    />
                    <NavLink
                      link="/contact-us"
                      label="Contact Us"
                      onClick={() => setIsMobileNavOpen(false)}
                    />
                    <NavLink
                      link="/package"
                      label="Custom Package"
                      onClick={() => setIsMobileNavOpen(false)}
                    />
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
