import React from 'react';

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
  const buttons = [];

  for (let i = 1; i <= totalPages; i += 1) {
    buttons.push(i);
  }

  return (
    <div>
      {buttons.map(pageNumber => (
        <button
          key={pageNumber}
          type="button"
          className={`btn btn-secondary m-1 ${
            pageNumber === currentPage ? 'bg-primary btn-disabled' : null
          }`}
          onClick={() => changePage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default PageButtonsComponent;
