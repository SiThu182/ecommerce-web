import { MouseEvent, ReactNode } from "react";
import ReactDOM from "react-dom";
interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const PopupBox: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error("Modal root element not found!");
    return null; // or handle error gracefully
  }
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    // Check if the click is on the backdrop (outside the inner content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return ReactDOM.createPortal(
    <div
      className="fixed left-0 top-0 w-[100vw] h-[100vh] bg-black bg-opacity-80  flex items-center justify-center z-50 overflow-y-scroll"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white dark:bg-black dark:border-2 p-6 rounded-lg shadow-lg my-20 min-w-xl max-w-[60vw] w-full mx-4 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default PopupBox;
