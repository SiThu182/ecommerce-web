// // src/components/Footer.tsx

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FaWhatsapp,
//   FaPhoneAlt,
//   FaRegCopyright,
//   FaFacebook,
//   FaTiktok,
//   FaInstagram,
//   FaYoutube,
// } from "react-icons/fa";
// import { IoLogoGooglePlaystore, IoLogoApple } from "react-icons/io5";
// // import { GoDotFill } from "react-icons/go";
// import { PiBuildingOfficeBold } from "react-icons/pi";
// import { MdAttachEmail } from "react-icons/md";
// import { FaRegClock } from "react-icons/fa";

// const Footer: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <footer className="bg-[#8CAFFF] text-white py-4 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* Large semi-circle decoration */}
//       {/* <div className="absolute right-0 top-0 w-[40rem] h-[40rem] bg-indigo-300 border-2 border-blue-600 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-70"></div>
//       <div className="absolute right-0 top-0 w-[38rem] h-[38rem] bg-blue-700 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-70"></div> */}

//       <div className="max-w-7xl mx-3 lg:mx-10 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between  relative z-10">
//         {/* Left Section: Logo, Contact Us, Download App */}
//         <div className="flex flex-col space-y-1">
//           <div className="flex items-center">
//             <img
//               src="/image/logo.png"
//               alt="Ozzshop Logo"
//               className="h-26 w-32"
//             />
//           </div>

//           <div className="text-sm">
//             <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
//             <div className="flex gap-2">
//               <div>
//                 <div className="ml-4 flex items-center space-x-2 mb-1">
//                   <FaWhatsapp className="text-xl" />
//                   <span>WhatsApp</span>
//                 </div>
//                 <p className="ml-6">+66 628306160</p>
//               </div>
//               <div>
//                 <div className="ml-4 flex items-center space-x-2 mb-1">
//                   <FaPhoneAlt className="" />
//                   <span>Call Us</span>
//                 </div>
//                 <p className="ml-6">
//                   +95 9751937799 <br />
//                   +95 9266649673
//                 </p>
//               </div>
//             </div>
//           </div>
//           {/* Download our app */}
//           <div className="hidden sm:block">
//             <h3 className="text-xs sm:text-sm font-semibold mb-3">
//               Download App
//             </h3>
//             <div className="flex gap-2 sm:gap-3 ">
//               <a
//                 href="https://www.apple.com/app-store/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-black text-white rounded-xl p-1 flex items-center gap-2 w-full md:w-[130px] justify-center sm:justify-start"
//               >
//                 <IoLogoApple className="text-3xl" />{" "}
//                 <div className="flex flex-col">
//                   <span className="text-xs">Download on</span>
//                   <span className="text-xs ">App Store</span>
//                 </div>
//               </a>

//               <a
//                 href="https://play.google.com/store"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-black text-white rounded-xl p-1 flex items-center gap-2 w-full sm:w-[130px] justify-center sm:justify-start"
//               >
//                 <IoLogoGooglePlaystore className="text-3xl" />
//                 <div className="flex flex-col">
//                   <span className="text-xs">Get It on</span>
//                   <span className="text-xs">PlayStore</span>
//                 </div>
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Middle Section: Most Popular Categories (now plain text) */}
//         <div className="text-black text-sm">
//           <h3 className="text-base font-semibold mb-3 border-b-2 border-black inline-block">
//             Most Popular Categories
//           </h3>
//           <ul className="space-y-2 ml-1">
//             <li
//               className="flex items-center gap-2 hover:text-blue-600"
//               onClick={() => {
//                 navigate("/pickle%20tea/product", {
//                   state: { id: 9 },
//                 });
//               }}
//             >
//               Myanmar Snacks
//             </li>
//             <li
//               className="flex items-center gap-2 hover:text-blue-600"
//               onClick={() => {
//                 navigate("/pickle%20tea/product", {
//                   state: { id: 8 },
//                 });
//               }}
//             >
//               Canned Foods
//             </li>

