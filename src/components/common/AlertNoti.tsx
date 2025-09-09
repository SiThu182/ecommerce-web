import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
type NotificationBarProps = {
  isVisible: boolean; // Determines if the notification is visible
  message: string; // The message to display
  type?: "success" | "error" | "info" | "warning"; // Notification type for styling
  duration?: number; // Duration in milliseconds before auto-hide (optional)
  onClose: () => void; // Callback to close the notification
};

const AlertNotiBar: React.FC<NotificationBarProps> = ({
  isVisible,
  message,
  type = "info",
  duration,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer); // Cleanup timer on unmount or prop change
    }
  }, [isVisible, duration, onClose]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      let interval: NodeJS.Timeout;

      if (duration) {
        setProgress(0);
        const start = Date.now();

        interval = setInterval(() => {
          const elapsed = Date.now() - start;
          setProgress(Math.min((elapsed / duration) * 100, 100));

          if (elapsed >= duration) {
            clearInterval(interval);
            onClose();
          }
        }, 10);
      }

      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [isVisible, duration, onClose]);
  if (!isVisible) return null;

  // Tailwind classes based on notification type
  const typeClasses = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  const modalRoot = document.getElementById("noti-modal-root");
  if (!modalRoot) {
    console.error("Modal root element not found!");
    return null; // or handle error gracefully
  }

  console.log(message, "message");

  return ReactDOM.createPortal(
    <div
      className={`fixed mx-10 rounded-md opacity-90 top-2 left-0 right-0 z-50 px-4 py-3 shadow-md flex flex-col ${typeClasses[type]}`}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-white">{message}</span>
        <button
          className="ml-4 text-lg font-bold"
          onClick={onClose}
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
      {/* Progress Bar */}
      {duration && (
        <div className="h-1 mt-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-gray-400 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>,
    modalRoot
  );
};

export default AlertNotiBar;
