 import React, { useState, useEffect } from "react";
import AddressModal from "./AddressModal";
import axiosClient, { saveAddressToDB, deleteAddressFromDB } from "@/api/axiosClient";
 import LoadingOverlay from "@/components/common/LoadingOverlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Address {
  id: number;
  name: string;
  address: string;
  note: string;
  district: string;
  subDistrict: string;
  province: string;
  postal_code: string;
  country: string;
  phone: string;
  is_active: boolean;
}

const Address: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [editAddress, setEditAddress] = useState<Address | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const fetchAddresses = async () => {
    try {
      const response = await axiosClient.get("/customer/get-address");
      if (response.status !== 200) {
        throw new Error("Failed to fetch addresses");
      }
      setAddresses(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const response = await deleteAddressFromDB(id);
      if (response) {
         
        setLoading(false);
        toast.success("Address deleted successfully!");
        setAddresses(addresses.filter(address => address.id !== id));
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleOpenAddModal = () => {
    setEditAddress(undefined);
    setModalType("add");
    setModalOpen(true);
  };

  const handleOpenEditModal = (address: Address) => {
    setEditAddress(address);
    setModalType("edit");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditAddress(undefined);
    setModalType(null);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold dark:text-dark">Address List</h2>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleOpenAddModal}
        >
          Add New Address
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addresses.map((address) => (
          <div key={address.id} className="card bg-white shadow-md rounded-lg p-4 relative">
            {address.is_active && (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                Default
              </span>
            )}
            <h3 className="text-lg font-bold">{address.name}</h3>
            <p>{address.phone}</p>
            <p>{address.note}</p>
            <p>{address.address}</p>
            <p>{address.postal_code}</p>
            <div className="mt-4 flex space-x-2">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => handleOpenEditModal(address)}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {loading && <LoadingOverlay />}
      <ToastContainer position="top-center" autoClose={3000} />
      {/* Single Modal for Add/Edit */}
      {modalOpen && (
        <AddressModal
          title={modalType === "add" ? "Add New Address" : "Edit Address"}
          setAddressData={async (data) => {
            setLoading(true);
            try {
              const result = await saveAddressToDB(data);
              if (result) {
                toast.success("Address saved successfully!");
                return true;
              } else {
                toast.error("Failed to save address.");
                return false;
              }
            } catch (e) {
              toast.error("An error occurred while saving address.");
              return false;
            } finally {
              setTimeout(() => {
                setLoading(false);
                
              }, 2000);
            }
          }}
          defaultAddress={modalType === "edit" ? editAddress : {}}
          onSuccess={() => {
            fetchAddresses();
            
            handleCloseModal();
          }}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Address;