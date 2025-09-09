import React, { useState } from "react";

import ProfileDetails from "./ProfileDetails"; // Assuming you have components for other tabs
import OrderList from "./YourOrders/OrderList";
import Setting from "./Setting";
import Sidebar from "./SideNav";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "settings">(
    "orders"
  );
  const [activeProfileTab, setActiveProfileTab] = useState<
    "profileDetails" | "address" | "changePassword"
  >("profileDetails");
  const [activeOrdersTab, setActiveOrdersTab] = useState<
    "AllOrders" | "Processing" | "Cancelled" | "Delivered" | "Return"
  >("AllOrders");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(true);

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

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        // Render content based on activeProfileTab
        return (
          <div className="p-4">
            {activeProfileTab === "profileDetails" && <ProfileDetails />}
            {activeProfileTab === "address" && <div>Address component</div>}
            {activeProfileTab === "changePassword" && (
              <div>Change Password component</div>
            )}
          </div>
        );
      case "orders":
        return <OrderList orderStatus={activeOrdersTab} />;
      case "settings":
        return <Setting />;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
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
      <div className="w-3/4 p-4">{renderContent()}</div>
    </div>
  );
};

export default AccountPage;
