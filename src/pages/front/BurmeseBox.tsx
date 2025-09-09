import React from "react";
import boxImage from "../../assets/burmese-box.png";

const BurmeseBoxSection: React.FC = () => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center
       bg-white p-6 rounded-xl shadow-lg space-y-6 md:space-y-0 md:space-x-6 max-w-7xl w-full "
    >
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2">
        <img
          src={boxImage}
          alt="Burmese Box Ad"
          className="rounded-xl w-full object-contain h-96"
        />
      </div>

      {/* Right Side - Text & Buttons */}
      <div className="w-full md:w-1/2 p-6 rounded-xl  bg-[#eaf0ff]">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Burmese Box Allow For You
        </h2>
        <p className="text-gray-600 text-sm md:text-base my-3">
          သင်၏ကြိုတင်ပြင်ဆင်ရန်မလိုအပ်ဘဲ လွယ်ကူမြန်ဆန်
          အကောင်းဆုံးဝန်ဆောင်မှုရရှိနိုင်ပါတယ်။
        </p>

        <div className="mt-6 mb-12">
          <a
            href={import.meta.env.VITE_APP_BURMESEBOX_URL}
            className="inline-block bg-blue-400 hover:text-blue-700 text-white px-5 py-2 rounded-md transition border-2"
            target="_blank"
          >
            Go to Website
          </a>
        </div>

        <div>
          <p className="text-sm font-medium text-blue-700 mb-1">Download App</p>
          <div className="flex space-x-3">
            <a href="#" aria-label="App Store">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Download_on_the_App_Store_RGB_blk.svg"
                alt="App Store"
                className="h-10"
              />
            </a>
            <a href="#" aria-label="Google Play">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-10"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurmeseBoxSection;
