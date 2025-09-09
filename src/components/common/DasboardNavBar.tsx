import { useContext, useState } from "react";
import ThemeToggle from "./ThemeToggleButton";

import TawkWidget from "./TawkWidget";
import LanguageBox from "./LanguageBox";
import { useTranslation } from "react-i18next";
import { DashboardContext } from "./DashboardContext"; 
function DashboardNavBar() {
  const context = useContext(DashboardContext);
  const { expand, setExpand, title } = context;
  const toggleSidebar = () => {
    setExpand(!expand);
  };
  const { t } = useTranslation();
  const [isAmountShow, setIsAmountShow] = useState(false);
  return (
    <div className="relative w-full h-[4rem]">
      <div className="z-30 absolute dark:bg-black/80 h-full glassmorphism  flex w-full gap-3  justify-center p-2 rounded-lg shadow-lg">
        <div className="flex max-w-[1600px] w-full justify-between items-center gap-3 px-2">
          <div className="flex gap-2 items-center">
            <div className=" cursor-pointer rounded-full">
              <button
                className={`transform transition-transform duration-200 ease-in-out bg-gray-200 dark:bg-slate-800 p-1 rounded-full focus:outline-none ${
                  expand ? " rotate-0" : " rotate-90"
                }`}
                onClick={toggleSidebar}
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
            {title}
          </div>

          <div className="flex gap-3 items-center">
            <div className="items-center gap-5 hidden sm:flex">
              <div>
                <p className=" font-roboto">USDT : {isAmountShow ? 0 : "*"}</p>
                <span className=" text-muted-foreground">Available</span>
              </div>
              <div
                className=" rounded-full p-2 cursor-pointer"
                onClick={() => setIsAmountShow((prev) => !prev)}
              >
                {isAmountShow ? (
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
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </div>
            </div>
            <LanguageBox />
            <TawkWidget btnTitle={t("deposit", { ns: "dashboardNav" })} />

            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavBar;
