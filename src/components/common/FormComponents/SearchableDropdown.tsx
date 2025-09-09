import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

export interface Option {
  id: number | string;
  name: string;
}

interface SearchableDropdownProps {
  placeHolder: string;
  formName: string;
  label: string;
  hint: string;
  options?: Option[];
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  placeHolder,
  formName,
  label,
  hint,
  options = [],
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedOption) {
      setValue(formName, selectedOption.name);
      trigger(formName); // Trigger validation to update form state
    }
  }, [selectedOption, setValue, formName, trigger]);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
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
      <button
        type="button"
        className={`btn w-full ${
          errors?.[formName] && "border-error"
        } text-start border-2 p-2 rounded-md flex justify-between`}
        onClick={() => setIsOpen((prev) => !prev)}
        {...register(formName, { required: "This field is required" })}
      >
        {selectedOption ? selectedOption.name : placeHolder}
        {!isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        )}
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <input
            type="text"
            placeholder="Search..."
            className="input input-bordered w-full p-2 my-2 border-2 border-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="menu w-full">
            {filteredOptions.map((option) => (
              <li key={option.id}>
                <div
                  className="w-full text-left cursor-pointer p-2 hover:bg-gray-200"
                  onClick={() => handleSelect(option)}
                >
                  {option.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {errors?.[formName] &&
        typeof errors?.[formName]?.message === "string" && (
          <span className="text-red-600">*{errors?.[formName]?.message}</span>
        )}
    </div>
  );
};

export default SearchableDropdown;
