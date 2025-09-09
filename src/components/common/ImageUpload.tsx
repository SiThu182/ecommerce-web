import React, { ReactElement, useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";

interface BasicInputProps {
  label: string;
  name: string;
  hint?: string;
  placeholder?: string;

  rules?: RegisterOptions;
  inputEndIcon?: ReactElement | null;
  defaultValue?: string;
}

const BasicImageInput: React.FC<BasicInputProps> = ({
  label,
  hint,
  name,
  placeholder,

  defaultValue = "",
  inputEndIcon = null,
}) => {
  const {
    setValue,
    formState: { errors },
    // trigger,
  } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(name, file); // Update the form state
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };
  console.log(errors, "errors");

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
          type={"file"}
          accept="image/*"
          placeholder={placeholder}
          onChange={handleImageChange}
          defaultValue={defaultValue}
          className={`form_input dark:text-black w-full  border-2 ${
            inputEndIcon !== null ? "rounded-tr-md rounded-br-md" : "rounded"
          } h-auto p-2`}
        ></input>
      </div>
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg"
          />
          <button
            type="button"
            className="mt-2 text-sm text-red-500 underline"
            onClick={() => {
              setValue(name, null);
              setPreview(null);
            }}
          >
            Remove Image
          </button>
        </div>
      )}
      {errors?.[name] && (
        <p className="text-red-500 text-sm">
          {String(errors?.[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default BasicImageInput;