//             <li
//               className="flex items-center gap-2  hover:text-blue-600"
//               onClick={() => {
//                 navigate("/pickle%20tea/product", {
//                   state: { id: 12 },
//                 });
//               }}
//             >
//               Ready to Eat Food
//             </li>
//             <li
//               className="flex items-center gap-2 hover:text-blue-600"
//               onClick={() => {
//                 navigate("/pickle%20tea/product", {
//                   state: { id: 1 },
//                 });
//               }}
//             >
//               Dried Fish, Meat & Fish Crackers
//             </li>
//             <li
//               className="flex items-center gap-2  hover:text-blue-600"
//               onClick={() => {
//                 navigate("/pickle%20tea/product", {
//                   state: { id: 5 },
//                 });
//               }}
//             >
//               Traditional Burmese Foods
//             </li>

//             <li
//               className="flex items-center gap-2  hover:text-blue-600"
//               onClick={() => {
//                 navigate("/pickle%20tea/product", {
//                   state: { id: 11 },
//                 });
//               }}
//             >
//               Traditional Medicines
//             </li>
//             <li
//               className="flex items-center gap-2  hover:text-blue-600"
//               onClick={() => {
//                 navigate("/pickle%20tea/product", {
//                   state: { id: 3 },
//                 });
//               }}
//             >
//               Pickled Tea, Ginger & Assorted Fried
//             </li>
//             <li
//               className="flex items-center gap-2  hover:text-blue-600"
//               onClick={() => {
//                 navigate("/pickle%20tea/product", {
//                   state: { id: 7 },
//                 });
//               }}
//             >
//               Green Tea, Instant Tea & Coffee Mix
//             </li>
//           </ul>
//         </div>

