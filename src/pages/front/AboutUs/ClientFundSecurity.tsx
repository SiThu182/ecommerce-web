import TradeNowSection from "@/components/common/TradeNowSection";
import React from "react";
import { useTranslation } from "react-i18next";

interface InfoProps {
  title: string;
  content: string;
  image: string;
  order?: "default" | "reverse";
}

const InfoWithImageSection: React.FC<InfoProps> = ({
  title,
  content,
  image,
  order = "default",
}) => {
  const { t } = useTranslation();
  const securityList = t("securityList", { ns: "about", returnObjects: true });
  return (
    <>
      <section className="flex justify-between flex-col md:flex-row w-full  flex-wrap">
        <div
          className={`prose ${
            order == "default" ? "order-0" : "order-1"
          } w-full md:w-1/2`}
        >
          <h1 className=" font-inter text-primary">{title}</h1>
          <p className=" font-roboto dark:text-muted-foreground">{content}</p>
          <div className=" ">
            {Array.isArray(securityList) &&
              securityList.map((t, index) => (
                <SecurityFact key={index} content={t} />
              ))}
          </div>
        </div>
        <div
          className={`w-full md:w-1/2 p-2 ${
            order == "default" ? "order-1" : "order-0"
          }`}
        >
          <img
            src={image}
            alt="data-img"
            className="rounded-md overflow-hidden w-full"
          />
        </div>
      </section>
    </>
  );
};

export const SecurityFact = ({ content }: { content: string }) => {
  return (
    <div className=" flex w-full gap-5 items-center">
      <div className="w-15">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="green"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
      </div>
      <p className=" font-roboto ">{content}</p>
    </div>
  );
};

function ClientFundSecurity() {
  const { t } = useTranslation();

  return (
    <>
      <main className="max-w-[1650px] py-[10rem] bg-background w-full mx-auto px-5 md:px-20 ">
        <InfoWithImageSection
          title={t("clientFund.title", { ns: "about" })}
          content={t("clientFund.content", { ns: "about" })}
          image={"/image/client-fund.jpg"}
        />
      </main>

      <TradeNowSection />
    </>
  );
}

export default ClientFundSecurity;
