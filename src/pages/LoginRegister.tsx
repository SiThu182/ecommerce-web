import axiosClient from "@/api/axiosClient";
import AlertModal from "@/components/common/AlertModal";
import AlertNotiBar from "@/components/common/AlertNoti";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { FaArrowLeft, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
// import clsx from "clsx";
import toast from "react-hot-toast";
// import clsx from "clsx";
import { signInWithPopup } from "firebase/auth";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../../src/utils/firebase";
import axios from "axios";
import { storeTempCartData } from "@/utils/cartStorage";
import { storeWlTempToDb } from "@/hooks/useWishlist";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword: string;
  phone: string;
}

function LoginRegister() {
  const methods = useForm<FormData>({
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmpassword: "",
      phone: "",
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = methods;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const { status: stateStatus, message } = (location.state || {}) as {
    status?: "success" | "error" | "info" | "warning";
    message?: string;
  };
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle] = useState("");
  const [modalMessage] = useState("");
  const [modalStatus] = useState("");
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  // const [notiMessage] = useState(""); // This state is unused, consider removing or using it
  // const [notiType] = useState<
  //   "success" | "error" | "info" | "warning" | undefined
  // >(undefined); // This state is unused, consider removing or using it
  const password = watch("password");
  // const email = watch("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (stateStatus) {
      setIsNotiOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [stateStatus, location.pathname, navigate]);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    setLoading(true);
    try {
      const result = isLogin
        ? await axiosClient.post("/customer-login", data)
        : await axiosClient.post("/customers", data);

      if (result.status === 200 || result.status === 201) {
        isLogin
          ? (toast.success("You have successfully logged in!"), navigate("/"))
          : (toast.success("Your account has been created! Please Log in"),
            setIsLogin(true));

        storeTempCartData();
        // setModalStatus("success");
        // setModalTitle(isLogin ? "Login Successful" : "Registration Successful");
        // setModalMessage(
        //   isLogin
        //     ? "You have successfully logged in!"
        //     : "Your account has been created! Please Log in"
        // );
        // setIsModalOpen(true);
      }
    } catch (error) {
      // setModalStatus("error");
      // setModalTitle("ERROR:");
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.error ||
            error.message ||
            "An unexpected error occurred."
        );

        // setModalMessage(
        //   error.response?.data?.error ||
        //     error.message ||
        //     "An unexpected error occurred."
        // );
      } else {
        toast.error("An unexpected error occurred.");
        // setModalMessage("An unknown error occurred.");
      }
      // setIsModalOpen(true); // Open modal for error
    } finally {
      setLoading(false);
      reset(); // Reset form fields after submission attempt
    }
  };

  const handleFirebaseLogin = async (provider: "google" | "facebook") => {
    try {
      const result = await signInWithPopup(
        auth,
        provider === "google" ? googleProvider : facebookProvider
      );
      const idToken = await result.user.getIdToken();

      const res = await axios.post(
        import.meta.env.VITE_APP_BACKEND_URL + "/api/v1/auth/social-login",
        { idToken },
        { withCredentials: true }
      );

      // const {  storeWlTempToDb } = useWishlist({ isLoggedIn });
      if (res.status === 200) {
        localStorage.setItem("login", "true");
        storeTempCartData();
        storeWlTempToDb();
        navigate("/");
      } else {
        toast.error("error");
        // setTitle("Error");
        // setContent("Login failed");
        // setIsOpen(true);
      }
    } catch (error) {
      console.log(error);

      toast.error("error");
      // console.error("Social login failed:", error);
      // setTitle("Error");
      // setContent("Social login failed");
      // setIsOpen(true);
    }
  };

  const handleConfirm = () => {
    if (modalStatus === "success") {
      if (isLogin) {
        // Successful Login: Navigate to the home page
        navigate("/", {
          state: {
            status: "success",
            message: "Login Success",
          },
        });
      } else {
        // Successful Registration: Navigate to the login/register page and switch to login view
        navigate("/login-register", {
          state: {
            status: "success",
            message: "Register success",
          },
        });
        // After navigation, ensure the form switches to login mode for the newly registered user
        setIsLogin(true); // Set to true to show the login form
      }
    }
    setIsModalOpen(false); // Close the modal after confirm
  };

  const baseInputStyles = {
    className:
      "border-b border-gray-400 w-full py-2 pr-3 text-gray-700 leading-tight outline-none",
  };

  return (
    <>
      <div className="min-h-screen relative w-full flex justify-center items-center bg-white p-4 sm:p-6">
        {/* Back button, still top-left for easy access */}
        <div className="absolute top-5 left-5 z-10">
          <button
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => navigate("/")}
            aria-label="Go back to home"
          >
            <FaArrowLeft className="size-6 text-gray-600" />
          </button>
        </div>
        {/* justify-between */}
        <div
          className={
            "min-h-screen border-3 rounded-lg flex gap-0 md:gap-10 lg:gap-16 w-full md:w-full mx-0 md:mx-5 lg:mx-10 xl:mx-32 md:my-10"
          }
        >
          {/* Left section */}
          <div className={`w-6/12 hidden md:block md:my-20`}>
            <div
              className={`relative h-full rounded-xl bg-cover mr-5 overflow-hidden`}
              //
            >
              {isLogin ? (
                <img
                  src="/image/login/login2.png"
                  alt="Login-img"
                  className="w-full h-full border-4 rounded-xl border-yellow-500"
                />
              ) : (
                <img
                  src="/image/login/signup2.png"
                  alt="Signup-img"
                  className="w-full h-full border-4 rounded-xl border-yellow-500"
                />
              )}
              {/* Large Circle - Corrected positioning */}
              {/* <div
                className="absolute rounded-full bg-blue-200 opacity-30
                           w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72
                           bottom-[-7rem] right-[-7rem]" // Added positioning
              ></div>
              {/* Small Circle - Adjusted size and color for a more subtle, smaller appearance */}
              {/* <div
                className="absolute rounded-full bg-blue-300 opacity-30
                           w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40
                           bottom-[6rem] right-[6rem]" // Positioning for intersection
              ></div>  */}
            </div>
          </div>

          {/* Form Section */}
          <div className={`w-full md:w-3/5  my-0 px-4 md:px-8`}>
            {/* ${
              isLogin ? "order-0" : "order-2"
            } */}
            {/* Logo Image */}
            <img src="/image/logo.png" alt="login-img" className="h-32 w-48" />
            <div className="text-center md:text-left mb-3">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                {isLogin
                  ? t("Sign In To OZZSHOP", { ns: "common" })
                  : t("Create Account", { ns: "common" })}
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-4 mt-4 w-full">
                <button
                  type="button"
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 border border-blue-300 rounded-md hover:bg-gray-100"
                  onClick={() => handleFirebaseLogin("google")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#fbc02d"
                      d="M43.6 20.5H42V20H24v8h11.3C34.3 32.1 30 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 5.1 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20.1-7.5 20.1-21 0-1.4-.2-2.7-.5-3.5z"
                    />
                    <path
                      fill="#e53935"
                      d="M6.3 14.7l6.6 4.8C14.3 16.1 18.8 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 5.1 29.4 3 24 3c-7.7 0-14.4 4.3-17.7 10.7z"
                    />
                    <path
                      fill="#4caf50"
                      d="M24 45c5.4 0 10.4-1.8 14.3-4.9l-6.6-5.4C29.5 36.5 26.9 37.5 24 37.5c-6 0-10.9-4.1-12.7-9.5l-6.5 5c3.2 6.3 9.7 10.5 17.2 10.5z"
                    />
                    {/* <path fill="#1565c0" d="M43.6 20.5H42V20H24v8h11.3c-1.2 3.1-4 5.7-7.3 6.7l6.6 5.4c-1.9 1.4-4.2 2.4-6.6 2.4-7.5 0-13.9-4.2-17.2-10.5l6.5-5C13.1 33.4 18 37.5 24 37.5c2.9 0 5.5-1 7.6-2.6l6.6 5.4C34.4 43.2 29.4 45 24 45c-10.6 0-19.7-7.3-21.8-17h-.2v-8h.2C4.3 12.3 13.4 5 24 5c10.6 0 19.7 7.3 21.8 17z"/> */}
                  </svg>

                  <span className="text-sm text-gray-800">
                    Sign up with Google
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 border border-blue-300 rounded-md hover:bg-gray-100"
                  onClick={() => handleFirebaseLogin("facebook")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#1877F2"
                  >
                    <path
                      d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 
                      24H12.82v-9.294H9.692V11.31h3.128V8.414c0-3.1 1.893-4.788 4.659-4.788 
                      1.325 0 2.464.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 
                      1.763v2.312h3.587l-.467 3.396h-3.12V24h6.116C23.407 24 24 
                      23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"
                    />
                  </svg>

                  <span className="text-sm text-gray-800">
                    Sign up with Facebook
                  </span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-center text-lg text-gray-500 my-8">
                __ OR __
              </h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div
                className={`grid ${
                  isLogin ? "grid-cols-1" : "grid-cols-2"
                } gap-3`}
              >
                {/*First Name */}
                {!isLogin && (
                  <div className="my-2 w-full">
                    <label
                      htmlFor="firstname"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      {t("First Name", { ns: "common" })}
                    </label>
                    <input
                      id="firstname"
                      type="text"
                      // placeholder="Enter your first name"
                      {...register("firstname", {
                        required: t("This field is required", { ns: "common" }),
                      })}
                      {...baseInputStyles}
                      className={` ${baseInputStyles.className} ${
                        errors.firstname ? "border-red-500" : "border-gray-100"
                      }`}
                    />
                    {errors.firstname && (
                      <p className="text-red-500 text-xs italic mt-1">
                        {errors.firstname.message}
                      </p>
                    )}
                  </div>
                )}

                {/*Last Name */}
                {!isLogin && (
                  <div className="my-2 w-full ">
                    <label
                      htmlFor="lastname"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      {t("Last Name", { ns: "common" })}
                    </label>
                    <input
                      id="lastname"
                      type="text"
                      // placeholder="Enter Last name"
                      {...register("lastname", {
                        required: t("This field is required", { ns: "common" }),
                      })}
                      {...baseInputStyles}
                      className={` ${baseInputStyles.className} ${
                        errors.lastname ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.lastname && (
                      <p className="text-red-500 text-xs italic mt-1">
                        {errors.lastname.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Email */}
                <div className="mb-2">
                  <label
                    htmlFor="Email"
                    className="block text-gray-700 text-sm font-bold"
                  >
                    {t("Email", { ns: "common" })}
                  </label>
                  <input
                    id="email"
                    type="email"
                    // placeholder="name@example.com"
                    {...register("email", {
                      required: t("This field is required", { ns: "common" }),
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    {...baseInputStyles}
                    className={` ${baseInputStyles.className} ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                {!isLogin && (
                  <div className="mb-2">
                    <label
                      htmlFor="Phone"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      {t("Phone", { ns: "common" })}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      // placeholder="Enter your number"
                      {...register("phone", {
                        required: t("This field is required", { ns: "common" }),
                        pattern: {
                          value: /^[0-9\s-()+.]{7,20}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      {...baseInputStyles}
                      className={` ${baseInputStyles.className} ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs italic mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Password */}
                <div className="mb-2">
                  <label
                    htmlFor="Password"
                    className="block text-gray-700 text-sm font-bold"
                  >
                    {t("Password", { ns: "common" })}
                  </label>
                  <div className="flex">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      // placeholder="Enter your password"
                      {...register("password", {
                        required: t("This field is required", { ns: "common" }),
                        pattern: {
                          value:
                            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                          message: t(
                            "Must contain minimum 8 characters with at least one uppercase, one lowercase, one number & one special character",
                            { ns: "common" }
                          ),
                        },
                      })}
                      {...baseInputStyles}
                      className={` ${baseInputStyles.className} ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-600 focus:outline-none border-b border-gray-400 py-2"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                {!isLogin && (
                  <div className="mb-2">
                    <label
                      htmlFor="confirmpassword"
                      className="block text-gray-700 text-sm font-bold"
                    >
                      {t("Confirm Password", { ns: "common" })}
                    </label>
                    <div className="flex">
                      <input
                        id="confirmpassword"
                        type={showConfirmPassword ? "text" : "password"}
                        // placeholder="Confirm your password"
                        {...register("confirmpassword", {
                          required: t("This field is required", {
                            ns: "common",
                          }),
                          validate: (value) =>
                            value === password ||
                            t("The passwords do not match", { ns: "common" }),
                        })}
                        {...baseInputStyles}
                        className={` ${baseInputStyles.className} ${
                          errors.confirmpassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="text-gray-600 focus:outline-none border-b border-gray-400 py-2"
                      >
                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                    {errors.confirmpassword && (
                      <p className="text-red-500 text-xs italic mt-1">
                        {errors.confirmpassword.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-7 items-center justify-center mt-6">
                <button
                  className={`mx-5 rounded-xl w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      {isLogin ? "Logging in..." : "Registering..."}
                    </span>
                  ) : isLogin ? (
                    "Log In"
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>

            <div className=" text-center mt-8 text-gray-600 text-sm">
              {isLogin || "Already have an account?"}{" "}
              <span
                className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium transition duration-150 ease-in-out"
                onClick={() => setIsLogin((prev) => !prev)}
              >
                {isLogin ? (
                  <button className="justify-center item-center mx-0 rounded-xl w-full text-base bg-white border-2 border-blue-600 hover:bg-blue-700 text-blue-600 font-bold py-3 px-4 focus:outline-none focus:shadow-outline">
                    Register
                  </button>
                ) : (
                  t("Login", { ns: "common" })
                )}
              </span>
            </div>
            {isLogin && (
              <div className="flex justify-end">
                {" "}
                <button
                  className="text-blue-600 mt-3 hover"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AlertNotiBar
        isVisible={isNotiOpen}
        message={message ?? ""}
        type={stateStatus || "info"}
        duration={5000}
        onClose={() => setIsNotiOpen(false)}
      />
      <AlertModal
        isOpen={isModalOpen}
        status={modalStatus}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default LoginRegister;
