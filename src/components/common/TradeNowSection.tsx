import { useTranslation } from "react-i18next";

// import axios from "axios";
import { useNavigate } from "react-router";

function TradeNowSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // const callWebHook = async () => {
  //   // const accessToken = await fetchClientToken();
  //   // console.log(accessToken, "accessToken");

  //   try {
  //     // createSession(features, callback, vendor_data);
  //     const response = await axios.post("http://localhost:8080/api/session");
  //     console.log(response, "response");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <section className="mt-20">
        <div className="w-full flex justify-center">
          <div className="prose text-center">
            <h1 className="font-inter text-primary">
              {" "}
              {t("easyAccessTitle", { ns: "common" })}
            </h1>
            <p className=" font-roboto text-2xl text-muted-foreground">
              {t("easyAccessContent", { ns: "common" })}
            </p>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
          <div>
            <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
              {t("welcome", { ns: "common" })}
            </p>
            <div className=" flex justify-center my-10">
              <button
                className="btn text-2xl"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                {t("tradeNow", { ns: "common" })}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TradeNowSection;
