import React from "react";

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

export default InfoWithImageSection;
