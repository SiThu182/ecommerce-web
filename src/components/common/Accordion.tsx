import { useState } from "react";

interface AccordionProps {
  item: { title: string; content: string };
}

const Accordion: React.FC<AccordionProps> = ({ item }) => {
  const [active, setActive] = useState<boolean>(false);

  const handleToggle = () => {
    setActive((prev) => !prev);
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg">
        {/* Accordion Header */}
        <button
          onClick={() => handleToggle()}
          className="w-full flex justify-between items-center px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <span className="text-lg font-medium">{item.title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transform transition-transform ${
              active ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>

        {/* Accordion Content */}
        {active && (
          <div className="px-4 py-2 bg-white dark:bg-gray-900">
            <p className="text-gray-700 dark:text-gray-300">{item.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
