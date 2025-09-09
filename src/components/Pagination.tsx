import React, { useState } from "react";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, lastPage }) => {
  const [inputPage, setInputPage] = useState(page);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setPage(newPage);
      setInputPage(newPage); // Update input to reflect current page
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value > 0) {
      setInputPage(value);
    }
  };

  const handleInputBlur = () => {
    handlePageChange(inputPage);
  };

  return (
    <div>
      <div className="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
        <nav className="flex items-center -space-x-px" aria-label="Pagination">
          <button
            type="button"
            onClick={() => handlePageChange(page - 1)}
            className={`min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
              page === 1
                ? "disabled:opacity-50 disabled:pointer-events-none"
                : ""
            }`}
            disabled={page === 1}
            aria-label="Previous"
          >
            <svg
              className="shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            <span className="sr-only">Previous</span>
          </button>

          {Array.from({ length: lastPage }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handlePageChange(index + 1)}
              className={`min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 ${
                page === index + 1
                  ? "bg-gray-200 text-gray-800"
                  : "text-gray-800 hover:bg-gray-100"
              } py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none`}
              aria-current={page === index + 1 ? "page" : undefined}
            >
              {index + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={() => handlePageChange(page + 1)}
            className={`min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
              page === lastPage
                ? "disabled:opacity-50 disabled:pointer-events-none"
                : ""
            }`}
            disabled={page === lastPage}
            aria-label="Next"
          >
            <span className="sr-only">Next</span>
            <svg
              className="shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </nav>

        <div className="flex justify-center sm:justify-start items-center gap-x-2">
          <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
            Go to
          </span>
          <input
            type="number"
            value={inputPage}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className="min-h-[38px] py-2 px-2.5 block w-12 border-gray-200 rounded-lg text-sm text-center focus:border-blue-500 focus:ring-blue-500 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            min={1}
            max={lastPage}
          />
          <span className="text-sm text-gray-800 whitespace-nowrap dark:text-white">
            page
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
