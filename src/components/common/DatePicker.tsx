import React, { useRef } from "react";
import { useFormContext, Controller, RegisterOptions } from "react-hook-form";

interface DateInputProps {
  label: string; // Label for the input field
  name: string; // Field name for React Hook Form registration
  hint?: string; // Optional hint text
  placeholder?: string; // Placeholder text
  rules?: RegisterOptions; // Validation rules for React Hook Form
  defaultValue?: string; // Default value for the date field
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  name,
  hint,
  placeholder = "Select a date",
  rules,
  defaultValue = "",
}) => {
  const localInputRef = useRef<HTMLInputElement | null>(null); // Local ref for input element
  const { control } = useFormContext(); // Use React Hook Form context

  const handleShowPicker = () => {
    if (localInputRef.current) {
      localInputRef.current.showPicker(); // Trigger the date picker programmatically
    }
  };

  return (
    <div className="w-full">
      {/* Label and Hint */}
      <div className="flex justify-between items-center">
        <label
          htmlFor={name}
          className="block text-sm font-medium mb-2 dark:text-white"
        >
          {label}
        </label>
        {hint && (
          <span className="block mb-2 text-sm text-gray-500 dark:text-neutral-500">
            {hint}
          </span>
        )}
      </div>

      {/* Controlled Input Field */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <div className="relative flex w-full items-center">
            <input
              {...field} // Spread React Hook Form's field props
              id={name}
              type="date"
              placeholder={placeholder}
              onClick={handleShowPicker}
              ref={(el) => {
                field.ref(el); // Set React Hook Form's ref
                localInputRef.current = el; // Store in local ref for `showPicker`
              }}
              className={`form_input dark:text-black w-full border-2 rounded h-auto p-2 cursor-pointer ${
                fieldState.error ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={handleShowPicker}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              📅
            </button>
          </div>
        )}
      />

      {/* Validation Error */}
      {control._formState.errors?.[name] && (
        <p className="text-red-500 text-sm">
          {String(control._formState.errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export default DateInput;
