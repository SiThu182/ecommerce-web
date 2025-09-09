import React, { useState, useEffect } from "react";

interface ProductShowcaseProps {
  images: { original: string; thumbnail: string }[];
  currentImage: string;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ images, currentImage }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  console.log(images, "Images");

  useEffect(() => {
    const index = images.findIndex(image => image.original === currentImage);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [currentImage, images]);

  const handleThumbnailClick = (url: string, index: number) => {
    console.log(url);
    setCurrentIndex(index);
  };

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 1));
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setZoomLevel(1); // Reset zoom level when changing image
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    setZoomLevel(1); // Reset zoom level when changing image
  };

  return (
    <div className="flex flex-col items-center bg-white">
      <div className="relative w-full h-96 mb-4">
        <img
          src={ import.meta.env.VITE_APP_BACKEND_URL+"/uploads/"+ images[currentIndex]?.original}
          alt="Product"
          className="w-full h-full object-scale-down cursor-pointer"
          onClick={() => setIsLightboxOpen(true)}
           crossOrigin="anonymous"
        />
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
          onClick={handlePrev}
        >
          &larr;
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
          onClick={handleNext}
        >
          &rarr;
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <img
            key={index}
            // src={`${import.meta.env.VITE_APP_BACKEND_URL +"/uploads/"+ image.thumbnail}`}
            src={`${
              
              image.thumbnail
                ? import.meta.env.VITE_APP_BACKEND_URL +"/uploads/"  + image.thumbnail
                : "/image/no-image-available.jpg"
            }`}
             crossOrigin="anonymous"
            alt={`Thumbnail ${index + 1}`}
            className="cursor-pointer w-24 h-24 object-cover border-2 border-transparent hover:border-primary"
            
            onClick={() => handleThumbnailClick(image.original, index)}
          />
        ))}
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setIsLightboxOpen(false)}
            >
              &times;
            </button>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
              onClick={handlePrev}
            >
              &larr;
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl"
              onClick={handleNext}
            >
              &rarr;
            </button>
            <div className="flex flex-col items-center">
              <div
                className="overflow-hidden"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transition: "transform 0.3s ease",
                }}
              >
                <img
                  src={import.meta.env.VITE_APP_BACKEND_URL +"/uploads/" +images[currentIndex].original}
                  alt="Product Image"
                  className="max-w-full max-h-full object-scale-down"
                  crossOrigin="anonymous"
              

                />
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="bg-white text-black px-4 py-2 rounded"
                  onClick={handleZoomIn}
                >
                  Zoom In
                </button>
                <button
                  className="bg-white text-black px-4 py-2 rounded"
                  onClick={handleZoomOut}
                >
                  Zoom Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;
