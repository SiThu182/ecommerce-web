import React from "react";
interface SidebarProps {
  activeTab: "profile" | "orders" | "settings";

  onTabClick: (tab: "profile" | "orders" | "settings") => void;

  onProfileTabClick: (
    tab: "profileDetails" | "address" | "changePassword"
  ) => void;

  onOrdersTabClick: (
    tab: "AllOrders" | "Processing" | "Cancelled" | "Delivered" | "Return"
  ) => void;

  isProfileDropdownOpen: boolean;

  isOrdersDropdownOpen: boolean;

  activeProfileTab: "profileDetails" | "address" | "changePassword";

  activeOrdersTab:
    | "AllOrders"
    | "Processing"
    | "Cancelled"
    | "Delivered"
    | "Return";
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabClick,
  onProfileTabClick,
  onOrdersTabClick,
  isProfileDropdownOpen,
  isOrdersDropdownOpen,
  activeProfileTab,
  activeOrdersTab,
}) => {
  const toggleProfileDropdown = () => {
    onTabClick("profile");
  };

  const toggleOrdersDropdown = () => {
    onTabClick("orders");
  };

  return (
    <div className="flex flex-col space-y-4 dark:text-gray-700">
      <button
        className={`px-4 py-2 text-left rounded-xl ${
          activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => {
          onTabClick("profile");
          toggleProfileDropdown();
        }}
      >
        Profile
      </button>
      {isProfileDropdownOpen && activeTab === "profile" && (
        <div className="ml-4 flex flex-col space-y-2">
          <button
            className={`px-4 py-2 text-left rounded-xl ${
              activeProfileTab === "profileDetails"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              onProfileTabClick("profileDetails");
            }}
          >
            Profile Details
          </button>
          <button
            className={`px-4 py-2 text-left rounded-xl ${
              activeProfileTab === "address"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              onProfileTabClick("address");
            }}
          >
            Address
          </button>
          <button
            className={`px-4 py-2 text-left rounded-xl ${
              activeProfileTab === "changePassword"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              onProfileTabClick("changePassword");
            }}
          >
            Change Password
          </button>
        </div>
      )}
      <button
        className={`px-4 py-2 text-left rounded-xl ${
          activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => {
          onTabClick("orders");
          toggleOrdersDropdown();
        }}
      >
        Your Orders
      </button>
      {isOrdersDropdownOpen && activeTab == "orders" && (
        <div className="ml-4 flex flex-col space-y-2">
          <button
            className={`px-4 py-2 text-left rounded-xl ${
              activeOrdersTab === "AllOrders"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              onOrdersTabClick("AllOrders");
            }}
          >
            All Orders
          </button>
          <button
            className={`px-4 py-2 text-left rounded-xl ${
              activeOrdersTab === "Processing"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              onOrdersTabClick("Processing");
            }}
          >
            Processing
          </button>
          <button
            className={`px-4 py-2 text-left rounded-xl ${
              activeOrdersTab === "Cancelled"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              onOrdersTabClick("Cancelled");
            }}
          >
            Shipped
          </button>
          <button
            className={`px-4 py-2 text-left rounded-xl ${
              activeOrdersTab === "Delivered"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              onOrdersTabClick("Delivered");
            }}
          >
            Delivered
          </button>
          <button
            className={`px-4 py-2 text-left rounded-xl ${
              activeOrdersTab === "Return"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => {
              onOrdersTabClick("Return");
            }}
          >
            Returns
          </button>
        </div>
      )}
      <button
        className={`px-4 py-2 text-left rounded-xl ${
          activeTab === "settings" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
        onClick={() => onTabClick("settings")}
      >
        Settings
      </button>
    </div>
  );
};

export default Sidebar;
