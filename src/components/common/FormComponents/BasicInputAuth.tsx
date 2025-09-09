import React, { ReactElement, useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

interface BasicInputProps {
  label: string;
  name: string;
  hint?: string;
  placeholder?: string;
  type: string;
  rules?: RegisterOptions;
  inputEndIcon?: ReactElement | null;
  defaultValue?: string;
}

const BasicInput: React.FC<BasicInputProps> = ({
  label,
  hint,
  name,
  type,
  rules,
  defaultValue = "",
  inputEndIcon = null,
}) => {
  const {
    register,
    // setValue,
    formState: { errors },
    // trigger,
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full ">
      <div className="flex justify-between items-center">
        <label
          htmlFor="with-corner-hint"
          className="block text-sm font-medium mb-2 dark:text-white"
        >
          {label}
        </label>
        <span className="block mb-2 text-sm text-gray-500 dark:text-neutral-500">
          {hint}
        </span>
      </div>
      <div className="flex w-full ">
        {inputEndIcon !== null && (
          <div className=" rounded-tl-md rounded-bl-md border-2 p-2 bg-gray-200 dark:bg-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        )}
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder="enter "
          {...register(name, {
            required: "This field is required",
            ...rules,
          })}
          defaultValue={defaultValue}
          className={`form_input dark:text-black w-full  border-2 ${
            inputEndIcon !== null || type == "password"
              ? ""
              : "rounded-tr-md rounded-br-md"
          } h-auto p-2`}
        ></input>
        {type === "password" && (
          <div
            className="hover:bg-primary hover:text-white rounded-tr-md rounded-br-md border-2 p-2 bg-gray-200 dark:bg-black "
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </div>
        )}
      </div>
      {errors?.[name] && (
        <p className="text-red-500 text-sm">
          {String(errors?.[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default BasicInput;
