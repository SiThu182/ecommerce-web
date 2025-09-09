import Accordion from "@/components/common/Accordion";
import TradeNowSection from "@/components/common/TradeNowSection";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function HelpCenter() {
  const { t } = useTranslation();
  const problemList = t("problemList", {
    ns: "about",
    returnObjects: true,
  });
  const navigate = useNavigate();
  const problemTitle = t("help.title", { ns: "about" });
  return (
    <>
      <main className="max-w-[1650px] py-[10rem] bg-background w-full mx-auto px-5 md:px-20 ">
        <section>
          <div className="flex justify-center ">
            <div className="prose">
              <h1 className="text-center text-primary">
                {t("help.title", { ns: "about" })}
              </h1>
              <div className="flex justify-center">
                <input
                  type="text"
                  className="p-2 min-w-[25rem] border-y-2 border-l-2 rounded-y-md rounded-l-md border-gray-900"
                />
                <button className="btn rounded-l-none">
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
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="my-10">
          <div className="flex flex-col gap-3">
            {Array.isArray(problemList) &&
              problemList.map((t, index) => (
                <Accordion
                  key={index}
                  item={{ title: problemTitle, content: t }}
                />
              ))}
          </div>
          <div className="flex justify-center my-10">
            <span>
              Can't find the answer you need?{" "}
              <span
                className=" underline cursor-pointer text-blue-400"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Contact Us
              </span>
            </span>
          </div>
        </section>
      </main>
      <TradeNowSection />
    </>
  );
}

export default HelpCenter;
