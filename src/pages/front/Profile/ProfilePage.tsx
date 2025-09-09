import React, { useState } from "react";
import Sidebar from "./SideNav";
import ProfileDetails from "./ProfileDetails";
import Address from "./Address/Address";
import ChangePassword from "./ChangePassword";
import OrderList from "./YourOrders/OrderList";
// import Processing from "./YourOrders/Processing";
// import Shipped from "./YourOrders/Shipped";
// import Delivered from "./YourOrders/Delivered";
// import Returns from "./YourOrders/Returns";
// import OrderDetail from "./YourOrders/OrderDetail";

const ProfilePage: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "settings">(
    "profile"
  );
  const [activeProfileTab, setActiveProfileTab] = useState<
    "profileDetails" | "address" | "changePassword"
  >("profileDetails");
  const [activeOrdersTab, setActiveOrdersTab] = useState<
    "AllOrders" | "Processing" | "Cancelled" | "Delivered" | "Return"
  >("AllOrders");

  // const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const handleTabClick = (tab: "profile" | "orders" | "settings") => {
    setActiveTab(tab);
    if (tab === "profile") {
      setIsProfileDropdownOpen(!isProfileDropdownOpen);
      setIsOrdersDropdownOpen(false);
    } else if (tab === "orders") {
      setIsOrdersDropdownOpen(!isOrdersDropdownOpen);
      setIsProfileDropdownOpen(false);
    } else {
      setIsProfileDropdownOpen(false);
      setIsOrdersDropdownOpen(false);
    }
  };

  const handleProfileTabClick = (
    tab: "profileDetails" | "address" | "changePassword"
  ) => {
    setActiveProfileTab(tab);
  };
  const handleOrdersTabClick = (
    tab: "AllOrders" | "Processing" | "Cancelled" | "Delivered" | "Return"
  ) => {
    setActiveOrdersTab(tab);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="w-1/5 bg-gray-100 p-5">
          <Sidebar
            activeTab={activeTab}
            onTabClick={handleTabClick}
            onProfileTabClick={handleProfileTabClick}
            onOrdersTabClick={handleOrdersTabClick}
            isProfileDropdownOpen={isProfileDropdownOpen}
            isOrdersDropdownOpen={isOrdersDropdownOpen}
            activeProfileTab={activeProfileTab}
            activeOrdersTab={activeOrdersTab}
          />
        </div>
        <div className="w-4/5 p-5 dark:text-gray-700">
          {activeTab === "profile" && (
            <div className="p-5 bg-white shadow-md rounded-lg">
              {activeProfileTab === "profileDetails" && <ProfileDetails />}
              {activeProfileTab === "address" && <Address />}
              {activeProfileTab === "changePassword" && <ChangePassword />}
            </div>
          )}
          {activeTab === "orders" && (
            <div className="w-full p-0 dark:text-gray-300">
              {/* Horizontal Filter Bar (Secondary Sidebar) */}
              <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                {[
                  "AllOrders",
                  "Processing",
                  "Shipped",
                  "Delivered",
                  "Returns",
                ].map((status) => (
                  <button
                    key={status}
                    className={`px-4 py-2 rounded ${
                      activeOrdersTab === status &&
                      "underline underline-offset-8 decoration-1"

                      // ? "bg-blue-500 text-white"
                      // : "bg-gray-200"
                    }`}
                    onClick={() => handleOrdersTabClick(status as any)}
                  >
                    {status.charAt(0).toUpperCase() +
                      status.slice(1).replace(/([A-Z])/g, " $1")}
                  </button>
                ))}
              </div>

              {/* Orders Content */}
              <div className="p-5 bg-white shadow-md rounded-lg">
                {activeTab === "orders" && (
                  <OrderList
                    onOrderSelect={(orderId) => console.log(orderId)}
                    orderStatus={activeOrdersTab}
                  />
                )}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="p-5 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-bold mb-4">Settings</h2>
              <p>Coming soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
