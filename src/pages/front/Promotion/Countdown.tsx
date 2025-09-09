// components/FlashSaleCountdown.tsx
import React, { useEffect, useState } from "react";
// import { FaBolt } from "react-icons/fa";

interface CountdownProps {
  targetDate: string; // ISO format e.g. "2025-08-30T18:00:00"
  textWhite: boolean;
}

const PromotionCountdown: React.FC<CountdownProps> = ({
  targetDate,
  textWhite,
}) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    const timeLeft = {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      ),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      ),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
        2,
        "0"
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
    return difference > 0
      ? timeLeft
      : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="rounded-lg flex flex-col items-start space-y-2 w-full max-w-md">
      <div
        className={`flex space-x-4 text-center text-lg ${
          textWhite ? "text-white" : ""
        }`}
      >
        <div>
          <div className="text-xs">Days</div>
          <div className="text-2xl font-inter font-semibold">
            {timeLeft.days}
          </div>
        </div>
        <div className="text-orange-400 py-4">:</div>
        <div>
          <div className="text-xs">Hours</div>
          <div className="text-2xl font-inter font-semibold">
            {timeLeft.hours}
          </div>
        </div>
        <div className="text-orange-400 py-4">:</div>
        <div>
          <div className="text-xs">Minutes</div>
          <div className="text-2xl font-inter font-semibold">
            {timeLeft.minutes}
          </div>
        </div>
        <div className="text-orange-400 py-4">:</div>
        <div>
          <div className="text-xs">Seconds</div>
          <div className="text-2xl font-inter font-semibold">
            {timeLeft.seconds}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionCountdown;
