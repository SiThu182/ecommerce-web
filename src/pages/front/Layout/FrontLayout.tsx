import { useEffect, useState } from "react";
import Footer from "../../../components/common/Footer";
import { Outlet,useLocation } from "react-router";
import NavBar, { MobileDrawer } from "../../../components/common/NavBar";

function FrontLayout() {
  //   const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
   const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" }); // or "smooth"
  }, [location.pathname]);
  
  useEffect(() => {
    const scrollButtonVisibility = () => {
      if (window.scrollY > 150) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", scrollButtonVisibility);
    return () => {
      window.removeEventListener("scroll", scrollButtonVisibility);
    };
  }, []);

  useEffect(() => {});

  return (
    <div className="  flex flex-col min-h-screen">
      <NavBar />
      {/* setIsExpanded={setIsExpanded}  */}
      {showButton && (
        <div
          className="  rounded-full w-14 h-14 flex justify-center items-center text-white shadow-lg cursor-pointer btn bg-primary fixed z-40 bottom-24 right-6"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </div>
      )}
      <div>
        <Outlet />
      </div>

      <MobileDrawer isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <Footer />
    </div>
  );
}

export default FrontLayout;
