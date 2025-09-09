import ReactDOM from "react-dom";

type AlertModalProps = {
  isOpen: boolean; // Determines if the modal is visible
  onClose: () => void; // Callback to close the modal
  title: string; // Title of the modal
  message: string; // Message/content of the modal
  onConfirm: () => void; // Callback for confirm action
  status?: string;
};

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  status = "info",
  onConfirm,
}) => {
  if (!isOpen) return null;
  const modalRoot = document.getElementById("alert-modal-root");
  if (!modalRoot) {
    console.error("Modal root element not found!");
    return null; // or handle error gracefully
  }
  console.log(status, "status");

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-1/3 max-w-lg overflow-hidden">
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b ${
            status === "info"
              ? "bg-blue-500"
              : status === "error"
              ? "bg-red-600"
              : "bg-green-500"
          } border-gray-200  dark:border-gray-700 flex justify-between items-center`}
        >
          <h3 className="text-lg font-medium text-white dark:text-gray-200">
            {title}
          </h3>
          <button
            className="text-gray-100 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-6 py-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default AlertModal;
