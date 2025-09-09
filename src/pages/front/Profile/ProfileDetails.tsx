import React, { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import axiosClient from "@/api/axiosClient";
// import ImageUpload from '@/components/common/ImageUpload';
import useAuthStatus from "@/hooks/useAuthStatus";

interface FormData {
  username: string;
  email: string;
  phone: string;
  image: File | null;
}

const ProfileDetails: React.FC = () => {
  const methods = useForm<FormData>();
  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;
  const [image, setImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  interface User {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    customer: {
      phone: string;
    };
  }

  const { user } = useAuthStatus() as { user: User | null };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setValue("image", event.target.files[0]);
    }
  };

  useEffect(() => {
    if (user !== null) {
      try {
        setValue("username", user?.name || "");
        setValue("email", user.email || "");
        setValue("phone", user.customer.phone || "");
        if (user.avatar) {
          setProfileImageUrl(
            `${import.meta.env.VITE_APP_BACKEND_URL}${user.avatar}`
          );
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    }
  }, [setValue, user]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.username);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      if (data.image) {
        formData.append("avatar", data.image);
      }

      // Log the FormData entries for debugging
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axiosClient.put(
        "/customer-info/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex space-x-8 ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-1/3">
          <div>
            <label className="block text-sm font-medium ">Username</label>
            <input
              type="text"
              {...methods.register("username", {
                required: "Username is required",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium ">Email</label>
            <input
              type="email"
              {...methods.register("email", { required: "Email is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium ">Phone Number</label>
            <input
              type="tel"
              {...methods.register("phone", {
                required: "Phone number is required",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-10 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
        <div className="w-1/3 flex flex-col items-center">
          <div className="w-32 h-32 mb-4">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : profileImageUrl
                  ? profileImageUrl
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-gray-400 text-center"
              crossOrigin="anonymous"
            />
          </div>
          <label className="block text-sm font-medium ">Profile Image</label>
          <input
            type="file"
            id="file-upload"
            onChange={handleImageUpload}
            className="border border-gray-500"
          />
          <label
            htmlFor="file-upload"
            className="mt-3 block w-28 p-2 text-white text-sm  cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-center bg-blue-600 rounded-xl "
          >
            Select Image
          </label>
        </div>
      </div>
    </FormProvider>
  );
};

export default ProfileDetails;
