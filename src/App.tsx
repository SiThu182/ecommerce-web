import "./App.css";
import { Route, Routes } from "react-router";
import { AllRoutes } from "./routes/allRoutes";
import { NestedRoutes } from "./routes/nestedRoutes";
import NotFound from "./pages/NotFound";

import FrontLayout from "./pages/front/Layout/FrontLayout";
import LoginRegister from "./pages/LoginRegister";
import VerificationPage from "./pages/front/auth/VerificationPage";
import PaymentStatus from "@/pages/front/Order/PaymentStatus";
import ForgotPassword from "./pages/ForgotPassword";
import ResetMail from "./pages/ResetMail";
import ResetPassword from "./pages/ResetPassword";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          {AllRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
        <Route path={"/login-register"} element={<LoginRegister />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/reset-mail"} element={<ResetMail />} />
        <Route path={"/reset-password/:token"} element={<ResetPassword />} />
        <Route path={"/verification/:status"} element={<VerificationPage />} />

        <Route path={"/payment-status"} element={<PaymentStatus />} />
        {/* <Route element={<PrivateRoute></PrivateRoute>}> */}

        <Route path="/" element={<FrontLayout />}>
          {NestedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>

        {/* </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
