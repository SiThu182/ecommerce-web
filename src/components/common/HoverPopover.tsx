import { ReactNode, useRef, useState } from "react";

export const HoverPopover = ({
  label,
  children,
  arrowShow = true,
}: {
  label: string | ReactNode;
  children: React.ReactNode;
  arrowShow?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isContentHovered, setIsContentHovered] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleMouseEnter = () => {
    // Clear any existing timer to avoid conflicts
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Set a timer to hide the popover after 2 seconds
    timer.current = setTimeout(() => {
      setIsHovered(false);
    }, 50);
  };

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <div
        className=" cursor-pointer hover:text-gray-500 flex gap-2 items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {label}
        {arrowShow && (
          <>
            {isHovered || isContentHovered ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            )}
          </>
        )}
      </div>

      {/* Popover Content */}
      {(isHovered || isContentHovered) && (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[12rem] p-4 bg-gray-800 text-white text-sm rounded-md shadow-lg"
          onMouseEnter={() => setIsContentHovered(true)}
          onMouseLeave={() => setIsContentHovered(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
};
