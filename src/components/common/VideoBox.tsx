import { useState } from "react";
import BlurFade from "../ui/blur-fade";
 

interface videoProps {
  src: string;
}

export default function VideoBox({ src }: videoProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true); // Set to true when video has loaded
  };

  return (
    <div
      style={{ maxWidth: "1200px", width: "100%", height: "100%" }}
      className="flex justify-center items-center"
    >
      <BlurFade
        inView={true}
        yOffset={10}
        blur={isVideoLoaded ? "0px" : "10px"}
      >
        <video
          className="rounded-lg"
          style={{ width: "100%" }}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad} // Call this when the video is loaded
          onLoadStart={() => setIsVideoLoaded(false)} // Reset when loading starts
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </BlurFade>
    </div>
  );
}
