import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

function ContactUs() {
  const { t } = useTranslation();
  const addressList = t("address", { ns: "contactUs", returnObjects: true });
  const { token } = useParams<{ token?: string }>();
  return (
    <>
      <main className="max-w-[1650px] py-[10rem] bg-background w-full mx-auto px-5 md:px-20 ">
        <section className=" ">
          <div className="flex justify-center">
            <div className="prose">
              <h1 className=" font-inter text-primary mb-10">
                {t("contact", { ns: "navbar" })}
              </h1>
            </div>
          </div>
          <form className="px-5 py-10 md:px-20 border-2 border-l-gray-400 rounded-r-xl">
            <div className="my-5">
              <label className="my-5 font-roboto text-xl">Email</label>
              <input
                className="border-2 border-gray-200 rounded-md w-full"
                type="email"
              ></input>
            </div>
            <div className="my-5">
              <label className="my-5 font-roboto text-xl">Content</label>
              <textarea
                className="border-2 border-gray-200 rounded-md w-full"
                rows={10}
              ></textarea>
            </div>
            <div className=" flex justify-end">
              <button className=" btn">Send</button>
            </div>
          </form>
        </section>
        <section className="my-[10rem]">
          <div className="flex gap-10 justify-evenly w-full ">
            {Array.isArray(addressList) &&
              addressList.map((a, index) => (
                <div className=" md:w-1/3 w-full" key={index}>
                  <h2 className="text-primary font-inter">Address :</h2>
                  <p className=" text-muted-foreground font-roboto">{a}</p>
                </div>
              ))}
          </div>
          <div className="flex gap-10 my-20 ">
            <div className=" md:w-1/3 w-full">
              <h2 className="text-primary font-inter">Phone :</h2>
              <p className=" text-muted-foreground font-roboto">+66 90000098</p>
            </div>
            <div className=" md:w-1/3 w-full">
              <h2 className="text-primary font-inter">Support Email :</h2>
              <p className=" text-muted-foreground font-roboto">
                info@email.com
              </p>
            </div>
            <div className=" md:w-1/3 w-full">
              <h2 className="text-primary font-inter">Business Email :</h2>
              <p className=" text-muted-foreground font-roboto">
                business@email.com
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* <TradeNowSection /> */}
    </>
  );
}

export default ContactUs;
