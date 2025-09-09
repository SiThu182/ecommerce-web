// import Home from "../pages/Home";

import ProfilePage from "@/pages/front/Profile/ProfilePage";
import OrderDetail from "@/pages/front/Profile/YourOrders/OrderDetailtmp";

// import Dashboard from "../pages/back/Dashboard";
// import Dealing from "../pages/back/Dealing";
// import Market from "../pages/back/Market";
// import UserAccount from "../pages/back/UserAccount/UserAccount";

export const NestedRoutes = [
  { path: "/profile", component: ProfilePage },
  { path: "/profile/order-detail", component: OrderDetail },
  //   { path: "/dealing", component: Dealing },
  //   { path: "/market", component: Market },
  //   { path: "/user-account", component: UserAccount },
];