//         {/* Right Section: Customer Services (still links) */}
//         <div className="text-black text-sm">
//           <h3 className="text-base font-semibold mb-3 border-b-2 border-black inline-block">
//             Customer Services
//           </h3>
//           <ul className="space-y-2 ml-1">
//             <li className="flex items-center gap-2">
//               {/* <GoDotFill /> */}
//               <Link to="/about-us" className="hover:underline">
//                 About Us
//               </Link>
//             </li>
//             <li className="flex items-center gap-2">
//               {/* <GoDotFill /> */}
//               <Link to="/terms-conditions" className="hover:underline">
//                 Terms & Conditions
//               </Link>
//             </li>
//             <li className="flex items-center gap-2">
//               {/* <GoDotFill /> */}
//               <Link to="/faq" className="hover:underline">
//                 FAQ
//               </Link>
//             </li>
//             <li className="flex items-center gap-2">
//               {/* <GoDotFill /> */}
//               <Link to="/privacy-policy" className="hover:underline">
//                 Privacy Policy
//               </Link>
//             </li>
//             <li className="flex items-center gap-2">
//               {/* <GoDotFill /> */}
//               <Link to="/refund-return" className="hover:underline">
//                 Refund & Return Policy
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Our Office */}
//         <div className="text-black text-sm">
//           <h3 className="text-base font-semibold mb-3 border-b-2 border-black inline-block">
//             Our Office
//           </h3>
//           <ul className="space-y-2">
//             <li className="flex items-center gap-2">
//               <PiBuildingOfficeBold />
//               <span>
//                 No-107, First floor, Kyun Taw Road,
//                 <br /> San Chaung Township, Yangon,
//                 <br />
//                 Myanmar
//               </span>
//             </li>
//             <li className="flex items-center gap-2">
//               <FaRegClock />
//               <span>
//                 Monday To Saturday
//                 <br />
//                 09:00 AM To 06:00 PM
//               </span>
//             </li>
//             <li className="flex items-center gap-2">
//               <MdAttachEmail />
//               <span>burmeseboxx@gmail.com</span>
//             </li>
//           </ul>
//           <div className="my-4 font-semibold">
//             <span>Follow us on</span>
//             <div className="flex gap-2 mt-2 text-xl">
//               <div className="rounded-full p-1 border-2 border-gray-700">
//                 <a
//                   href="https://www.facebook.com/profile.php?id=61579031180584"
//                   target="_blank"
//                 >
//                   <FaFacebook className=" " />
//                 </a>
//               </div>
//               <div className="rounded-full p-1 border-2  border-gray-700">
//                 <a
//                   href="https://www.facebook.com/profile.php?id=61579031180584"
//                   target="_blank"
//                 >
//                   <FaTiktok />
//                 </a>
//               </div>
//               <div className="rounded-full p-1 border-2 border-gray-700">
//                 <a
//                   href="https://www.facebook.com/profile.php?id=61579031180584"
//                   target="_blank"
//                 >
//                   <FaYoutube />
//                 </a>
//               </div>
//               <div className="rounded-full p-1 border-2 border-gray-700">
//                 <a
//                   href="https://www.facebook.com/profile.php?id=61579031180584"
//                   target="_blank"
//                 >
//                   <FaInstagram />
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Copyright Section */}
//       <div className="w-auto h-px bg-[#05ABF3] mx-24 my-3"></div>
//       <div className="flex justify-center items-center font-semibold text-sm">
//         <FaRegCopyright className="mr-2" />
//         2025 All Rights Reserved
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// src/components/Footer.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaRegCopyright,
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { IoLogoGooglePlaystore, IoLogoApple } from "react-icons/io5";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { MdAttachEmail } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#8CAFFF] text-white py-4 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-3 lg:mx-10 grid grid-cols-1 md:grid-cols-2 lg:flex gap-2 lg:gap-12 xl:gap-24 relative z-10">
        {/* --- Left Section (Logo + Contact + App Download) --- */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:space-y-1">
          <img
            src="/image/logo.png"
            alt="Ozzshop Logo"
            className="hidden sm:block h-26 w-32"
          />

          <div className="text-sm">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <div className="flex gap-2">
              <div>
                <div className="ml-4 flex items-center space-x-2 mb-1">
                  <FaWhatsapp className="text-xl" />
                  <span>WhatsApp</span>
                </div>
                <p className="ml-6">+66 628306160</p>
              </div>
              <div>
                <div className="ml-4 flex items-center space-x-2 mb-1">
                  <FaPhoneAlt />
                  <span>Call Us</span>
                </div>
                <p className="ml-6">
                  +95 9751937799 <br />
                  +95 9266649673
                </p>
              </div>
            </div>
          </div>

          {/* Download our app */}
          <div className="hidden sm:block">
            <h3 className="text-xs sm:text-sm font-semibold mb-3">
              Download App
            </h3>
            <div className="flex gap-2 sm:gap-3 ">
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white rounded-xl p-1 flex items-center gap-2 w-full md:w-[130px] justify-center sm:justify-start"
              >
                <IoLogoApple className="text-3xl" />
                <div className="flex flex-col">
                  <span className="text-xs">Download on</span>
                  <span className="text-xs">App Store</span>
                </div>
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white rounded-xl p-1 flex items-center gap-2 w-full sm:w-[130px] justify-center sm:justify-start"
              >
                <IoLogoGooglePlaystore className="text-3xl" />
                <div className="flex flex-col">
                  <span className="text-xs">Get it on</span>
                  <span className="text-xs">PlayStore</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 xl:gap-16">
          {/* --- Middle Section: Most Popular Categories --- */}
          <div className="text-black text-sm">
            {/* Header */}
            <button
              className="w-full flex justify-between items-center text-start lg:block font-semibold mb-3 border-b-[2px] border-black lg:border-0 lg:underline underline-offset-8 decoration-black text-base"
              onClick={() => toggleSection("popular")}
              aria-expanded={openSection === "popular"}
            >
              Most Popular Categories
              <span className="lg:hidden">
                {openSection === "popular" ? (
                  <IoChevronUp />
                ) : (
                  <IoChevronDown />
                )}
              </span>
            </button>

            {/* List */}
            <ul
              className={`ml-1 space-y-2 ${
                openSection === "popular" || window.innerWidth > 999
                  ? "block"
                  : "hidden"
              } `}
            >
              {/* <ul
            className={`ml-1 space-y-2 cursor-pointer ${
              openSection === "popular" ? "block" : "hidden"
            } md:block`}
          > */}
              <li
                className="hover:text-blue-600"
                onClick={() =>
                  navigate("/pickle%20tea/product", { state: { id: 9 } })
                }
              >
                Myanmar Snacks
              </li>
              <li
                className="hover:text-blue-600"
                onClick={() =>
                  navigate("/pickle%20tea/product", { state: { id: 8 } })
                }
              >
                Canned Foods
              </li>
              <li
                className="hover:text-blue-600"
                onClick={() =>
                  navigate("/pickle%20tea/product", { state: { id: 12 } })
                }
              >
                Ready to Eat Food
              </li>
              <li
                className="hover:text-blue-600"
                onClick={() =>
                  navigate("/pickle%20tea/product", { state: { id: 1 } })
                }
              >
                Dried Fish, Meat & Fish Crackers
              </li>
              <li
                className="hover:text-blue-600"
                onClick={() =>
                  navigate("/pickle%20tea/product", { state: { id: 5 } })
                }
              >
                Traditional Burmese Foods
              </li>
              <li
                className="hover:text-blue-600"
                onClick={() =>
                  navigate("/pickle%20tea/product", { state: { id: 11 } })
                }
              >
                Traditional Medicines
              </li>
              <li
                className="hover:text-blue-600"
                onClick={() =>
                  navigate("/pickle%20tea/product", { state: { id: 3 } })
                }
              >
                Pickled Tea, Ginger & Assorted Fried
              </li>
              <li
                className="hover:text-blue-600"
                onClick={() =>
                  navigate("/pickle%20tea/product", { state: { id: 7 } })
                }
              >
                Green Tea, Instant Tea & Coffee Mix
              </li>
            </ul>
          </div>

          {/* --- Customer Services --- */}
          <div className="text-black text-sm">
            <button
              className="w-full flex justify-between items-center text-start lg:block font-semibold mb-3  border-b-[2px] border-black lg:border-0 lg:underline underline-offset-8 decoration-black text-base"
              onClick={() => toggleSection("customer")}
              aria-expanded={openSection === "customer"}
            >
              Customer Services
              <span className="lg:hidden">
                {openSection === "customer" ? (
                  <IoChevronUp />
                ) : (
                  <IoChevronDown />
                )}
              </span>
            </button>
            <ul
              className={`ml-1 space-y-2 grid-cols-2 lg:grid-cols-1 ${
                // grid-cols-2 lg:grid-cols-1
                openSection === "customer" || window.innerWidth > 999
                  ? "block"
                  : "hidden"
              } `}
            >
              <li>
                <Link to="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-return" className="hover:underline">
                  Refund & Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Our Office --- */}
          <div className="text-black text-sm">
            <button
              className="w-full flex justify-between items-center text-start lg:block font-semibold mb-3 border-b-[2px] border-black lg:border-0 lg:underline underline-offset-8 decoration-black text-base"
              onClick={() => toggleSection("office")}
              aria-expanded={openSection === "office"}
            >
              Our Office
              <span className="lg:hidden">
                {openSection === "office" ? <IoChevronUp /> : <IoChevronDown />}
              </span>
            </button>
            <ul
              className={`space-y-2 ${
                openSection === "office" || window.innerWidth > 999
                  ? "block"
                  : "hidden"
              } `}
            >
              <li className="flex items-center gap-2">
                <PiBuildingOfficeBold />
                {/* <span>
                  No-107, First floor, Kyun Taw Road,
                  <br /> San Chaung Township, Yangon, Myanmar
                </span> */}
                <span>
                  14 Cropton Street Jordan Springs
                  <br /> NSW 2747, Australia
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FaRegClock />
                <span>
                  Monday To Saturday
                  <br />
                  09:00 AM To 05:00 PM
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MdAttachEmail />
                <span>burmeseboxx@gmail.com</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="my-4 font-semibold text-center md:text-start">
              <span>Follow us on</span>
              <div className="flex gap-2 mt-2 text-xl justify-center md:justify-start">
                <a
                  href="https://www.facebook.com/profile.php?id=61579031180584"
                  target="_blank"
                >
                  <FaFacebook className="border-2 border-gray-700 rounded-full p-1 text-3xl" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61579031180584"
                  target="_blank"
                >
                  <FaTiktok className="border-2 border-gray-700 rounded-full p-1 text-3xl" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61579031180584"
                  target="_blank"
                >
                  <FaYoutube className="border-2 border-gray-700 rounded-full p-1 text-3xl" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61579031180584"
                  target="_blank"
                >
                  <FaInstagram className="border-2 border-gray-700 rounded-full p-1 text-3xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-auto h-px bg-[#05ABF3] mx-24 my-3"></div>
      <div className="flex justify-center items-center font-semibold text-sm">
        <FaRegCopyright className="mr-2" />
        2025 All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
