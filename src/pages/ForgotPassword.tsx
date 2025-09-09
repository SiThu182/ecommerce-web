import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineMailLock } from "react-icons/md";
import axiosClient from "@/api/axiosClient";
import { useNavigate } from "react-router";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

interface FormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  // const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorSend, setError] = useState("");
  console.log(errorSend)

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // setIsLoading(true);
    // try {
    //   //await sendResetEmail(data.email); //Backend api calll
    //   // Simulate API call delay
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   setShowModal(true);
    //   reset();
    // } catch (error) {
    //   console.error("Failed:", error);
    // } finally {
    //   setIsLoading(false); // Runs after success/error
    // }

    setIsLoading(true);
    try {
      // const res = await axiosClient.post(
      //   `/customer/forgot-password?email=${encodeURIComponent(data.email)}`
      // );
      const res = await axiosClient.post("/customer/forgot-password", {
        email: data.email,
      });
      // get("/customer/forgot-password", {
      //   data: { email: data.email },
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //});

      setIsLoading(false);
      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
        confirmButtonText: "OK!",
      }).then(() => {
        navigate("/reset-mail");
      });
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
            Reset Your Password
          </h3>
          <p className="my-2 text-base text-gray-600">
            Please enter your email address to receive a reset password link
          </p>

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
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading} // Prevent double submits
              className={`p-2 bg-blue-600 text-white rounded-xl mb-10 mx-10 ${
                isLoading ? "opacity-50" : "hover:bg-blue-700"
              } transition-colors`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>
        </form>
      </div>
      {/* {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm">
            <h3 className="text-lg font-bold mb-4">Success!</h3>
            <p className="text-gray-600">
              We've sent a password reset link to your email.
              <span className="block mt-1 font-medium text-gray-800">
                Please check both your inbox or spam folder.
              </span>
            </p>
            <button
              onClick={() => setTimeout(() => navigate("/reset-mail"), 100)}
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )} */}
    </>
  );
};
export default ForgotPassword;
