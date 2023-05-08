import React, { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

interface PagesInfo {
  totalPages: number;
  changePage: (pageNumber: number) => void;
  currentPage: number;
}

const PageButtonsComponent = ({
  totalPages,
  changePage,
  currentPage,
}: PagesInfo) => {
  const [currentButtonsPage, setCurrentButtonsPage] = useState(1);

  const itemsPerPage = 4;

  const buttons: number[] = [];

  for (let i = 1; i <= totalPages; i += 1) {
    buttons.push(i);
  }

  const getButtonsForCurrentPage = (buttonsArray: number[]) => {
    const startIndex = (currentButtonsPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return buttonsArray.slice(startIndex, endIndex);
  };

  const handleNextPageClick = () => {
    const lastNumberFromFullArray = buttons[buttons.length - 1];
    const lastNumberFromPaginatedArray =
      getButtonsForCurrentPage(buttons)[
        getButtonsForCurrentPage(buttons).length - 1
      ];

    if (lastNumberFromFullArray !== lastNumberFromPaginatedArray) {
      setCurrentButtonsPage(currentButtonsPage + 1);
    }
  };

  const handlePreviousPageClick = () => {
    if (currentButtonsPage !== 1) {
      setCurrentButtonsPage(currentButtonsPage - 1);
    }
  };

  return (
    <div>
      <button type="button" className="hover:cursor-pointer">
        <ChevronLeftIcon
          onClick={handlePreviousPageClick}
          className="h-5 w-4 cursor-pointer"
        />
      </button>
      {getButtonsForCurrentPage(buttons).map(pageNumber => (
        <button
          type="button"
          key={pageNumber}
          className={`btn btn-secondary m-1 border-2 border-neutral border-opacity-30 ${
            pageNumber === currentPage ? 'bg-primary btn-disabled' : null
          }`}
          onClick={() => changePage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        onClick={handleNextPageClick}
        className="hover:cursor-pointer"
      >
        <ChevronRightIcon className="h-5 w-4 cursor-pointer" />
      </button>
    </div>
  );
};

export default PageButtonsComponent;
