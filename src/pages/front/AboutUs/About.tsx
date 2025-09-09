//
const About: React.FC = () => {
  return (
    <>
      <div>
        <div className="bg-blue-600 text-center item-center text-white py-10">
          <h2 className="font-song font-medium text-7xl p-4 mb-5">About Us</h2>
          <p className="font-dancing font-medium text-xl">
            Bringing Freshness to Your Doorstep
          </p>
          <p className="font-semibold text-3xl my-3">
            "We Make good food accessible, affordable, and delivered with care."
          </p>
          <p className="font-lato">
            You can send fast, high quality with reasonable prices.
          </p>
        </div>

        <div className="bg-gray-100 flex gap-10 mt-10 mx-12">
          <div className="w-1/2">
            <img
              src="/image/aboutUs/about-us.png"
              className="w-full h-full"
            ></img>
          </div>
          <div className="w-1/2 mx-5 my-auto text-start">
            <h3 className="font-bold text-4xl my-3 text-start">
              What is OZZSHOP?
            </h3>
            <div className="w-72 h-2 flex items-center justify-center from-blue-600 via-blue-400 to-blue-200 bg-gradient-to-r rounded-lg"></div>
            <p className="text-blue-800 font-dancing font-semibold">
              How we started
            </p>
            <p className="p-4 text-gray-500 text-lg font-semibold text-start">
              <span className="text-blue-600 font-semibold">OZZSHOP</span> began
              with a simple idea: everyone deserves easy access to fresh and
              healthy food. Founded in 2025, we started small—partnering with
              local products and suppliers who share our passion for quality and
              sustainability. Today, we proudly serve thousands of happy
              customers, bringing both tradition and convenience together on one
              platform.
            </p>
          </div>
        </div>

        <div className="mx-12 mt-10">
          <h3 className="font-extrabold text-4xl mt-10 p-4">
            {" "}
            Our Mission and Values
          </h3>
          <div className="mx-4 w-96 h-2 flex items-center justify-center from-blue-600 via-blue-400 to-blue-200 bg-gradient-to-r rounded-lg"></div>
          <p className="text-blue-800 px-4 font-dancing font-semibold">
            What we stand for
          </p>
          <div className="flex gap-24 mt-10">
            <div className="flex flex-col w-1/2 gap-12">
              <div className="flex gap-5">
                <img src="/image/aboutUs/fresh.png" className="w-20 h-20"></img>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-xl">Freshess First</p>
                  <span className="text-gray-500 text-lg font-semibold">
                    Only the best-quality ingredients make it to your basket.
                  </span>
                </div>
              </div>
              <div className="flex gap-5">
                <img src="/image/aboutUs/trust.png" className="w-22 h-20"></img>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-xl">Trust & Transparency</p>
                  <span className="text-gray-500 text-lg  font-semibold">
                    Clear sourcing, fair pricing, no hidden tricks.{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-1/2 gap-12">
              <div className="flex gap-5">
                <img
                  src="/image/aboutUs/substain.png"
                  className="w-22 h-20"
                ></img>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-xl">Sustainability</p>
                  <span className="text-gray-500 text-lg  font-semibold">
                    Supporting local farmers and reducing waste with
                    eco-friendly practices.
                  </span>
                </div>
              </div>
              <div className="flex gap-5">
                <img
                  src="/image/aboutUs/convenience.png"
                  className="w-22 h-20"
                ></img>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-xl">Convenience</p>
                  <span className="text-gray-500 text-lg font-semibold">
                    Making food shopping easy, anytime and anywhere.{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-contain my-10 mx-5 ">
          <img src="/image/aboutUs/whychooseus.png" className=""></img>
        </div>
      </div>
    </>
  );
};
export default About;
