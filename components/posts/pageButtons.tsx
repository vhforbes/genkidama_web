import React, { useState } from 'react';

interface PagesInfo {
  next: object;
  previous: object;
  totalPages: number;
}

const PageButtonsComponent = ({ next, previous, totalPages }: PagesInfo) => {
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
          className="btn btn-secondary m-1"
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default PageButtonsComponent;
