// // import React, { useState } from "react";
// // import AddressForm from "./AddressForm";
// // import { AddressData } from "@/api/axiosClient";

// // interface AddressModalProps {
// //   title: string;
// //   setAddressData: (data: AddressData) => Promise<boolean>;
// //   defaultAddress?: AddressData;
// //   onSuccess?: () => void;
// //   children?: React.ReactNode;
// // }

// // const AddressModal: React.FC<AddressModalProps> = (props) => {
// //   const [modalIsOpen, setModalIsOpen] = useState(false);
// //   const [addressData, setAddressData] = useState<AddressData>({});

// //   const openModal = () => setModalIsOpen(true);
// //   const closeModal = () => setModalIsOpen(false);

// //   const handleSaveAddress = async () => {
// //     const success = await props.setAddressData(addressData);

// //     if (success) {
// //       closeModal();
// //       if (props.onSuccess) {
// //         props.onSuccess();
// //       }
// //     } else {
// //       alert("Error saving address. Please check your input and try again.");
// //     }
// //   };

// //   return (
// //     <div>
// //       {props.children ? (
// //         <div onClick={openModal}>{props.children}</div>
// //       ) : (
// //         <button onClick={openModal} className="btn btn-primary btn-sm">
// //           {props.title}
// //         </button>
// //       )}
// //       {modalIsOpen && (
// //         <div className="modal modal-open">
// //           <div className="modal-box">
// //             <h3 className="font-bold text-lg">{props.title}</h3>
// //             <div className="py-4">
// //               <AddressForm
// //                 setAddressData={setAddressData}
// //                 defaultAddress={props.defaultAddress}
// //               />
// //             </div>
// //             <div className="modal-action">
// //               <button onClick={closeModal} className="btn btn-secondary">
// //                 Close
// //               </button>
// //               <button onClick={handleSaveAddress} className="btn btn-primary">
// //                 Save Address
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AddressModal;

// import React, { useState, useEffect } from "react";
// import AddressForm from "./AddressForm";
// import { AddressData } from "@/api/axiosClient";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface AddressModalProps {
//   title: string;
//   setAddressData: (data: AddressData) => Promise<boolean>;
//   defaultAddress?: AddressData;
//   onSuccess?: () => void;
//   open: boolean;
//   onClose: () => void;
// }

// const AddressModal: React.FC<AddressModalProps> = (props) => {
//   const [addressData, setAddressData] = useState<AddressData>({});
//   // const [loading] = useState(false);

//   useEffect(() => {
//     setAddressData(props.defaultAddress || {});
//   }, [props.defaultAddress]);

//   const handleSaveAddress = async () => {
//     const success = await props.setAddressData(addressData);
//     if (success) {
//       props.onClose();
//       if (props.onSuccess) {
//         props.onSuccess();
//       }
//     } else {
//       toast.error("Please Fill up All Inputs  and try again.");
//     }
//   };

//   if (!props.open) return null;

//   return (
//     <div className="modal modal-open">
//       <div className="modal-box">
//         <h3 className="font-bold text-lg">{props.title}</h3>
//         <div className="py-4">
//           <AddressForm
//             setAddressData={setAddressData}
//             defaultAddress={props.defaultAddress}
//           />
//         </div>
//         <div className="modal-action">
//           <button onClick={props.onClose} className="btn btn-secondary">
//             Close
//           </button>
//           <button onClick={handleSaveAddress} className="btn btn-primary">
//             Save Address
//           </button>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} />
//     </div>
//   );
// };

// export default AddressModal;

import React, { useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import { AddressData } from "@/api/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

interface AddressModalProps {
  title: string;
  setAddressData: (data: AddressData) => Promise<boolean>;
  defaultAddress?: AddressData;
  onSuccess?: () => void;
  open: boolean;
  onClose: () => void;
}

const AddressModal: React.FC<AddressModalProps> = (props) => {
  const [addressData, setAddressData] = useState<AddressData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setAddressData(props.defaultAddress || {});
  }, [props.defaultAddress]);

  const handleSaveAddress = async () => {
    setIsSubmitting(true);
    try {
      const success = await props.setAddressData(addressData);
      if (success) {
        toast.success("Address saved successfully!");
        props.onClose();
        if (props.onSuccess) {
          props.onSuccess();
        }
      } else {
        toast.error(
          "Error saving address. Please check your input and try again."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!props.open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl">
        {" "}
        {/* Increased max width */}
        <h3 className="font-bold text-lg mb-4">{props.title}</h3>
        <div className="py-4 max-h-96 overflow-y-auto">
          {" "}
          {/* Added scroll for long forms */}
          <AddressForm
            setAddressData={setAddressData}
            defaultAddress={props.defaultAddress}
          />
        </div>
        <div className="modal-action">
          <button
            onClick={props.onClose}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Close
          </button>
          <button
            onClick={handleSaveAddress}
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Address"}
          </button>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AddressModal;
