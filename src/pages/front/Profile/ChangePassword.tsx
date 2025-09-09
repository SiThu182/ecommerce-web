import axiosClient from "@/api/axiosClient";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";

interface ChangePasswordForm {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const { control, handleSubmit } = useForm<ChangePasswordForm>();
  // const password = watch("password");

  const onSubmit = (data: ChangePasswordForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error("New Password and Confirm Password do not match");
      return;
    }
    const res = axiosClient.put("/customer-info/password-update", data);
    console.log(res, "Response");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ml-5 w-1/3">
      <div className="mb-4">
        <label className="block text-sm font-medium  ">Current Password</label>
        <Controller
          name="oldPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="password"
              {...field}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium  ">New Password</label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="password"
              {...field}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          )}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium ">Confirm Password</label>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              type="password"
              {...field}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          )}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-xl"
      >
        Change Password
      </button>
    </form>
  );
};

export default ChangePassword;
