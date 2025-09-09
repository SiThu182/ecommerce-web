import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import axiosClient from "@/api/axiosClient";
import axios from "axios";
import Swal from "sweetalert2";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token?: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();
  const [errorSend, setError] = useState("");
  console.log(errorSend)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      //await sendResetEmail(data.email); //Backend api calll
      // Simulate API call delay
      //await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("token : ", token);
      const res = await axiosClient.post("/customer/reset-password", {
        token: token,
        newPassword: data.password,
      });

      setIsLoading(false);
      Swal.fire({
        icon: "success",
        text: res.data.message || "Password reset successful.",
        confirmButtonText: "OK!",
      }).then(() => {
        // Navigate to login page after user clicks OK on the success Swal
        navigate("/login-register");
      });

      reset();
    } catch (error) {
      setIsLoading(false);

      let errorMessage = "An unknown error occurred";

      // Type-safe error handling
      if (axios.isAxiosError(error)) {
        // Handle Axios errors
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        // Handle standard Error objects
        errorMessage = error.message;
      }

      Swal.fire({
        title: "Warning",
        text: errorMessage,
        icon: "warning",
        confirmButtonText: "OK",
      });

      // Optional: Set error state if needed
      setError(errorMessage);
    }
  };

  return (
    <>
      <div className="w-1/3 h-1/3 mt-36 items-center text-center m-auto bg-gray-100 text-blue-600 rounded-2xl shadow-sm shadow-gray-300 border-2 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center shadow-sm shadow-black rounded-t-xl mx-0">
            <img
              src="image/logo.png"
              alt="OzzShop Logo"
              className="w-52 h-40 -mb-6"
            ></img>
          </div>
          <h3 className="text-2xl font-bold text-gray-950 mt-4">
            Email Verification
          </h3>

          <div
            className={`mx-10 flex border-2 ${
              errors.email ? "border-red-500" : "border-blue-600"
            } border-blue-600 rounded-xl  p-3 my-3`}
          >
            <MdOutlineMailLock className="text-3xl mr-3 " />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email!",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mx-10 text-left -mt-2 mb-2">
              {errors.email.message}
            </p>
          )}

          <div
            className={`mx-10 flex border-2 border-blue-600 rounded-xl  p-3 my-3`}
          >
            <RiLockPasswordLine className="text-3xl mr-3 " />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full outline-none bg-transparent"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message: t(
                    "Must contain minimum 8 characters with at least one uppercase, one lowercase, one number & one special character",
                    { ns: "common" }
                  ),
                },
              })}
            />
            <button
              type="button" // Important: set to button to prevent form submission
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-600 focus:outline-none"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}{" "}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mx-10 text-left -mt-2 mb-2">
              {errors.password.message}
            </p>
          )}

          {/* Confirm Password */}
          <div
            className={`mx-10 flex border-2 border-blue-600 rounded-xl  p-3 my-3`}
          >
            <RiLockPasswordLine className="text-3xl mr-3 " />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full outline-none bg-transparent"
              {...register("confirmPassword", {
                required: t("Confirm Password is required", { ns: "common" }),
                validate: (value) =>
                  value === password ||
                  t("The passwords do not match", { ns: "common" }),
              })}
            />
            <button
              type="button" // Important: set to button to prevent form submission
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}{" "}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mx-10 text-left -mt-2 mb-2">
              {errors.confirmPassword.message}
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading} // Prevent double submits
              className={`p-2 bg-blue-600 text-white rounded-xl mb-10 mx-10 ${
                isLoading ? "opacity-50" : "hover:bg-blue-700"
              } transition-colors`}
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
