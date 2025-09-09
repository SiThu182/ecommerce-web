import React, { ReactNode, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axiosClient from "@/api/axiosClient";
import { userLogout } from "@/redux/slice/UserSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { DashboardContext } from "./DashboardContext";
 

interface LinkProps {
  label: string;
  svgIcon: ReactNode;
  link: string;
  expand: boolean;
  setTitle: (title: string) => void;
}

const SideNavLink: React.FC<LinkProps> = ({
  label,
  svgIcon,
  link,
  expand,
  setTitle,
}) => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);
  const path = window.location.pathname;
  useEffect(() => {
    if (path.includes(link)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [link, path]);

  return (
    <div
      className={`p-2 my-2 rounded-lg w-full hover:bg-primary ${
        isActive ? "bg-primary text-white" : "bg-gray-100"
      } hover:text-white text-black flex items-center gap-5 ${
        !expand && "justify-center"
      }`}
      onClick={() => {
        setTitle(label);
        navigate(link);
      }}
    >
      <div className={`${!expand && "w-full"}`}>{svgIcon}</div>
      <div
        className={`transition-all ease-in-out ${expand ? "block" : "hidden"}`}
      >
        <Link
          className={` font-roboto text-sm  overflow-hidden text-nowrap`}
          to={link}
        >
          {label}
        </Link>
      </div>
    </div>
  );
};

export const MobileDrawer = () => {
  const context = useContext(DashboardContext);
  const { expand, setExpand } = context;

  return (
    <div
      className={`fixed z-[99] block md:hidden top-0 left-0 h-full w-full bg-secondary/50 backdrop-blur-[20px] transition-opacity duration-300 ${
        expand ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setExpand(false)} // Close when clicking outside
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent close on drawer click
        className={`fixed top-0 right-0 h-full transition-transform transform duration-300 ease-in-out ${
          expand ? "translate-x-0" : "translate-x-full"
        } w-[90%] max-w-[350px] bg-gray-800 text-white rounded-l-lg glassmorphism p-4`}
      >
        <button
          onClick={() => setExpand(false)}
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
        <NavigationSection />
      </div>
    </div>
  );
};

const NavigationSection = () => {
  const context = useContext(DashboardContext);
  const { expand, setTitle } = context;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  return (
    <div className="h-[80vh] ">
      <div
        className=" rounded-full flex justify-center items-center w-full overflow-hidden mx-auto max-w-20 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/image/logo.jpg" alt="" />
      </div>
      <div className="h-full">
        <nav
          aria-label="Sidebar navigation "
          className="my-5 flex h-full flex-col justify-between"
        >
          <div className=" h-[80%]">
            <ul>
              <li>
                <SideNavLink
                  label={t("dashboard", { ns: "dashboardNav" })}
                  svgIcon={
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
                        d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                      />
                    </svg>
                  }
                  link="dashboard"
                  expand={expand}
                  setTitle={setTitle}
                />
              </li>
              <li>
                <SideNavLink
                  label={t("dealing", { ns: "dashboardNav" })}
                  svgIcon={
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
                        d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      />
                    </svg>
                  }
                  link="dealing"
                  expand={expand}
                  setTitle={setTitle}
                />
              </li>
              <li>
                <SideNavLink
                  label={t("market", { ns: "dashboardNav" })}
                  svgIcon={
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
                        d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                      />
                    </svg>
                  }
                  link="market"
                  expand={expand}
                  setTitle={setTitle}
                />
              </li>
              <li>
                <SideNavLink
                  label={t("account", { ns: "dashboardNav" })}
                  svgIcon={
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
                        d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                      />
                    </svg>
                  }
                  link="user-account"
                  expand={expand}
                  setTitle={setTitle}
                />
              </li>
            </ul>
          </div>
          <div>
            <div className="flex justify-center">
              <button
                disabled={isLoggingOut}
                className="btn"
                onClick={async () => {
                  setIsLoggingOut(true);
                  try {
                    const response = await axiosClient.post("/log-out", {});
                    if (response.data.redirect) {
                      localStorage.removeItem("login");
                      dispatch(userLogout());
                      //window.location.href = response.data.redirect; // Redirect on the client
                      navigate("/login-register", {
                        state: {
                          status: "success",
                          message: "Log out success",
                        },
                      });
                    }
                    setIsLoggingOut(false);
                  } catch (error) {
                    console.log(error);
                    setIsLoggingOut(false);
                  }
                }}
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
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

function SideBar() {
  const context = useContext(DashboardContext);
  const { expand } = context;

  return (
    <div
      className={`flex flex-col  transform transition-all duration-300 ease-in-out ${
        expand ? "translate-x-0 w-[20vw] max-w-[250px]" : "w-[70px]"
      } dark:bg-black  md:block hidden text-white min-h-[92vh] rounded-lg border-2 dark:border-gray-400 p-2 overflow-hidden`}
    >
      <NavigationSection />
    </div>
  );
}

export default SideBar;
