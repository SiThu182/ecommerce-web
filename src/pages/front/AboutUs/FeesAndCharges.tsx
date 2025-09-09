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

interface ChargeInfoProps {
  title: string;

  image: string;
  order?: "default" | "reverse";
}

const ChargeInfoWithImageSection: React.FC<ChargeInfoProps> = ({
  title,

  image,
  order = "default",
}) => {
  const { t } = useTranslation();
  const chargeList = t("chargesList", { ns: "about", returnObjects: true });
  return (
    <>
      <section className="flex justify-between flex-col md:flex-row w-full rounded-md shadow-md p-2 flex-wrap">
        <div className={`w-full md:w-1/3 p-2 `}>
          <img
            src={image}
            alt="data-img"
            className="rounded-md overflow-hidden w-full"
          />
        </div>
        <div
          className={`prose ${
            order == "default" ? "order-0" : "order-1"
          } w-full md:w-1/2`}
        >
          <h1 className=" font-inter text-primary">{title}</h1>
          {Array.isArray(chargeList) &&
            chargeList.map((c, index) => (
              <div className=" flex justify-between gap-5 " key={index}>
                <span className=" font-roboto dark:text-muted-foreground w-1/3">
                  {c}
                </span>
                <span>----</span>
                <span className=" font-roboto dark:text-muted-foreground">
                  {t("foc", { ns: "about" })}
                </span>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

const ImageList1 = [
  {
    image: "/image/bid-ask.png",
    title: "Asia's Best Contract for Difference Broker in 2023",
  },
  {
    image: "/image/deposit-charge.png",
    title: "2022 Global Best Broker",
  },
];

const ImageList2 = [
  {
    image: "/image/overnight-position.png",
    title: "The Most Trusted Brand of 2021",
  },
  {
    image: "/image/other-expense.png",
    title: "Best Financial Technology Broker",
  },
];
interface SelectInfoProps {
  image: string;
  title: string;
  content: string;
}

const SelectInfo: React.FC<SelectInfoProps> = ({ image, title, content }) => {
  return (
    <div>
      <div className=" flex justify-center w-full h-[5rem] ">
        <img src={image} alt="charges-icon " className="w-[3rem] h-[3rem]" />
      </div>
      <div className="flex justify-center">
        <div className=" prose">
          <h3 className=" font-inter text-center text-primary">{title}</h3>
          <p className=" leading-8  ">{content}</p>
        </div>
      </div>
    </div>
  );
};

function FeesAndCharges() {
  const { t } = useTranslation();
  const fcList1 = t("fcList1", { ns: "about", returnObjects: true });
  const fcList2 = t("fcList2", { ns: "about", returnObjects: true });
  return (
    <>
      <main className="max-w-[1650px] py-[10rem] bg-background w-full mx-auto px-5 md:px-20 ">
        <InfoWithImageSection
          title={t("fees.title", { ns: "about" })}
          content={t("fees.content", { ns: "about" })}
          image={"/image/fees-charge.jpg"}
        />
        <ChargeInfoWithImageSection
          title={t("charges.title", { ns: "about" })}
          image={"/image/charge-bg.png"}
        />
        <div className="w-[80%] mx-auto h-[1px]  bg-primary my-20"></div>
        <div className="flex justify-evenly gap-10 flex-col md:flex-row mb-10">
          {Array.isArray(fcList1) &&
            fcList1.map((c, index) => (
              <div className=" w-1/3" key={index}>
                <SelectInfo
                  image={ImageList1[index].image}
                  title={c.title}
                  content={c.content}
                />
              </div>
            ))}
        </div>
        <div className="flex justify-evenly gap-10 flex-col md:flex-row mb-10">
          {Array.isArray(fcList2) &&
            fcList2.map((c, index) => (
              <div className=" w-1/3" key={index}>
                <SelectInfo
                  image={ImageList2[index].image}
                  title={c.title}
                  content={c.content}
                />
              </div>
            ))}
        </div>
      </main>

      <TradeNowSection />
    </>
  );
}

export default FeesAndCharges;
