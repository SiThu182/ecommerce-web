import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface BasicInputProps {
  label: string;
  name: string;
  type?: string;
  isTextArea?: boolean;
  rules?: any;
}

const BasicInput: React.FC<BasicInputProps> = ({
  label,
  name,
  type = "text",
  isTextArea = false,
  rules = {},
}) => {
  const { control, getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(name, formState);
  const { error } = fieldState;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            {isTextArea ? (
              <textarea
                {...field}
                className={`mt-1 block w-full px-3 py-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
            ) : (
              <input
                type={type}
                {...field}
                className={`mt-1 block w-full px-3 py-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
            )}
            {error && (
              <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default BasicInput;
