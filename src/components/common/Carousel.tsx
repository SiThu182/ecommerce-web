import React, { useState, useEffect } from "react";

const slides = [
  {
    productImage: "/image/banner/OZZ.png", // Add your product image here
  },
  {
    image: "/image/banner/local-shop.jpg",
    title: (
      <>
        <span className="text-5xl md:text-7xl font-bold text-blue-600 block">
          Burmese
        </span>
        <span className="text-5xl md:text-7xl font-bold text-blue-600 block">
          Groceries
        </span>
      </>
    ),
    subtitle: (
      <span className="text-3xl md:text-5xl font-light text-blue-400 block">
        Authentic
      </span>
    ),
    description: (
      <>
        <p className="text-blue-500 mt-4">
          Savor the best of traditional and modern dishes
        </p>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 text-2xl">✔️</span>
            <span className="text-blue-600">
              Fresh and authentic ingredients
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-600 text-2xl">✔️</span>
            <span className="text-blue-600">
              Diverse menu with something for everyone
            </span>
          </div>
        </div>
      </>
    ),
    productImage: "/image/banner/banner1.png", // Add your product image here
  },
  {
    productImage: "/image/banner/banner3.png", // Add your product image here
  },
  // Add more slides as needed
];

// const Carousel: React.FC = () => {
//   const [activeSlide, setActiveSlide] = useState(1);
//   const totalSlides = 4; // စုစုပေါင်း slide အရေအတွက်

//   // Auto-slide functionality
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveSlide((prev) => (prev % totalSlides) + 1); // 3 စက္ကန့်တိုင်း slide ပြောင်းမယ်
//     }, 3000);

//     return () => clearInterval(interval); // Component unmount မှာ interval ကို ရပ်မယ်
//   }, [totalSlides]);

//   // Slide ကို ပြောင်းဖို့ function
//   const goToSlide = (slideNumber: number) => {
//     setActiveSlide(slideNumber);
//   };

//   return (
//     <div className="h-[80vh] overflow-hidden flex justify-center items-center relative mt-10 w-full">
//       <div className="w-full max-w-4xl">
//         {/* DaisyUI Carousel */}
//         <div className="carousel w-full rounded-lg">
//           {/* Slide 1 */}
//           <div
//             id="slide1"
//             className={`carousel-item relative w-full ${
//               activeSlide === 1 ? "block" : "hidden"
//             }`}
//           >
//             <img
//               src="/image/banner/local-shop.jpg"
//               className="w-full max-h-[70vh] object-cover" // ပုံအရွယ်အစားကို ချိန်ညှိ
//               alt="Local Shop"
//             />
//             {/* Navigation Buttons */}
//             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//               <button
//                 className="btn btn-circle"
//                 onClick={() => goToSlide(activeSlide === 1 ? totalSlides : activeSlide - 1)}
//               >
//                 ❮
//               </button>
//               <button
//                 className="btn btn-circle"
//                 onClick={() => goToSlide(activeSlide === totalSlides ? 1 : activeSlide + 1)}
//               >
//                 ❯
//               </button>
//             </div>
//           </div>

//           {/* Slide 2 */}
//           <div
//             id="slide2"
//             className={`carousel-item relative w-full ${
//               activeSlide === 2 ? "block" : "hidden"
//             }`}
//           >
//             <img
//               src="/image/banner/local-shop1.jpg"
//               className="w-full max-h-[70vh] object-cover" // ပုံအရွယ်အစားကို ချိန်ညှိ
//               alt="Local Shop 1"
//             />
//             {/* Navigation Buttons */}
//             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//               <button
//                 className="btn btn-circle"
//                 onClick={() => goToSlide(activeSlide === 1 ? totalSlides : activeSlide - 1)}
//               >
//                 ❮
//               </button>
//               <button
//                 className="btn btn-circle"
//                 onClick={() => goToSlide(activeSlide === totalSlides ? 1 : activeSlide + 1)}
//               >
//                 ❯
//               </button>
//             </div>
//           </div>

//           {/* Slide 3 */}
//           <div
//             id="slide3"
//             className={`carousel-item relative w-full ${
//               activeSlide === 3 ? "block" : "hidden"
//             }`}
//           >
//             <img
//               src="/image/banner/local-shop2.jpg"
//               className="w-full max-h-[70vh] object-cover" // ပုံအရွယ်အစားကို ချိန်ညှိ
//               alt="Local Shop 2"
//             />
//             {/* Navigation Buttons */}
//             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//               <button
//                 className="btn btn-circle"
//                 onClick={() => goToSlide(activeSlide === 1 ? totalSlides : activeSlide - 1)}
//               >
//                 ❮
//               </button>
//               <button
//                 className="btn btn-circle"
//                 onClick={() => goToSlide(activeSlide === totalSlides ? 1 : activeSlide + 1)}
//               >
//                 ❯
//               </button>
//             </div>
//           </div>

//           {/* Slide 4 */}
//           <div
//             id="slide4"
//             className={`carousel-item relative w-full ${
//               activeSlide === 4 ? "block" : "hidden"
//             }`}
//           >
//             <img
//               src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
//               className="w-full max-h-[70vh] object-cover" // ပုံအရွယ်အစားကို ချိန်ညှိ
//               alt="Stock Photo"
//             />
//             {/* Navigation Buttons */}
//             <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//               <button
//                 className="btn btn-circle"
//                 onClick={() => goToSlide(activeSlide === 1 ? totalSlides : activeSlide - 1)}
//               >
//                 ❮
//               </button>
//               <button
//                 className="btn btn-circle"
//                 onClick={() => goToSlide(activeSlide === totalSlides ? 1 : activeSlide + 1)}
//               >
//                 ❯
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Slide Indicators */}
//         <div className="flex justify-center gap-2 py-4 z-10 relative bg-white bg-opacity-75 rounded-lg"> {/* z-index နဲ့ background ထည့် */}
//           {[...Array(totalSlides)].map((_, index) => (
//             <button
//               key={index + 1}
//               className={`btn btn-xs ${
//                 activeSlide === index + 1 ? "btn-primary" : "btn-ghost"
//               }`}
//               onClick={() => goToSlide(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

const Carousel: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div
      className="relative w-full bg-white rounded-lg overflow-hidden py-8 shadow-lg flex justify-center items-center"
      //style={{ minHeight: "500px" }}
    >
      {/* Only Image */}
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={slides[activeSlide].productImage}
          alt="Products"
          className="w-full  rounded-2xl"
          //h-[500px]
          style={{ maxWidth: "1200px" }}
        />
      </div>
      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow z-20"
        onClick={() =>
          setActiveSlide((activeSlide - 1 + totalSlides) % totalSlides)
        }
      >
        ❮
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow z-20"
        onClick={() => setActiveSlide((activeSlide + 1) % totalSlides)}
      >
        ❯
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${
              activeSlide === idx ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
